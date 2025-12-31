/* -----------------------------------------------------------
   LOAD SHARED HTML COMPONENTS (header, nav, footer)
----------------------------------------------------------- */
function loadHTML(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${file}`);
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (file.includes("nav")) positionNav();
    })
    .catch(err => console.error(err));
}

/* -----------------------------------------------------------
   NAVIGATION: HAMBURGER MENU TOGGLE
----------------------------------------------------------- */
function toggleMenu() {
  const menu = document.querySelector('.nav-menu');
  if (menu) menu.classList.toggle('show');
}

/* -----------------------------------------------------------
   NAVIGATION: POSITION NAV BELOW HEADER
----------------------------------------------------------- */
function positionNav() {
  const header = document.getElementById('site-header');
  const nav = document.getElementById('site-nav');

  if (header && nav) {
    nav.style.top = header.offsetHeight + 'px';
  }
}

/* Recalculate nav position on load + resize */
window.addEventListener('load', positionNav);
window.addEventListener('resize', positionNav);

/* -----------------------------------------------------------
   RECIPES PAGE: TAB SWITCHING (Picture / Ingredients / Method)
----------------------------------------------------------- */
function openTab(evt, tabId) {
  const card = evt.currentTarget.closest('.tab-card');
  const tabs = card.querySelectorAll('.tab-content');
  const buttons = card.querySelectorAll('.tab-link');

  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  card.querySelector('#' + tabId).classList.add('active');
  evt.currentTarget.classList.add('active');
}

/* -----------------------------------------------------------
   RECIPES PAGE: SEASONAL FILTERING (Winter / Summer / BBQ)
----------------------------------------------------------- */
function filterRecipes(seasonId) {
  const groups = document.querySelectorAll('.recipe-group');
  const buttons = document.querySelectorAll('.filter-btn');

  groups.forEach(group => group.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(seasonId).classList.add('active');
  document
    .querySelector(`.filter-btn[onclick*="${seasonId}"]`)
    .classList.add('active');
}

/* -----------------------------------------------------------
   INITIALISE INCLUDES IF PLACEHOLDERS EXIST
----------------------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('header-placeholder')) {
    loadHTML('header-placeholder', 'header.html');
  }
  if (document.getElementById('nav-placeholder')) {
    loadHTML('nav-placeholder', 'nav.html');
  }
  if (document.getElementById('footer-placeholder')) {
    loadHTML('footer-placeholder', 'footer.html');
  }
});