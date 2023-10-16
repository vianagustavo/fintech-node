export interface ITransactionModel {
  id: string;
  value: number;
  description: string;
  revertedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
