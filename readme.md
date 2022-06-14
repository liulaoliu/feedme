#### FeedMe

FeedMe 有四个 API，其中三个可以给出高碳、中碳、低碳日 需要摄入的营养素含量。

- getHighCarbonDayNutrient
- getMediumCarbonDayNutrient
- getLowCarbonDayNutrient

  剩下一个 API 就是把上面三个的结果一次性输出。

- getHighMediumLowCarbonDayNutrientGroup

形式如下:

```
//  {
//     carbonHydrate: [ 308, undefined, 'highCarbonDaycarbonHydrate/高碳日碳水化合物' ],
//     fat: [ 37, undefined, 'highCarbonDayfat/高碳日脂肪' ],
//     protein: [ 86.2, 161.7, 'highCarbonDayprotein/高碳日蛋白质' ]
//   }
 new FeedMe(88, "endomorph").getHighCarbonDayNutrient()

```

#### AcutalWeight

AcutalWeight 有两个 API

- getSingleKindFoodActualWeightThreeMeals
- getSingleKindFoodActualWeightOneMeal

通过 FeedMe 给出的单日营养素摄入范围，配合你想要吃的某种食物，就能给出需要食用的食物的重量。
注意数组中的 undefined , 这表示 需要摄入的食物量没有给出一个指导范围，而是一个固定值，也就是 446g

形式如下:

```
// [
//     446.3768115942029,
//     undefined,
//     'highCarbonDaycarbonHydrate for one meal/高碳日碳水化合物:土豆吃一顿'
// ]
 ActualFoodWeight.getSingleKindFoodActualWeightOneMeal(
    new FeedMe(88, "endomorph").getHighCarbonDayNutrient().carbonHydrate,
    { majorNutrientPer100Gram: 23, name: "土豆" }
  )
```
