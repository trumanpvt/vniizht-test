import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    status: "idle",
    trains: [],
    error: null,
};
const tableSlice = createSlice({
    name: "table", initialState, reducers: {
        changeTrainData: (state, action) => {
            state.trains[action.payload.index] = action.payload.train;
        }
    }, extraReducers(builder) {
        builder
            .addCase(fetchTrains.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTrains.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.trains = action.payload;
            })
            .addCase(fetchTrains.rejected, (state, action) => {
                state.status = "failed";
                state.error = action?.error.message;
            });
    },
});

export const {changeTrainData} = tableSlice.actions;

export const fetchTrains = createAsyncThunk("table/fetchTrains", async () => {
    const response = await fetch("https://gist.githubusercontent.com/allbel/ae2f8ead09baf7bb66d281e3a6050261/raw/4c898f101913cd7918ab1dbfce008fa12c6d4838/mock.json");
    return response.json();
},);

// export const changeTrain = (state) => state.table.trains;
export const selectTrains = (state) => state.table.trains;
export const selectTrainsFetchStatus = (state) => state.table.status;

export default tableSlice.reducer;
