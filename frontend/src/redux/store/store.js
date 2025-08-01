import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducer/index';
import { composeWithDevTools } from 'redux-devtools-extension';


     export const store = createStore(
        rootReducer, 
        composeWithDevTools(
        
      ));