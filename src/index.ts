import "source-map-support/register"
import "dotenv/config"

import Axios from "axios"
import crypto from "crypto"

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

const axios = Axios.create({
  baseURL: FTX_REST_ENDPOINT
})

const getWallet = async () => {

  const timestamp =  Date.now()
  const method = "GET"
  const path = "/wallet/balances"

  const signatureHash = generateSignature({ timestamp, method, path })

  const headers = {
    "FTX-KEY": FTX_API_KEY,
    "FTX-TS": timestamp,
    "FTX-SIGN": signatureHash,
  }

  const { data } = await axios.get(path, { headers })

  return data
}

interface GenerateSignature {
  timestamp: number;
  method: string;
  path: string;
}

const generateSignature = ({timestamp, method, path}: GenerateSignature) => {
  const signature = `${timestamp}${method}${path}`

  console.log(signature)

  // SHA256 HMAC of the signature, using FTX_API_SECRET, as a hex string:
  const hmac = crypto.createHmac("sha256", FTX_API_SECRET)
  hmac.update(signature)
  const signatureHash = hmac.digest("hex")

  console.log({signatureHash})

  return signatureHash
}

(async () => console.log(await getWallet()))()
