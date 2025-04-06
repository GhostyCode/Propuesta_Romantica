document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loveMessages = document.getElementById('love-messages');
    const currentMessage = document.getElementById('current-message');
    const proposalQuestion = document.getElementById('proposal-question');
    const yesResponse = document.getElementById('yes-response');
    const maybeResponse = document.getElementById('maybe-response');
    const yesButton = document.getElementById('yes-button');
    const maybeButton = document.getElementById('maybe-button');
    const restartButton = document.getElementById('restart-button');
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    const successSound = document.getElementById('success-sound');
    const floatingElements = document.getElementById('floating-elements');
    const fallingHearts = document.getElementById('falling-hearts');

    // Messages array
    const messages = [
        "Pinguinita hermosa, cada instante contigo es un regalo del cielo 🐧 ",
        "Tu sonrisa, mi amorcito, ilumina mi mundo más que mil soles... ☀️",
        "A tu lado he descubierto lo que realmente significa amar... y amarte a ti es lo más bonito. 💖",
        "Eres, sin duda, la persona más especial que Dios pudo poner en mi camino... 🌌",
        "No puedo, ni quiero, imaginar mi vida sin ti, mi cielo, eres mi todo. 🌈",
        "Y ahora, con todo mi corazón, quiero hacerte una preguntita muy importante... 💌"
    ];
    
    let currentStep = 0;
    let isMusicPlaying = false;

    // Initialize floating elements
    createFloatingElements();

    // Start the message sequence
    showMessage();

    // Event listeners
    musicToggle.addEventListener('click', toggleMusic);
    yesButton.addEventListener('click', () => showResponse('yes'));
    maybeButton.addEventListener('click', () => showResponse('maybe'));
    restartButton.addEventListener('click', restart);

    // Functions
    function showMessage() {
        if (currentStep < messages.length) {
            // Show current message with animation
            currentMessage.textContent = messages[currentStep];
            currentMessage.parentElement.style.animation = 'none';
            void currentMessage.parentElement.offsetWidth; // Trigger reflow
            currentMessage.parentElement.style.animation = 'fadeIn 0.8s ease';
            
            // Set timer for next message
            setTimeout(() => {
                currentStep++;
                if (currentStep < messages.length) {
                    showMessage();
                } else {
                    // Show proposal after last message
                    loveMessages.classList.add('hidden');
                    proposalQuestion.classList.remove('hidden');
                }
            }, 3500);
        }
    }

    function showResponse(type) {
        proposalQuestion.classList.add('hidden');
        
        if (type === 'yes') {
            yesResponse.classList.remove('hidden');
            createFallingHearts();
            launchConfetti();
            playSuccessSound();
        } else {
            maybeResponse.classList.remove('hidden');
        }
    }

    function restart() {
        maybeResponse.classList.add('hidden');
        yesResponse.classList.add('hidden');
        currentStep = 0;
        loveMessages.classList.remove('hidden');
        showMessage();
    }

    function toggleMusic() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="volume-icon">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
            `;
        } else {
            backgroundMusic.play().catch(error => {
                console.error("Audio playback failed:", error);
            });
            musicToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="volume-icon">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                </svg>
            `;
        }
        isMusicPlaying = !isMusicPlaying;
    }

    function createFloatingElements() {
        // Create hearts
        for (let i = 0; i < 15; i++) {
            createFloatingElement('heart', i);
        }
        
        // Create stars
        for (let i = 0; i < 15; i++) {
            createFloatingElement('star', i + 15);
        }
        
        // Create clouds
        for (let i = 0; i < 5; i++) {
            createFloatingElement('cloud', i + 30);
        }
        
        // Create flowers
        for (let i = 0; i < 10; i++) {
            createFloatingElement('flower', i + 35);
        }
        
        // Start animation
        animateFloatingElements();
    }

    function createFloatingElement(type, id) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.id = `floating-element-${id}`;
        
        // Random position and properties
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = type === 'cloud' ? 30 + Math.random() * 40 : 15 + Math.random() * 20;
        const opacity = 0.5 + Math.random() * 0.5;
        const rotation = Math.random() * 360;
        
        element.style.left = `${x}%`;
        element.style.top = `${y}%`;
        element.style.opacity = opacity;
        element.style.transform = `rotate(${rotation}deg)`;
        
        // Create SVG based on type
        let svg = '';
        
        if (type === 'heart') {
            svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="#ff4d6d" stroke="#ff4d6d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>`;
        } else if (type === 'star') {
            svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="#ffd700" stroke="#ffd700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>`;
        } else if (type === 'cloud') {
            svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
            </svg>`;
        } else if (type === 'flower') {
            // Create a flower with CSS
            const flowerSize = size;
            svg = `<div style="position: relative; width: ${flowerSize}px; height: ${flowerSize}px;">
                <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;">
                    <div style="width: ${flowerSize/3}px; height: ${flowerSize/3}px; border-radius: 50%; background-color: #ffd700;"></div>
                </div>
                ${[0, 72, 144, 216, 288].map(angle => `
                    <div style="position: absolute; width: ${flowerSize * 0.8}px; height: ${flowerSize * 0.3}px; background-color: #ffb5e8; border-radius: 50%; left: 50%; top: 50%; transform: rotate(${angle}deg) translateY(-50%); transform-origin: left;"></div>
                `).join('')}
            </div>`;
        }
        
        element.innerHTML = svg;
        floatingElements.appendChild(element);
        
        // Store element data
        element.dataset.speed = (0.3 + Math.random() * 1.5).toString();
        element.dataset.rotationSpeed = ((Math.random() - 0.5) * 2).toString();
    }

    function animateFloatingElements() {
        const elements = document.querySelectorAll('.floating-element');
        
        setInterval(() => {
            elements.forEach(element => {
                const speed = parseFloat(element.dataset.speed);
                const rotationSpeed = parseFloat(element.dataset.rotationSpeed);
                
                // Get current position and rotation
                const style = window.getComputedStyle(element);
                const transform = style.transform;
                let rotation = 0;
                
                if (transform !== 'none') {
                    const values = transform.split('(')[1].split(')')[0].split(',');
                    const a = values[0];
                    const b = values[1];
                    rotation = Math.round(Math.atan2(b, a) * (180/Math.PI));
                }
                
                // Update position
                let y = parseFloat(element.style.top);
                y -= speed * 0.1;
                if (y < -10) {
                    y = 110;
                }
                
                // Update rotation
                rotation += rotationSpeed;
                
                // Apply new position and rotation
                element.style.top = `${y}%`;
                element.style.transform = `rotate(${rotation}deg)`;
            });
        }, 50);
    }

    function createFallingHearts() {
        // Create falling hearts
        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            heart.className = 'falling-heart';
            
            const size = 10 + Math.random() * 30;
            const x = Math.random() * 100;
            const y = -10 - Math.random() * 100;
            const speed = 1 + Math.random() * 3;
            
            heart.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="#ff4d6d" stroke="#ff4d6d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>`;
            
            heart.style.left = `${x}%`;
            heart.style.top = `${y}%`;
            heart.dataset.speed = speed.toString();
            
            fallingHearts.appendChild(heart);
        }
        
        // Animate falling hearts
        animateFallingHearts();
    }

    function animateFallingHearts() {
        const hearts = document.querySelectorAll('.falling-heart');
        
        const heartInterval = setInterval(() => {
            hearts.forEach(heart => {
                const speed = parseFloat(heart.dataset.speed);
                let y = parseFloat(heart.style.top);
                y += speed;
                
                if (y > 110) {
                    y = -10;
                }
                
                heart.style.top = `${y}%`;
            });
        }, 50);
    }

    function launchConfetti() {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        
        const randomInRange = (min, max) => {
            return Math.random() * (max - min) + min;
        };
        
        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            
            const particleCount = 50 * (timeLeft / duration);
            
            // Since particles fall down, start a bit higher than random
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    }

    function playSuccessSound() {
        successSound.play().catch(error => {
            console.error("Audio playback failed:", error);
        });
    }
});