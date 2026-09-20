export function createSidebar() {
  return `
    <div class="brand">
      <div class="brand-logo">A</div>
      <span class="brand-name">Auren OS</span>
    </div>

    <nav class="sidebar-nav">
      <p class="nav-section-title">Workspace</p>

      <a href="#" class="nav-item active" data-page="dashboard">
        <span class="nav-icon">⌂</span>
        <span>Inicio</span>
      </a>

      <a href="#" class="nav-item" data-page="finances">
        <span class="nav-icon">▣</span>
        <span>Finanzas</span>
      </a>

      <a href="#" class="nav-item" data-page="goals">
        <span class="nav-icon">◇</span>
        <span>Objetivos</span>
      </a>

      <p class="nav-section-title">Sistema</p>

      <a href="#" class="nav-item" data-page="settings">
        <span class="nav-icon">⚙</span>
        <span>Configuración</span>
      </a>
    </nav>

    <div class="sidebar-footer">
      <span class="status-dot"></span>
      <span>Sistema local</span>
    </div>
  `;
}