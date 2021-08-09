import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import Demo15 from './Demo15-form'
// import Demo17 from './Demo17-todo'
// import Demo18 from './Demo17-todoEx'

//redux
import Todo from './Todo-Redux';
import {createStore} from 'redux';
import myReducer from './redux/reducers/Index';
import { Provider } from 'react-redux';

const store =createStore(
  myReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <Todo />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
