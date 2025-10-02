import axios from 'axios'

export interface CryptoData {
  [coin: string]: { usd: number }
}

export const fetchCryptoPrice = async (coin: string): Promise<CryptoData> => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`
  const response = await axios.get<CryptoData>(url)
  console.log(response, "CRYPTO RESPONSE")
  return response.data
}
