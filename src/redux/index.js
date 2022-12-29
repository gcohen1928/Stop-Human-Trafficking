import {
    configureStore
} from '@reduxjs/toolkit'
import formSlice from './form-slice'
import chatSlice from './chat-slice'
import resourcesSlice from './resources-slice'


const store = configureStore({
    reducer: {
        form: formSlice.reducer,
        chat: chatSlice.reducer,
        resources: resourcesSlice.reducer
    }
})
export default store