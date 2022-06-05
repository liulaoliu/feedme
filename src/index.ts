import FeedMe from "./GetNutirent/FeedMe";
import ActualFoodWeight from "./GetNutirent/ActualFoodWeight";
import { testGetType } from "./test/FeedMe.test";

// 测试通过
// testGetType();

const feeder = new FeedMe(90, "endomorph");
// 通过
// console.log(feeder.getHighCarbonDayNutrient());
// console.log(feeder.getMediumCarbonDayNutrient());
// console.log(feeder.getLowCarbonDayNutrient());

const range = feeder.getHighCarbonDayNutrient();

const actualFood = ActualFoodWeight.getActualFoodWeight(range.carbonHydrate, {
  nutrientPer100Gram: 25,
  name: "米饭",
});

console.log("[**********==>", actualFood, "<==***********]");
