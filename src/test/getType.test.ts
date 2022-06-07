import getType from "../util/getType";

let arrOfExample = ["str", 1, undefined, null, new Date()];

let result = arrOfExample.map((item, idx) => {
  return getType(item);
});
/**
 * assert
 */
let arrOfType = ["String", "Number", "Undefined", "Null", "Date"];

export function testGetType() {
  arrOfType.forEach((item, idx) => {
    if (item === arrOfType[idx]) {
      console.log(`应为${arrOfType[idx]},实为${result[idx]}.....PASS`);
    } else {
      console.log(`应为${arrOfType[idx]},实为${result[idx]}.....FAIL`);
    }
  });
}
