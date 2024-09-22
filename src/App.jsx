import { useState } from 'react'
import './App.css'
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Portfolio from './pages/Portfolio'
import Activity from './pages/Activity'
import Wallet from './pages/Wallet'
import WithDrawal from './pages/Withdrawl'
import PaymentDetails from './pages/PaymentDetails'
import StockDetails from './pages/StockDetails'
import WatchList from './pages/Watchlist'
import Profile from './pages/Profile'
import SearchCoin from './pages/SearchCoin'
import NotFound from './pages/NotFound'
import Auth from './pages/Auth/Auth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Auth />
    { false && <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/withdrawal" element={<WithDrawal />} />
        <Route path="/payment_details" element={<PaymentDetails />} />
        <Route path="/stock_details" element={<StockDetails />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/market/:id" element={<StockDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchCoin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>}
    </>
  )
}

export default App
