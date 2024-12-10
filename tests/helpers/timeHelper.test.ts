import { calculDifferenceTime } from "../../helpers/timeHelper";

describe("Timer Helper", () => {
  test("la difference calculé est juste", () => {

    const dateA = new Date(0, 0, 0, 0, 0, 40); 
    const dateB = new Date(0, 0, 0, 0, 0, 10); 

    const delta = calculDifferenceTime(dateA, dateB); 

    expect(delta.getSeconds()).toBe(30); 

  })
})