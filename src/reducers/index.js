import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer.js';
import AppReducer from './AppReducer';
import ConversaReducer from './ConversaReducer';

export default combineReducers({
    AutenticacaoReducer,
    AppReducer,
    ConversaReducer
});