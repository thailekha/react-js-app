import React from 'react';
import ReactDOM from 'react-dom';
import MyApp from './App';
import './index.css';
import logger from './logger';

ReactDOM.render(
  <MyApp />,
  document.getElementById('root')
);
//console.log();
logger.reportCounter();
