export interface IGetAccountBalance {
  execute(accountId: string, personId: string): Promise<{ balance: number }>;
}
