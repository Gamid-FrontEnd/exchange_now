import {configureStore} from '@reduxjs/toolkit';
import ratesNow from './rates'

export default configureStore({
    reducer: {
        rates: ratesNow,
    }
});