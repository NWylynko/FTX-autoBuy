import { FTX_CRYPTO_PAIR, FTX_CRYPTO_AMOUNT } from "./ENV"

import { getUSDBalance } from "./getUSDBalance";
import { getPrice } from "./getPrice"
import { placeOrder } from "./placeOrder";

export const app = async () => { 
  const balance = await getUSDBalance();
  const ethPrice = await getPrice(FTX_CRYPTO_PAIR);

  const purchaseQuantity = parseFloat(FTX_CRYPTO_AMOUNT)
  const cost = purchaseQuantity * ethPrice;
  const enoughBalance = cost < balance;

  console.log('balance:', balance)
  console.log('ETH Price:', ethPrice)
  console.log('cost:', cost)
  console.log('enough balance:', enoughBalance)

  if (enoughBalance) {
    const order = await placeOrder(FTX_CRYPTO_PAIR, purchaseQuantity)
    console.log('order:', order)
  }

  process.exit();
}
