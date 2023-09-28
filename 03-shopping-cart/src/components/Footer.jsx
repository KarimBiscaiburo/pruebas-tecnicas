// import { useCart } from '../hooks/useCart'
// import { useFilters } from '../hooks/useFilters'
import './Footer.css'

export function Footer () {
  // const { filters } = useFilters()
  // const { cart } = useCart()

  return (
    <footer className='footer'>
      {
        // A good way to debug the filters
        // JSON.stringify(filters, null, 2)
      }
      {
        // A good way to debug the cart and see if is adding okey
        // JSON.stringify(cart, null, 2)
      }

      <h4>Prueba técnica de React</h4>
      <span></span>
      <h5>Shopping Cart con useContext & useReducer</h5>
    </footer>
  )
}
