import { useContext, useEffect, useState } from 'react'
import './App.css'
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import { Routes, Route, useNavigate } from 'react-router-dom'
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
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './store/Auth/action'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/ui/loader'
import { jwtTokenStr } from './constants'
import Payment from './Payment'
import { loaderContext } from './context'

const endpoints = [
  {path: '/auth/:type', component: <Auth />, isPublic: true},
  {path: '/', component: <Home />, isPublic: false},
  {path: '/portfolio', component: <Portfolio />, isPublic: false},
  {path: '/activity', component: <Activity />, isPublic: false},
  {path: '/wallet', component: <Wallet />, isPublic: false},
  {path: '/withdrawal', component: <WithDrawal />, isPublic: false},
  {path: '/payment_details', component: <PaymentDetails />, isPublic: false},
  {path: '/watchlist', component: <WatchList />, isPublic: false},
  {path: '/market/:id', component: <StockDetails />, isPublic: false},
  {path: '/profile', component: <Profile />, isPublic: false},
  {path: '/search', component: <SearchCoin />, isPublic: false},
  {path: '*', component: <NotFound />, isPublic: false},
]

function App() {
  const { auth, coin, wallet, portfolio } = useSelector((store) => store);
  const {loading} = useContext(loaderContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token =localStorage.getItem(jwtTokenStr);
    if (!token) {
      navigate("/auth/signin");
      return;
    }
    dispatch(getUser(token, navigate));
  }, []);



  const hasLoader = () => {
    return (auth?.loading ?? false) || coin?.loading || wallet?.loading || loading || portfolio?.loading;
  }

  return (
    <>
    <div>
      <Routes>
        {endpoints.map((item, idx) => {
          if (item.isPublic) {
            return (
              <Route path={item.path} key={idx} element={item.component} />
            )
          } else {
            return <Route path={item.path} key={idx} element={<PrivateComponent> {item.component} </PrivateComponent>} />
          }
        })}
      </Routes>
      <ToastContainer />
      
      {hasLoader() && <Loader />}
      {/* <Payment /> */}
    </div>
    {/* <a href="https://www.linkedin.com/in/himanshu-yadav-7554161b2/" target='_blank' className="z-[100] made-with-love hover:text-white">
      Made with ❤️ by Himanshu
    </a> */}
    {/* NODE_TLS_REJECT_UNAUTHORIZED=0 npx shadcn@latest add tooltip */}
    </>
  )
}

const PrivateComponent = ({children}) => {
  const { auth } = useSelector((store) => store);


  // if (auth.loading) {
  //   return <Loader />
  // }
  return <>
  <Navbar />
  {children}
  </>
}

export default App
