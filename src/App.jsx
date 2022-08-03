
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

  let ccy_buy = 1
  let ccy_sell = 1

  useEffect(() => {
    dispatch(getRates());
  }, [dispatch])
  
  const firstCurrency = useRef()
  const secondCurrency = useRef()
  const firsdtSelect = useRef()
  const secondSelect = useRef()

  let calculateBuyCost = () => {
    secondCurrency.current.value = (firstCurrency.current.value * ccy_sell / ccy_buy).toFixed(2)
  }

  let calculateSellCost = () => {
    firstCurrency.current.value = (secondCurrency.current.value * ccy_buy / ccy_sell).toFixed(2)
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
                        firsdtSelect.current.value !== 'UAH' ? ccy_sell = float_fix2(find_ccy(rates, firsdtSelect.current.value).buy) : ccy_sell = 1
                        secondSelect.current.value !== 'UAH' ? ccy_buy = float_fix2(find_ccy(rates, secondSelect.current.value).buy) : ccy_buy = 1

                    }}>
                    {rates.map(rate => 
                        rate.ccy !== 'BTC' && <option key={rate.buy} value={rate.ccy}>{rate.ccy}</option>
                    )}
                    <option value='UAH' selected>UAH</option>
                </select>

                <input type='text' ref={firstCurrency} placeholder='0' onChange={calculateBuyCost}/>
            </div>

            <image src={exchange} alt='exchange image' />

            <div className='currency_box second_currency'>
                <select 
                    ref={secondSelect} 
                    onChange={() => {
                        firstCurrency.current.value = null
                        secondCurrency.current.value = null
                        firsdtSelect.current.value !== 'UAH' ? ccy_sell = float_fix2(find_ccy(rates, firsdtSelect.current.value).buy) : ccy_sell = 1
                        secondSelect.current.value !== 'UAH' ? ccy_buy = float_fix2(find_ccy(rates, secondSelect.current.value).buy) : ccy_buy = 1
                    }}>
                    {rates.map(rate => 
                        rate.ccy !== 'BTC' && <option key={rate.buy} value={rate.ccy}>{rate.ccy}</option>
                    )}
                    <option value='UAH' selected>UAH</option>
                </select>

                <input type='text' ref={secondCurrency} placeholder='0' onChange={calculateSellCost}/>
            </div>
        </div>
    </div>
    </div>
  );
}

export default App;
