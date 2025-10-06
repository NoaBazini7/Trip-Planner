export function getDaysBetweenDates(
  startDate: Date,
  endDate: Date
): number {
  // Calculate the difference in milliseconds
  const timeDifference =
    endDate.getTime() -
    startDate.getTime();

  // Convert milliseconds to days
  // 1000 milliseconds/second * 60 seconds/minute * 60 minutes/hour * 24 hours/day
  const daysDifference =
    timeDifference /
    (1000 * 60 * 60 * 24);

  // Return the absolute value and round to the nearest whole number
  // Use Math.floor or Math.ceil depending on how you want to handle partial days
  return Math.round(
    Math.abs(daysDifference)
  );
}
