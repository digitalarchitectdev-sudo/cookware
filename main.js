document.addEventListener('DOMContentLoaded', function() {
    // Search Bar
    const searchIcon = document.getElementById('search-icon');
    const searchBar = document.getElementById('search-bar');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');

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

    // Add to Cart
    const addToCartButtons = document.querySelectorAll('.btn-secondary');
    const cartCount = document.querySelector('.cart-count');
    let itemCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            itemCount++;
            cartCount.textContent = itemCount;
        });
    });


    // Mobile Navigation
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.close-btn');

    // Function to open the menu
    const openNav = () => {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    // Function to close the menu
    const closeNav = () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
    };

    hamburgerMenu.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);

    // Submenu Accordion
    const submenuLinks = document.querySelectorAll('.mobile-nav .has-submenu > a');

    submenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const parentLi = this.parentElement;
            const submenu = this.nextElementSibling;
            const wasOpen = parentLi.classList.contains('open');

            // Close all sibling submenus at the current level
            const parentUl = parentLi.parentElement;
            Array.from(parentUl.children).forEach(sibling => {
                if (sibling.classList.contains('has-submenu') && sibling.classList.contains('open')) {
                    sibling.classList.remove('open');
                    sibling.querySelector('.submenu').style.maxHeight = null;
                }
            });

            // If the clicked menu item was not already open, open it.
            if (!wasOpen) {
                parentLi.classList.add('open');
                submenu.style.maxHeight = submenu.scrollHeight + 'px';
            }
            
            // Adjust parent submenu height
            let ancestor = parentLi.closest('.submenu');
            while(ancestor) {
                ancestor.style.maxHeight = ancestor.scrollHeight + 'px';
                ancestor = ancestor.parentElement.closest('.submenu');
            }
        });
    });


    // Close menu when clicking outside of it
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
