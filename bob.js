// Enregistrement du plugin ScrambleText de GSAP
gsap.registerPlugin(ScrambleTextPlugin);

const sliders = document.querySelectorAll(".missing");
const terminal = document.getElementById("terminal");
const fixBtn = document.querySelector(".fix-btn");
const flash = document.getElementById("flash");

let clickCount = 0;

// Dictionnaire des messages personnalisés par slider
const sliderMessages = {
  "SKIN COLOR": "[ERROR] Chromatic values out of range. Human pigment not found.",
  "PHYSICAL BEAUTY": "[FATAL] Logic_Over_Aesthetics = TRUE. Beauty is a subjective variable.",
  "HAIR SIZE": "[WARNING] Vector length exceeds memory. Clipping geometry...",
  "SILENCE LEVEL": "[MUTE] Audio feedback loop detected. Can't stop the noise.",
  "CHARACTER TRAIT": "[CRITICAL] Personality.exe has stopped working. Sarcasm overflow.",
  "SKILL": "[NULL] Intelligence quotient undefined. Upgrading brain power..."
};

// 1. Gestion des sliders avec animation Scramble
sliders.forEach((slider) => {
  slider.addEventListener("input", () => {
    // Récupération du nom du slider via le texte du label (élément précédent dans le HTML)
    const label = slider.previousElementSibling.textContent;
    const message = sliderMessages[label] || "[ERROR] Unknown parameter modification.";

    // Création d'un nouvel élément div pour chaque ligne de log
    const newLine = document.createElement("div");
    newLine.style.marginBottom = "8px";
    terminal.appendChild(newLine);

    // Animation Scramble
    gsap.to(newLine, {
      duration: 1.5,
      scrambleText: {
        text: message,
        chars: "01X#$@&*", // Caractères de glitch
        revealDelay: 0.1,
        speed: 0.5
      }
    });

    // Scroll automatique vers le bas pour voir le dernier message
    terminal.scrollTop = terminal.scrollHeight;
  });
});

// 2. Événement sur le bouton FIX ME
fixBtn.addEventListener("click", () => {
  clickCount++;

  // --- PARTIE AUDIO (DÉBLOCAGE) ---
  const unlockAudio = new Audio();
  unlockAudio.play().catch(() => {});

  // --- EFFETS VISUELS ---
  document.body.classList.add("glitch");
  flash.style.opacity = "1";

  setTimeout(() => {
    flash.style.opacity = "0";
  }, 100);

  setTimeout(() => {
    document.body.classList.remove("glitch");
  }, 400);

  // --- LOGIQUE DU TERMINAL ET REDIRECTION ---
  if (clickCount === 1) {
    const line1 = document.createElement("div");
    terminal.appendChild(line1);
    
    gsap.to(line1, {
      duration: 1,
      scrambleText: { text: "> Attempting system override...", chars: "upperCase" }
    });

    setTimeout(() => {
      const line2 = document.createElement("div");
      terminal.appendChild(line2);
      gsap.to(line2, {
        duration: 1.5,
        scrambleText: { text: "[ACCESS DENIED] Core personality locked.", chars: "01" }
      });
      
      const line3 = document.createElement("div");
      terminal.appendChild(line3);
      gsap.to(line3, {
        duration: 1,
        scrambleText: { text: "> Reality destabilizing...", chars: "lowercase" }
      });

      terminal.scrollTop = terminal.scrollHeight;
    }, 500);
  }

  if (clickCount === 2) {
    const rebootLine = document.createElement("div");
    terminal.appendChild(rebootLine);
    
    gsap.to(rebootLine, {
      duration: 0.5,
      scrambleText: { text: "> System rebooting...", chars: "01" },
      onComplete: () => {
        setTimeout(() => {
          window.location.href = "next.html"; 
        }, 500);
      }
    });
    
    terminal.scrollTop = terminal.scrollHeight;
  }
});

// 3. Gestion des Popups (navigation)
const popupData = {
  SOUND: "LYRICS BY: ERROR <br> Sample: ERROR",
  CREDIT: "DESIGNED BY: BOOOOOOOB <br> ENGINE: ERROR",
  CONTACT: "SIGNAL LOST... Find ALPHA: bob",
};

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const type = e.target.textContent;
    if (popupData[type]) {
      e.preventDefault();
      document.querySelector("#popbob-title").innerText = type;
      document.querySelector("#popbob-body").innerHTML = popupData[type];
      gsap.to("#popup-bob", { autoAlpha: 1, duration: 0.3 });
    }
  });
});

document.querySelector(".close-btn").onclick = () =>
  gsap.to("#popup-bob", { autoAlpha: 0 });