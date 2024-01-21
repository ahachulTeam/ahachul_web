import { Account } from "~/models/account";

export function setTerms({
  userId,
  termIds,
}: {
  userId: string;
  termIds: string[];
}) {
  return {
    userId,
    termIds,
  };
}

export async function getTerms(userId: string) {
  return { userId };
}

export function createAccount(newAccount: Account) {
  return { newAccount };
}

export async function getAccount(userId: string) {
  return {
    id: userId,
  };
}

export function updateAccountBalance(userId: string, balance: number) {
  return { userId, balance };
}

// termIds = [1, 2, 3] => [1, 3]
export function updateTerms(userId: string, termIds: string[]) {
  return { userId, termIds };
}
