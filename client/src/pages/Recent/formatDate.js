export default function formatUploadDate(date) {
  const monthOfUpload = new Date(date).getMonth();
  const dateOfUpload = new Date(date).getDate();
  const yearOfUpload = new Date(date).getFullYear();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();

  // Check if the date is today
  if (
    yearOfUpload === currentYear &&
    monthOfUpload === currentMonth &&
    dateOfUpload === currentDay
  ) {
    return "Today";
  }

  // Check if the date was yesterday
  const yesterday = new Date();
  yesterday.setDate(currentDay - 1);

  if (
    yearOfUpload === yesterday.getFullYear() &&
    monthOfUpload === yesterday.getMonth() &&
    dateOfUpload === yesterday.getDate()
  ) {
    return "Yesterday";
  }

  // Calculate the difference in days
  const uploadDate = new Date(yearOfUpload, monthOfUpload, dateOfUpload);
  const differenceInTime = currentDate - uploadDate;
  const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

  // Return the number of days ago
  return `${differenceInDays} days ago`;
}
