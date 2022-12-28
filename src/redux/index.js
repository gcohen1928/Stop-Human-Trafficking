import {
    configureStore
} from '@reduxjs/toolkit'
import formSlice from './form-slice'
import chatSlice from './chat-slice'


const store = configureStore({
    reducer: {
        form: formSlice.reducer,
        chat: chatSlice.reducer
    }
})
export default store