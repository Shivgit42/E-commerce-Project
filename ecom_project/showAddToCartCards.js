import products from "./api/products.json"
import {getCartProductFromLS} from "./getCartProducts.js";
import {fetchQuantityFromCartLS} from "./fetchQuantityFromCartLS.js";
import {removeProdFromCart} from "./removeProdFromCart.js";
import {incrementDecrement} from "./incrementDecrement.js";
import {updateCartProductTotal} from "./updateCartProductTotal.js";

let cartProducts = getCartProductFromLS()

let filterProducts = products.filter((curProd) => {
   return cartProducts.some((curElem) => curElem.id === curProd.id)
})
console.log(filterProducts)


const cartElement = document.querySelector('#productCartContainer')
const templateContainer = document.querySelector('#productCartTemplate')

const showCartProduct = () => {
    filterProducts.map((curProd) => {
        const { category, id, image, name, stock, price } = curProd

        let productClone = document.importNode(templateContainer.content, true)

        const lSActualData = fetchQuantityFromCartLS(id, price)

        productClone.querySelector('#cardValue').setAttribute('id', `card${id}`)
        productClone.querySelector('.category').textContent = category
        productClone.querySelector(".productName").textContent = name;
        productClone.querySelector(".productImage").src = image;
        productClone.querySelector('.productQuantity').textContent = lSActualData.quantity
        productClone.querySelector('.productPrice').textContent = lSActualData.price.toFixed(2)

        productClone.querySelector('.stockElement').addEventListener('click', (event) => {
            incrementDecrement(event, id, stock, price)
        })

        productClone.querySelector('.remove-to-cart-button').addEventListener('click', () => removeProdFromCart(id))

        cartElement.append(productClone)
    })
}

showCartProduct()

updateCartProductTotal()