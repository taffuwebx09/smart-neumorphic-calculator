'use strict';

const themeBtn = document.querySelector('#themeBtn');
const darkScreen = document.querySelector('#darkScreen');
const lightScreen = document.querySelector('#lightScreen');

const body = document.querySelector('body');
const smartClock = document.querySelector('.smart--watch');

/* ---------------- Theme Animation ---------------- */

const lightDarkTheme = (hideEl, showEl) => {
  hideEl.classList.add('exit');
  hideEl.classList.remove('active');

  showEl.classList.add('active');

  setTimeout(() => {
    hideEl.classList.add('no-anim');
    hideEl.classList.remove('exit');

    requestAnimationFrame(() => {
      hideEl.classList.remove('no-anim');
    });
  }, 450);
};

/* ---------------- Default Theme ---------------- */
/* ✅ AI NOTE: Default Light Mode */
let isDark = false;

// ✅ Apply default theme on load
calcThemeChange(isDark);

// ✅ Set correct toggle screen on load
if (isDark) {
  darkScreen.classList.add('active');
  lightScreen.classList.remove('active');
} else {
  lightScreen.classList.add('active');
  darkScreen.classList.remove('active');
}

/* ---------------- Theme Toggle ---------------- */

themeBtn.addEventListener('click', () => {
  if (darkScreen.classList.contains('active')) {
    // switching to LIGHT
    lightDarkTheme(darkScreen, lightScreen);
    isDark = false;
  } else {
    // switching to DARK
    lightDarkTheme(lightScreen, darkScreen);
    isDark = true;
  }

  calcThemeChange(isDark);
});

function calcThemeChange(isDark) {
  if (isDark) {
    body.classList.add('dark--mode');
    body.classList.remove('light--mode');
  } else {
    body.classList.add('light--mode');
    body.classList.remove('dark--mode');
  }
}

/* ---------------- Header Watch ---------------- */

const smartWatchUi = () => {
  const options = {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };

  setInterval(() => {
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(new Date());

    const getPart = (type) => parts.find((p) => p.type === type)?.value;

    smartClock.textContent = `${getPart('weekday')} : ${getPart(
      'hour'
    )} : ${getPart('minute')} : ${getPart('second')}`;
  }, 1000);
};

smartWatchUi();
