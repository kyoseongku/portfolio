import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import Main from './containers/Main'

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route component={Main}/>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#root')
)

registerServiceWorker()
