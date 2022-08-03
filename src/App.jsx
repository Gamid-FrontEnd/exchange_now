
import { useDispatch, useSelector } from 'react-redux';

import './app.scss'
import { useEffect, useRef } from "react";
import { getRates } from "./store/rates";

import { float_fix2, find_ccy } from './functions'

import exchange from './img/exchange_img.png'

function App() {
  const dispatch = useDispatch();
  const {rates, status, error} = useSelector(state => state.rates)


  let USD = find_ccy(rates, 'USD')
  let EUR = find_ccy(rates, 'EUR')

  useEffect(() => {
    dispatch(getRates());
  }, [dispatch])
  
  const firstCurrency = useRef()
  const secondCurrency = useRef()
  const firsdtSelect = useRef()
  const secondSelect = useRef()

  let calculateBuyCost = () => {
        if (firsdtSelect.current.value === 'UAH' && secondSelect.current.value !== 'UAH') {
            let ccy_buy = find_ccy(rates, secondSelect.current.value)
            secondCurrency.current.value = (firstCurrency.current.value / float_fix2(ccy_buy.buy)).toFixed(2)
        } else if (firsdtSelect.current.value !== 'UAH' && secondSelect.current.value === 'UAH') {
            let ccy_sell = find_ccy(rates, firsdtSelect.current.value)
            secondCurrency.current.value = (firstCurrency.current.value * float_fix2(ccy_sell.buy)).toFixed(2)
        } else if (firsdtSelect.current.value === 'UAH' && secondSelect.current.value === 'UAH') {
            secondCurrency.current.value = firstCurrency.current.value
        } else if (firsdtSelect.current.value !== 'UAH' && secondSelect.current.value !== 'UAH') {
            let ccy_buy = find_ccy(rates, secondSelect.current.value)
            let ccy_sell = find_ccy(rates, firsdtSelect.current.value)

            secondCurrency.current.value = (firstCurrency.current.value * float_fix2(ccy_buy.buy) / float_fix2(ccy_sell.buy)).toFixed(2)
        }
  }

  let calculateSellCost = () => {
        if (firsdtSelect.current.value === 'UAH' && secondSelect.current.value !== 'UAH') {
            let ccy_buy = find_ccy(rates, secondSelect.current.value) 
            firstCurrency.current.value = (secondCurrency.current.value * float_fix2(ccy_buy.buy)).toFixed(2)
        } else if (firsdtSelect.current.value !== 'UAH' && secondSelect.current.value === 'UAH') {
            let ccy_sell = find_ccy(rates, firsdtSelect.current.value) 
            firstCurrency.current.value = (secondCurrency.current.value / float_fix2(ccy_sell.buy)).toFixed(2)
        } else if (firsdtSelect.current.value === 'UAH' && secondSelect.current.value === 'UAH') {
            firstCurrency.current.value = secondCurrency.current.value
        } else if (firsdtSelect.current.value !== 'UAH' && secondSelect.current.value !== 'UAH') {
            let ccy_buy = find_ccy(rates, secondSelect.current.value)
            let ccy_sell = find_ccy(rates, firsdtSelect.current.value) 

            firstCurrency.current.value = (secondCurrency.current.value * float_fix2(ccy_sell.buy) / float_fix2(ccy_buy.buy)).toFixed(2)
        }
  }

  return (
    <div className="App">

     {/* HEADER */}
     
      <div className='header_main'>
        <div className='header_logo'>
            Exchange Now
        </div>

        <div className='header_current_rate'>
            <div>
                <p>USD</p>
                {status === 'loading' &&  <p>Loading</p>}
                {error && <p>{error}</p>}
                {USD && <p>{float_fix2(USD.buy)}</p>}
            </div>
            <div>
                <p>EUR</p>
                {status === 'loading' &&  <p>Loading</p>}
                {error && <p>{error}</p>}
                {EUR && <p>{float_fix2(EUR.buy)}</p>}
            </div>
        </div>
      </div>

      {/* BODY */}

      <div className='body_main_div'>
        <div className='exchange_calculator_div'>
            <div className='currency_box first_currency'>
                <select 
                    ref={firsdtSelect} 
                    onChange={() => {
                        firstCurrency.current.value = null
                        secondCurrency.current.value = null
                    }}>
                    {rates.map(rate => 
                        rate.ccy !== 'BTC' && <option key={rate.buy} value={rate.ccy}>{rate.ccy}</option>
                    )}
                    <option value='UAH'>UAH</option>
                </select>

                <input type='text' ref={firstCurrency} placeholder='0' onChange={calculateBuyCost}/>
            </div>

            <img src={exchange} alt='exchange image' />

            <div className='currency_box second_currency'>
                <select 
                    ref={secondSelect} 
                    onChange={() => {
                        firstCurrency.current.value = null
                        secondCurrency.current.value = null
                    }}>
                    {rates.map(rate => 
                        rate.ccy !== 'BTC' && <option key={rate.buy} value={rate.ccy}>{rate.ccy}</option>
                    )}
                    <option value='UAH'>UAH</option>
                </select>

                <input type='text' ref={secondCurrency} placeholder='0' onChange={calculateSellCost}/>
            </div>
        </div>
    </div>
    </div>
  );
}

export default App;
