import React, { useEffect, useState } from 'react'
import { fetchCryptoPrice } from '../../apis/cryptoApi'

interface Props {
  coin: string
}

export default function CryptoWidget({ coin }: Props) {
  const [price, setPrice] = useState<number | null>(null)

  useEffect(() => {
    fetchCryptoPrice(coin)
      .then(data => {
        setPrice(data[coin]?.usd ?? null)
      })
      .catch(console.error)
  }, [coin])

  if (price === null) return <div className="widget">Loading crypto price</div>

  return (
    <div className="widget crypto-widget">
      <h3>Crypto Price - {coin}</h3>
      <p>USD ${price}</p>
    </div>
  )
}
