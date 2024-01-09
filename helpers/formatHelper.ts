/**
 * remove the dashes
 * @param word a name with dashes
 * @returns the name without the dashes
 */
export function removeDashes(word: string): string {
  return word.replaceAll("-", " ");
}

/**
 * convert time string in string to hh:mm format
 * @param time time to convert en string
 * @returns the date in hh:mm format
 */
export function formatTime(timestr: string): string {
  const time = new Date(timestr); 
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
