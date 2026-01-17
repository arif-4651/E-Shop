// ============================================
// Professional E-commerce Frontend JavaScript
// ============================================

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize cart badge
function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Add to cart
function addToCart(productId, productName, productPrice, productImage) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    showNotification('Product added to cart!', 'success');
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    if (typeof renderCart === 'function') {
        renderCart();
    }
    showNotification('Product removed from cart!', 'info');
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartBadge();
            if (typeof renderCart === 'function') {
                renderCart();
            }
        }
    }
}

// Get cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
        
        // Password validation
        if (input.type === 'password' && input.value) {
            if (input.value.length < 6) {
                input.classList.add('error');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Show Notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Login Form Handler
function handleLogin(event) {
    event.preventDefault();
    
    if (validateForm('loginForm')) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simulate API call
        showNotification('Login successful!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Signup Form Handler
function handleSignup(event) {
    event.preventDefault();
    
    if (validateForm('signupForm')) {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match!', 'error');
            return;
        }
        
        // Simulate API call
        showNotification('Account created successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
    
    // Attach form handlers
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Add active class to current page nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Product data (will be replaced with API calls later)
const products = [
    {
        id: 1,
        name: 'Premium Headphones',
        price: 2999,
        image: 'images/product-1.jpg',
        category: 'Electronics'
    },
    {
        id: 2,
        name: 'Smart Watch',
        price: 4999,
        image: 'images/product-2.jpg',
        category: 'Electronics'
    },
    {
        id: 3,
        name: 'Running Shoes',
        price: 2499,
        image: 'images/product-3.jpg',
        category: 'Fashion'
    },
    {
        id: 4,
        name: 'Wireless Speaker',
        price: 1999,
        image: 'images/product-4.jpg',
        category: 'Electronics'
    },
    {
        id: 5,
        name: 'Designer Bag',
        price: 3499,
        image: 'images/product-5.jpg',
        category: 'Fashion'
    },
    {
        id: 6,
        name: 'Sunglasses',
        price: 1299,
        image: 'images/product-6.jpg',
        category: 'Fashion'
    },
    {
        id: 7,
        name: 'Laptop Stand',
        price: 899,
        image: 'images/product-7.jpg',
        category: 'Electronics'
    },
    {
        id: 8,
        name: 'Phone Case',
        price: 499,
        image: 'images/product-8.jpg',
        category: 'Electronics'
    },
    {
        id: 9,
        name: 'Traditional Saree',
        price: 3999,
        image: 'images/bd-product-saree.jpg',
        category: 'Fashion'
    },
    {
        id: 10,
        name: 'Premium Tea',
        price: 299,
        image: 'images/bd-product-tea.jpg',
        category: 'Food'
    },
    {
        id: 11,
        name: 'Jute Bag',
        price: 499,
        image: 'images/bd-product-jute-bag.jpg',
        category: 'Handicraft'
    },
    {
        id: 12,
        name: 'Jamdani Saree',
        price: 5999,
        image: 'images/bd-product-jamdani.jpg',
        category: 'Fashion'
    }
];

// Export functions for use in other scripts
window.cartFunctions = {
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    cart,
    products
};
