export {}
// // glass
// import Collins from "../images/glass/collins.png"
// import Highball from "../images/glass/highball.png"
// import Hurricane from "../images/glass/hurricane.png"
// import Margarita from "../images/glass/margarita.png"
// import Martini from "../images/glass/martini.png"
// import Old from "../images/glass/old.png"
// // ingredient
// import Rum from "../images/spirit/rum.png"
// import Gin from "../images/spirit/gin.png"
// import Vodka from "../images/spirit/vodka.png"
// import Whiskey from "../images/spirit/whiskey.png"
// import Tequila from "../images/spirit/tequila.png"
// import Brandy from "../images/spirit/brandy.png"
// // category
// import Drink from "../images/category/drink.png"
// import Cocktail from "../images/category/cocktail.png"
// import Shake from "../images/category/shake.png"
// import Shot from "../images/category/shot.png"
// import Cocoa from "../images/category/cocoa.png"
// import Beer from "../images/category/beer.png"

export interface FilterList {
  value: string
  filterValue: string
  image: string
}

// export interface IFilterData {
//   filterName: string
//   filterList: IFilterList[]
// }

// interface IFilter {
//   c: IFilterData
//   g: IFilterData
//   i: IFilterData
//   a: IFilterData
// }

// export const filterData: IFilter = {
//   c: {
//     filterName: "카테고리",
//     filterList: [
//       {
//         id: 0,
//         value: "ordinary_drink",
//         filterValue: "일반",
//         image: Drink,
//       },
//       {
//         id: 1,
//         value: "cocktail",
//         filterValue: "칵테일",
//         image: Cocktail,
//       },
//       {
//         id: 2,
//         value: "shake",
//         filterValue: "셰이킹",
//         image: Shake,
//       },
//       {
//         id: 3,
//         value: "shot",
//         filterValue: "샷",
//         image: Shot,
//       },
//       // {
//       //   id: 4,
//       //   value: "coffee / tea",
//       //   filterValue: "커피 / 차",
//       //   image: Highball,
//       // },
//       {
//         id: 5,
//         value: "cocoa",
//         filterValue: "코코아",
//         image: Cocoa,
//       },
//       // {
//       //   id: 6,
//       //   value: "homemade_liqueur",
//       //   filterValue: "커피 / 차",
//       //   image: Highball,
//       // },
//       // {
//       //   id: 7,
//       //   value: "punch / party drink",
//       //   filterValue: "펀치 / 파티",
//       //   image: Highball,
//       // },
//       {
//         id: 8,
//         value: "beer",
//         filterValue: "맥주",
//         image: Beer,
//       },
//       // {
//       //   id: 9,
//       //   value: "other / unknown",
//       //   filterValue: "기타",
//       //   image: Highball,
//       // },
//     ],
//   },
//   g: {
//     filterName: "글라스",
//     filterList: [
//       {
//         id: 0,
//         value: "highball_glass",
//         filterValue: "하이볼",
//         image: Highball,
//       },
//       {
//         id: 1,
//         value: "cocktail_glass",
//         filterValue: "마티니",
//         image: Martini,
//       },
//       {
//         id: 2,
//         value: "old-fashioned_glass",
//         filterValue: "올드패션드 ",
//         image: Old,
//       },
//       {
//         id: 3,
//         value: "collins_glass",
//         filterValue: "콜린스",
//         image: Collins,
//       },
//       {
//         id: 4,
//         value: "hurricane_glass",
//         filterValue: "허리케인",
//         image: Hurricane,
//       },
//       {
//         id: 5,
//         value: "margarita/Coupette_glass",
//         filterValue: "마가리타",
//         image: Margarita,
//       },
//     ],
//   },
//   i: {
//     filterName: "재료",
//     filterList: [
//       { id: 0, value: "rum", filterValue: "럼", image: Rum },
//       { id: 1, value: "gin", filterValue: "진", image: Gin },
//       { id: 2, value: "vodka", filterValue: "보드카", image: Vodka },
//       { id: 3, value: "scotch", filterValue: "위스키", image: Whiskey },
//       { id: 4, value: "tequila", filterValue: "데킬라", image: Tequila },
//       { id: 5, value: "brandy", filterValue: "브랜디", image: Brandy },
//     ],
//   },
//   a: { filterName: "알코올", filterList: [] },
// }
// // "c" | "g" | "i" | "a"
