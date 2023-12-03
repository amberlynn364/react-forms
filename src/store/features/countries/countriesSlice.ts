import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES } from '../../../constants/constants';

interface CountriesSlice {
  countries: string[];
}

const initialState: CountriesSlice = {
  countries: COUNTRIES,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice;
