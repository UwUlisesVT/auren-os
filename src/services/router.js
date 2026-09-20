import {
  createDashboard,
  initDashboard
} from '../modules/dashboard/Dashboard.js';
import { createFinances } from '../modules/finances/Finances.js';
import { createGoals } from '../modules/goals/Goals.js';
import { createSettings } from '../modules/settings/Settings.js';

const routes = {
  dashboard: {
    render: createDashboard,
    init: initDashboard,
  },

  finances: {
    render: createFinances,
  },

  goals: {
    render: createGoals,
  },

  settings: {
    render: createSettings,
  },
};

export function navigateTo(page) {
  const mainContent = document.querySelector('#main-content');

  const route = routes[page];

if (!route) {
  console.error(`La página "${page}" no existe.`);
  return;
}

mainContent.innerHTML = route.render();

if (route.init) {
  route.init();
}

updateActiveNavigation(page);

closeMobileSidebar();
}

function updateActiveNavigation(page) {
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach((item) => {
    item.classList.toggle(
      'active',
      item.dataset.page === page
    );
  });
}

function closeMobileSidebar() {
  const sidebar = document.querySelector('#sidebar');

  sidebar?.classList.remove('sidebar-open');
}