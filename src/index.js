import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'

import Main from './containers/Main'
import BigBruv from './containers/BigBruv'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route exact path="/bigbruv" component={BigBruv}/>
        <Route component={Main}/>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#root')
)

registerServiceWorker()
