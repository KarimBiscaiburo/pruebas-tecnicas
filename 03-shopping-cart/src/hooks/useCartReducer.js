import { cartReducer, cartInitialState, CART_ACTION_TYPE } from '../reducers/cart'
import { useReducer } from 'react'

export function useCartReducer () {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = product => dispatch({
    type: CART_ACTION_TYPE.ADD_TO_CART,
    payload: product
  })

  const removeFromCart = product => dispatch({
    type: CART_ACTION_TYPE.REMOVE_FROM_CART,
    payload: product
  })

  const clearCart = () => dispatch({ type: CART_ACTION_TYPE.CLEAR_CART })

  return { state, addToCart, removeFromCart, clearCart }
}