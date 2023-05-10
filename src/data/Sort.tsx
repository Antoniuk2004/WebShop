import {Confectionery} from "../data/Confectionery";


function Sort(currentData: Array<Confectionery>, indexOfSort: number) {
  switch (indexOfSort) {
    case 0:
      currentData = SortBySelling(currentData)
      break
    case 1:
      currentData = SortByName(currentData)
      break
    case 2:
      currentData = SortByName(currentData)
      currentData = currentData.reverse()
      break
    case 3:
      currentData = SortByPrice(currentData)

      break
    case 4:
      currentData = SortByPrice(currentData)
      currentData = currentData.reverse()
      break
  }
  return currentData
}

function SortByName(currentData: Array<Confectionery>): Array<Confectionery> {
  const len = currentData.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (currentData[j].name > currentData[j + 1].name) {
        [currentData[j], currentData[j + 1]] = [currentData[j + 1], currentData[j]]
      }
    }
  }
  return currentData
}

function SortByPrice(currentData: Array<Confectionery>): Array<Confectionery> {
  const len = currentData.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (currentData[j].price > currentData[j + 1].price) {
        [currentData[j], currentData[j + 1]] = [currentData[j + 1], currentData[j]];
      }
    }
  }
  return currentData;
}

function SortBySelling(currentData: Array<Confectionery>): Array<Confectionery> {
  const len = currentData.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (currentData[j].numberOfSoldItems < currentData[j + 1].numberOfSoldItems) {
        [currentData[j], currentData[j + 1]] = [currentData[j + 1], currentData[j]];
      }
    }
  }
  return currentData;
}



export {Sort};