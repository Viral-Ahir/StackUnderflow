/**
 * A array of months
 */
const months: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Function to format the date to a readable format
 * @param date - the date to be formatted
 * @returns a string with the formatted date
 */
const getMetaData = (date: Date): string => {
  const now = new Date();
  const diffs = Math.floor(Math.abs(now.getTime() - date.getTime()) / 1000);

  if (diffs < 60) {
    return `${diffs} seconds ago`;
  } else if (diffs < 60 * 60) {
    return `${Math.floor(diffs / 60)} minutes ago`;
  } else if (diffs < 60 * 60 * 24) {
    const h = Math.floor(diffs / 3600);
    return `${h} hours ago`;
  } else if (diffs < 60 * 60 * 24 * 365) {
    return `${months[date.getMonth()]} ${getDateHelper(date)} at ${date
      .toTimeString()
      .slice(0, 8)}`;
  } else {
    return `${months[date.getMonth()]} ${getDateHelper(
      date
    )}, ${date.getFullYear()} at ${date.toTimeString().slice(0, 8)}`;
  }
};

/**
 * Helper function to get the date
 * @param date - the date to be formatted
 * @returns a string with the formatted date
 */
const getDateHelper = (date: Date): string => {
  const day = date.getDate();
  if (day < 10) {
    return `0${day}`;
  }
  return `${day}`;
};

export { getMetaData };
