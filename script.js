// ===================== TRANSLATIONS =====================
const translations = {
    pl: {
        nav_demo: "Zagraj w Demo",
        nav_mechanics: "Mechaniki",
        nav_screenshots: "Galeria",
        nav_community: "Społeczność",
        hero_tagline: "Stuknij. Przetnij. Przetrwaj kwantową burzę.",
        hero_desc: "Rzeczywistość jest niestabilna. Coś czai się za kwantową zasłoną. Opanuj cząstki, zmierz się z anomaliami i odkryj prawdę — jeśli przetrwasz wystarczająco długo.",
        cta_play: "Zagraj w Demo",
        cta_discord: "Dołącz na Discord",
        demo_title: "Interaktywne Demo",
        placeholder_title: "Demo wkrótce",
        placeholder_desc: "W tym miejscu pojawi się pełna wersja demo gry wprost z silnika Godot. Zapraszamy do śledzenia aktualizacji na Discordzie!",
        placeholder_btn: "Wczytaj Demo",
        mechanics_title: "Mechaniki Kwantowe",
        mech1_title: "Stukaj i Tnij",
        mech1_desc: "Zarządzaj chaosem poprzez precyzyjne interakcje z cząstkami.",
        mech2_title: "Kwanciaki",
        mech2_desc: "Twoi kwantowi towarzysze. Ewoluują i walczą u Twojego boku.",
        mech3_title: "Rdzenie Kwantowe",
        mech3_desc: "Rozbijaj tajemnicze rdzenie i dekoduj rzadkie nagrody.",
        screenshots_title: "Galeria",
        comm_title: "Dołącz do Społeczności",
        comm_desc: "Bądź na bieżąco z rozwojem, zgłaszaj pomysły i rywalizuj z innymi Obserwatorami!",
        discord_heading: "Serwer Discord",
        discord_text: "Rozmawiaj bezpośrednio z twórcą, bierz udział w testach i zgłaszaj swoje propozycje zmian.",
        newsletter_heading: "Kwantowy Biuletyn",
        newsletter_text: "Bądź pierwszy, gdy gra wyjdzie na Androida! Zostaw e-mail, aby otrzymać powiadomienie o premierze.",
        newsletter_submit: "Zapisz się",
        newsletter_consent: "Wyrażam zgodę na otrzymywanie informacji o premierze gry.",
        newsletter_placeholder: "Twój e-mail...",
        footer_dev: "Gra w aktywnym rozwoju",
        footer_privacy: "Polityka Prywatności",
        footer_contact: "Kontakt",
        footer_contact_label: "Kontakt",
        footer_rights: "Wszelkie prawa zastrzeżone."
    },
    en: {
        nav_demo: "Play Demo",
        nav_mechanics: "Mechanics",
        nav_screenshots: "Screenshots",
        nav_community: "Community",
        hero_tagline: "Tap. Slice. Survive the Quantum Storm.",
        hero_desc: "Reality is unstable. Something lurks beyond the quantum veil. Master the particles, face the anomalies and uncover the truth — if you survive long enough.",
        cta_play: "Play Demo",
        cta_discord: "Join Discord",
        demo_title: "Interactive Demo",
        placeholder_title: "Demo coming soon",
        placeholder_desc: "The full web version of the game exported from Godot will be loaded here. Stay tuned for updates on our Discord!",
        placeholder_btn: "Load Demo",
        mechanics_title: "Quantum Mechanics",
        mech1_title: "Tap & Slice",
        mech1_desc: "Manage chaos through precise interactions with quantum particles.",
        mech2_title: "Companions",
        mech2_desc: "Your quantum allies. They evolve and fight by your side.",
        mech3_title: "Quantum Cores",
        mech3_desc: "Crack mysterious cores and decode rare rewards.",
        screenshots_title: "Screenshots",
        comm_title: "Join the Community",
        comm_desc: "Stay updated, share ideas, and compete with other Observers!",
        discord_heading: "Discord Server",
        discord_text: "Chat directly with the developer, participate in tests, and share your ideas.",
        newsletter_heading: "Quantum Newsletter",
        newsletter_text: "Be the first to know when the game launches on Android! Subscribe to get notified.",
        newsletter_submit: "Subscribe",
        newsletter_consent: "I consent to receive emails regarding the game launch.",
        newsletter_placeholder: "Your email...",
        footer_dev: "Game in active development",
        footer_privacy: "Privacy Policy",
        footer_contact: "Contact",
        footer_contact_label: "Contact",
        footer_rights: "All rights reserved."
    }
};

let currentLanguage = 'pl';

// ===================== LOCALIZATION HANDLER =====================
function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);

    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`lang-${lang}`).classList.add('active');

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.innerHTML = translations[lang][key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) el.placeholder = translations[lang][key];
    });

    document.documentElement.setAttribute('lang', lang);
    
    // Refresh active particle description immediately on language change
    updateParticleShowcase(false);
}

document.getElementById('lang-pl').addEventListener('click', () => setLanguage('pl'));
document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));


// ===================== INTERACTIVE QUINN LOGIC =====================
const pokeSounds = [
    new Audio('Assets/MusicSound/UI_Quinn_Poke_01.ogg'),
    new Audio('Assets/MusicSound/UI_Quinn_Poke_02.ogg'),
    new Audio('Assets/MusicSound/UI_Quinn_Poke_03.ogg'),
    new Audio('Assets/MusicSound/UI_Quinn_Poke_04.ogg')
];
const teleportSound = new Audio('Assets/MusicSound/Paradox_ShuffleTeleport_01.ogg');

// Adjust volumes
pokeSounds.forEach(snd => snd.volume = 0.5);
teleportSound.volume = 0.6;

function playPokeSound() {
    try {
        const index = Math.floor(Math.random() * pokeSounds.length);
        const snd = pokeSounds[index];
        snd.currentTime = 0;
        snd.play().catch(err => console.log("Audio play blocked by browser:", err));
    } catch (e) {
        console.error("Audio error:", e);
    }
}

function playTeleportSound() {
    try {
        teleportSound.currentTime = 0;
        teleportSound.play().catch(err => console.log("Audio play blocked by browser:", err));
    } catch (e) {
        console.error("Audio error:", e);
    }
}

const quinnCharacter = document.getElementById('quinn-character-interactive');
const quinnBubbleText = document.getElementById('quinn-bubble-text');
const quinnBubble = document.getElementById('quinn-bubble');

let quinnClicks = 0;
let isQuinnHiding = false;
let quinnSpeechTimer = null;

// Speech Dictionaries
const quinnSpeeches = {
    pl: {
        idle: [
            "Witaj, Obserwatorze. Gotowy na pomiar?",
            "Nie dotykaj czarnej antymaterii!",
            "Tnij mezony, stukaj kwarki. Proste?",
            "Utrzymuj chaos na bezpiecznym poziomie.",
            "Moje pierścienie stabilizują rzeczywistość."
        ],
        poke: [
            "Ałć! To łaskocze!",
            "Hej, skup się na cząstkach!",
            "Przestań we mnie klikać!",
            "Co robisz, Obserwatorze?",
            "Moje pierścienie się rozregulują!"
        ],
        pissed: [
            "Mam tego dość. Odchodzę!",
            "Zaraz stąd zniknę...",
            "Następuje kolaps!",
            "Złość kwantowa!"
        ],
        back: "Jestem z powrotem. Zachowuj się!"
    },
    en: {
        idle: [
            "Welcome, Observer. Ready for measurement?",
            "Do not touch the black antimatter!",
            "Slice mesons, tap quarks. Easy?",
            "Keep chaos at a safe level.",
            "My rings stabilize the Locus."
        ],
        poke: [
            "Ouch! That tickles!",
            "Hey, focus on the particles!",
            "Stop poking me!",
            "What are you doing, Observer?",
            "My rings will fall out of sync!"
        ],
        pissed: [
            "I've had enough. I'm leaving!",
            "I will disappear...",
            "Collapse imminent!",
            "Quantum rage!"
        ],
        back: "I'm back. Behave yourself!"
    }
};

function getRandomSpeech(type) {
    const list = quinnSpeeches[currentLanguage][type];
    return list[Math.floor(Math.random() * list.length)];
}

function startQuinnSpeechLoop() {
    if (quinnSpeechTimer) clearInterval(quinnSpeechTimer);
    quinnSpeechTimer = setInterval(() => {
        if (!isQuinnHiding) {
            quinnBubbleText.textContent = getRandomSpeech('idle');
        }
    }, 10000);
}

quinnCharacter.addEventListener('click', () => {
    if (isQuinnHiding) return;
    
    quinnClicks++;
    
    // Animate poke vibration
    quinnCharacter.classList.remove('poke');
    void quinnCharacter.offsetWidth; // trigger reflow
    quinnCharacter.classList.add('poke');
    
    // Quinn reacts depending on clicks
    if (quinnClicks < 5) {
        quinnBubbleText.textContent = getRandomSpeech('poke');
        playPokeSound();
        
        // Remove poke animation class after it finishes
        setTimeout(() => {
            quinnCharacter.classList.remove('poke');
        }, 600);
    } else {
        // PISSED OFF STATE - disappears!
        isQuinnHiding = true;
        quinnBubbleText.textContent = getRandomSpeech('pissed');
        playTeleportSound();
        
        quinnCharacter.classList.remove('poke');
        quinnCharacter.classList.add('pissed');
        
        // Fade out speech bubble
        setTimeout(() => {
            quinnBubble.style.opacity = '0';
        }, 300);
        
        // Reappear Quinn after 3.5 seconds
        setTimeout(() => {
            quinnCharacter.classList.remove('pissed');
            quinnCharacter.style.transform = 'scale(0)';
            void quinnCharacter.offsetWidth; // trigger reflow
            
            // Pop back in animation
            quinnCharacter.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            quinnCharacter.style.transform = 'scale(1)';
            
            isQuinnHiding = false;
            quinnClicks = 0;
            
            quinnBubble.style.opacity = '1';
            quinnBubbleText.textContent = quinnSpeeches[currentLanguage].back;
            
            // Reset transition property
            setTimeout(() => {
                quinnCharacter.style.transition = '';
            }, 500);
        }, 3500);
    }
});


// ===================== DYNAMIC PARTICLE SHOWCASE =====================
const particleShowcaseBox = document.querySelector('.particle-showcase-box');
const particleElement = document.getElementById('dynamic-particle');
const particlePartner = document.getElementById('dynamic-particle-partner');
const particleLine = document.getElementById('dynamic-particle-line');
const particleBadgeText = document.getElementById('particle-badge-text');
const particleDescText = document.getElementById('particle-desc-text');

const particleData = {
    pl: [
        {
            badge: "KWARK (STUKNIJ)",
            desc: "Dotykaj cyjanowe cząstki elementarne, aby zdobywać punkty.",
            class: "quark"
        },
        {
            badge: "MEZON (PRZETNIJ)",
            desc: "Przecinaj magentowe mezony szybkim ruchem kursora.",
            class: "meson"
        },
        {
            badge: "SPLĄTANE (UNIK/CIĘCIE)",
            desc: "Przecinaj linię łączącą tylko wtedy, gdy jest czerwona!",
            class: "entangled"
        },
        {
            badge: "ANTYMATERIA (UNIKAJ)",
            desc: "Unikaj za wszelką cenę. Zwiększa chaos o 25!",
            class: "antimatter"
        }
    ],
    en: [
        {
            badge: "QUARK (TAP)",
            desc: "Tap cyan elementary particles to score points.",
            class: "quark"
        },
        {
            badge: "MESON (SLICE)",
            desc: "Slice magenta mesons with a quick swipe.",
            class: "meson"
        },
        {
            badge: "ENTANGLED (AVOID/SLICE)",
            desc: "Slice the connecting line only when it turns red.",
            class: "entangled"
        },
        {
            badge: "ANTIMATTER (AVOID)",
            desc: "Avoid at all costs. Increases chaos by 25.",
            class: "antimatter"
        }
    ]
};

let currentParticleIndex = 0;
let entangledStateTimer = null;
let currentEntangledState = 'good';

function updateParticleShowcase(animate = true) {
    const data = particleData[currentLanguage][currentParticleIndex];
    
    if (animate) {
        particleShowcaseBox.classList.add('glitch');
    }
    
    // Clear any active entangled state toggler
    if (entangledStateTimer) {
        clearInterval(entangledStateTimer);
        entangledStateTimer = null;
    }
    particleShowcaseBox.classList.remove('state-good', 'state-bad');
    
    setTimeout(() => {
        // Reset styles
        particleElement.className = "particle-visual-element";
        particleElement.classList.add(data.class);
        
        // Entangled special partners/lines logic
        if (data.class === 'entangled') {
            particlePartner.style.display = 'block';
            particlePartner.className = "particle-visual-element partner entangled-partner";
            particleLine.style.display = 'block';
            particleLine.className = "particle-line entangled-line";
            
            // Set initial state
            currentEntangledState = 'good';
            particleShowcaseBox.classList.add('state-good');
            
            // Toggle states every 1.5 seconds synchronicly (1:1 with game)
            entangledStateTimer = setInterval(() => {
                if (currentEntangledState === 'good') {
                    currentEntangledState = 'bad';
                    particleShowcaseBox.classList.remove('state-good');
                    particleShowcaseBox.classList.add('state-bad');
                } else {
                    currentEntangledState = 'good';
                    particleShowcaseBox.classList.remove('state-bad');
                    particleShowcaseBox.classList.add('state-good');
                }
            }, 1500);
        } else {
            particlePartner.style.display = 'none';
            particleLine.style.display = 'none';
        }
        
        // Update texts
        particleBadgeText.textContent = data.badge;
        particleDescText.textContent = data.desc;
        
        if (animate) {
            setTimeout(() => {
                particleShowcaseBox.classList.remove('glitch');
            }, 100);
        }
    }, animate ? 150 : 0);
}

function startParticleLoop() {
    setInterval(() => {
        currentParticleIndex = (currentParticleIndex + 1) % particleData[currentLanguage].length;
        updateParticleShowcase(true);
    }, 4000);
}


// ===================== STARRY BACKGROUND =====================
const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');
let stars = [];
const NUM_STARS = 140;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
}

class Star {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8 + 0.2;
        this.speed = Math.random() * 0.12 + 0.03;
        this.alpha = Math.random() * 0.6 + 0.15;
        this.twinkleSpeed = Math.random() * 0.015 + 0.003;
        const r = Math.random();
        this.color = r > 0.88 ? '#00ecf6' : (r > 0.95 ? '#fe2c9e' : '#ffffff');
    }
    update() {
        this.y -= this.speed;
        if (this.y < 0) { this.reset(); this.y = canvas.height; }
        this.alpha += this.twinkleSpeed;
        if (this.alpha > 0.85 || this.alpha < 0.15) this.twinkleSpeed = -this.twinkleSpeed;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < NUM_STARS; i++) stars.push(new Star());
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const grad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
    );
    grad.addColorStop(0, '#0c0d24');
    grad.addColorStop(1, '#05050c');
    ctx.fillStyle = grad;
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => { s.update(); s.draw(); });
    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', resizeCanvas);


// ===================== DEMO LAUNCHER =====================
const launchBtn = document.getElementById('launch-demo-btn');
if (launchBtn) {
    const placeholder = document.querySelector('.godot-placeholder');
    const iframe = document.getElementById('game-iframe');

    launchBtn.addEventListener('click', () => {
        launchBtn.disabled = true;
        launchBtn.textContent = currentLanguage === 'pl' ? 'Ładowanie...' : 'Loading...';
        setTimeout(() => {
            placeholder.style.display = 'none';
            iframe.src = 'game/index.html';
            iframe.style.display = 'block';
        }, 800);
    });
}


// ===================== SCREENSHOT LIGHTBOX =====================
const screenshotPaths = [
    "Assets/Screenshots/1.png",
    "Assets/Screenshots/2.png",
    "Assets/Screenshots/3.png",
    "Assets/Screenshots/4.png",
    "Assets/Screenshots/5.png",
    "Assets/Screenshots/6.png",
    "Assets/Screenshots/7.png",
    "Assets/Screenshots/8.png",
    "Assets/Screenshots/9.png"
];
let currentLightboxIndex = 0;
const lightboxModal = document.getElementById('screenshot-lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(index) {
    currentLightboxIndex = index;
    lightboxImg.src = screenshotPaths[index];
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
}

function prevLightboxImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + screenshotPaths.length) % screenshotPaths.length;
    lightboxImg.src = screenshotPaths[currentLightboxIndex];
}

function nextLightboxImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % screenshotPaths.length;
    lightboxImg.src = screenshotPaths[currentLightboxIndex];
}

document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') prevLightboxImage();
    else if (e.key === 'ArrowRight') nextLightboxImage();
    else if (e.key === 'Escape') closeLightbox();
});

// ===================== SCREENSHOT CAROUSEL =====================
let currentCarouselIndex = 0;
const carouselTrack = document.getElementById('carousel-track');
const totalCarouselItems = 9;
let carouselAutoScrollTimer = null;

function getItemsPerView() {
    const width = window.innerWidth;
    if (width <= 768) return 1;
    return 2;
}

function updateCarouselPosition() {
    const itemsPerView = getItemsPerView();
    const maxIndex = totalCarouselItems - itemsPerView;
    if (currentCarouselIndex > maxIndex) {
        currentCarouselIndex = maxIndex;
    }
    if (currentCarouselIndex < 0) {
        currentCarouselIndex = 0;
    }
    const percent = currentCarouselIndex * (100 / itemsPerView);
    carouselTrack.style.transform = `translateX(-${percent}%)`;
}

function moveCarousel(direction) {
    const itemsPerView = getItemsPerView();
    const maxIndex = totalCarouselItems - itemsPerView;
    currentCarouselIndex += direction;
    if (currentCarouselIndex > maxIndex) {
        currentCarouselIndex = 0;
    } else if (currentCarouselIndex < 0) {
        currentCarouselIndex = maxIndex;
    }
    updateCarouselPosition();
    resetCarouselTimer();
}

function startCarouselTimer() {
    carouselAutoScrollTimer = setInterval(() => {
        moveCarousel(1);
    }, 4000);
}

function resetCarouselTimer() {
    if (carouselAutoScrollTimer) {
        clearInterval(carouselAutoScrollTimer);
        startCarouselTimer();
    }
}

window.addEventListener('resize', () => {
    updateCarouselPosition();
});

// ===================== CONTACT COPY TO CLIPBOARD =====================
function showContactTooltip(element) {
    let oldTooltip = document.getElementById('contact-tooltip');
    if (oldTooltip) oldTooltip.remove();

    const tooltip = document.createElement('div');
    tooltip.id = 'contact-tooltip';
    tooltip.className = 'contact-tooltip';
    tooltip.textContent = currentLanguage === 'pl' ? 'Skopiowano!' : 'Copied!';
    
    document.body.appendChild(tooltip);
    const rect = element.getBoundingClientRect();
    
    tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.top = `${rect.top + window.scrollY - 45}px`;
    
    setTimeout(() => {
        tooltip.classList.add('fade-out');
        setTimeout(() => tooltip.remove(), 300);
    }, 2000);
}

const contactLink = document.getElementById('footer-contact-link');
if (contactLink) {
    contactLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = 'hello.quarkling@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            showContactTooltip(contactLink);
        }).catch(() => {
            window.location.href = `mailto:${email}`;
        });
    });
}

// ===================== INIT =====================
resizeCanvas();
animateStars();

// Autodetect language (EN is default, PL only if browser language starts with 'pl')
let initialLang = localStorage.getItem('preferredLanguage');
if (!initialLang) {
    const browserLang = navigator.language || navigator.userLanguage || 'en';
    initialLang = browserLang.startsWith('pl') ? 'pl' : 'en';
}
setLanguage(initialLang);

startQuinnSpeechLoop();
startParticleLoop();
updateParticleShowcase(false);
startCarouselTimer();
