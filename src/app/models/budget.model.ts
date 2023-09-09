export interface Budget {
  id_budget: number,
  title: string,
  amount: number,
  record: Record
}

export interface Record {
  id: number,
  title: string,
  amount: number
}