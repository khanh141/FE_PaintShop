import React from 'react'
import Products from '../components/Products'
import Info from '../components/Info'
import Login from '../components/Login'

function Home() {
    return (
        <div className='homePage container'>
            <Info />
            {/* <Products /> */}
            <Login/>
        </div >
    )
}

export default Home