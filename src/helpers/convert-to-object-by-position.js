function convertToObjectByPosition(array) {
  return array.reduce((obj, item) => {
    obj[item.position] = item;
    return obj;
  }, {});
}

export default convertToObjectByPosition;
