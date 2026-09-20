export function createDashboard() {
  return `
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

          <button class="primary-button">
            Crear objetivo
          </button>
        </div>
      </article>
    </section>

    <footer class="app-footer">
      <span>Auren OS · Proyecto #001</span>
      <span>v0.1.0</span>
    </footer>
  `;
}

export function initDashboard() {
  const currentDate = document.querySelector('#current-date');

  if (!currentDate) return;

  currentDate.textContent = new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'long'
  }).format(new Date());
}