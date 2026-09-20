
import './style.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="app-layout">

    <aside class="sidebar" id="sidebar">
      <div class="brand">
        <div class="brand-logo">A</div>
        <span class="brand-name">Auren OS</span>
      </div>

      <nav class="sidebar-nav">
        <p class="nav-section-title">Workspace</p>

        <a href="#" class="nav-item active">
          <span class="nav-icon">⌂</span>
          <span>Inicio</span>
        </a>

        <a href="#" class="nav-item">
          <span class="nav-icon">▣</span>
          <span>Finanzas</span>
        </a>

        <a href="#" class="nav-item">
          <span class="nav-icon">◇</span>
          <span>Objetivos</span>
        </a>

        <p class="nav-section-title">Sistema</p>

        <a href="#" class="nav-item">
          <span class="nav-icon">⚙</span>
          <span>Configuración</span>
        </a>
      </nav>

      <div class="sidebar-footer">
        <span class="status-dot"></span>
        <span>Sistema local</span>
      </div>
    </aside>

    <div class="main-wrapper">

      <header class="topbar">
        <button class="menu-button" id="menu-button" aria-label="Abrir menú">
          ☰
        </button>

        <div class="breadcrumb">
          <span class="breadcrumb-muted">Workspace</span>
          <span>/</span>
          <span>Inicio</span>
        </div>

        <div class="topbar-actions">
          <button class="icon-button" id="theme-toggle" aria-label="Cambiar tema">
            ☾
          </button>

          <div class="user-avatar">U</div>
        </div>
      </header>

      <main class="main-content">

        <section class="welcome-section">
          <div>
            <p class="eyebrow">TU ESPACIO PERSONAL</p>
            <h1>Bienvenido a <span>Auren</span>.</h1>
            <p class="welcome-description">
              Tus objetivos, tu ritmo, tus logros.
            </p>
          </div>

          <div class="welcome-date" id="current-date"></div>
        </section>

        <section class="stats-grid">

          <article class="stat-card">
            <div class="stat-card-header">
              <span class="stat-label">Balance</span>
              <span class="stat-icon">◈</span>
            </div>
            <p class="stat-value">$0.00</p>
            <p class="stat-description">Balance actual</p>
          </article>

          <article class="stat-card">
            <div class="stat-card-header">
              <span class="stat-label">Objetivos</span>
              <span class="stat-icon">◇</span>
            </div>
            <p class="stat-value">0</p>
            <p class="stat-description">Objetivos activos</p>
          </article>

          <article class="stat-card">
            <div class="stat-card-header">
              <span class="stat-label">Progreso</span>
              <span class="stat-icon">↗</span>
            </div>
            <p class="stat-value">0%</p>
            <p class="stat-description">Progreso general</p>
          </article>

        </section>

        <section class="dashboard-grid">

          <article class="dashboard-card main-card">
            <div class="card-header">
              <div>
                <p class="card-eyebrow">RESUMEN</p>
                <h2>Tu actividad</h2>
              </div>
              <span class="card-badge">V0.1</span>
            </div>

            <div class="empty-state">
              <div class="empty-state-icon">✦</div>
              <h3>Tu espacio está listo</h3>
              <p>
                Comienza a registrar tus objetivos y construye
                tu progreso poco a poco.
              </p>
            </div>
          </article>

          <article class="dashboard-card goals-card">
            <div class="card-header">
              <div>
                <p class="card-eyebrow">OBJETIVOS</p>
                <h2>Próximos objetivos</h2>
              </div>
            </div>

            <div class="empty-state compact">
              <div class="empty-state-icon">◇</div>
              <p>Aún no tienes objetivos registrados.</p>
              <button class="primary-button">Crear objetivo</button>
            </div>
          </article>

        </section>

        <footer class="app-footer">
          <span>Auren OS · Proyecto #001</span>
          <span>v0.1.0</span>
        </footer>

      </main>
    </div>
  </div>
`;

const currentDate = document.querySelector('#current-date');

currentDate.textContent = new Intl.DateTimeFormat('es-MX', {
  dateStyle: 'long'
}).format(new Date());

const themeToggle = document.querySelector('#theme-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');

  const isLight = document.body.classList.contains('light-theme');
  themeToggle.textContent = isLight ? '☀' : '☾';
});

const menuButton = document.querySelector('#menu-button');
const sidebar = document.querySelector('#sidebar');

menuButton.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-open');
});