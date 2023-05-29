import {createStore} from 'redux';
import {RootReducer} from './Reducer';
const Store = createStore(RootReducer);
export default Store;
