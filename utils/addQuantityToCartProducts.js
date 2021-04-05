const addQuantityToCartProducts = (products) => {
    const newProductsArr = []
    for (let i = 0; i < products.length; i++) {
        const product = products[i]
        let isMatch = false
        
        for (let j = 0; j < newProductsArr.length; j++) {
            const modifiedProduct = newProductsArr[j]
            if (product._id === modifiedProduct._id) {
                modifiedProduct.quantity++
                isMatch = true
                break
            }
        }
        
        if (!isMatch) {
            newProductsArr.push({
                ...product,
                quantity: 1
            })
        }
    }
    return newProductsArr
}

module.exports = addQuantityToCartProducts