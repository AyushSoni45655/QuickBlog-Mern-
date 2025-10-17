import React from 'react'
import LandingPage from '../components/LandingPage'
import CardsBox from '../components/CardsBox'
import Subscriber from '../components/Subscriber'
const Home = () => {
  return (
    <div className='w-full h-fit'>
      <LandingPage/>
      <CardsBox/>

      {/* subscriber content here */}
      <Subscriber/>
    </div>
  )
}

export default Home
