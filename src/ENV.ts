import "dotenv/config"

const { 
  FTX_API_KEY,
  FTX_API_SECRET,
  API_SHARED_KEY
} = process.env

console.log({ 
  FTX_API_KEY, 
  FTX_API_SECRET,
  API_SHARED_KEY
})

if (!FTX_API_KEY) {
  throw new Error("FTX_API_KEY is not set")
}

if (!FTX_API_SECRET) {
  throw new Error("FTX_API_SECRET is not set")
}

if (!API_SHARED_KEY) {
  throw new Error("API_SHARED_KEY is not set")
}

export { 
  FTX_API_KEY, 
  FTX_API_SECRET,
  API_SHARED_KEY
 }