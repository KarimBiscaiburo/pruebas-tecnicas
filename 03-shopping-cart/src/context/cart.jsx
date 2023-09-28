import { createContext, useState } from 'react'

export const CartContext = createContext()

export function CartProvider ({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const productInCart = cart.findIndex(item => item.id === product.id)

    // If product already exist, .findIndex return the first index that meets the condition
    // .findIndex return -1 if doesnt exist
    if (productInCart >= 0) {
      // structuredClone do a deep clone of an array or objets
      const newCart = structuredClone(cart)
      newCart[productInCart].quantity += 1
      return setCart(newCart)
    }

    setCart(prevState => ([
      ...prevState,
      {
        ...product,
        quantity: 1
      }
    ]
    ))
  }
  const clearCart = () => {
    setCart([])
  }
  const removeFromCart = product => {
    setCart(prevState => prevState.filter(item => item.id !== product.id))
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      clearCart,
      removeFromCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
