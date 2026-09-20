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
  const transactions = localStorage.getItem(STORAGE_KEY);

  if (!transactions) {
    return [];
  }

  return JSON.parse(transactions);
}

export function saveTransaction(transaction) {
  const transactions = getTransactions();

  transactions.push(transaction);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(transactions)
  );
}