import ActualFoodWeight from "../GetNutirent/ActualFoodWeight";
//比如对米饭，100g 含有25gch 营养素，需要315gch营养素，就一共要 100/25 *315 g 米饭(1260)，一顿 就是前面值/3 (420)
//比如对燕麦片，100g 含有56gch 营养素，需要315gch营养素，就一共要 100/56 *315 g 燕麦片(562.5)，一顿 就是前面值/3 (187.5)

export function testGetSingleKindFooActualWeightOneMeal() {
  const expectedByRice = 420; //1260/2
  const expectedByOats = 187.5;

  const actualByRice = ActualFoodWeight.getSingleKindFooActualWeightOneMeal(
    [1260, undefined, "ddd"],
    {
      majorNutrientPer100Gram: 25,
      name: "米饭",
    }
  );

  const actualByOats = ActualFoodWeight.getSingleKindFooActualWeightOneMeal(
    [1260, undefined, "ddd"],
    {
      majorNutrientPer100Gram: 56,
      name: "燕麦片",
    }
  );

  console.log(actualByRice);
  console.log(actualByOats);
}
