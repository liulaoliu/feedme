import { nutrient, enhancedNutrientRange, enhancedNutrient } from "./FeedMe";
//   当给定一个 营养素 范围，
//   假设 ch [315,undefined]  ，设这个数组表示高碳日 可以摄入的CH营养素含量 是315g-350g
//   这是不够的，因为需要根据食物含有的营养素含量来计算实际食物重量，
//   比如 100g米饭大概含有ch营养素 25g   100g / actual nutrient constituent
//   那么摄入1g ch营养素 需要吃4g米饭   RAFPGN= required actual Food   per gram nutrient=4
//   所以对上面的范围来说，实际需要摄入的 米饭 为 nutrient requirment * RAFPGN => [315*4,undefined]
//  ActualFoodWeight 通过 某种食物的营养素含量 和 一个给定的营养素范围 得出实际需要的 食物种类

export default class ActualFoodWeight {
  /**
   * 比如对米饭，100g 含有25gch 营养素，需要315gch营养素，就需要 100/25 *315 g 米饭
   * @param range 营养素范围
   * @param nutrientPer100Gram  某种食物 每100g的 某营养素含量
   */
  public static getActualWeight(
    nutrientObj: enhancedNutrient,
    nutrientPer100Gram: number,
    foodName?: string
  ) {
    const obj = {} as enhancedNutrient;
    for (const key in nutrientObj) {
      if (Object.prototype.hasOwnProperty.call(nutrientObj, key)) {
        const result = nutrientObj[key as keyof nutrient].map(
          (requiredGram) => {
            if (requiredGram === undefined) {
              return undefined;
            }
            if (typeof requiredGram === "string") {
              if (foodName !== undefined) {
                return requiredGram + foodName;
              }
              return requiredGram;
            }
            return (requiredGram * 100) / nutrientPer100Gram;
          }
        );
        obj[key as keyof nutrient] = result as enhancedNutrientRange;
      }
    }

    return obj;
  }
}
