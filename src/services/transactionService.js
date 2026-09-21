const STORAGE_KEY = 'auren_transactions';

export function createTransaction({
  type,
  amount,
  category,
  description,
  date,
}) {
  return {
    id: crypto.randomUUID(),
    type,
    amount: Number(amount),
    category,
    description,
    date,
    createdAt: new Date().toISOString(),
  };
}

export function getTransactions() {
  const storedTransactions = localStorage.getItem(STORAGE_KEY);

  if (!storedTransactions) {
    return [];
  }

  try {
    const transactions = JSON.parse(storedTransactions);

    return Array.isArray(transactions)
      ? transactions
      : [];
  } catch (error) {
    console.error(
      'No fue posible leer las transacciones almacenadas.',
      error
    );

    return [];
  }
}

export function saveTransaction(transaction) {
  const transactions = getTransactions();

  transactions.push(transaction);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(transactions)
  );
}

export function deleteTransaction(id) {
  const transactions = getTransactions();

  const updatedTransactions = transactions.filter(
    (transaction) => transaction.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedTransactions)
  );
}

export function updateTransaction(id, updatedData) {
  const transactions = getTransactions();

  const updatedTransactions = transactions.map((transaction) => {
    if (transaction.id !== id) {
      return transaction;
    }

    return {
      ...transaction,
      ...updatedData,
      amount: Number(updatedData.amount),
    };
  });

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedTransactions)
  );
}