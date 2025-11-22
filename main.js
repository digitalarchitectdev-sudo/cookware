document.addEventListener('DOMContentLoaded', function() {
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
    const submenuItems = document.querySelectorAll('.has-submenu > a');

    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            const submenu = this.nextElementSibling;

            // First close any open submenus
            submenuItems.forEach(otherItem => {
                const otherParent = otherItem.parentElement;
                if (otherParent !== parent && otherParent.classList.contains('open')) {
                    otherParent.classList.remove('open');
                    otherItem.nextElementSibling.style.maxHeight = '0';
                }
            });

            // Now toggle the current submenu
            if (parent.classList.contains('open')) {
                parent.classList.remove('open');
                submenu.style.maxHeight = '0';
            } else {
                parent.classList.add('open');
                submenu.style.maxHeight = submenu.scrollHeight + 'px';
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