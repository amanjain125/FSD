import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, RefreshCw, Smartphone, Globe } from 'lucide-react'
// import './App.css'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false'
      )
      setData(response.data)
      setLastUpdated(new Date().toLocaleTimeString())
      setError(null)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to fetch market data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="gradient-text">Vite PWA</span> Market
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Real-time cryptocurrency market data tracked via CoinGecko API. 
            Installable as a PWA for offline access.
          </p>
        </motion.div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button 
            onClick={fetchData} 
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Updating...' : 'Sync Market'}
          </button>
          
          <div className="badge flex items-center gap-2">
            <Globe className="w-3 h-3" />
            Last Synced: {lastUpdated || 'Initialising...'}
          </div>
        </div>
      </header>

      {error && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="glass-card mb-8 text-red-400 border-red-500/30"
        >
          {error}
        </motion.div>
      )}

      <div className="market-grid">
        <AnimatePresence mode='popLayout'>
          {loading && data.length === 0 ? (
            [...Array(12)].map((_, i) => (
              <div key={i} className="glass-card h-48 animate-pulse bg-slate-800/50" />
            ))
          ) : (
            data.map((coin, index) => (
              <motion.div
                key={coin.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card crypto-card"
              >
                <div className="flex justify-between w-full items-center">
                  <div className="flex items-center gap-3">
                    <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
                    <div className="text-left">
                      <h3 className="font-bold text-lg leading-tight">{coin.name}</h3>
                      <span className="text-slate-500 uppercase text-xs font-semibold">{coin.symbol}</span>
                    </div>
                  </div>
                  <div className="badge">Rank #{coin.market_cap_rank}</div>
                </div>

                <div className="w-full text-left">
                  <div className="text-2xl font-bold tracking-tight">
                    ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className={`flex items-center gap-1 font-medium ${coin.price_change_percentage_24h >= 0 ? 'price-up' : 'price-down'}`}>
                    {coin.price_change_percentage_24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>

                <div className="w-full pt-4 border-t border-white/5 flex justify-between text-xs text-slate-500">
                  <span>Vol: ${coin.total_volume.toLocaleString()}</span>
                  <span>Cap: ${coin.market_cap.toLocaleString()}</span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <footer className="mt-20 border-t border-white/10 pt-8 pb-12 text-slate-500 flex flex-col items-center gap-4">
        <Smartphone className="w-6 h-6 opacity-30" />
        <p className="text-sm">
          Built with React + Vite + PWA Plugin for Mobile Installation
          <br />
          Ready for Netlify Deployment
        </p>
      </footer>
    </div>
  )
}

export default App
