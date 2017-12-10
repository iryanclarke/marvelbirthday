import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App birthday="1993-10-15,1993-10-25"/>, document.getElementById('root'));
//ReactDOM.render(<App birthday="reactjs"/>, document.getElementById('root'));
registerServiceWorker();
