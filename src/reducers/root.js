import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import pictureText from './pictureText'

export default combineReducers({
  router: routerReducer,
  pictureText
})
