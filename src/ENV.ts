import "dotenv/config"

const { 
  FTX_API_KEY, 
  FTX_API_SECRET, 
  FTX_CRYPTO_PAIR = "ETH/USD", 
  FTX_CRYPTO_AMOUNT = "0.001"
} = process.env

console.log({ FTX_API_KEY, 
  FTX_API_SECRET, 
  FTX_CRYPTO_PAIR, 
  FTX_CRYPTO_AMOUNT })

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

export { FTX_API_KEY, 
  FTX_API_SECRET, 
  FTX_CRYPTO_PAIR, 
  FTX_CRYPTO_AMOUNT }