import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MyData } from '../../../types/types';

interface DataSlice {
  data: MyData[] | null;
}

const initialState: DataSlice = {
  data: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<MyData[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = dataSlice.actions;

export default dataSlice;
