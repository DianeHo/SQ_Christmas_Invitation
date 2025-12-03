// --- 0. AUTHORIZATION SETUP ---
// !!! IMPORTANT: REPLACE '1234' with the last 4 digits of the guest's phone number !!!
const VERIFIED_CODE = 
[ '5488',
  '3508',
  '4202',
  '7943',
  '8277',
  '7927',
  '7083',
  '1884',
  '5227',
  '8149',
  '0951',
  '3088',
];

const authScreen = document.querySelector('.auth-screen');
const invitationContainer = document.querySelector('.invitation-container');
const authCodeInput = document.getElementById('auth-code');
const authButton = document.getElementById('auth-button');
const authMessage = document.getElementById('auth-message');

function authorizeAccess() {
    const enteredCode = authCodeInput.value.trim();

    // Check if the entered code is included in the array of VERIFIED_CODEs
    if (VERIFIED_CODE.includes(enteredCode)) {
        // SUCCESS: Hide authorization screen and show invitation
        authScreen.classList.add('hidden-slide'); 
        
        setTimeout(() => {
            authScreen.style.display = 'none';
            invitationContainer.style.display = 'block';
            invitationContainer.classList.remove('hidden-on-load');
            
            updateSlideDisplay('start'); 
        }, 700); 
        
    } else {
        // FAILURE: Display error message
        authMessage.textContent = 'ACCESS DENIED. Incorrect coordinates. Try again.';
        authCodeInput.value = '';
    }
}

// Ensure input only accepts 4 digits
authCodeInput.addEventListener('input', function(e) {
    if (this.value.length > 4) {
        this.value = this.value.slice(0, 4);
    }
});
// Attach authorization function to the button
authButton.addEventListener('click', authorizeAccess);

// --- 1. DYNAMIC TWINKLING CHRISTMAS LIGHTS (Keep existing code) ---
// ... (Paste the Light Position setup and loop here) ...

const tree = document.querySelector('.mission-tree');

const lightPositions = [
    { top: 20, left: 75, color: 'gold' },
    { top: 40, left: 50, color: 'red' }, 
    { top: 45, left: 100, color: 'white' }, 
    { top: 70, left: 25, color: 'white' },
    { top: 90, left: 80, color: 'gold' },
    { top: 95, left: 130, color: 'red' },
    { top: 130, left: 10, color: 'red' },
    { top: 150, left: 55, color: 'white' },
    { top: 160, left: 140, color: 'gold' },
];

lightPositions.forEach((pos, index) => {
    const light = document.createElement('div');
    light.className = 'light';
    light.style.top = `${pos.top}px`;
    light.style.left = `${pos.left}px`;
    light.style.backgroundColor = pos.color;
    light.style.color = pos.color; 
    
    light.style.animationDelay = `${(index * 0.2) + (Math.random() * 1)}s`;

    tree.appendChild(light);
});


// --- 2. DYNAMIC DUST/PARTICLE EFFECT (Keep existing code) ---
// ... (Paste the Dust/Particle setup and CSS injection here) ...

const dustContainer = document.querySelector('.dust-overlay');
const numberOfDustParticles = 60; 
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

for (let i = 0; i < numberOfDustParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'dust-particle';
    
    particle.style.left = `${Math.random() * screenWidth}px`;
    
    const size = Math.random() * 2 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = '#8b0000';
    particle.style.opacity = Math.random() * 0.3 + 0.1;

    const duration = Math.random() * 20 + 10;
    const swayX = Math.random() * 10 - 5; 
    
    particle.style.setProperty('--x-sway', `${swayX}px`);
    particle.style.animation = `dustFloat ${duration}s linear infinite`;
    particle.style.animationDelay = `-${Math.random() * duration}s`;

    dustContainer.appendChild(particle);
}


const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
    .dust-particle {
        position: fixed;
        border-radius: 50%;
        z-index: 5; 
        box-shadow: 0 0 1px currentColor;
    }

    @keyframes dustFloat {
        0% { transform: translateY(-10vh) translateX(0); }
        50% { transform: translateY(50vh) translateX(var(--x-sway)); }
        100% { transform: translateY(100vh) translateX(0); }
    }
`;
document.head.appendChild(styleSheet);


// --- 3. SLIDE NAVIGATION LOGIC (Keep existing code) ---
const slides = document.querySelectorAll('.mission-slide');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const totalSlides = slides.length;
let currentSlide = 1;

function updateSlideDisplay() {
    slides.forEach(slide => {
        slide.classList.add('hidden');
    });

    const activeSlide = document.querySelector(`[data-slide="${currentSlide}"]`);
    if (activeSlide) {
        setTimeout(() => {
            activeSlide.classList.remove('hidden');
        }, 10);
    }
    
    const treeElement = document.querySelector('.mission-tree');
    if (currentSlide === 1) {
        treeElement.classList.remove('hidden');
    } else {
        treeElement.classList.add('hidden');
    }

    prevButton.classList.toggle('hidden', currentSlide === 1);
    nextButton.classList.toggle('hidden', currentSlide === totalSlides);
}

function goToNextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        updateSlideDisplay();
    }
}

function goToPrevSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        updateSlideDisplay();
    }
}


nextButton.addEventListener('click', goToNextSlide);
prevButton.addEventListener('click', goToPrevSlide);

// Do NOT call updateSlideDisplay() here, it is called after successful authorization!