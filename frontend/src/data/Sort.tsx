import { cloneElement } from "react";
import { Confectionery } from "../data/Confectionery";


function Sort(data: Array<Confectionery>, indexOfSort: number) {
  switch (indexOfSort) {
    case 0:
      return SortBySelling(data)
    case 1:
      data = SortByName(data)
      return data
    case 2:
      data = SortByName(data)
      return reverseArr(data)
    case 3:
      return SortByPrice(data)
    default:
      data = SortByPrice(data)
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


function SortByPrice(data: Array<Confectionery>): Array<Confectionery> {
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

function SortBySelling(data: Array<Confectionery>): Array<Confectionery> {
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



export { Sort }