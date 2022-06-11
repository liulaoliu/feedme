import ActualFoodWeight from "../GetNutirent/ActualFoodWeight";
import { testFnEnd, testFnStart } from "./test.util";
//比如对米饭，100g 含有25gch 营养素，需要315gch营养素，就一共要 100/25 *315 g 米饭(1260)，一顿 就是前面值/3 (420)
//比如对燕麦片，100g 含有56gch 营养素，需要315gch营养素，就一共要 100/56 *315 g 燕麦片(562.5)，一顿 就是前面值/3 (187.5)

/**
 * 一顿吃多少 xx食物
 */
export function testGetSingleKindFooActualWeightOneMeal() {
  const expectedByRice = 420; //315/3 = 一顿ch营养素   米饭营养素含量25%  420g 米饭
  const expectedByOats = 187.5; //315/3 =一顿营养素    燕麦片营养素含量56%  105 * 1/56% == 187.5
  const rice = {
    majorNutrientPer100Gram: 25,
    name: "米饭",
  };
  const oats = {
    majorNutrientPer100Gram: 56,
    name: "燕麦片",
  };

  const actualByRice = ActualFoodWeight.getSingleKindFoodActualWeightOneMeal(
    [315, undefined, "ddd"],
    rice
  );

  const actualByOats = ActualFoodWeight.getSingleKindFoodActualWeightOneMeal(
    [315, undefined, "ddd"],
    oats
  );
  testFnStart("testGetSingleKindFooActualWeightOneMeal");

  if (Math.abs(expectedByRice - (actualByRice[0] as number)) < 0.1) {
    console.log(
      `当食用${rice.name}，一顿摄入量应为 ${expectedByRice},实为${actualByRice[0]}..... PASS`
    );
  } else {
    console.log(
      `当食用${rice.name}，一顿摄入量应 ${expectedByRice},实为${actualByRice[0]}..... FAIL`
    );
  }
  if (Math.abs(expectedByOats - (actualByOats[0] as number)) < 0.1) {
    console.log(
      `当食用${oats.name}，一顿摄入量应为 ${expectedByOats},实为${actualByOats[0]}..... PASS`
    );
  } else {
    console.log(
      `当食用${oats.name}，一顿摄入量应为 ${expectedByOats},实为${actualByOats[0]}..... FAIL`
    );
  }

  testFnEnd("testGetSingleKindFooActualWeightOneMeal");
}
