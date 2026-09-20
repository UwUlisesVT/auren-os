export function createHeader() {
  return `
    <button class="menu-button" id="menu-button" aria-label="Abrir menú">
      ☰
    </button>

    <div class="breadcrumb">
      <span class="breadcrumb-muted">Workspace</span>
      <span>/</span>
      <span>Inicio</span>
    </div>

    <div class="topbar-actions">
      <button
        class="icon-button"
        id="theme-toggle"
        aria-label="Cambiar tema"
      >
        ☾
      </button>

      <div class="user-avatar">U</div>
    </div>
  `;
}