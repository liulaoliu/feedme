// 按块划分处理不同类型 问题的方法， 块之间的分割符是 @@@@
import getType from "./util/getType";

/**
 * ecto 是外胚型
 * endo 是内胚型
 */
const bodyTypeContainer = ["ectomorph", "endomorph"] as const;
/**
 * 规定了 FeedMe实例允许的 身体类型
 */
type bodyType = typeof bodyTypeContainer[number];
/**
 * 规定了 可以摄入的营养素范围的 数据格式的类型
 */
type nutrientRange = [number, number] | [number, undefined];

/**
 * https://stackoverflow.com/questions/53985074/typescript-how-to-add-an-item-to-a-tuple
 * 向 nutrientRange 加入 字符串以增加返回数据的可读性
 */
type enhancedNutrientRange<I, T extends unknown[]> = [...T, I];

/**
 * 规定了FeedMe上按照PerDay形式 来计算Ch、Fat、Pro的 方法的类型
 */
type calculateFn = () => nutrientRange;

type nutrient = {
  carbonHydrate?: nutrientRange;
  fat?: nutrientRange;
  protein?: nutrientRange;
};

/**
 * 返回一个 nutrient 对象的方法
 */
type returnNutrientFn = () => nutrient;
export default class FeedMe {
  /**体重 */
  private weight: number;

  /**按照是否易胖区分的身体类型 */
  private bodyType: bodyType;

  // Ch 指碳水化合物含量carbonHydrate ; 单位为g
  // Fat指 脂肪含量
  // Pro 指蛋白质含量protein
  // 范围值就是 [start ,end] 的形式。如果是固定值 就是  [start ,undefined]的形式
  // 每天需要的 营养素含量 就是 体重 * 数组中的一个值
  private static readonly endomorphCh: nutrientRange = [2, undefined];
  private static readonly endomorphFat: nutrientRange = [0.8, undefined];
  private static readonly endomorphPro: nutrientRange = [0.8, 1.5];

  private static readonly ectomorphCh: nutrientRange = [3, undefined];
  private static readonly ectomorphFat: nutrientRange = [1, 1.2];
  private static readonly ectomorphPro: nutrientRange = [0.8, 1.5];

  /**
   * 通过接受体重和 身体类型 来初始化 FeedMe实例
   * @param weight
   * @param bodytype
   */
  constructor(weight: number, bodytype: bodyType) {
    //   判空
    if (weight === undefined || bodytype === undefined) {
      throw new Error("FeedMe不接收空参数");
    }
    // 判断参数weight类型
    if (getType(weight) !== "Number") {
      throw new Error("FeedMe的weight参数必须为 number类型");
    }
    // 判断参数bodytype类型
    if (
      getType(bodytype) !== "String" ||
      bodyTypeContainer.includes(bodytype) === false
    ) {
      throw new Error(
        `FeedMe的weight参数必须为 string类型,且必须为 ${bodyTypeContainer}中的值`
      );
    }

    this.weight = weight;
    this.bodyType = bodytype;
  }

  // @@@@按体重和体型计算每日需要的ch,fat,pro 营养素含量 的重量@@@@
  /**
   *  * 按照体重计算每日碳水化合物需求的重量，
   * 注意，这是营养素含量而不是总重
   * @returns 一个包含 碳水化合物含量范围值的数组 当第二个值为 undefined 则碳水化合物含量为固定值 返回值以g为单位
   */
  public calculateCarbonHydratePerDay: calculateFn = () => {
    return FeedMe.calculateHelper(this, "Ch");
  };

  /**
   *  * 按照体重计算每日脂肪需求的重量，
   * 注意，这是营养素含量而不是总重
   * @returns 一个包含 脂肪含量范围值的数组 当第二个值为 undefined 则脂肪含量为固定值 返回值以g为单位
   */
  public calculateFatPerDay: calculateFn = () => {
    return FeedMe.calculateHelper(this, "Fat");
  };

  /**
   *  * 按照体重计算每日蛋白质需求的重量，
   * 注意，这是营养素含量而不是总重
   * @returns 一个包含 蛋白质含量范围值的数组 当第二个值为 undefined 则蛋白质含量为固定值 返回值以g为单位
   */
  public calculateProPerDay: calculateFn = () => {
    return FeedMe.calculateHelper(this, "Pro");
  };

  /**
   *这是一个helperFn，按初始比例，不考虑高碳低碳等，计算每天营养素摄入量，
   根据传入的第二个参数，可以计算 碳水/脂肪/蛋白质
   * @param instance  FeedMe实例
   * @param thingsToCalculate  需要计算碳水/脂肪/还是蛋白质
   * @returns 根据体重和需要计算的项目，返回每天需要摄入的 营养素含量。
   */
  private static calculateHelper(
    instance: FeedMe,
    thingsToCalculate: "Ch" | "Fat" | "Pro"
  ) {
    const thingsCanCalculate = ["Ch", "Fat", "Pro"];
    if (thingsCanCalculate.includes(thingsToCalculate) === false) {
      throw new Error(
        `calculateHelper在第二个形参上接受了错误的参数，不能计算类型为${thingsToCalculate}的项目`
      );
    }
    if (instance.bodyType === "ectomorph") {
      return FeedMe.getNutrientRangeHelper(
        FeedMe[`ectomorph${thingsToCalculate}`],
        instance.weight
      );
    }
    if (instance.bodyType === "endomorph") {
      return FeedMe.getNutrientRangeHelper(
        FeedMe[`endomorph${thingsToCalculate}`],
        instance.weight
      );
    } else {
      // 理论上不可能走到这一步
      throw new Error(
        "calculateCarbonHydrate使用了错误的体型参数,错误位置为形参1,但是这个错误可能与实例成员有关"
      );
    }
  }
  /**
   * 根据个体体重和传入的营养素范围，获取按照体重计算而来的营养素摄入量，
   * 比如 90kg内胚型 一天摄入 90(Kg)* 2  180g蛋白质 因为营养素范围数组第二个参数为undefined ，所以第二个数不计入范围，
   * 结果当做一个固定值
   * @param range 营养素的可选范围数组
   * @param weight 体重 单位是(kg)
   * @returns 返回按照体重计算后的应该摄入的营养素重量范围数组，如果 第二个值是undefined 那么这项营养素摄入量可以是一个固定值。
   */
  private static getNutrientRangeHelper(range: nutrientRange, weight: number) {
    const resultRange = range.map((item) => {
      if (item === undefined) {
        return undefined;
      }
      return item * weight;
    });
    return resultRange as nutrientRange;
  }

  //@@@@需要高碳日、低碳日、中碳日   以周为单位进行循环@@@@
  /**
   * 
   * @returns  根据PerDay方法返回的范围值的结果*7，得出每周需要的碳水总营养素的范围
   */
  public calculateCarbonHydratePerWeek: calculateFn = () => {
    return FeedMe.getNutrientRangePerWeekhelper(
      this.calculateCarbonHydratePerDay()
    );
  };
  /**
   *
   * @returns  根据PerDay方法返回的范围值的结果*7，得出每周需要的脂肪营养素的范围
   */
  public calculateFatPerWeek: calculateFn = () => {
    return FeedMe.getNutrientRangePerWeekhelper(this.calculateFatPerDay());
  };
  /**
   *
   * @returns  根据PerDay方法返回的范围值的结果*7，得出每周需要的蛋白质营养素的范围
   */
  public calculateProPerWeek: calculateFn = () => {
    return FeedMe.getNutrientRangePerWeekhelper(this.calculateProPerDay());
  };

  /**
   *
   * @param weightPerDay 接受每天需要的营养素含量
   * @returns 返回每周需要的营养素含量 的范围数组，如果数组值为undefined，则表明该项目是个固定值
   */
  private static getNutrientRangePerWeekhelper(
    weightPerDayrange: nutrientRange
  ) {
    const resultRange = weightPerDayrange.map((weightPerDay) => {
      if (weightPerDay === undefined) {
        return undefined;
      }
      return 7 * weightPerDay;
    });
    return resultRange as nutrientRange;
  }

  // 按照一周为单位，高碳日*2，中碳日*3，低碳日*2

  /**
   *高碳日 2天，碳水摄入50%，fat摄入15%;
   * @returns 返回一周中高碳日的每天 碳水、脂肪、蛋白质营养素摄入量
   */
  public getHighCarbonDayNutrient: returnNutrientFn = () => {
    /**
     * 高碳日 2天 碳水 脂肪 蛋白质比例为 50% 15% 35%
     */

    const nutrientObj = FeedMe.getSomeDayNutrientHelper(this, 2, 0.5, 0.15);
    return FeedMe.addInfoToNutrientArrHelper(
      nutrientObj,
      "highCarbonDay",
      "高碳日"
    );
  };
  /**
   *中碳日 3天，碳水摄入35%，fat摄入35%;
   * @returns 返回一周中高碳日的每天 碳水、脂肪、蛋白质营养素摄入量
   */

  public getMediumCarbonDayNutrient: returnNutrientFn = () => {
    /**
     * 中碳日 3天 碳水 脂肪 蛋白质比例为 35% 35% 30%
     */
    const nutrientObj = FeedMe.getSomeDayNutrientHelper(this, 3, 0.35, 0.35);
    return FeedMe.addInfoToNutrientArrHelper(
      nutrientObj,
      "mediumCarbonDay",
      "中碳日"
    );
  };

  /**
   *低碳日 2天，碳水摄入15%，fat摄入50%;
   * @returns 返回一周中高碳日的每天 碳水、脂肪、蛋白质营养素摄入量
   */
  public getLowCarbonDayNutrient: returnNutrientFn = () => {
    /**
     * 低碳日   2天 碳水 脂肪 蛋白质比例为 15% 50% 35%
     */
    const nutrientObj = FeedMe.getSomeDayNutrientHelper(this, 2, 0.15, 0.5);
    return FeedMe.addInfoToNutrientArrHelper(
      nutrientObj,
      "lowCarbonDay",
      "低碳日"
    );
  };

  private static addInfoToNutrientArrHelper(
    nutrientObj: nutrient,
    englishInfo: string,
    chineseInfo: string
  ) {
    // 如无必要，不要修改传入的对象内容
    const copyObj = {};
    Object.assign(copyObj, nutrientObj);

    for (const [key, value] of Object.entries(copyObj)) {
      (value as unknown as enhancedNutrientRange<string, nutrientRange>).push(
        englishInfo + key + "/" + chineseInfo + FeedMe.translateHelper(key)
      );
    }

    return copyObj;
  }

  /**
   * 根据接收字符串 翻译出中文
   * protein 蛋白质
   * fat 脂肪
   * carbonhydrate 碳水化合物
   */
  private static translateHelper(str: string) {
    switch (str) {
      case "protein":
        return "蛋白质";
      case "fat":
        return "脂肪";
      case "carbonHydrate":
        return "碳水化合物";
      default:
        return "translateHelper接受了错误的参数：" + str;
    }
  }

  /**
   *根据传入的实例提供的每周总营养素摄入量 ，配合传入的x碳日 脂肪和碳水摄入比例 来计算x碳日的 当天碳水和脂肪摄入量，
   还包含了蛋白质量，根据经验，这是个大概值。
   * @param instance FeedMe实例
   * @param chRation  x碳日的碳水比例
   * @param fatRatio x碳日脂肪比例
   * @param proteinRatio x碳日蛋白质比例
   * @returns  返回包含ch、fat、protein的摄入含量范围的 一个对象
   */
  private static getSomeDayNutrientHelper(
    instance: FeedMe,
    totalDays: number,
    chRation: number,
    fatRatio: number,
    proteinRatio: number = 1 - chRation - fatRatio
  ) {
    if (proteinRatio <= 0) {
      throw new Error("getSomeDayNutrientHelper方法的碳水或者脂肪比例传入错误");
    }
    const Ration = [chRation, fatRatio, proteinRatio];

    /**FeedMe实例的 实际周消耗量范围值 */
    const carbonHydrate =
      FeedMe.calculatePerDayNutrientByPercentageAndTotalDays(
        instance.calculateCarbonHydratePerWeek(),
        Ration[0],
        totalDays
      );

    const fat = FeedMe.calculatePerDayNutrientByPercentageAndTotalDays(
      instance.calculateFatPerWeek(),
      Ration[1],
      totalDays
    );
    const protein = FeedMe.calculatePerDayNutrientByPercentageAndTotalDays(
      instance.calculateProPerWeek(),
      Ration[2],
      totalDays
    );

    const nutrient: nutrient = { carbonHydrate, fat, protein };
    return nutrient;
  }
  /**
   *根据传入的一周营养素摄入量，x碳日的特定摄入百分比，还有x碳日的总天数来得出 x碳日一天的营养素摄入量范围
   * @param weekArray 每周需要摄入的营养素含量 范围数组
   * @param percentage 一个特定的百分比 MAGIC
   * @param totalDays 某碳日的总天数
   * @returns
   */
  public static calculatePerDayNutrientByPercentageAndTotalDays(
    weekArray: nutrientRange,
    percentage: number,
    totalDays: number
  ) {
    const resultRange = weekArray.map((item) => {
      if (item === undefined) {
        return undefined;
      }
      return (item * percentage) / totalDays;
    });
    return resultRange as nutrientRange;
  }
}
