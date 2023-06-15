import { cloneElement } from "react";
import { Confectionery } from "../data/Confectionery";



function SortProducts(data: Array<Confectionery>, indexOfSort: number) {
  data = Sort(data, indexOfSort)
  return data
}


function Sort(data: Array<Confectionery>, indexOfSort: number) {
  switch (indexOfSort) {
    case 0:
      return sortBySelling(data)
    case 1:
      data = SortByName(data)
      return data
    case 2:
      data = SortByName(data)
      return reverseArr(data)
    case 3:
      return sortByPrice(data)
    default:
      data = sortByPrice(data)
      data = reverseArr(data)
      return data
  }
}


function reverseArr(data: Array<Confectionery>) {
  var newArr: Array<Confectionery> = []
  for (let index = 0; index < data.length; index++) {
    newArr.push(data[data.length - 1 - index])
  }
  return newArr
}

function SortByName(data: Array<Confectionery>): Array<Confectionery> {
  const len = data.length
  var newData: Array<Confectionery> = []
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (data[j].name.localeCompare(data[j + 1].name) > 0) {
        [data[j], data[j + 1]] = [data[j + 1], data[j]];
      }
    }
  }
  data.forEach(element => {
    newData.push(element)
  })
  return newData
}


function sortByPrice(data: Array<Confectionery>): Array<Confectionery> {
  const len = data.length
  var newData: Array<Confectionery> = []
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (data[j].price > data[j + 1].price) {
        [data[j], data[j + 1]] = [data[j + 1], data[j]];
      }
    }
  }
  data.forEach(element => {
    newData.push(element)
  })
  return newData
}

function sortBySelling(data: Array<Confectionery>): Array<Confectionery> {
  const len = data.length;
  var newData: Array<Confectionery> = []
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (data[j].numberOfSoldItems < data[j + 1].numberOfSoldItems) {
        [data[j], data[j + 1]] = [data[j + 1], data[j]]
      }
    }
  }
  data.forEach(element => {
    newData.push(element)
  })
  return newData
}



export { Sort, SortProducts }