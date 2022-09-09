function ucFirst(str) {
  if (str !== null && str.length > 0) {
    str = str[0].toUpperCase() + str.slice(1);
  }

  return str;
}
