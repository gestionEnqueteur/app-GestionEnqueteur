import { formatTime } from "../../helpers/formatHelper";

// UN JEU DE TEST
describe("Test de la fonction formatDatetime()", () => {
  
  // TEST 1
  test("quand je fournis une date, ça convertie au format hh:mm", () => {
    const dateMatcher: Date = new Date(0, 0, 0, 22, 7);
    expect(formatTime(dateMatcher)).toBe("22:07");
  });
  // TEST 2
  test("quand je fournis une date au format ISO string ça converitr au format hh:mm", () => {
    const dateString: string = new Date(0, 0, 0, 1, 13).toISOString();

    expect(formatTime(dateString)).toBe("01:13"); 
  });
  // TEST 3
  test("quand je passe un objet { hours: number, minutes: number}, return au format hh:mm", () => {
    const dateObjet = { hours: 22, minutes: 32} ; 

    expect(formatTime(dateObjet)).toBe("22:32"); 
  })
});
