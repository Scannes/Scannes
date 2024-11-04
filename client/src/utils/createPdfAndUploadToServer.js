import { PDFDocument, rgb } from "pdf-lib";
import { uploadPdfToServer } from "./userApi";
import { setError } from "../slices/errorSlice";

async function blobUrlToFile(blobUrl, fileName) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
}

export default async function exportAsPDF(
  images,
  documentName,
  category,
  dispatch
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

  let maxWidth = 0;

  // Step 1: Find the maximum width among all images
  for (const image of images) {
    let imageDataUrl = image;

    // Check if the image is already in base64 format (starts with "data:image/")
    if (!image.startsWith("data:image/")) {
      // If it's a blob URL, fetch the data and convert to Data URL
      const blob = await fetch(image).then((res) => res.blob());
      imageDataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    }

    const img = new Image();
    img.src = imageDataUrl;

    // Wait for the image to load
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // Update maxWidth if this image is wider
    maxWidth = Math.max(maxWidth, img.width);
  }

  // Step 2: Add each image to the PDF with proper centering
  for (const image of images) {
    let imageDataUrl = image;

    // Check if the image is already in base64 format (starts with "data:image/")
    if (!image.startsWith("data:image/")) {
      // If it's a blob URL, fetch the data and convert to Data URL
      const blob = await fetch(image).then((res) => res.blob());
      imageDataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    }

    const img = new Image();
    img.src = imageDataUrl;

    // Wait for the image to load
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // Step 3: Convert non-PNG/JPEG images to PNG
    const isPng = imageDataUrl.startsWith("data:image/png");
    const isJpg = imageDataUrl.startsWith("data:image/jpeg");

    // If the image is neither PNG nor JPEG, convert it to PNG using canvas
    if (!isPng && !isJpg) {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      imageDataUrl = canvas.toDataURL("image/png"); // Convert to PNG
    }

    const pageWidth = maxWidth;
    const pageHeight = img.height;
    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Ensure the background is white
    page.drawRectangle({
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight,
      color: rgb(1, 1, 1), // White background
    });

    // Calculate x-coordinate to center the image
    const x = (maxWidth - img.width) / 2;

    // Handle PNG and JPEG images
    let embeddedImage;
    if (imageDataUrl.startsWith("data:image/png")) {
      const pngImageBytes = await fetch(imageDataUrl).then((res) =>
        res.arrayBuffer()
      );
      embeddedImage = await pdfDoc.embedPng(pngImageBytes);
    } else if (imageDataUrl.startsWith("data:image/jpeg")) {
      const jpgImageBytes = await fetch(imageDataUrl).then((res) =>
        res.arrayBuffer()
      );
      embeddedImage = await pdfDoc.embedJpg(jpgImageBytes);
    }

    page.drawImage(embeddedImage, {
      x: x,
      width: img.width,
      height: img.height,
    });
  }

  const pdfBytes = await pdfDoc.save();

  // Create a Blob for sending to the server
  const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

  // Call uploadPdfToServer and pass the Blob
  uploadPdfToServer(
    pdfBlob,
    documentName,
    await blobUrlToFile(images?.at(0), new Date().getTime()),
    images.length,
    category
  );
}
