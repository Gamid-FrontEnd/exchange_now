import React from 'react'
import {useSelector} from 'react-redux'

import './header.scss'
import { float_fix2, find_ccy } from '../functions'

const Header = () => {
    const {rates, status, error} = useSelector(state => state.rates)


    let USD = find_ccy(rates, 'USD')
    let EUR = find_ccy(rates, 'EUR')

  return (
    <div className='header_main'>
        <div className='header_logo'>
            Exchange Now
        </div>

        <div className='header_current_rate'>
            <div>
                <p>USD</p>
                {status === 'loading' &&  <p>Loading</p>}
                {error && <p>{error}</p>}
                {USD && <p>{float_fix2(USD.buy)/* parseFloat(USD.buy).toFixed(2) */}</p>}
            </div>
            <div>
                <p>EUR</p>
                {status === 'loading' &&  <p>Loading</p>}
                {error && <p>{error}</p>}
                {EUR && <p>{float_fix2(EUR.buy)/* parseFloat(EUR.buy).toFixed(2) */}</p>}
            </div>
        </div>
    </div>
  )
}

export default Header