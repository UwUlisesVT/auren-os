import Chart from 'chart.js/auto';

let expensesChart = null;
let monthlyChart = null;

export function renderFinanceCharts({
  expensesByCategory,
  transactionsByMonth,
}) {
  destroyCharts();

  renderExpensesChart(expensesByCategory);
  renderMonthlyChart(transactionsByMonth);
}

function renderExpensesChart(data) {
  const canvas = document.querySelector('#expenses-category-chart');

  if (!canvas || data.length === 0) return;

  expensesChart = new Chart(canvas, {
    type: 'doughnut',

    data: {
      labels: data.map((item) => item.category),

      datasets: [
        {
          data: data.map((item) => item.amount),
          borderWidth: 0,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    },
  });
}

function renderMonthlyChart(data) {
  const canvas = document.querySelector('#monthly-finance-chart');

  if (!canvas || data.length === 0) return;

  monthlyChart = new Chart(canvas, {
    type: 'bar',

    data: {
      labels: data.map((item) => formatMonth(item.month)),

      datasets: [
        {
          label: 'Ingresos',
          data: data.map((item) => item.income),
        },
        {
          label: 'Gastos',
          data: data.map((item) => item.expenses),
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function destroyCharts() {
  if (expensesChart) {
    expensesChart.destroy();
    expensesChart = null;
  }

  if (monthlyChart) {
    monthlyChart.destroy();
    monthlyChart = null;
  }
}

function formatMonth(month) {
  const [year, monthNumber] = month.split('-');

  const date = new Date(
    Number(year),
    Number(monthNumber) - 1
  );

  return new Intl.DateTimeFormat('es-MX', {
    month: 'short',
    year: 'numeric',
  }).format(date);
}