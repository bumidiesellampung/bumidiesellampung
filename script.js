// ==========================================
// DATA DUMMY
// ==========================================

const categories = [
    { id: 'excavator', name: 'Sparepart Excavator', icon: 'fa-truck-ramp-box', desc: 'Suku cadang lengkap untuk berbagai tipe excavator.' },
    { id: 'bulldozer', name: 'Sparepart Bulldozer', icon: 'fa-tractor', desc: 'Komponen undercarriage dan engine bulldozer.' },
    { id: 'forklift', name: 'Sparepart Forklift', icon: 'fa-dolly', desc: 'Suku cadang forklift elektrik dan diesel.' },
    { id: 'wheel-loader', name: 'Sparepart Wheel Loader', icon: 'fa-truck-moving', desc: 'Transmisi, hidrolik, dan suku cadang wheel loader.' },
    { id: 'diesel-engine', name: 'Mesin Diesel', icon: 'fa-gears', desc: 'Komponen internal engine berbagai merk.' },
    { id: 'genset', name: 'Sparepart Genset', icon: 'fa-plug-circle-bolt', desc: 'Alternator, modul kontrol, dan sparepart genset.' }
];

const products = [
    { id: 1, name: 'Filter Udara Heavy Duty', category: 'excavator', img: 'filter_udara.png', desc: 'Menyaring partikel debu dengan efisiensi 99.9% untuk melindungi mesin Anda.' },
    { id: 2, name: 'Pompa Hidrolik Utama', category: 'excavator', img: 'pompa_hidrolik.png', desc: 'Pompa hidrolik bertekanan tinggi untuk ekskavator kelas 20 ton.' },
    { id: 3, name: 'Track Link Assy', category: 'bulldozer', img: 'track_link.png', desc: 'Track link baja paduan yang tahan terhadap gesekan ekstrem.' },
    { id: 4, name: 'Injector Assembly', category: 'mesin-diesel', img: 'injector.png', desc: 'Sistem injeksi presisi tinggi untuk efisiensi bahan bakar maksimal.' },
    { id: 5, name: 'Turbocharger Kit', category: 'mesin-diesel', img: 'turbocharger.png', desc: 'Meningkatkan tenaga mesin dengan pasokan udara yang lebih padat.' },
    { id: 6, name: 'Water Pump', category: 'wheel-loader', img: 'water_pump.png', desc: 'Menjaga sirkulasi pendingin engine agar terhindar dari overheat.' },
    { id: 7, name: 'Piston & Liner Kit', category: 'mesin-diesel', img: 'piston.png', desc: 'Kit overhoul lengkap dengan material anti-aus standar OEM.' },
    { id: 8, name: 'Alternator 24V', category: 'genset', img: 'alternator.png', desc: 'Pengisian daya kelistrikan yang stabil untuk unit heavy duty.' },
    { id: 9, name: 'Radiator Assy', category: 'genset', img: 'radiator.png', desc: 'Pendinginan optimal untuk operasional genset nonstop 24 jam.' },
    { id: 10, name: 'Starter Motor', category: 'wheel-loader', img: 'starter_motor.png', desc: 'Menghidupkan mesin diesel besar dengan cepat di berbagai kondisi.' },
    { id: 11, name: 'Seal Kit Cylinder', category: 'forklift', img: 'seal_kit.png', desc: 'Mengatasi kebocoran oli hidrolik pada silinder boom dan bucket.' },
    { id: 12, name: 'Controller Module', category: 'genset', img: 'controller_module.png', desc: 'Modul pintar untuk otomasi dan perlindungan sistem genset Anda.' }
];

const testimonials = [
    { name: 'Budi Santoso', company: 'PT. Konstruksi Jaya', text: 'Sparepart dari Bumi Diesel sangat awet dan original. Pengiriman ke site proyek kami di pelosok juga sangat cepat.' },
    { name: 'Hendra Wijaya', company: 'CV. Tambang Makmur', text: 'Harga sangat kompetitif dibandingkan supplier lain. Layanan purna jualnya luar biasa, teknisinya sangat membantu.' },
    { name: 'Agus Pratama', company: 'PT. Logistik Nusantara', text: 'Armada forklift kami tidak pernah idle lama berkat ketersediaan stok yang lengkap di Bumi Diesel Lampung.' },
    { name: 'Siti Aminah', company: 'Agro Sawit Mandiri', text: 'Kualitas mesin diesel yang kami pesan sangat prima. Sukses terus untuk Bumi Diesel!' },
    { name: 'Rudi Hermawan', company: 'PT. Energi Persada', text: 'Pemesanan alternator genset diproses dengan cepat. Packing sangat aman dan barang berfungsi 100%.' }
];

const brands = ['Caterpillar', 'Komatsu', 'Cummins', 'Perkins', 'Kubota', 'Hitachi', 'Volvo', 'Yanmar'];

// ==========================================
// INISIALISASI & RENDER DOM
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderCategories();
    renderFilterButtons();
    renderProducts(products);
    renderTestimonials();
    renderBrands();
    initScrollAnimations();
});

// ==========================================
// DARK MODE LOGIC
// ==========================================
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlEl.classList.add('dark');
        updateThemeIcon(true);
    }
}

themeToggle.addEventListener('click', () => {
    htmlEl.classList.toggle('dark');
    const isDark = htmlEl.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
});

function updateThemeIcon(isDark) {
    themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

// ==========================================
// NAVBAR & MOBILE MENU
// ==========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navItems = navLinks.querySelectorAll('a');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
        
        // Active state
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
    });
});

// ==========================================
// RENDER KATEGORI
// ==========================================
function renderCategories() {
    const container = document.querySelector('.category-grid');
    container.innerHTML = categories.map(cat => `
        <div class="category-card fade-up">
            <i class="fa-solid ${cat.icon}"></i>
            <h3>${cat.name}</h3>
            <p>${cat.desc}</p>
        </div>
    `).join('');
}

// ==========================================
// PRODUK, FILTER, & SEARCH
// ==========================================
function renderFilterButtons() {
    const container = document.getElementById('filter-buttons');
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.filter = cat.id;
        btn.textContent = cat.name;
        container.appendChild(btn);
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterProducts();
        });
    });
}

function renderProducts(items) {
    const container = document.getElementById('product-grid');
    if (items.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">Produk tidak ditemukan.</p>';
        return;
    }

    container.innerHTML = items.map(prod => {
        const catName = categories.find(c => c.id === prod.category)?.name || 'Sparepart';
        const waText = encodeURIComponent(`Halo Bumi Diesel Lampung, saya tertarik dengan produk ${prod.name}. Mohon info harga dan ketersediaan.`);
        return `
        <div class="product-card">
            <div class="product-img">
                <img src="${prod.img}" alt="${prod.name}" loading="lazy">
                <span class="product-category">${catName}</span>
            </div>
            <div class="product-info">
                <h3>${prod.name}</h3>
                <a href="https://wa.me/628218137639?text=${waText}" target="_blank" class="btn">
                    <i class="fa-brands fa-whatsapp"></i> Tanya via WA
                </a>
            </div>
        </div>
        `;
    }).join('');
}

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', filterProducts);

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;

    const filtered = products.filter(prod => {
        const matchSearch = prod.name.toLowerCase().includes(searchTerm);
        const matchCat = activeFilter === 'all' || prod.category === activeFilter;
        return matchSearch && matchCat;
    });

    renderProducts(filtered);
}

// ==========================================
// TESTIMONI SLIDER
// ==========================================
let currentTesti = 0;

function renderTestimonials() {
    const container = document.getElementById('testimonial-slider');
    const dotsContainer = document.getElementById('slider-dots');
    
    container.innerHTML = testimonials.map((t, index) => `
        <div class="testi-slide ${index === 0 ? 'active' : ''}">
            <p class="testi-content">${t.text}</p>
            <div class="testi-author">
                <h4>${t.name}</h4>
                <p>${t.company}</p>
            </div>
        </div>
    `).join('');

    dotsContainer.innerHTML = testimonials.map((_, index) => `
        <div class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
    `).join('');

    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            currentTesti = parseInt(e.target.dataset.index);
            updateTestimonial();
        });
    });

    setInterval(() => {
        currentTesti = (currentTesti + 1) % testimonials.length;
        updateTestimonial();
    }, 5000);
}

function updateTestimonial() {
    const slides = document.querySelectorAll('.testi-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides.forEach((s, i) => s.classList.toggle('active', i === currentTesti));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentTesti));
}

// ==========================================
// BRAND PARTNER LOGO (Auto Scroll)
// ==========================================
function renderBrands() {
    const track = document.getElementById('brand-track');
    // Duplikasi array agar scrolling mulus (infinite effect)
    const allBrands = [...brands, ...brands];
    
    track.innerHTML = allBrands.map(b => `
        <div class="brand-logo">${b}</div>
    `).join('');
}

// ==========================================
// ANIMATED COUNTER STATS
// ==========================================
const counters = document.querySelectorAll('.counter');
let hasCounted = false;

function startCounters() {
    if (hasCounted) return;
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; 
        const increment = target / (duration / 16); 

        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
    hasCounted = true;
}

// ==========================================
// SCROLL OBSERVER (Animations & Back To Top)
// ==========================================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-up');
    const statSection = document.querySelector('.statistics');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Jika elemen stat masuk ke layar, jalankan counter
                if (entry.target === statSection || statSection.contains(entry.target)) {
                    startCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
    observer.observe(statSection);
}
