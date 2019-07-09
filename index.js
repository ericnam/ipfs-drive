import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { BrowserRouter } from 'react-router-dom';
import Sidebar from '@Components/Sidebar';

import '@Styles/App.scss';

import reducers from '@Reducer';
import { ViewFiles } from '@Pages';

import freshRoot from '@Utils/freshRoot';

const IPFSNode = require('ipfs');
const ipfs = new IPFSNode();


ipfs.on('ready', async () => {
  const version = await ipfs.version();
  console.log('Version:', version.version);

  const rootEl = document.getElementById('root');

  const fileSystemStore = await freshRoot(ipfs);

  console.log('store');  
  console.log(fileSystemStore);

  const store = createStore(
    reducers,
    {
      fileSystem:        
        fileSystemStore
    },
    composeWithDevTools()
  );
  
  const App = () => (
    <Provider store={store}>
      <Router>
        <BrowserRouter>
          <Fragment>
            <Sidebar />
            <ViewFiles />
          </Fragment>
        </BrowserRouter>
      </Router>
    </Provider>
  );
  
  const renderComponent = Component => {
    render(<Component />, rootEl);
  };
  
  renderComponent(App);
});

