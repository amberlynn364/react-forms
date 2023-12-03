import { RootState } from '../../store';

const selectData = (state: RootState) => state.data.data;

export default selectData;
