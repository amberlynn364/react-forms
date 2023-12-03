import { RootState } from '../../store';

const selectCountries = (state: RootState) => state.countries.countries;

export default selectCountries;
