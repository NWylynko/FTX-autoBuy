import { ftx } from "./ftx";
import { Response } from "./Response";

interface Balance {
  coin: string,
  total: number,
  free: number,
  availableWithoutBorrow: number,
  usdValue: number,
  spotBorrow: number
}

export async function getUSDBalance(): Promise<number> {
  const { success, result: balances = [] }: Response<Balance[]> = await ftx.getBalances();

  if (!success) {
    throw new Error("could not get balances");
  }

  const usdBalance = balances.find(balance => balance.coin === "USD");

  if (!usdBalance?.availableWithoutBorrow) {
    throw new Error("could not get available usd")
  }

  return usdBalance?.availableWithoutBorrow || 0;
}
