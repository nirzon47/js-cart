// DOM Elements
const themeSwitcher = document.getElementById('theme-switcher')

const minus = document.getElementsByClassName('minus')
const plus = document.getElementsByClassName('plus')
const counter = document.getElementsByClassName('count')

const count = [0, 0, 0, 0]

const cart = document.getElementById('cart-items-section')
const totalPrice = document.getElementById('total-price')

// Data for products
const products = [
	{ id: 0, name: 'Item - 1', price: 100 },
	{ id: 1, name: 'Item - 2', price: 200 },
	{ id: 2, name: 'Item - 3', price: 300 },
	{ id: 3, name: 'Item - 4', price: 400 },
]

// Cart Items Array
const cartItems = []

/*
 * Event Listener Additions
 */

// Adds subtractPrice() to every minus button
Array.from(minus).forEach((element) => {
	element.addEventListener('click', () => subtractPrice(element))
})

// Adds addPrice() to every plus button
Array.from(plus).forEach((element) => {
	element.addEventListener('click', () => addPrice(element))
})

themeSwitcher.addEventListener('click', () => themeChanger())

// Functions

/**
 * Toggles the theme between light and dark.
 *
 * @param {none} None - This function does not take any parameters.
 * @return {none} None - This function does not return any value.
 */
const themeChanger = () => {
	if (document.documentElement.getAttribute('data-theme') === 'light') {
		document.documentElement.setAttribute('data-theme', 'dark')
	} else {
		document.documentElement.setAttribute('data-theme', 'light')
	}
}

/**
 * Find the index of an item in the cartItems array based on its itemId.
 *
 * @param {number} itemId - The unique identifier of the item.
 * @return {number} The index of the item in the cartItems array, or -1 if not found.
 */
const findItemIndex = (itemId) =>
	cartItems.findIndex((item) => item.id === itemId)

/**
 * Finds an item in the cart by its ID.
 *
 * @param {number} itemId - The ID of the item to find.
 * @return {object} The found item, or undefined if not found.
 */
const findIfExists = (itemId) => cartItems.find((item) => item.id === itemId)

/**
 * Adds the price of a product to the shopping cart array.
 *
 * @param {Element} element - The element representing the product.
 * @return {void} This function does not return a value.
 */
const addPrice = (element) => {
	const id = Number(element.parentElement.id)

	if (!findIfExists(id)) {
		cartItems.push({ ...products[id] })
		count[id] += 1
	} else {
		const index = findItemIndex(id)
		cartItems[index].price += products[id].price
		count[id] += 1
	}

	counter[id].innerText = count[id]

	updateCart()
}

/**
 * Subtracts the price of the specified element from the cart.
 *
 * @param {HTMLElement} element - The element to subtract the price from.
 * @return {undefined} This function does not return a value.
 */
const subtractPrice = (element) => {
	const id = Number(element.parentElement.id)

	if (!findIfExists(id)) {
		return
	}

	const index = findItemIndex(id)
	cartItems[index].price -= products[id].price

	count[id] -= 1
	counter[id].innerText = count[id]

	if (cartItems[index].price <= 0) {
		cartItems.splice(index, 1)
	}

	updateCart()
}

/**
 * Calculates the total price of the cart items and updates the total price display.
 *
 * @return {void} No return value.
 */
const calculateTotalPrice = () => {
	let total = 0
	cartItems.forEach((item) => {
		total += item.price
	})

	totalPrice.innerText = total
}

/**
 * Checks if the cart is empty and renders a message if it is.
 *
 * @return {undefined} This function does not return a value.
 */
const ifEmptyCart = () => {
	if (cartItems.length === 0) {
		cart.innerHTML = `<div class="alert max-w-[20rem] mx-auto flex justify-around outline-none">
                            <span>Your cart is empty</span>
                        </div>`
	}
}

/**
 * Updates the cart by rendering the cart items on the page.
 *
 * @return {void}
 */
const updateCart = () => {
	cart.innerHTML = ''

	cartItems.forEach((item) => {
		cart.innerHTML += `<div class="alert max-w-[20rem] mx-auto flex justify-around outline-none">
                            <span>${item.name}</span><span>${
															item.price / products[item.id].price
														} x $${item.price}</span>
                            </div>`
	})

	ifEmptyCart()
	calculateTotalPrice()
}
