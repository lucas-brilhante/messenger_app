import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Navigation from './src/Navigation.js';
import combineReducers from './src/reducers';
import NavigationService from './src/NavigationService';

class messeger extends Component {
  render() {
    return (
      <Provider store={createStore(combineReducers,{},applyMiddleware(ReduxThunk))}>
        <Navigation ref={navigatorRef => {
          NavigationService.setNavigator(navigatorRef);}} 
        />
      </Provider>
    );
  }
}

export default messeger