import { combineReducers } from 'redux';
import { UserReducer } from './user-reducer';
import { ScreenReducer } from './screen-reducer';
import { DataReducer } from './data-reducer';

export * from './user-reducer';
export * from './screen-reducer';
export * from './data-reducer';

const rootReducer = combineReducers({
    userReducer: UserReducer,
    screenReducer: ScreenReducer,
    dataReducer: DataReducer,
});

export type IReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
