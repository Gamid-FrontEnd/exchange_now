import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getRates = createAsyncThunk(
    'rates/getRates',
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');

            if (!response.ok) {
                throw new Error('Server Error!');
            }
    
            const data = await response.json();
            //console.log(data);

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


const ratesNow = createSlice({
    name: 'rate',

    initialState: {
        rates: [],
        error: null,
        status: null
    },

    reducers: {
        
    },

    extraReducers: {
        [getRates.pending]: (state) => {
            state.status = 'loading';
            state.error = null
        },
        [getRates.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.rates = action.payload;
        },
        [getRates.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
    }
});

//const {} = ratesNow.actions;
export default ratesNow.reducer;