// ========================================
// لمّة - FINAL VERSION
// ========================================


// ========================================
// SETTINGS
// ========================================

// مدة جلسة التركيز: 5 ثواني
const FOCUS_SECONDS = 5;

// مدة الراحة: 5 ثواني
const BREAK_SECONDS = 5;

// عدد جلسات التركيز
const TOTAL_SESSIONS = 4;


// ========================================
// STATE
// ========================================

const state = {

  name:
    localStorage.getItem("lammaName") || "",

  session: 1,

  seconds: FOCUS_SECONDS,

  breakSeconds: BREAK_SECONDS,

  running: false,

  breakRunning: false,

  interval: null,

  breakInterval: null

};


// ========================================
// SCREENS
// ========================================

const screens = {

  login:
    document.getElementById("loginScreen"),

  focus:
    document.getElementById("focusScreen"),

  decision:
    document.getElementById("decisionScreen"),

  break:
    document.getElementById("breakScreen"),

  reward:
    document.getElementById("rewardScreen")

};


// ========================================
// ELEMENTS
// ========================================

const nameInput =
  document.getElementById("nameInput");

const startBtn =
  document.getElementById("startBtn");

const userGreeting =
  document.getElementById("userGreeting");

const sessionNumber =
  document.getElementById("sessionNumber");

const timerEl =
  document.getElementById("timer");

const pauseBtn =
  document.getElementById("pauseBtn");

const resetBtn =
  document.getElementById("resetBtn");

const continueBtn =
  document.getElementById("continueBtn");

const giveUpBtn =
  document.getElementById("giveUpBtn");

const skipBreakBtn =
  document.getElementById("skipBreakBtn");

const againBtn =
  document.getElementById("againBtn");

const rewardImage =
  document.getElementById("rewardImage");

const breakTimerEl =
  document.getElementById("breakTimer");


const pieces = [
  ...document.querySelectorAll(
    ".puzzle .piece"
  )
];


// ========================================
// SHOW SCREEN
// ========================================

function showScreen(name) {

  Object.values(screens).forEach(
    screen => {

      screen.classList.remove("active");

    }
  );

  screens[name].classList.add("active");

}


// ========================================
// UPDATE PUZZLE
// ========================================

function updateProgress() {

  sessionNumber.textContent =
    state.session;

  pieces.forEach(
    (piece, index) => {

      piece.classList.toggle(
        "active",

        index < state.session - 1

      );

    }
  );

}


// ========================================
// FORMAT TIME
// ========================================

function formatTime(seconds) {

  const minutes =
    Math.floor(seconds / 60);

  const secs =
    seconds % 60;

  return (
    String(minutes).padStart(2, "0")
    +
    ":"
    +
    String(secs).padStart(2, "0")
  );

}


// ========================================
// FOCUS TIMER
// ========================================

function renderTimer() {

  timerEl.textContent =
    formatTime(state.seconds);

}


function stopTimer() {

  clearInterval(
    state.interval
  );

  state.interval = null;

  state.running = false;

  pauseBtn.textContent =
    "استكمال";

}


function startTimer() {

  if (state.running) {
    return;
  }

  state.running = true;

  pauseBtn.textContent =
    "إيقاف مؤقت";

  state.interval =
    setInterval(
      () => {

        state.seconds--;

        renderTimer();

        if (
          state.seconds <= 0
        ) {

          stopTimer();

          completeSession();

        }

      },

      1000
    );

}


function resetTimer() {

  stopTimer();

  state.seconds =
    FOCUS_SECONDS;

  renderTimer();

}


// ========================================
// SESSION COMPLETE
// ========================================

function completeSession() {

  // لو خلص الأربع جلسات
  if (
    state.session === TOTAL_SESSIONS
  ) {

    showReward();

    return;

  }

  document.getElementById(
    "decisionTitle"
  ).textContent =
    `قطعة ${state.session} اتلمّت!`;

  document.getElementById(
    "decisionText"
  ).textContent =
    "خلصت جلسة كاملة. خُد 5 دقايق راحة قبل ما تكمل.";

  showScreen("decision");

}


// ========================================
// BREAK TIMER
// ========================================

function renderBreakTimer() {

  breakTimerEl.textContent =
    formatTime(
      state.breakSeconds
    );

}


function stopBreakTimer() {

  clearInterval(
    state.breakInterval
  );

  state.breakInterval = null;

  state.breakRunning = false;

}


function startBreak() {

  stopBreakTimer();

  state.breakSeconds =
    BREAK_SECONDS;

  renderBreakTimer();

  showScreen("break");

  state.breakRunning = true;

  state.breakInterval =
    setInterval(
      () => {

        state.breakSeconds--;

        renderBreakTimer();

        if (
          state.breakSeconds <= 0
        ) {

          stopBreakTimer();

          startNextSession();

        }

      },

      1000
    );

}


// ========================================
// NEXT SESSION
// ========================================

function startNextSession() {

  state.session++;

  updateProgress();

  resetTimer();

  showScreen("focus");

  startTimer();

}


// ========================================
// REWARD
// ========================================

function showReward() {

  const rewardNumber =
    Math.floor(
      Math.random() * 3
    ) + 1;

  rewardImage.src =
    `images/reward${rewardNumber}.jpg`;

  rewardImage.alt =
    `مكافأة لمّة رقم ${rewardNumber}`;

  showScreen("reward");

}


// ========================================
// START NEW LAMMA
// ========================================

function startNewLamma() {

  stopTimer();

  stopBreakTimer();

  state.session = 1;

  state.seconds =
    FOCUS_SECONDS;

  state.breakSeconds =
    BREAK_SECONDS;

  updateProgress();

  renderTimer();

  renderBreakTimer();

  showScreen("focus");

  startTimer();

}


// ========================================
// START BUTTON
// ========================================

startBtn.addEventListener(
  "click",
  () => {

    const name =
      nameInput.value.trim();

    if (!name) {

      nameInput.focus();

      return;

    }

    state.name =
      name;

    localStorage.setItem(
      "lammaName",
      name
    );

    userGreeting.textContent =
      `أهلًا ${name}`;

    startNewLamma();

  }
);


// ========================================
// PAUSE BUTTON
// ========================================

pauseBtn.addEventListener(
  "click",
  () => {

    if (state.running) {

      stopTimer();

    } else {

      startTimer();

    }

  }
);


// ========================================
// RESET BUTTON
// ========================================

resetBtn.addEventListener(
  "click",
  () => {

    resetTimer();

  }
);


// ========================================
// CONTINUE BUTTON
// ========================================

continueBtn.addEventListener(
  "click",
  () => {

    startBreak();

  }
);


// ========================================
// SKIP BREAK
// ========================================

skipBreakBtn.addEventListener(
  "click",
  () => {

    stopBreakTimer();

    startNextSession();

  }
);


// ========================================
// GIVE UP
// ========================================

giveUpBtn.addEventListener(
  "click",
  () => {

    stopTimer();

    stopBreakTimer();

    state.session = 1;

    resetTimer();

    updateProgress();

    showScreen("login");

    nameInput.value = "";

  }
);


// ========================================
// AGAIN
// ========================================

againBtn.addEventListener(
  "click",
  () => {

    startNewLamma();

  }
);


// ========================================
// INITIAL STATE
// ========================================

if (state.name) {

  userGreeting.textContent =
    `أهلًا ${state.name}`;

}

updateProgress();

renderTimer();

renderBreakTimer();