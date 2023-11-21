/**
 * return the difference between time A and time B
 * return = timeB - timeA 
 * @param time depart
 * @param time arrival
 * @returns timeB - timeA
 */
export function calculDifferenceTime(timeA: Date, timeB: Date): Date {
  const delta = timeB.getTime() - timeA.getTime(); 
  return new Date(delta);
};