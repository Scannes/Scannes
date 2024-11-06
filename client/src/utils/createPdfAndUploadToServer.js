import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { uploadPdfToServer } from "./userApi";
import { setError } from "../slices/errorSlice";

const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;

async function blobUrlToFile(blobUrl, fileName) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
}

async function preprocessImage(imageUrl) {
  const img = new Image();
  img.src = imageUrl;

  await new Promise((resolve) => (img.onload = resolve));

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  return canvas.toDataURL("image/png");
}

export default async function exportAsPDF(
  images,
  documentName,
  category,
  dispatch,
  setIsSending
) {
  if (category.toLowerCase() === "none") {
    dispatch(
      setError({
        isError: true,
        isActive: true,
        message: "Please select a category",
      })
    );
    return;
  }
  if (!images || images.length === 0) return;

  const pdfDoc = await PDFDocument.create();

  // Get current date formatted as desired
  const date = new Date().toLocaleDateString();
  const formattedDate = `${category}  ${date}`;

  // Load the font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Add each image to an A4-sized PDF page
  for (const image of images) {
    const imageDataUrl = await preprocessImage(image);
    const img = new Image();
    img.src = imageDataUrl;

    await new Promise((resolve) => (img.onload = resolve));

    // Calculate the scale factor to fit the image within the A4 page dimensions
    const scale = Math.min(A4_WIDTH / img.width, A4_HEIGHT / img.height);

    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;

    const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);

    // Optional: Set a background color (white in this example)
    page.drawRectangle({
      x: 0,
      y: 0,
      width: A4_WIDTH,
      height: A4_HEIGHT,
      color: rgb(1, 1, 1), // White background
    });

    // Center the image on the page
    const x = (A4_WIDTH - scaledWidth) / 2;
    const y = A4_HEIGHT - scaledHeight; // Position image at the top

    const imgBytes = await fetch(imageDataUrl).then((res) => res.arrayBuffer());
    const embeddedImage = await pdfDoc.embedPng(imgBytes);

    page.drawImage(embeddedImage, {
      x,
      y,
      width: scaledWidth,
      height: scaledHeight,
    });

    // Draw the background for the date overlay
    const textSize = 12; // Font size for the date text
    const textWidth = font.widthOfTextAtSize(formattedDate, textSize);
    const textX = A4_WIDTH - textWidth - 10; // 10 points from the right edge
    const textY = A4_HEIGHT - textSize - 5; // Move down by 10px for text

    // Draw the date text on top of the rectangle
    page.drawText(formattedDate, {
      x: textX,
      y: textY,
      size: textSize,
      font: font,
      color: rgb(0, 0, 0), // Black color
    });
  }

  const pdfBytes = await pdfDoc.save();
  const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

  uploadPdfToServer(
    pdfBlob,
    documentName,
    await blobUrlToFile(images?.at(0), new Date().getTime()),
    images.length,
    category,
    setIsSending
  );
}
