import "source-map-support/register"
import "dotenv/config"

import { RestClient } from 'ftx-api';

const { 
  FTX_API_KEY, 
  FTX_API_SECRET, 
  FTX_CRYPTO_PAIR, 
  FTX_CRYPTO_AMOUNT,
  FTX_REST_ENDPOINT = "https://ftx.com/api"
} = process.env

console.log({ FTX_API_KEY, 
  FTX_API_SECRET, 
  FTX_CRYPTO_PAIR, 
  FTX_CRYPTO_AMOUNT,
  FTX_REST_ENDPOINT })

if (!FTX_API_KEY) {
  throw new Error("FTX_API_KEY is not set")
}

if (!FTX_API_SECRET) {
  throw new Error("FTX_API_SECRET is not set")
}

if (!FTX_CRYPTO_PAIR) {
  throw new Error("FTX_CRYPTO_PAIR is not set")
}

if (!FTX_CRYPTO_AMOUNT) {
  throw new Error("FTX_CRYPTO_AMOUNT is not set")
}

const ftx = new RestClient(
  FTX_API_KEY,
  FTX_API_SECRET,
);

interface Response<T> {
  success: false;
  error?: string;
  result?: T;
}

interface Balance {
  coin: string,
  total: number,
  free: number,
  availableWithoutBorrow: number,
  usdValue: number,
  spotBorrow: number
}

const getUSDBalance = async () => {
  const { success, result: balances = [] }: Response<Balance[]> = await ftx.getBalances()

  if (!success) {
    throw new Error("could not get balances")
  }

  const usdBalance = balances.find(balance => balance.coin === "USD")
  
  return usdBalance?.availableWithoutBorrow || 0
}