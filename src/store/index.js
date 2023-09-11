import { createStore } from 'redux';
import reducer from './reducer/index';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = createStore(reducer);
const persister = 'Free';

export { store, persister };
