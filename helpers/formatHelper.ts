/**
 * remove the dashes
 * @param word a name with dashes
 * @returns the name without the dashes
 */
export function removeDashes(word: string): string {
  return word.replaceAll("-", " ");
}

/**
 * Convert time to hh:mm format
 * @param times Time to convert, can be a Date object, a string, or an object with 'hours' and 'minutes' properties
 * @returns The time in hh:mm format
 */
export function formatTime(
  times: Date | string | { hours: number; minutes: number }
): string {
  let hours: number;
  let minutes: number;

  if (typeof times === "object" && "hours" in times && "minutes" in times) {
    // If times is an object with hours and minutes properties
    ({ hours, minutes } = times);
  } else {
    const time = new Date(times);
    if (isNaN(time.getTime())) {
      throw new Error("Invalid input type for formatTime function");
    }
    hours = time.getHours();
    minutes = time.getMinutes();
  }

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}
