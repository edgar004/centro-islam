import { createStore } from 'redux'
import rootReducer from '../index'
// Store
// Almacenamiento de nuestro estado
const store = createStore(rootReducer)

export default store;