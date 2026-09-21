export function getFinancialSummary(transactions) {
  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

  return {
    income,
    expenses,
    balance: income - expenses,
  };
}

export function getExpensesByCategory(transactions) {
  const expenses = transactions.filter(
    (transaction) => transaction.type === 'expense'
  );

  const categories = expenses.reduce((result, transaction) => {
    const category = transaction.category;

    if (!result[category]) {
      result[category] = 0;
    }

    result[category] += transaction.amount;

    return result;
  }, {});

  return Object.entries(categories)
    .map(([category, amount]) => ({
      category,
      amount,
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function getTransactionsByMonth(transactions) {
  const months = {};

  transactions.forEach((transaction) => {
    const month = transaction.date.slice(0, 7);

    if (!months[month]) {
      months[month] = {
        month,
        income: 0,
        expenses: 0,
      };
    }

    if (transaction.type === 'income') {
      months[month].income += transaction.amount;
    }

    if (transaction.type === 'expense') {
      months[month].expenses += transaction.amount;
    }
  });

  return Object.values(months).sort(
    (a, b) => a.month.localeCompare(b.month)
  );
}

export function getSavingsRate(transactions) {
  const { income, expenses } =
    getFinancialSummary(transactions);

  if (income === 0) {
    return 0;
  }

  return ((income - expenses) / income) * 100;
}