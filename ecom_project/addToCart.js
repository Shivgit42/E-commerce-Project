import {getCartProductFromLS} from "./getCartProducts.js";
import {updateCartValue} from "./updateCartValue.js";
import {showToast} from "./showToast.js";

getCartProductFromLS()
export const addToCart = (event, id, stock) => {
    let arrLocalStorageProduct = getCartProductFromLS()

    const currentProductElem = document.querySelector(`#card${id}`)
    let quantity = currentProductElem.querySelector('.productQuantity').innerText
    let price = currentProductElem.querySelector('.productPrice').innerText

    // console.log(quantity, price)
    price = price.replace('₹', '')

    let existingProd = arrLocalStorageProduct.find((curProd) => curProd.id === id)
    console.log(existingProd)

    if (existingProd && quantity > 1){
        quantity = Number(existingProd.quantity) + Number(quantity)
        price = Number(price * quantity)
        let updatedCart = {id, quantity, price}

        updatedCart = arrLocalStorageProduct.map((curProd) => {
            return (curProd.id === id) ? updatedCart : curProd
        })
        console.log(updatedCart)
        localStorage.setItem('cartProductLS', JSON.stringify(updatedCart))
        showToast('add', id)
    }

    if (existingProd){
        // alert('This product is already added to cart')
        return false
    }

    price = Number(price * quantity)
    quantity = Number(quantity)

    arrLocalStorageProduct.push({id, quantity, price})
    localStorage.setItem('cartProductLS', JSON.stringify(arrLocalStorageProduct))

    updateCartValue(arrLocalStorageProduct)
    showToast('add', id)
}
