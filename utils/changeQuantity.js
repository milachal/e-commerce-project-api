const changeQuantity = (productsArr, id, quantity) => {
    const newProductArr = [...productsArr]
    const filteredIds = productsArr.filter((pr) => {
        return pr.toString() === id
    })
    
    if (filteredIds.length < quantity) {
        newProductArr.push(id)
    } else {
        newProductArr.pop(id)
    }
    return newProductArr
}

module.exports = changeQuantity