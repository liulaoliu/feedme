import FeedMe from "../GetNutirent/FeedMe";
import { testFnStart,testFnEnd } from "./test.util";

const feeder = new FeedMe(90, "endomorph");
// 通过
// console.log(feeder.getHighCarbonDayNutrient());
// console.log(feeder.getMediumCarbonDayNutrient());
// console.log(feeder.getLowCarbonDayNutrient());

const chTotal = 1260;
const fatTotal = 504;
const actual = feeder.getHighCarbonDayNutrient();
/**
 * 为什么没测蛋白质? 为什么没有低碳日和中碳日的 测试?
 */
export function testGetHighCarbonDayNutrient() {
  testFnStart("testGetHighCarbonDayNutrient");
  const chResult = (actual.carbonHydrate[0] * 2) / 0.5;
  if (Math.abs(chResult - chTotal) < 0.1) {
    console.log(`高碳日碳水应为${chTotal},实为${chResult}.....PASS`);
  } else {
    console.log(`高碳日碳水应为${chTotal},实为${chResult}.....FAIL`);
  }

  const fatResult = (actual.fat[0] * 2) / 0.15;

  if (Math.abs(chResult - chTotal) < 0.1) {
    console.log(`高碳日脂肪应为${fatTotal},实为${fatResult}.....PASS`);
  } else {
    console.log(`高碳日脂肪应为${fatTotal},实为${fatResult}.....FAIL`);
  }
  testFnEnd("getHighCarbonDayNutrient");
}
