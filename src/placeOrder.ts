import { ftx } from "./ftx";
import { Response } from "./Response";

interface Order {
  createdAt: string;
  filledSize: number;
  future: string;
  id: number;
  market: string;
  price: number;
  remainingSize: number;
  side: "sell";
  size: number;
  status: "open";
  type: "limit" | "market";
  reduceOnly: true | false;
  ioc: true | false;
  postOnly: true | false;
  clientId: null;
}

export async function placeOrder(
  market: string = "ETH/USD",
  size: number = 0.001,
  side: "buy" | "sell" = "buy"
): Promise<Order | undefined> {
  const { success, result: order }: Response<Order> = await ftx.placeOrder({
    market,
    side,
    price: null,
    type: "market",
    size,
  });

  if (!success) {
    throw new Error("could not place order");
  }

  return order;
}
