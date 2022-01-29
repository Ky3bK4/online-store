import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto'
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import BasketStore from "./store/BasketStore";

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore(),
    device: new DeviceStore(),
    basket: new BasketStore(),
  }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>,
  document.getElementById('root')
);

