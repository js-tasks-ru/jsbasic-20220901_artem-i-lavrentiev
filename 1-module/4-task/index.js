function checkSpam(str) {
  let result = false;
  str = str.toUpperCase();

  if (str.includes('1XBET') || str.includes('XXX')) {
    result = true;
  }

  return result;
}
