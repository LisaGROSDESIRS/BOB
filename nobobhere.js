gsap.registerPlugin(ScrambleTextPlugin, SplitText, ScrollTrigger);

// --- VARIABLES GLOBALES (On ne les déclare qu'une seule fois !) ---
const audio = document.getElementById("bg-music");
const playBtn = document.getElementById("play-btn");
const playLink = playBtn ? playBtn.querySelector("a") : null;
const l1 = document.getElementById("lyric-1");
const l2 = document.getElementById("lyric-2");
const l3 = document.getElementById("lyric-3");

const lyrics = [
  { time: 0, text: ["THIS AIN'T", "BUILD A", "DEV GIRL"] },
  { time: 5, text: ["THIS AIN'T", "BUILD A", "DEV GIRL"] },
  { time: 7, text: ["U DON'T", "GET TO", "CHOOSE"] },
  { time: 8.5, text: ["DIFFERENT", " A-- AND", "BIGGER"] },
  { time: 10.3, text: ["CHEESSST", "IF MY", "EYESSSSS"] },
  { time: 12, text: ["ARE", "BROWN ", "OR BLUE"] },
  { time: 14, text: ["THIS AIN'T", "BUILD A", "DEV GIRL"] },
];

/* -----------------------------------------------------------
   1. ANIMATIONS INITIALES
----------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // --- LE BLOC SCRAMBLE AU SCROLL (À METTRE ICI) ---
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".console-logs",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })
    .to("#scramble-text-1", {
      duration: 3,
      scrambleText: {
        text: "[COMPILER_ERROR] Conflict: Variable 'Quiet' paired with 'Compete()'.  [SYSTEM_LOG] status: Too quiet to compete? [SYSTEM_LOG] result: False. Code speaks louder than silence.",
        chars: "01",
        speed: 0.3,
      },
    })
    .to(
      "#scramble-text-2",
      {
        duration: 3,
        scrambleText: {
          text: "[PERMISSION_DENIED] Access Error: 'Soft' cannot execute 'Lead_Meeting.exe'.[SYSTEM_LOG] status: Too soft to lead?[SYSTEM_LOG] result: Error. Leadership is not defined by volume.",
          chars: "01",
          speed: 0.3,
        },
      },
      "-=2.2"
    )
    .to(
      "#scramble-text-3",
      {
        duration: 3,
        scrambleText: {
          text: "[DATA_CORRUPTION] Invalid Link: 'Nice' is incompatible with 'Elite_Status'.[SYSTEM_LOG] status: Too nice to be elite?[SYSTEM_LOG] result: Logic failure. Kindness is a feature, not a bug.",
          chars: "01",
          speed: 0.3,
        },
      },
      "-=2.2"
    );

  // --- TON MARQUEE (Peut rester à la suite) ---
  gsap.to(".udontchoose", {
    xPercent: -50,
    ease: "none",
    duration: 15,
    repeat: -1,
  });
}); //

/* -----------------------------------------------------------
   2. SYNCHRO LYRICS
----------------------------------------------------------- */
let currentLine = -1;

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const index = lyrics.findLastIndex((l) => l.time <= currentTime);

  if (index !== currentLine && index !== -1) {
    currentLine = index;
    const data = lyrics[index];

    const tl = gsap.timeline();
    tl.to(".nothinkingbob p", {
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.2,
    })
      .add(() => {
        if (l1) l1.innerText = data.text[0];
        if (l2) l2.innerText = data.text[1];
        if (l3) l3.innerText = data.text[2];
      })
      .to(".nothinkingbob p", {
        opacity: 0.3,
        filter: "blur(0px)",
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out",
      });
  }
});

/* -----------------------------------------------------------
   3. POP UP & GLITCH
----------------------------------------------------------- */
const popupData = {
  SOUND:
    "LYRICS BY: Lisa GROS-DESIRS <br> Sample: MUREKA.AI <br> REMIX OF: BUILD A BITCH BY BELLA POARCH",
  CREDIT: "DESIGNED BY: Lisa GROS-DESIRS <br> ENGINE: GSAP 3.14",
  CONTACT: "SIGNAL LOST... Find me: Lisagd.fr",
};

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const type = e.target.textContent;
    if (popupData[type]) {
      e.preventDefault();
      document.querySelector("#popup-title").innerText = type;
      document.querySelector("#popup-body").innerHTML = popupData[type];
      gsap.to("#popup-me", { autoAlpha: 1, duration: 0.3 });
    }
  });
});

document.querySelector(".close-btn").onclick = () =>
  gsap.to("#popup-me", { autoAlpha: 0 });

/* -----------------------------------------------------------
   4. AUDIO CONTROL (Play/Mute/Auto)
----------------------------------------------------------- */
function setAudioState(isPlaying) {
  if (playLink) playLink.innerText = isPlaying ? "MUTE" : "PLAY";
  gsap.to(playBtn, { color: isPlaying ? "#00ff00" : "white", duration: 0.3 });
}

window.addEventListener("load", () => {
  audio
    .play()
    .then(() => setAudioState(true))
    .catch(() => console.log("Waiting for click"));
});

if (playBtn) {
  playBtn.addEventListener("click", (e) => {
    e.preventDefault();
    audio.paused
      ? (audio.play(), setAudioState(true))
      : (audio.pause(), setAudioState(false));
  });
}

document.body.addEventListener(
  "click",
  () => {
    if (audio.paused) audio.play().then(() => setAudioState(true));
  },
  { once: true }
);

// Dans nobobhere.js, ajoute ceci dans ta section AUDIO CONTROL

const volumeSlider = document.getElementById("volume-slider");

// Initialisation du volume au chargement
audio.volume = 0.3;

// Ecouteur pour le changement de volume
if (volumeSlider) {
  volumeSlider.addEventListener("input", (e) => {
    audio.volume = e.target.value;
  });

  // Empêche le clic sur le slider de déclencher le bouton PLAY (Pause/Play)
  volumeSlider.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

/* -----------------------------------------------------------
   5. GESTION DU BOUTON FIX & GLITCH
----------------------------------------------------------- */
const fixBtn = document.querySelector(".fix-btn");
const body = document.body;

if (fixBtn) {
  fixBtn.addEventListener("click", () => {
    // On ajoute la classe qui déclenche l'animation CSS @keyframes glitchAnim
    body.classList.add("glitch-active");

    // On retire la classe après 500ms pour arrêter le tremblement
    setTimeout(() => {
      body.classList.remove("glitch-active");
    }, 500);
  });
}
