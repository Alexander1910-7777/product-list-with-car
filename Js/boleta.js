document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart, .add-to-cart1, .add-to-cart2, .add-to-cart3');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountElement = document.querySelector('#cart h2');
    const orderTotalElement = document.getElementById('order-total');
    let cart = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card, .product-card1, .product-card2, .product-card3');
            const name = productCard.querySelector('.product-title, .product-title1, .product-title2, .product-title3').textContent;
            const price = parseFloat(productCard.querySelector('.product-price, .product-price1, .product-price2, .product-price3').textContent.replace('$', ''));
            
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            
            updateCart();
        });
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} x${item.quantity}</p>
                <p class="price">$${(item.price * item.quantity).toFixed(2)}</p>
                <span class="remove-item">&times;</span>
            `;
            
            cartItem.querySelector('.remove-item').addEventListener('click', () => {
                removeItem(item.name);
            });
            cartItemsContainer.appendChild(cartItem);
        });
        orderTotalElement.textContent = `$${total.toFixed(2)}`;
        cartCountElement.textContent = `Your Cart (${cart.length})`;
    }

    function removeItem(name) {
        cart = cart.filter(item => item.name !== name);
        updateCart();
    }
});
