const changeQuantity = (productsArr, id, quantity) => {
    const newProductArr = [...productsArr]
    const filteredIds = productsArr.filter((pr) => {
        return pr.toString() === id
    })

    if (filteredIds.length < quantity) {
        newProductArr.push(id)
    } else {
        const indexOfProductToDelete = newProductArr.map(pr => {
            return pr.toString()
        }).indexOf(id)
        newProductArr.splice(indexOfProductToDelete, 1)
    }
    console.log(newProductArr)
    return newProductArr
}

module.exports = changeQuantity