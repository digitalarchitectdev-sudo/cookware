document.addEventListener('DOMContentLoaded', function() {
    // Search Bar
    const searchIcon = document.getElementById('search-icon');
    const searchBar = document.getElementById('search-bar');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');

    if (searchIcon) {
        searchIcon.addEventListener('click', (e) => {
            e.preventDefault();
            searchBar.classList.toggle('open');
            if (searchBar.classList.contains('open')) {
                searchInput.focus();
            }
        });

        closeSearch.addEventListener('click', () => {
            searchBar.classList.remove('open');
        });
    }


    // Cart functionality
    const cartCount = document.querySelector('.cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    const addToCartButtons = document.querySelectorAll('.btn-secondary');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const product = {
                id: card.dataset.id,
                name: card.dataset.name,
                price: parseFloat(card.dataset.price),
                image: card.dataset.image
            };
            addToCart(product);
        });
    });

    updateCartCount();


    // Cart Page Specific Logic
    if (window.location.pathname.endsWith('cart.html')) {
        const cartItemsContainer = document.querySelector('.cart-items');
        const subtotalEl = document.getElementById('cart-subtotal');
        const totalEl = document.getElementById('cart-total');

        function renderCart() {
            cartItemsContainer.innerHTML = '';
            let subtotal = 0;
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            } else {
                 cart.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-item');
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                            <p>₹${item.price.toFixed(2)}</p>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                                <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                                <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                            </div>
                        </div>
                        <button class="remove-item-btn" data-id="${item.id}">&times;</button>
                    `;
                    cartItemsContainer.appendChild(cartItem);
                    subtotal += item.price * item.quantity;
                });
            }

            subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
            totalEl.textContent = `₹${subtotal.toFixed(2)}`; // Assuming no shipping for now
        }
        
        cartItemsContainer.addEventListener('click', (e) => {
            if(e.target.classList.contains('quantity-btn')) {
                const id = e.target.dataset.id;
                const action = e.target.dataset.action;
                const item = cart.find(i => i.id === id);
                if (action === 'increase') {
                    item.quantity++;
                } else if (action === 'decrease' && item.quantity > 1) {
                    item.quantity--;
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
                updateCartCount();
            } else if (e.target.classList.contains('remove-item-btn')) {
                const id = e.target.dataset.id;
                cart = cart.filter(i => i.id !== id);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
                updateCartCount();
            }
        });
        
        cartItemsContainer.addEventListener('change', (e) => {
             if(e.target.matches('input[type="number"]')) {
                 const id = e.target.dataset.id;
                 const newQuantity = parseInt(e.target.value);
                 const item = cart.find(i => i.id === id);
                 if(newQuantity > 0) {
                    item.quantity = newQuantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                    updateCartCount();
                 }
             }
        });

        renderCart();
    }


    // Mobile Navigation
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.close-btn');
    const submenuLinks = document.querySelectorAll('.mobile-nav .has-submenu > a');
    const backButtons = document.querySelectorAll('.mobile-nav .submenu-back a');

    const openNav = () => {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeNav = () => {
        mobileNav.classList.remove('open');
        document.querySelectorAll('.mobile-nav .submenu.open').forEach(submenu => {
            submenu.classList.remove('open');
        });
        document.body.style.overflow = '';
    };

    hamburgerMenu.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);

    submenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            submenu.classList.add('open');
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const parentSubmenu = this.closest('.submenu');
            parentSubmenu.classList.remove('open');
        });
    });

    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !hamburgerMenu.contains(e.target)) {
            closeNav();
        }
    });

    // Scroll to Top
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
