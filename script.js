const themeSwitcher = document.getElementById('theme-switcher')

const minus = document.getElementsByClassName('minus')
const plus = document.getElementsByClassName('plus')

const cart = document.getElementById('cart-items-section')
const totalPrice = document.getElementById('total-price')
const emptyMessage = document.getElementById('empty-message')

const products = [
	{ id: 0, name: 'Item - 1', price: 100 },
	{ id: 1, name: 'Item - 2', price: 200 },
	{ id: 2, name: 'Item - 3', price: 300 },
	{ id: 3, name: 'Item - 4', price: 400 },
]

const cartItems = []

// Event Listener Additions
Array.from(minus).forEach((element) => {
	element.addEventListener('click', () => subtractPrice(element))
})

Array.from(plus).forEach((element) => {
	element.addEventListener('click', () => addPrice(element))
})

themeSwitcher.addEventListener('click', () => themeChanger())

// Functions
const findItemIndex = (itemId) =>
	cartItems.findIndex((item) => item.id === itemId)

const findIfExists = (itemId) => cartItems.find((item) => item.id === itemId)

const addPrice = (element) => {
	const id = Number(element.parentElement.id)

	if (!findIfExists(id)) {
		cartItems.push({ ...products[id] })
	} else {
		const index = findItemIndex(id)
		cartItems[index].price += products[id].price
	}

	updateCart()
}

const subtractPrice = (element) => {
	const id = Number(element.parentElement.id)

	if (!findIfExists(id)) {
		return
	}

	const index = findItemIndex(id)
	cartItems[index].price -= products[id].price

	if (cartItems[index].price <= 0) {
		cartItems.splice(index, 1)
	}

	updateCart()
}

const updateCart = () => {
	cart.innerHTML = ''

	cartItems.forEach((item) => {
		cart.innerHTML += `<div class="alert max-w-[20rem] mx-auto flex justify-around outline-none">
                            <span>${item.name}</span><span>$${item.price}</span>
                            </div>`
	})

	calculateTotalPrice()
}

const calculateTotalPrice = () => {
	let total = 0
	cartItems.forEach((item) => {
		total += item.price
	})

	totalPrice.innerText = total
}

const themeChanger = () => {
	if (document.documentElement.getAttribute('data-theme') === 'light') {
		document.documentElement.setAttribute('data-theme', 'dark')
	} else {
		document.documentElement.setAttribute('data-theme', 'light')
	}
}
