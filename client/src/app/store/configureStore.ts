import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/contact/counterSlice";
import { useDispatch } from './../../../node_modules/react-redux/es/hooks/useDispatch';
import { TypedUseSelectorHook } from './../../../node_modules/react-redux/es/types.d';
import { useSelector } from 'react-redux/es/exports';
import { basketSlice } from './../../features/basket/basketSlice';
import { catalogSlice } from "../../features/catalog/catalogSlice";


// export function configureStore() {
//     return createStore(counterReducer);
// }

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        basket: basketSlice.reducer,
        catalog: catalogSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector