import { nutrient, enhancedNutrientRange, enhancedNutrient } from "./FeedMe";
/**
 *  规定了一个“食物”应该包含的数据
 */
export interface foodInfo {
  nutrientPer100Gram: number;
  name: string;
  englishName?: string;
}
//   当给定一个 营养素 范围，
//   假设 ch [315,undefined]  ，设这个数组表示高碳日 可以摄入的CH营养素含量 是315g-350g
//   这是不够的，因为需要根据食物含有的营养素含量来计算实际食物重量，
//   比如 100g米饭大概含有ch营养素 25g   100g / actual nutrient constituent
//   那么摄入1g ch营养素 需要吃4g米饭   RAFPGN= required actual Food   per gram nutrient=4
//   所以对上面的范围来说，实际需要摄入的 米饭 为 nutrient requirment * RAFPGN => [315*4,undefined]
//  ActualFoodWeight 通过 某种食物的营养素含量 和 一个给定的营养素范围 得出实际需要的 食物重量

export default class ActualFoodWeight {
  // * 比如对米饭，100g 含有25gch 营养素，需要315gch营养素，就需要 100/25 *315 g 米饭

  /**
   * 通过一个ch/fat/protein营养素的范围，配合传入的 食物的营养素含量和名字 ,给出需要摄入的食物的实际重量
   *
   * @param nutrientRange 营养素摄入量范围 (带有文字描述的增强版)，比如可以传入new FeedMe().getHighCarbonDayNutrient().carbonHydrate
   * @param nutrientPer100Gram 想要计算(吃)的食物的营养素含量
   * @param foodName 食物名称
   */
  public static getActualFoodWeight(
    nutrientRange: enhancedNutrientRange,
    food: foodInfo
  ) {
    const result = nutrientRange.map((requiredGram) => {
      if (requiredGram === undefined) {
        return undefined;
      }
      if (typeof requiredGram === "string") {
        if (food.name !== undefined) {
          return requiredGram + ":" + food.name;
        }
        return requiredGram;
      }
      return (requiredGram * 100) / food.nutrientPer100Gram;
    });

    return result;
  }
}
