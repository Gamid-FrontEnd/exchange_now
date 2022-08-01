import React from 'react'
import {useSelector} from 'react-redux'

import './header.scss'

const Header = () => {
    const rates = useSelector(state => state.rates.rates)


    let USD = rates.find(rate => rate.ccy === 'USD')
    let EUR =  rates.find(rate => rate.ccy === 'EUR')

  return (
    <div className='header_main'>
        <div className='header_logo'>
            Exchange Now
        </div>

        <div className='header_current_rate'>
            <div>
                <p>USD</p>
                {USD ? <p>{parseFloat(USD.buy).toFixed(2)}</p> : 'Loading'}
            </div>
            <div>
                <p>EUR</p>
                {EUR ? <p>{parseFloat(EUR.buy).toFixed(2)}</p> : 'Loading'}
            </div>
        </div>
    </div>
  )
}

export default Header