import {createSlice} from '@reduxjs/toolkit'

let initialState = {
    condition : true
}

let EditModeReducer = createSlice({
    name : 'edit mode',
    initialState,
    reducers : {
        editCondition : (state, action) => {
            state.condition = action.payload
        }
    }
})

export default EditModeReducer.reducer

export const {editCondition} = EditModeReducer.actions