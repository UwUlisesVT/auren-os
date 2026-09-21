import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  saveTransaction,
  updateTransaction,
} from '../../services/transactionService.js';

import {
  getExpensesByCategory,
  getFinancialSummary,
  getSavingsRate,
  getTransactionsByMonth,
  getTransactionsByPeriod,
} from './financeAnalytics.js';

import {
  renderFinanceCharts,
} from './components/FinanceCharts.js';

function refreshFinances(filters = null) {
  const transactions = getTransactions();

  updateCategoryFilter(transactions);

  const periodTransactions =
    getTransactionsByPeriod(
      transactions,
      filters?.month ?? ''
    );

  const filteredTransactions = filters
    ? filterTransactions(transactions, filters)
    : transactions;

  const hasActiveFilters =
    filters &&
    (
      filters.search !== '' ||
      filters.type !== 'all' ||
      filters.category !== 'all' ||
      filters.month !== ''
    );

  renderTransactions(
    filteredTransactions,
    hasActiveFilters
  );

  updateFinanceSummary(periodTransactions);

  const expensesByCategory =
    getExpensesByCategory(periodTransactions);

  const transactionsByMonth =
    getTransactionsByMonth(periodTransactions);

  renderFinanceCharts({
    expensesByCategory,
    transactionsByMonth,
  });

  updateChartEmptyStates(
    expensesByCategory,
    transactionsByMonth
  );
}

export function createFinances() {
  return `
    <section class="page-header">
      <div>
        <p class="eyebrow">FINANZAS</p>
        <h1>Tu dinero, bajo control.</h1>
        <p class="welcome-description">
          Registra y comprende tus movimientos financieros.
        </p>
      </div>

      <button class="primary-button" id="new-transaction-button">
        + Nuevo movimiento
      </button>
    </section>

    <section class="transaction-form-card hidden" id="transaction-form-card">
  <div class="card-header">
    <div>
      <p class="card-eyebrow">NUEVO MOVIMIENTO</p>
      <h2>Registrar transacción</h2>
    </div>

    <button
      type="button"
      class="icon-button"
      id="close-transaction-form"
      aria-label="Cerrar formulario"
    >
      ✕
    </button>
  </div>

  <form id="transaction-form" class="transaction-form">
    <div class="form-group">
      <label for="transaction-type">Tipo</label>

      <select id="transaction-type" name="type" required>
        <option value="expense">Gasto</option>
        <option value="income">Ingreso</option>
      </select>
    </div>

    <div class="form-group">
      <label for="transaction-amount">Monto</label>

      <input
        type="number"
        id="transaction-amount"
        name="amount"
        min="0.01"
        step="0.01"
        placeholder="0.00"
        required
      >
    </div>

    <div class="form-group">
      <label for="transaction-category">Categoría</label>

      <input
        type="text"
        id="transaction-category"
        name="category"
        placeholder="Ej. Comida"
        required
      >
    </div>

    <div class="form-group">
      <label for="transaction-description">Descripción</label>

      <input
        type="text"
        id="transaction-description"
        name="description"
        placeholder="Ej. Supermercado"
        required
      >
    </div>

    <div class="form-group">
      <label for="transaction-date">Fecha</label>

      <input
        type="date"
        id="transaction-date"
        name="date"
        required
      >
    </div>

    <div class="form-actions">
      <button type="submit" class="primary-button">
        Guardar movimiento
      </button>
    </div>
  </form>
</section>

<section class="stats-grid">
  <article class="stat-card">
    <div class="stat-card-header">
      <span class="stat-label">Balance</span>
        <span class="stat-icon">◈</span>
      </div>

      <p class="stat-value" id="finance-balance">$0.00</p>
      <p class="stat-description">Balance actual</p>
    </article>

    <article class="stat-card">
      <div class="stat-card-header">
        <span class="stat-label">Ingresos</span>
        <span class="stat-icon">↗</span>
      </div>

      <p class="stat-value" id="finance-income">$0.00</p>
      <p class="stat-description">Ingresos registrados</p>
    </article>

    <article class="stat-card">
      <div class="stat-card-header">
        <span class="stat-label">Gastos</span>
        <span class="stat-icon">↘</span>
      </div>

      <p class="stat-value" id="finance-expenses">$0.00</p>
      <p class="stat-description">Gastos registrados</p>
    </article>

    <article class="stat-card">
      <div class="stat-card-header">
        <span class="stat-label">Tasa de ahorro</span>
        <span class="stat-icon">◎</span>
      </div>

      <p class="stat-value" id="finance-savings-rate">0%</p>
      <p class="stat-description">Porcentaje de ingresos conservado</p>
    </article>
  </section>

    <section class="finance-charts-grid">
  <article class="dashboard-card chart-card">
    <div class="card-header">
      <div>
        <p class="card-eyebrow">DISTRIBUCIÓN</p>
        <h2>Gastos por categoría</h2>
      </div>
    </div>

    <div class="chart-container">
      <canvas id="expenses-category-chart"></canvas>

      <div
        class="chart-empty-state hidden"
        id="expenses-chart-empty"
      >
        Aún no hay gastos para analizar.
      </div>
    </div>
  </article>

  <article class="dashboard-card chart-card">
    <div class="card-header">
      <div>
        <p class="card-eyebrow">TENDENCIA</p>
        <h2>Ingresos vs. gastos</h2>
      </div>
    </div>

    <div class="chart-container">
      <canvas id="monthly-finance-chart"></canvas>

      <div
        class="chart-empty-state hidden"
        id="monthly-chart-empty"
      >
        Aún no hay movimientos para analizar.
      </div>
    </div>
  </article>
</section>

    <section class="dashboard-card transactions-card">
      <div class="card-header">
        <div>
          <p class="card-eyebrow">MOVIMIENTOS</p>
          <h2>Actividad reciente</h2>
        </div>
      </div>

      <div class="transaction-filters">
        <div class="filter-search">
          <label for="transaction-search">Buscar</label>
          <input
            type="search"
            id="transaction-search"
            placeholder="Buscar movimiento..."
            autocomplete="off"
          >
        </div>

        <div class="filter-group">
          <label for="transaction-month-filter">Período</label>

          <input
            type="month"
            id="transaction-month-filter"
          >
          <button
            type="button"
            class="clear-period-button"
            id="clear-period-button"
          >
            Todos
          </button>
        </div>

        <div class="filter-group">
          <label for="transaction-type-filter">Tipo</label>

          <select id="transaction-type-filter">
            <option value="all">Todos</option>
            <option value="income">Ingresos</option>
            <option value="expense">Gastos</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="transaction-category-filter">Categoría</label>

          <select id="transaction-category-filter">
            <option value="all">Todas</option>
          </select>
        </div>
</div>

      <div id="transactions-container"></div>
    </section>
  `;
}

export function initFinances() {
  let editingTransactionId = null;
  const filters = {
    search: '',
    type: 'all',
    category: 'all',
    month: '',
  };

  const monthFilter =
    document.querySelector('#transaction-month-filter');

  monthFilter.addEventListener('change', () => {
    filters.month = monthFilter.value;

    refreshFinances(filters);
  });

  const clearPeriodButton =
    document.querySelector('#clear-period-button');
  
  clearPeriodButton.addEventListener('click', () => {
    filters.month = '';
    monthFilter.value = '';
  
    refreshFinances(filters);
  });

  refreshFinances(filters);

  const newTransactionButton =
    document.querySelector('#new-transaction-button');

  const closeTransactionForm =
    document.querySelector('#close-transaction-form');

  const transactionFormCard =
    document.querySelector('#transaction-form-card');

  const transactionForm =
    document.querySelector('#transaction-form');

  const transactionDate =
    document.querySelector('#transaction-date');

  const searchInput =
    document.querySelector('#transaction-search');

  const typeFilter =
    document.querySelector('#transaction-type-filter');

  const categoryFilter =
    document.querySelector('#transaction-category-filter');

  transactionDate.value = getTodayDate();

  newTransactionButton.addEventListener('click', () => {
    editingTransactionId = null;

    transactionForm.reset();
    transactionDate.value = getTodayDate();

    transactionFormCard.classList.remove('hidden');
  });

  closeTransactionForm.addEventListener('click', () => {
    editingTransactionId = null;

    transactionForm.reset();
    transactionDate.value = getTodayDate();

    transactionFormCard.classList.add('hidden');
  });

  transactionForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(transactionForm);

    const transactionData = {
      type: formData.get('type'),
      amount: formData.get('amount'),
      category: formData.get('category'),
      description: formData.get('description'),
      date: formData.get('date'),
    };

    if (editingTransactionId) {
      updateTransaction(
        editingTransactionId,
        transactionData
    );

    editingTransactionId = null;
  } else {
    const transaction = createTransaction(transactionData);

    saveTransaction(transaction);
  }

    refreshFinances(filters);

    transactionForm.reset();
    transactionDate.value = getTodayDate();

    transactionFormCard.classList.add('hidden');
  });
  const transactionsContainer = document.querySelector('#transactions-container');

  transactionsContainer.addEventListener('click', (event) => {
    const editButton = event.target.closest(
      '.edit-transaction-button'
    );

    searchInput.addEventListener('input', () => {
  filters.search = searchInput.value.trim().toLowerCase();

  refreshFinances(filters);
});

typeFilter.addEventListener('change', () => {
  filters.type = typeFilter.value;

  refreshFinances(filters);
});

categoryFilter.addEventListener('change', () => {
  filters.category = categoryFilter.value;

  refreshFinances(filters);
});

if (editButton) {
  const transactionId = editButton.dataset.id;

  const transactions = getTransactions();

  const transaction = transactions.find(
    (transaction) => transaction.id === transactionId
  );

  if (!transaction) return;

  editingTransactionId = transaction.id;

  transactionForm.elements.type.value = transaction.type;
  transactionForm.elements.amount.value = transaction.amount;
  transactionForm.elements.category.value = transaction.category;
  transactionForm.elements.description.value = transaction.description;
  transactionForm.elements.date.value = transaction.date;

  transactionFormCard.classList.remove('hidden');

  return;
}
  const deleteButton = event.target.closest(
    '.delete-transaction-button'
  );

    if (!deleteButton) return;
  
    const transactionId = deleteButton.dataset.id;
  
    const shouldDelete = window.confirm(
      '¿Seguro que quieres eliminar este movimiento?'
    );
  
    if (!shouldDelete) return;
  
    deleteTransaction(transactionId);
  
    refreshFinances(filters);
  });
}

function filterTransactions(transactions, filters) {
  return transactions.filter((transaction) => {
    const description = transaction.description.toLowerCase();
    const category = transaction.category.toLowerCase();

    const matchesSearch =
      description.includes(filters.search) ||
      category.includes(filters.search);

    const matchesType =
      filters.type === 'all' ||
      transaction.type === filters.type;

    const matchesCategory =
      filters.category === 'all' ||
      transaction.category === filters.category;
    
    const matchesMonth =
      filters.month === '' ||
      transaction.date.startsWith(filters.month);

    return (
      matchesSearch &&
      matchesType &&
      matchesCategory &&
      matchesMonth
    );
  });
}

function updateCategoryFilter(transactions) {
  const categoryFilter =
    document.querySelector('#transaction-category-filter');

  if (!categoryFilter) return;

  const currentValue = categoryFilter.value;

  const categories = [
    ...new Set(
      transactions.map(
        (transaction) => transaction.category
      )
    ),
  ].sort();

  categoryFilter.innerHTML = `
    <option value="all">Todas</option>

    ${categories
      .map(
        (category) => `
          <option value="${category}">
            ${category}
          </option>
        `
      )
      .join('')}
  `;

  if (categories.includes(currentValue)) {
    categoryFilter.value = currentValue;
  }
}

function renderTransactions(transactions, hasActiveFilters = false) {
  const container = document.querySelector("#transactions-container");

  if (!container) return;

  if (transactions.length === 0) {
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">
        ${hasActiveFilters ? '⌕' : '◈'}
      </div>

      <h3>
        ${
          hasActiveFilters
            ? 'No encontramos movimientos'
            : 'Aún no tienes movimientos'
        }
      </h3>

      <p>
        ${
          hasActiveFilters
            ? 'Prueba modificando los filtros de búsqueda.'
            : 'Registra tu primer ingreso o gasto para comenzar a construir tu historial financiero.'
        }
      </p>
    </div>
  `;

  return;
}

  container.innerHTML = transactions
  .map((transaction) => {
    const isIncome = transaction.type === 'income';
    const sign = isIncome ? '+' : '-';

    return `
      <div class="transaction-item">
        <div class="transaction-info">
          <div
            class="transaction-type-icon ${
              isIncome ? 'income' : 'expense'
            }"
          >
            ${isIncome ? '↗' : '↘'}
          </div>

          <div>
            <strong>${transaction.description}</strong>

            <p>
              ${transaction.category}
              ·
              ${formatDate(transaction.date)}
            </p>
          </div>
        </div>

        <div class="transaction-actions">
          <strong class="transaction-amount ${
            isIncome ? 'income' : 'expense'
          }">
            ${sign}${formatCurrency(transaction.amount)}
          </strong>

          <button
            type="button"
            class="edit-transaction-button"
            data-id="${transaction.id}"
            aria-label="Editar ${transaction.description}"
            title="Editar movimiento"
          >
            ✎
          </button>
          
          <button
            type="button"
            class="delete-transaction-button"
            data-id="${transaction.id}"
            aria-label="Eliminar ${transaction.description}"
            title="Eliminar movimiento"
          >
            ✕
          </button>
        </div>
      </div>
    `;
  })
  .join('');
}

function updateFinanceSummary(transactions) {
  const {
    income,
    expenses,
    balance,
  } = getFinancialSummary(transactions);

  const savingsRate = getSavingsRate(transactions);

  document.querySelector('#finance-income').textContent =
    formatCurrency(income);

  document.querySelector('#finance-expenses').textContent =
    formatCurrency(expenses);

  document.querySelector('#finance-balance').textContent =
    formatCurrency(balance);

  document.querySelector('#finance-savings-rate').textContent =
    formatPercentage(savingsRate);

  const savingsRateElement =
    document.querySelector('#finance-savings-rate');

  savingsRateElement.classList.toggle(
    'positive',
    savingsRate > 0
  );

  savingsRateElement.classList.toggle(
    'negative',
    savingsRate < 0
  );
}

function formatPercentage(value) {
  return new Intl.NumberFormat('es-MX', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount);
}

function getTodayDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function formatDate(date) {
  if (!date) return 'Sin fecha';

  const [year, month, day] = date.split('-');

  const localDate = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );

  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(localDate);
}

function updateChartEmptyStates(
  expensesByCategory,
  transactionsByMonth
) {
  const expensesCanvas =
    document.querySelector('#expenses-category-chart');

  const expensesEmpty =
    document.querySelector('#expenses-chart-empty');

  const monthlyCanvas =
    document.querySelector('#monthly-finance-chart');

  const monthlyEmpty =
    document.querySelector('#monthly-chart-empty');

  const hasExpenses = expensesByCategory.length > 0;
  const hasMonthlyData = transactionsByMonth.length > 0;

  expensesCanvas.classList.toggle('hidden', !hasExpenses);
  expensesEmpty.classList.toggle('hidden', hasExpenses);

  monthlyCanvas.classList.toggle('hidden', !hasMonthlyData);
  monthlyEmpty.classList.toggle('hidden', hasMonthlyData);
}