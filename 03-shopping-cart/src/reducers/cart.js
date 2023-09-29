export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const CART_ACTION_TYPE = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}

// update localStorage with state for cart
export const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action
  switch (actionType) {
    case CART_ACTION_TYPE.ADD_TO_CART : {
      const { id } = actionPayload
      const productInCart = state.findIndex(item => item.id === id)
      // If product already exist, .findIndex return the first index that meets the condition
      // .findIndex return -1 if doesnt exist
      if (productInCart >= 0) {
        // structuredClone do a deep clone of an array or objets
        const newState = structuredClone(state)
        newState[productInCart].quantity += 1
        updateLocalStorage(newState)
        return newState
      }
  
      const newState = [
        ...state,
        {
          ...actionPayload,
          quantity: 1
        }
      ]

      updateLocalStorage(newState)
      return newState
    }

    case CART_ACTION_TYPE.REMOVE_FROM_CART : {
      const { id } = actionPayload
      const newState = state.filter(item => item.id !== id)
      updateLocalStorage(newState)
      return newState
    }

    case CART_ACTION_TYPE.CLEAR_CART : {
      updateLocalStorage([])
      return []
    }

  }

  return state
}