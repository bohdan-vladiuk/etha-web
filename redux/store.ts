import { createStore, applyMiddleware, combineReducers, compose, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { DataReducer, ScreenReducer, UserReducer } from '.';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
    userReducer: UserReducer,
    screenReducer: ScreenReducer,
    dataReducer: DataReducer,
});
const persistConfig = {
    key: 'root',
    storage,
    version: 0,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const initStore = (initialState: any) => {
    const enhancer =
        process.env.NODE_ENV === 'production'
            ? compose(applyMiddleware(thunkMiddleware))
            : composeWithDevTools(applyMiddleware(thunkMiddleware));
    return createStore(persistedReducer, initialState, enhancer);
};
const store = initStore({});
export const persistor = persistStore(store);
export type IReducer = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<IReducer> = useSelector;
export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();

export default store;
