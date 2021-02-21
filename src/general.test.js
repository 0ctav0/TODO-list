const f1 = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index+1, arr.length)];
}

const f2 = (arr, index) => {
  const newArr = arr.slice();
  newArr.splice(index, 1);
  return newArr;
}

const f3 = (arr, index) => {
  return arr.filter((el,i) => i !== index);
}

const fnArr = [f1, f2, f3];

const arrBefore = Array(10).fill(1).concat([1,2,3,4,5,6,7,8,9]);
const index = 19-1;
const arrAfter = Array(10).fill(1).concat([1,2,3,4,5,6,7,8]);


for (let i = 0; i < 3; i++) {
  test(`fn${i} :: delete item from array`, () => {
    expect(fnArr[i](arrBefore, index)).toEqual(arrAfter);
  });
}