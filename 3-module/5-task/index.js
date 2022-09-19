function getMinMax(str) {
  let result = {};
  let arr = str.split(' ')
	.filter(item => +item)
	.sort((a, b) => a - b);

	result.min = Number(arr.shift());
	result.max = Number(arr.pop());

  return result;
}
