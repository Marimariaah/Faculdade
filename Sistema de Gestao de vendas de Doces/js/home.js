/* ========================================
   HOME PAGE - JAVASCRIPT
   ======================================== */

// ========== DADOS DOS PRODUTOS ==========
const products = [
    {
        id: 1,
        name: 'Brigadeiro Premium',
        category: 'docinhos',
        description: 'Brigadeiro artesanal com chocolate belga',
        price: 5.90,
        image: '../assets/images/brigadeiro.jpg'
    },
    {
        id: 2,
        name: 'Cupcake de Chocolate',
        category: 'cupcakes',
        description: 'Cupcake fofinho com calda de chocolate fresco',
        price: 12.50,
        image: '../assets/images/cupcake-recheado.jpg'
    },
    {
        id: 3,
        name: 'Donut Chocolate',
        category: 'docinhos',
        description: 'Donut crocante com cobertura de chocolate',
        price: 9.90,
        image: '../assets/images/donut-chocolate.jpg'
    },
    {
        id: 4,
        name: 'Bolo de Chocolate',
        category: 'bolos',
        description: 'Bolo úmido com camadas de chocolate derretido',
        price: 58.50,
        image: '../assets/images/bolo-chocolate.jpg'
    },
    {
        id: 5,
        name: 'beijinho Gourmet',
        category: 'beijinhos',
        description: 'beijinho artesanal com recheio de leite condensado e coco ralado',
        price: 5.00,
        image: '../assets/images/beijinho.png'
    },
    {
        id: 6,
        name: 'Trufa Gourmet',
        category: 'trufas',
        description: 'Trufa envolvida em chocolate 70% cacau',
        price: 6.50,
        image: '../assets/images/trufa.png'
    },
     {
        id: 7,
        name: 'Bolo de rolo de goiabada',
        category: 'bolos',
        description: 'Bolo de rolo recheado com goiabada',
        price: 25.00,
        image: '../assets/images/bolo-de-rolo.png'
    }
];

// ========== ESTADO DA APLICAÇÃO ==========
let cart = [];
let favorites = [];
let currentFilter = 'todos';
let currentSort = 'popular';
let currentUser = null;

// ========== ELEMENTOS DO DOM ==========
const productsGrid = document.getElementById('productsGrid');
const filterPills = document.querySelectorAll('.filter-pill');
const sortSelect = document.getElementById('sortSelect');
const searchInput = document.getElementById('searchInput');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const subtotalEl = document.getElementById('subtotal');
const deliveryEl = document.getElementById('delivery');
const totalEl = document.getElementById('total');
const cartBadge = document.getElementById('cartBadge');
const cartBadgeMobile = document.getElementById('cartBadgeMobile');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartMobileBtn = document.getElementById('cartMobileBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userAvatar = document.getElementById('userAvatar');
const userInitial = document.getElementById('userInitial');
const checkoutBtn = document.getElementById('checkoutBtn');
const viewCartBtn = document.getElementById('viewCartBtn');
const navLinks = document.querySelectorAll('.nav-link');

// ========== CARREGAMENTO INICIAL ==========
window.addEventListener('load', () => {
    // Verificar autenticação
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = './login.html';
        return;
    }

    // Carregar dados do usuário
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        userInitial.textContent = currentUser.name.charAt(0).toUpperCase();
    }

    // Carregar carrinho e favoritos do localStorage
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');
    
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    
    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
    }

    // Renderizar produtos iniciais
    renderProducts(products);
    updateCartUI();
});

// ========== RENDERIZAÇÃO DE PRODUTOS ==========
/**
 * Renderiza os produtos na grid
 * @param {Array} productsToRender - Array de produtos a renderizar
 */
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';

    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #597081;">Nenhum produto encontrado</p>';
        return;
    }

    productsToRender.forEach(product => {
        const isFavorited = favorites.some(fav => fav.id === product.id);
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <button class="btn-favorite ${isFavorited ? 'favorited' : ''}" data-product-id="${product.id}">
                    ${isFavorited ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <button class="btn-add-cart" data-product-id="${product.id}">
                    Adicionar
                </button>
            </div>
        `;

        productsGrid.appendChild(card);
    });

    // Adicionar event listeners aos botões
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => addToCart(e, products));
    });

    document.querySelectorAll('.btn-favorite').forEach(btn => {
        btn.addEventListener('click', (e) => toggleFavorite(e, products));
    });
}

// ========== FILTROS ==========
filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
        // Atualizar classe ativa
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        // Atualizar filtro
        currentFilter = pill.dataset.filter;

        // Aplicar filtro
        applyFiltersAndSort();
    });
});

// ========== BUSCA ==========
searchInput.addEventListener('input', (e) => {
    applyFiltersAndSort();
});

// ========== ORDENAÇÃO ==========
sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    applyFiltersAndSort();
});

// ========== FUNÇÃO PARA APLICAR FILTROS E ORDENAÇÃO ==========
/**
 * Filtra, busca e ordena produtos
 */
function applyFiltersAndSort() {
    let filtered = [...products];

    // Filtro de categoria
    if (currentFilter !== 'todos') {
        filtered = filtered.filter(p => p.category === currentFilter);
    }

    // Busca por nome e descrição
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
    }

    // Ordenação
    switch (currentSort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filtered.sort((a, b) => b.id - a.id);
            break;
        case 'popular':
        default:
            filtered.sort((a, b) => a.id - b.id);
    }

    renderProducts(filtered);
}

// ========== ADICIONAR AO CARRINHO ==========
/**
 * Adiciona um produto ao carrinho
 */
function addToCart(e, allProducts) {
    const productId = parseInt(e.target.dataset.productId);
    const product = allProducts.find(p => p.id === productId);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    // Animar botão
    e.target.textContent = '✓ Adicionado';
    e.target.style.opacity = '0.7';
    setTimeout(() => {
        e.target.textContent = 'Adicionar';
        e.target.style.opacity = '1';
    }, 1500);

    updateCartUI();
    saveCart();
}

// ========== REMOVER DO CARRINHO ==========
/**
 * Remove um item do carrinho
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCart();
}

// ========== ATUALIZAR QUANTIDADE ==========
/**
 * Atualiza a quantidade de um item no carrinho
 */
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartUI();
        saveCart();
    }
}

// ========== ATUALIZAR UI DO CARRINHO ==========
/**
 * Atualiza a interface do carrinho
 */
function updateCartUI() {
    // Limpar carrinho
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartEmpty.classList.add('show');
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = '0.5';
    } else {
        cartEmpty.classList.remove('show');
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = '1';

        // Renderizar items
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" data-product-id="${item.id}" data-action="decrease">−</button>
                        <input type="number" class="qty-input" value="${item.quantity}" data-product-id="${item.id}" readonly>
                        <button class="qty-btn" data-product-id="${item.id}" data-action="increase">+</button>
                        <button class="btn-remove" data-product-id="${item.id}">🗑️</button>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });

        // Event listeners para quantidade
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                const action = e.target.dataset.action;
                const item = cart.find(i => i.id === productId);

                if (action === 'increase') {
                    updateQuantity(productId, item.quantity + 1);
                } else if (action === 'decrease') {
                    updateQuantity(productId, item.quantity - 1);
                }
            });
        });

        // Event listeners para remover
        document.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                removeFromCart(productId);
            });
        });
    }

    // Atualizar totais
    updateCartTotals();

    // Atualizar badges
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    cartBadgeMobile.textContent = totalItems;
}

// ========== ATUALIZAR TOTAIS ==========
/**
 * Calcula e atualiza os totais do carrinho
 */
function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = subtotal >= 80 ? 0 : 10;
    const total = subtotal + delivery;

    subtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
    deliveryEl.textContent = `R$ ${delivery.toFixed(2)}`;
    totalEl.textContent = `R$ ${total.toFixed(2)}`;
}

// ========== FAVORITOS ==========
/**
 * Alterna o status de favorito de um produto
 */
function toggleFavorite(e, allProducts) {
    e.preventDefault();
    const productId = parseInt(e.target.dataset.productId);
    const product = allProducts.find(p => p.id === productId);

    const isFavorited = favorites.some(fav => fav.id === productId);

    if (isFavorited) {
        favorites = favorites.filter(fav => fav.id !== productId);
        e.target.textContent = '🤍';
        e.target.classList.remove('favorited');
    } else {
        favorites.push(product);
        e.target.textContent = '❤️';
        e.target.classList.add('favorited');
    }

    saveFavorites();
}

// ========== GERENCIAMENTO DE CARRINHO MOBILE ==========
cartMobileBtn.addEventListener('click', () => {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('show');
});

closeCartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('show');
});

cartOverlay.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('show');
});

// ========== CHECKOUT ==========
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = total >= 80 ? 0 : 10;

    alert(`Pedido finalizado!\n\nSubtotal: R$ ${total.toFixed(2)}\nEntrega: R$ ${delivery.toFixed(2)}\nTotal: R$ ${(total + delivery).toFixed(2)}\n\nObrigado pela compra! 🎉`);

    // Limpar carrinho
    cart = [];
    updateCartUI();
    saveCart();
});

viewCartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('show');
});

// ========== LOGOUT ==========
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = './login.html';
});

// ========== NAVEGAÇÃO (Menu itens) ==========
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remover classe active de todos
        navLinks.forEach(l => l.classList.remove('active'));

        // Adicionar classe active ao clicado
        link.classList.add('active');

        // Fechar sidebar mobile se aberto
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && window.innerWidth < 64 * 16) {
            sidebar.classList.remove('open');
        }

        const section = link.dataset.section;
        // Aqui você poderia implementar a navegação entre seções
        console.log('Navegando para:', section);
    });
});

// Marcar "Home" como ativo inicialmente
navLinks[0]?.classList.add('active');

// ========== PERSISTÊNCIA NO LOCALSTORAGE ==========
/**
 * Salva o carrinho no localStorage
 */
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Salva os favoritos no localStorage
 */
function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// ========== NOTIFICAÇÕES ==========
const notificationBtn = document.getElementById('notificationBtn');
notificationBtn.addEventListener('click', () => {
    alert('Você tem 3 notificações!\n\n✓ Pedido confirmado\n✓ Promoção nova disponível\n✓ Cupom de desconto gerado');
});

// ========== AVATAR DO USUÁRIO ==========
userAvatar.addEventListener('click', () => {
    alert(`Olá, ${currentUser?.name || 'Usuário'}!\n\nEmail: ${currentUser?.email || 'N/A'}\n\nFuncionalidades de perfil em breve!`);
});

// ========== RESPONSIVIDADE SIDEBAR MOBILE ==========
const sidebar = document.querySelector('.sidebar');
const menuToggle = document.createElement('button');
menuToggle.className = 'btn-menu-mobile';
menuToggle.innerHTML = '☰';
menuToggle.style.cssText = `
    display: none;
    position: fixed;
    top: 0.75rem;
    left: 0.75rem;
    background: linear-gradient(135deg, #A9CEF4, #7EA0B7);
    color: #000000;
    border: none;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 103;
`;

if (window.innerWidth < 64 * 16) {
    document.body.appendChild(menuToggle);
    menuToggle.style.display = 'flex';
    menuToggle.style.alignItems = 'center';
    menuToggle.style.justifyContent = 'center';
}

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// Fechar sidebar ao clicar fora
document.addEventListener('click', (e) => {
    if (window.innerWidth < 64 * 16 && sidebar.classList.contains('open')) {
        if (!sidebar.contains(e.target) && e.target !== menuToggle) {
            sidebar.classList.remove('open');
        }
    }
});

// ========== RESPONSIVIDADE AO REDIMENSIONAR ==========
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reajustar layout conforme necessário
        if (window.innerWidth >= 64 * 16) {
            sidebar.classList.remove('open');
            cartSidebar.classList.remove('open');
            cartOverlay.classList.remove('show');
        }
    }, 250);
});
