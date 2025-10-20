// ===== Product Data =====
const products = [
    {
        id: 1,
        name: "Ordinateur Portable Pro",
        category: "electronique",
        price: 899.99,
        description: "Ordinateur portable haute performance avec processeur i7",
        rating: 4.5,
        reviews: 124,
        badge: "Nouveau",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        name: "Casque Audio Sans Fil",
        category: "electronique",
        price: 149.99,
        description: "Casque Bluetooth avec réduction de bruit active",
        rating: 4.8,
        reviews: 256,
        badge: "Populaire",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        name: "Smartwatch Elite",
        category: "electronique",
        price: 299.99,
        description: "Montre connectée avec suivi santé et GPS",
        rating: 4.6,
        reviews: 189,
        badge: null,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        name: "T-Shirt Premium",
        category: "mode",
        price: 29.99,
        description: "T-shirt 100% coton biologique, coupe moderne",
        rating: 4.3,
        reviews: 87,
        badge: null,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Jean Slim Fit",
        category: "mode",
        price: 79.99,
        description: "Jean stretch confortable, coupe ajustée",
        rating: 4.4,
        reviews: 143,
        badge: null,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        name: "Sneakers Running",
        category: "sport",
        price: 119.99,
        description: "Chaussures de course légères et respirantes",
        rating: 4.7,
        reviews: 312,
        badge: "Top vente",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"
    },
    {
        id: 7,
        name: "Tapis de Yoga",
        category: "sport",
        price: 39.99,
        description: "Tapis antidérapant écologique 6mm",
        rating: 4.5,
        reviews: 98,
        badge: null,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop"
    },
    {
        id: 8,
        name: "Lampe de Bureau LED",
        category: "maison",
        price: 49.99,
        description: "Lampe design avec variateur d'intensité",
        rating: 4.4,
        reviews: 67,
        badge: null,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop"
    },
    {
        id: 9,
        name: "Coussin Déco",
        category: "maison",
        price: 24.99,
        description: "Coussin en velours doux, plusieurs couleurs",
        rating: 4.2,
        reviews: 54,
        badge: null,
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=300&fit=crop"
    },
    {
        id: 10,
        name: "Cafetière Italienne",
        category: "maison",
        price: 34.99,
        description: "Cafetière expresso traditionnelle en inox",
        rating: 4.6,
        reviews: 178,
        badge: null,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop"
    },
    {
        id: 11,
        name: "Haltères Réglables",
        category: "sport",
        price: 89.99,
        description: "Set d'haltères 2-20kg avec support",
        rating: 4.8,
        reviews: 234,
        badge: "Nouveau",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop"
    },
    {
        id: 12,
        name: "Veste Cuir",
        category: "mode",
        price: 189.99,
        description: "Veste en cuir véritable, style vintage",
        rating: 4.9,
        reviews: 156,
        badge: "Populaire",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop"
    },
    {
        id: 13,
        name: "Tablette Tactile",
        category: "electronique",
        price: 349.99,
        description: "Tablette 10 pouces, 128Go, WiFi",
        rating: 4.5,
        reviews: 201,
        badge: null,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop"
    },
    {
        id: 14,
        name: "Sac à Dos Urbain",
        category: "mode",
        price: 59.99,
        description: "Sac à dos avec compartiment laptop 15 pouces",
        rating: 4.4,
        reviews: 112,
        badge: null,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"
    },
    {
        id: 15,
        name: "Bougie Parfumée",
        category: "maison",
        price: 19.99,
        description: "Bougie artisanale, senteur vanille",
        rating: 4.7,
        reviews: 89,
        badge: null,
        image: "https://images.unsplash.com/photo-1602874801006-2a201d6c5c9e?w=400&h=300&fit=crop"
    }
];

// ===== Cart Management =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    showNotification(`${product.name} ajouté au panier!`);
    renderCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        renderCart();
    }
}

function calculateTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Votre panier est vide</p>
                <a href="products.html" class="btn btn-primary" style="margin-top: 20px;">Voir les produits</a>
            </div>
        `;
        if (cartTotal) cartTotal.textContent = '0.00€';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80'">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price.toFixed(2)}€</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </div>
        </div>
    `).join('');

    if (cartTotal) {
        cartTotal.textContent = calculateTotal().toFixed(2) + '€';
    }
}

// ===== Product Display =====
function createProductCard(product) {
    const badgeHTML = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
    const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));

    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/280x250'">
                ${badgeHTML}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-footer">
                    <div class="product-price">${product.price.toFixed(2)}€</div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Ajouter
                    </button>
                </div>
            </div>
        </div>
    `;
}

function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('products-grid') || document.getElementById('featured-products');

    if (!productsGrid) return;

    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-search" style="font-size: 64px; color: #d1d5db; margin-bottom: 20px;"></i>
                <p style="font-size: 18px; color: #6b7280;">Aucun produit trouvé</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = productsToDisplay.map(product => createProductCard(product)).join('');

    // Update product count
    const countText = document.getElementById('count-text');
    if (countText) {
        countText.textContent = `${productsToDisplay.length} produit(s) trouvé(s)`;
    }
}

// ===== Filters & Search =====
let currentFilters = {
    search: '',
    category: 'all',
    priceRange: 'all',
    sort: 'featured'
};

function applyFilters() {
    let filtered = [...products];

    // Search filter
    if (currentFilters.search) {
        const searchLower = currentFilters.search.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower) ||
            p.category.toLowerCase().includes(searchLower)
        );
    }

    // Category filter
    if (currentFilters.category !== 'all') {
        filtered = filtered.filter(p => p.category === currentFilters.category);
    }

    // Price filter
    if (currentFilters.priceRange !== 'all') {
        const [min, max] = currentFilters.priceRange.split('-').map(Number);
        if (max) {
            filtered = filtered.filter(p => p.price >= min && p.price <= max);
        } else {
            filtered = filtered.filter(p => p.price >= min);
        }
    }

    // Sorting
    switch (currentFilters.sort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Featured - keep original order
            break;
    }

    displayProducts(filtered);
}

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart
    updateCartCount();
    renderCart();

    // Display products on products page
    if (document.getElementById('products-grid')) {
        displayProducts(products);

        // Check URL parameters for category
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        if (category) {
            const categoryFilter = document.getElementById('category-filter');
            if (categoryFilter) {
                categoryFilter.value = category;
                currentFilters.category = category;
                applyFilters();
            }
        }
    }

    // Display featured products on home page (first 6)
    if (document.getElementById('featured-products') && !document.getElementById('products-grid')) {
        displayProducts(products.slice(0, 6));
    }

    // Cart toggle
    const cartToggle = document.getElementById('cart-toggle');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCart = document.getElementById('close-cart');

    if (cartToggle && cartSidebar) {
        cartToggle.addEventListener('click', (e) => {
            e.preventDefault();
            cartSidebar.classList.add('active');
        });
    }

    if (closeCart && cartSidebar) {
        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
        });
    }

    // Close cart when clicking outside
    if (cartSidebar) {
        document.addEventListener('click', (e) => {
            if (cartSidebar.classList.contains('active') &&
                !cartSidebar.contains(e.target) &&
                !e.target.closest('.cart-icon')) {
                cartSidebar.classList.remove('active');
            }
        });
    }

    // Search filter
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentFilters.search = e.target.value;
            applyFilters();
        });
    }

    // Category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            currentFilters.category = e.target.value;
            applyFilters();
        });
    }

    // Price filter
    const priceFilter = document.getElementById('price-filter');
    if (priceFilter) {
        priceFilter.addEventListener('change', (e) => {
            currentFilters.priceRange = e.target.value;
            applyFilters();
        });
    }

    // Sort
    const sortSelect = document.getElementById('sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentFilters.sort = e.target.value;
            applyFilters();
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Merci pour votre inscription!');
            newsletterForm.reset();
        });
    }

    // Checkout page
    if (document.getElementById('checkout-form')) {
        loadCheckoutSummary();
        setupCheckoutForm();
    }
});

// ===== Checkout Functions =====
function loadCheckoutSummary() {
    const orderItems = document.getElementById('order-items');
    const subtotal = document.getElementById('subtotal');
    const tax = document.getElementById('tax');
    const total = document.getElementById('total');
    const cartCount = document.getElementById('cart-count');

    if (!orderItems) return;

    // Update cart count
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    if (cart.length === 0) {
        orderItems.innerHTML = `
            <p style="text-align: center; color: #6b7280; padding: 20px;">
                Votre panier est vide
            </p>
        `;
        return;
    }

    orderItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <div style="display: flex; gap: 10px; align-items: center; flex: 1;">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" onerror="this.src='https://via.placeholder.com/60'">
                <div>
                    <div style="font-weight: 600; margin-bottom: 5px;">${item.name}</div>
                    <div style="color: #6b7280; font-size: 14px;">Qté: ${item.quantity}</div>
                </div>
            </div>
            <div style="font-weight: 600;">${(item.price * item.quantity).toFixed(2)}€</div>
        </div>
    `).join('');

    const subtotalAmount = calculateTotal();
    const taxAmount = subtotalAmount * 0.20;
    const totalAmount = subtotalAmount + taxAmount;

    if (subtotal) subtotal.textContent = subtotalAmount.toFixed(2) + '€';
    if (tax) tax.textContent = taxAmount.toFixed(2) + '€';
    if (total) total.textContent = totalAmount.toFixed(2) + '€';
}

function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    if (!checkoutForm) return;

    // Format card number
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    // Format expiry date
    const expiry = document.getElementById('expiry');
    if (expiry) {
        expiry.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    // Form submission
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            showNotification('Votre panier est vide!', 'error');
            return;
        }

        // Simulate order processing
        showNotification('Traitement de votre commande...', 'info');

        setTimeout(() => {
            // Clear cart
            cart = [];
            saveCart();

            // Show success message
            showNotification('Commande confirmée! Merci pour votre achat.', 'success');

            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }, 1500);
    });
}

// ===== Notifications =====
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Set background color based on type
    if (type === 'error') {
        notification.style.backgroundColor = '#ef4444';
    } else if (type === 'info') {
        notification.style.backgroundColor = '#6366f1';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ===== Mobile Menu Toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}
