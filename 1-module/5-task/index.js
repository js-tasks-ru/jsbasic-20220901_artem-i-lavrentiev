function truncate(str, maxlength) {
  if (str !== null && str.length > maxlength) {
    str = str.slice(0, maxlength - 1) + '…';
  }

  return str;
}
