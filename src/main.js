import './style.css';
import { createApp } from './app.js';

const app = document.querySelector('#app');

app.innerHTML = createApp();

/* Fecha actual */

const currentDate = document.querySelector('#current-date');

currentDate.textContent = new Intl.DateTimeFormat('es-MX', {
  dateStyle: 'long'
}).format(new Date());

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