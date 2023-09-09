export interface Budget {
  id_budget: number,
  title: string,
  amount: number,
  record: Record,
  available?: number,
  progress?: number,
  spent?: number
}

export interface Record {
  id: number,
  title: string,
  amount: number
}