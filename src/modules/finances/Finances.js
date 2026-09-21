import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  saveTransaction,
  updateTransaction,
} from '../../services/transactionService.js';

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
    </section>

    <section class="dashboard-card transactions-card">
      <div class="card-header">
        <div>
          <p class="card-eyebrow">MOVIMIENTOS</p>
          <h2>Actividad reciente</h2>
        </div>
      </div>

      <div id="transactions-container"></div>
    </section>
  `;
}

export function initFinances() {
  let editingTransactionId = null;
  const transactions = getTransactions();

  renderTransactions(transactions);
  updateFinanceSummary(transactions);

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

    const updatedTransactions = getTransactions();

    renderTransactions(updatedTransactions);
    updateFinanceSummary(updatedTransactions);

    transactionForm.reset();
    transactionDate.value = getTodayDate();

    transactionFormCard.classList.add('hidden');
  });
  const transactionsContainer = document.querySelector('#transactions-container');

  transactionsContainer.addEventListener('click', (event) => {
    const editButton = event.target.closest(
  '.edit-transaction-button'
);

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

  const updatedTransactions = getTransactions();

  renderTransactions(updatedTransactions);
  updateFinanceSummary(updatedTransactions);
});
}

function renderTransactions(transactions) {
  const container = document.querySelector("#transactions-container");

  if (!container) return;

  if (transactions.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">◈</div>

        <h3>Aún no tienes movimientos</h3>

        <p>
          Registra tu primer ingreso o gasto para comenzar
          a construir tu historial financiero.
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
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = income - expenses;

  document.querySelector("#finance-income").textContent =
    formatCurrency(income);

  document.querySelector("#finance-expenses").textContent =
    formatCurrency(expenses);

  document.querySelector("#finance-balance").textContent =
    formatCurrency(balance);
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