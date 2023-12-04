import {createSlice} from '@reduxjs/toolkit'

let initialState = 2

let UserSidebarTabReducer = createSlice({
    name : 'user sidebar tab data',
    initialState,
    reducers : {
        userSidebarTabRed(state, action) {
            return action.payload
        }
    }
})

export default UserSidebarTabReducer.reducer

export const {userSidebarTabRed} = UserSidebarTabReducer.actions