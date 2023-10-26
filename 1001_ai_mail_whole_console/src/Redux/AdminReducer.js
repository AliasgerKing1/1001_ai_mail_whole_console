import {createSlice} from '@reduxjs/toolkit'

let initialState = []

let AdminReducer = createSlice({
    name : 'admin data',
    initialState,
    reducers : {
        AdminDataRed(state, action) {
            return action.payload
        }
    }
})

export default AdminReducer.reducer

export const {AdminDataRed} = AdminReducer.actions