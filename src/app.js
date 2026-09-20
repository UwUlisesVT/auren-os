import { createSidebar } from './components/sidebar/Sidebar.js';
import { createHeader } from './components/header/Header.js';
import { createDashboard } from './modules/dashboard/Dashboard.js';

export function createApp() {
  return `
    <div class="app-layout">

      <aside class="sidebar" id="sidebar">
        ${createSidebar()}
      </aside>

      <div class="main-wrapper">

        <header class="topbar" id="header">
          ${createHeader()}
        </header>

        <main class="main-content" id="main-content">
          ${createDashboard()}
        </main>

      </div>

    </div>
  `;
}