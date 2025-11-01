document.addEventListener('DOMContentLoaded', function() {
    // Cargar el navbar
    fetch('./components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            initializeNavbar();
            initializeMobileMenu();
            initializeSearchModal();
            addDynamicStyles();
        })
        .catch(error => console.error('Error loading navbar:', error));
});

function initializeNavbar() {
    // Menú hamburguesa (versión simplificada que será reemplazada por initializeMobileMenu)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        const icon = mobileMenuButton.querySelector('i');
        mobileMenuButton.addEventListener('click', function() {
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
}

function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    if (!mobileMenuButton || !mobileMenu) return;

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('-translate-x-full');
        mobileMenu.classList.remove('hidden');
        if (menuOverlay) menuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Cambiar ícono
        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', closeMobileMenu);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMobileMenu);
    }

    function closeMobileMenu() {
        mobileMenu.classList.add('-translate-x-full');
        if (menuOverlay) menuOverlay.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Cambiar ícono
        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}

function initializeSearchModal() {
    const searchModal = document.getElementById('search-modal');
    const searchButton = document.getElementById('search-button');
    const mobileSearchButton = document.getElementById('mobile-search-button');
    const closeSearch = document.getElementById('close-search');

    function openSearchModal() {
        if (searchModal) {
            searchModal.classList.remove('none');
            searchModal.classList.add('anim');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSearchModal() {
        if (searchModal) {
            searchModal.classList.add('none');
            document.body.style.overflow = '';
        }
    }

    if (searchButton) searchButton.addEventListener('click', openSearchModal);
    if (mobileSearchButton) mobileSearchButton.addEventListener('click', openSearchModal);
    if (closeSearch) closeSearch.addEventListener('click', closeSearchModal);

    if (searchModal) {
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                closeSearchModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModal && !searchModal.classList.contains('none')) {
            closeSearchModal();
        }
    });
}

function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
        
        .anim {
            animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .none {
            display: none;
        }
        
        /* Estilos para el menú móvil */
        .-translate-x-full {
            transform: translateX(-100%);
        }
        
        #mobile-menu {
            transition: transform 0.3s ease-in-out;
        }
        
        #menu-overlay {
            background-color: rgba(0, 0, 0, 0.5);
        }
    `;
    document.head.appendChild(style);
}
 // Funciones para la página del producto
function toExchangeImage(img) {
    document.getElementById("img_main").src = img.src;
  }

  function viewImage(src) {
    // Abre la imagen en pantalla completa o modal
    const win = window.open("", "_blank");
    win.document.write(`<img src="${src}" style="width:100%;height:auto;">`);
  }
  
  function toggleDescription() {
    const desc = document.getElementById('descContent');
    const arrow = document.getElementById('arrowIcon');
    desc.classList.toggle('max-h-0');
    desc.classList.toggle('max-h-[2000px]');
    arrow.classList.toggle('rotate-180');
  }
  
  // Manejo de pestañas Producto e Imágenes
  const productTab = document.getElementById('product-tab');
  const imagesTab = document.getElementById('images-tab');
  const imagesSection = document.getElementById('images-section');
  const infoSection = document.getElementById('info-section');

  // Por defecto: mostrar información, ocultar imágenes
  imagesSection.classList.add('hidden');
  infoSection.classList.remove('hidden');

  // Mostrar imágenes y ocultar información
  imagesTab.addEventListener('click', () => {
    imagesSection.classList.remove('hidden');
    infoSection.classList.add('hidden');
    imagesTab.classList.add('bg-blue-600', 'text-white');
    imagesTab.classList.remove('bg-gray-100', 'text-gray-700');
    productTab.classList.remove('bg-blue-600', 'text-white');
    productTab.classList.add('bg-gray-100', 'text-gray-700');
  });

  // Mostrar información y ocultar imágenes
  productTab.addEventListener('click', () => {
    infoSection.classList.remove('hidden');
    imagesSection.classList.add('hidden');
    productTab.classList.add('bg-blue-600', 'text-white');
    productTab.classList.remove('bg-gray-100', 'text-gray-700');
    imagesTab.classList.remove('bg-blue-600', 'text-white');
    imagesTab.classList.add('bg-gray-100', 'text-gray-700');
  });