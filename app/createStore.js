import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import * as reducers from './reducers'
import createLogger from 'redux-logger';

export default (initialState = {}, history) => {

 const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
  })

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        thunk,
        createLogger(),
        routerMiddleware(history)
      )
    )
  )

  if (module.hot) {
    module.hot.accept('./index', () => {
      const reducers = require('./index').default
      store.replaceReducer(reducers)
    })
  }

  return store
}