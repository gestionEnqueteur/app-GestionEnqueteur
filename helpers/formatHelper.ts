/**
 * remove the dashes
 * @param word a name with dashes
 * @returns the name without the dashes
 */
export function removeDashes(word: string): string {
  return word.replaceAll("-", " ");
}

/**
 * convert time object in string to hh:mm format
 * @param time time to convert
 * @returns the date in hh:mm format
 */
export function formatTime(time: Date): string {
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
