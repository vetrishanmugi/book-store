document.addEventListener("DOMContentLoaded", function () {

    let searchForm = document.querySelector(".search-form");
    document.querySelector("#search-btn")?.addEventListener("click", () => {
        searchForm.classList.toggle("active");
    });


    const loginFormContainer = document.querySelector(".login-form-container");

    document.querySelector("#login-btn")?.addEventListener("click", () => {
        loginFormContainer.classList.add("active");
    });

    document.querySelector("#close-login-btn")?.addEventListener("click", () => {
        loginFormContainer.classList.remove("active");
    });


    document.getElementById("login-form")?.addEventListener("submit", function (e) {
        e.preventDefault();

        const emailInput = this.querySelector('input[type="email"]');
        const passwordInput = this.querySelector('input[type="password"]');

        clearError(emailInput);
        clearError(passwordInput);

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showError(emailInput, "Email is required.");
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, "Please enter a valid email.");
            isValid = false;
        }
        if (!password) {
            showError(passwordInput, "Password is required.");
            isValid = false;
        } else if (password.length < 6) {
            showError(passwordInput, "Password must be at least 6 characters.");
            isValid = false;
        }

        if (!isValid) return;


        showLoginAlert("✅ Signed in successfully!", "success");
        this.reset();
        loginFormContainer.classList.remove("active");
    });

    function showError(inputEl, message) {
        let error = document.createElement("small");
        error.className = "text-danger d-block mt-1";
        error.innerText = message;
        inputEl.classList.add("is-invalid");
        inputEl.parentNode.appendChild(error);
    }


    function clearError(inputEl) {
        inputEl.classList.remove("is-invalid");
        const existingError = inputEl.parentNode.querySelector("small.text-danger");
        if (existingError) existingError.remove();
    }


    function showLoginAlert(message, type = "success") {
        const alertContainer = document.getElementById("alert-container");
        const alertBox = document.createElement("div");

        alertBox.className = `alert alert-${type} alert-dismissible fade show`;
        alertBox.role = "alert";
        alertBox.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

        alertContainer.appendChild(alertBox);

        setTimeout(() => {
            alertBox.classList.remove("show");
            alertBox.classList.add("hide");
            setTimeout(() => alertBox.remove(), 500);
        }, 3000);
    }



    window.onscroll = () => {
        searchForm?.classList.remove("active");
        if (window.scrollY > 80) {
            document.querySelector(".header .header-2")?.classList.add("active");
        } else {
            document.querySelector(".header .header-2")?.classList.remove("active");
        }
    };


    function loader() {
        document.querySelector(".loader-container")?.classList.add("active");
    }
    function fadeOut() {
        setTimeout(loader, 4000);
    }
    fadeOut();


    function initializeSwiper(className, slidesPerView) {
        return new Swiper(className, {
            spaceBetween: 30,
            loop: true,
            centeredSlides: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                450: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: slidesPerView },
            },
        });
    }

    setTimeout(() => {
        window.featuredSwiper = initializeSwiper(".featured-slider", 4);
        window.booksSwiper = initializeSwiper(".books-slider", 3);
        window.arrivalsSwiper = initializeSwiper(".arrivals-slider", 4);
        window.reviewsSwiper = initializeSwiper(".reviews-slider", 3);
    }, 500);


    const cartPanel = document.getElementById("cart-panel");
    const cartItemsContainer = document.getElementById("cart-items");
    let cartItems = [];

    document.querySelector(".fa-shopping-cart")?.addEventListener("click", () => {
        cartPanel.classList.add("show");
    });

    document.getElementById("close-cart-btn")?.addEventListener("click", () => {
        cartPanel.classList.remove("show");
    });

    function addToCartUI({ name, price, image }) {
        const existing = Array.from(cartItemsContainer.children).some(
            (item) => item.querySelector("h4")?.innerText === name
        );

        if (existing) {
            alert("Item already in cart!");
            return;
        }

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
        <img src="${image}" alt="${name}" />
        <div class="cart-info">
            <h4>${name}</h4>
            <p>${price}</p>
            <div class="cart-buttons">
                <button class="remove-cart btn btn-sm btn-outline-danger me-2">Remove</button>
                <button class="buy-now-btn btn btn-sm btn-success">Buy Now</button>
            </div>
        </div>
    `;


        cartItemsContainer.appendChild(cartItem);

        cartItem.querySelector(".remove-cart").addEventListener("click", () => {
            cartItem.remove();
            cartItems = cartItems.filter((item) => item.name !== name);
            updateCartSummary();
        });

        cartItems.push({ name, price, image });
        updateCartSummary();
    }

    function updateCartSummary() {
        const totalItems = cartItems.length;
        const totalPrice = cartItems.reduce((sum, item) => {
            const priceNum = parseFloat(item.price.replace(/[^\d.]/g, ""));
            return sum + priceNum;
        }, 0);

        document.getElementById("total-items").innerText = totalItems;
        document.getElementById("total-price").innerText = totalPrice.toFixed(2);
    }

    document.querySelectorAll(".featured .add-to-cart").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            let productBox = this.closest(".box");
            let productName = productBox.querySelector("h3").innerText;
            let productPrice = productBox.querySelector(".price").innerText;
            let productImage = productBox.querySelector("img").src;

            let product = { name: productName, price: productPrice, image: productImage };

            addToCartUI(product);
            alert(productName + " added to cart!");
        });
    });

    document.querySelectorAll(".arrivals-slider .add-to-cart").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            let productBox = this.closest(".box");
            let productName = productBox.querySelector("h3").innerText;
            let productPrice = productBox.querySelector(".price").innerText;
            let productImage = productBox.querySelector("img").src;

            let product = { name: productName, price: productPrice, image: productImage };

            addToCartUI(product);
            alert(productName + " added to cart!");
        });
    });

    const wishlistPanel = document.getElementById("wishlist-panel");
    const wishlistItemsContainer = document.getElementById("wishlist-items");

    document.querySelector(".icons .fa-heart")?.addEventListener("click", () => {
        wishlistPanel.classList.add("show");
    });

    document.getElementById("close-wishlist-btn")?.addEventListener("click", () => {
        wishlistPanel.classList.remove("show");
    });

    document.querySelectorAll(".featured .box .fa-heart, .arrivals-slider .box .fa-heart").forEach((heartIcon) => {
        heartIcon.addEventListener("click", function (e) {
            e.preventDefault();
            const box = this.closest(".box");
            const name = box.querySelector("h3")?.innerText.trim();
            const price = box.querySelector(".price")?.innerText.trim();
            const image = box.querySelector("img")?.src;
            const id = box.dataset.id || `${name.toLowerCase()}-${price}`;

            if (!name || !price || !image) {
                console.warn("Missing product info – check HTML structure");
                return;
            }

            const alreadyInWishlist = Array.from(wishlistItemsContainer.children).some(item => item.dataset.id === id);
            if (alreadyInWishlist) {
                alert("Already in wishlist!");
                return;
            }

            const item = document.createElement("div");
            item.classList.add("wishlist-item");
            item.dataset.id = id;
            item.innerHTML = `
                <img src="${image}" alt="${name}" />
                <div class="wishlist-info">
                    <h4>${name}</h4>
                    <p>${price}</p>
                    

                    <button class="remove-wishlist">Remove</button>
                    <button class="move-to-cart">Move to Cart</button>
                </div>
            `;

            wishlistItemsContainer.appendChild(item);

            item.querySelector(".remove-wishlist").addEventListener("click", () => {
                item.remove();
            });

            alert(`${name} added to wishlist!`);
        });
    });



    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("move-to-cart")) {
            const itemBox = e.target.closest(".wishlist-item");
            const name = itemBox.querySelector("h4").innerText;
            const price = itemBox.querySelector("p").innerText;
            const image = itemBox.querySelector("img").src;

            addToCartUI({ name, price, image });
            itemBox.remove();
        }
    });

    let footerHeadings = document.querySelectorAll(".footer .box h3");
    footerHeadings.forEach((heading, index) => {
        heading.style.opacity = "0";
        heading.style.transform = "translateY(20px)";
        setTimeout(() => {
            heading.style.transition = "all 0.5s ease-in-out";
            heading.style.opacity = "1";
            heading.style.transform = "translateY(0)";
        }, index * 200);
    });

    function setupBlogSection() {
        let blogGrid = document.querySelector(".blogs .blog-grid");
        if (blogGrid) {
            blogGrid.style.opacity = "1";
        }
    }
    window.onload = setupBlogSection;
});
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("buy-now-btn")) {
        const totalItems = parseInt(document.getElementById("total-items")?.innerText || "0", 10);


        if (e.target.id !== "cart-buy-now-btn" || totalItems > 0) {
            const alertContainer = document.getElementById("alert-container");

            const alertBox = document.createElement("div");
            alertBox.className = "alert alert-success alert-dismissible fade show";
            alertBox.role = "alert";
            alertBox.innerHTML = `
                ✅ Order placed successfully!
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;

            alertContainer.appendChild(alertBox);

            setTimeout(() => {
                alertBox.classList.remove("show");
                alertBox.classList.add("hide");
                setTimeout(() => alertBox.remove(), 500);
            }, 3000);
        } else {

            alert("Your cart is empty!");
        }
    }
});








