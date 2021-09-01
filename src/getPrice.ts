import { ftx } from "./ftx";
import { Response } from "./Response";

interface Market {
  name: string,
  enabled: true | false,
  postOnly: true | false,
  priceIncrement: number,
  sizeIncrement: number,
  minProvideSize: number,
  last: number,
  bid: number,
  ask: number,
  price: number,
  type: 'spot',
  baseCurrency: string,
  quoteCurrency: 'USD',
  underlying: null,
  restricted: true | false,
  highLeverageFeeExempt: true | false,
  change1h: number,
  change24h: number,
  changeBod: number,
  quoteVolume24h: number,
  volumeUsd24h: number
}

export async function getPrice(marketName: string): Promise<number> {
  const { success, result: market }: Response<Market> = await ftx.getMarket(marketName);

  if (!success) {
    throw new Error("could not get market");
  }

  if (!market?.price) {
    throw new Error("could not get price of eth")
  }

  return market?.price
}
