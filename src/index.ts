import FeedMe from "./FeedMe";

import { testGetType } from "./test/FeedMe.test";

// 测试通过
// testGetType();

const feeder = new FeedMe(90, "endomorph");

console.log(feeder.getHighCarbonDayNutrient());
console.log(feeder.getMediumCarbonDayNutrient());
console.log(feeder.getLowCarbonDayNutrient());
