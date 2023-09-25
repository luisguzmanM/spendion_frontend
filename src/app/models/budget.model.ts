export interface Budget {
  id_budget: number,
  title: string,
  amount: number,
  record: Record,
  progress?: number,
  spent?: number
  free?: number,
}

export interface Record {
  id: number,
  title: string,
  amount: number
}

export interface Transaction {
  id: string,
  desc: string,
  amount: number
}

export const TYPE_ELEMENT = {
  BUDGET: 'budget',
  EXPENSE: 'expense',
  INCOME: 'income'
}