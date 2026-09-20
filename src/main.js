import './style.css';
import { createApp } from './app.js';
import { navigateTo } from './services/router.js';

const app = document.querySelector('#app');

app.innerHTML = createApp();
navigateTo('dashboard');

/* Tema */

const themeToggle = document.querySelector('#theme-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');

  const isLight = document.body.classList.contains('light-theme');

  themeToggle.textContent = isLight ? '☀' : '☾';
});

/* Menú responsive */

const menuButton = document.querySelector('#menu-button');
const sidebar = document.querySelector('#sidebar');

menuButton.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-open');
});

/* Navegación */

const navItems = document.querySelectorAll('.nav-item');

navItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();

    const page = item.dataset.page;

    navigateTo(page);
  });
});