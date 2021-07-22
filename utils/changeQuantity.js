const changeQuantity = (productsArr, id, quantity) => {
  const newProductArr = [...productsArr];
  const filteredIds = productsArr.filter((pr) => pr.toString() === id);

  if (filteredIds.length < quantity) {
    newProductArr.push(id);
  } else {
    const indexOfProductToDelete = newProductArr.map((pr) => pr.toString()).indexOf(id);
    newProductArr.splice(indexOfProductToDelete, 1);
  }
  return newProductArr;
};

module.exports = changeQuantity;
