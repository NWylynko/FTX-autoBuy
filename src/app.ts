import { getUSDBalance } from "./getUSDBalance";
import { getPrice } from "./getPrice"
import { placeOrder } from "./placeOrder";

interface App {
  cryptoPair: string;
  cryptoAmount: string;
  action: "buy" | "sell"
}

export const app = async ({ cryptoPair, cryptoAmount, action }: App) => { 
  const balance = await getUSDBalance();
  const ethPrice = await getPrice(cryptoPair);

  const purchaseQuantity = parseFloat(cryptoAmount)
  const cost = purchaseQuantity * ethPrice;
  const enoughBalance = cost < balance;

  console.log('balance:', balance)
  console.log('ETH Price:', ethPrice)
  console.log('cost:', cost)
  console.log('enough balance:', enoughBalance)

  if (!enoughBalance) {
    throw new Error("not enough funds available")
  }

  const order = await placeOrder(cryptoPair, purchaseQuantity, action)
  console.log('order:', order)

  return { balance, ethPrice, cost, enoughBalance, order }
}
