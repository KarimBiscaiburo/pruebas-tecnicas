import { useId } from 'react'
import './Filter.css'
import { useFilters } from '../hooks/useFilters'

export function Filters () {
  const { filters, setFilters } = useFilters()

  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const handleChangeMinPrice = (e) => {
    setFilters(prevState => ({
      ...prevState,
      minPrice: e.target.value
    }))
  }

  const handleChangeCategory = (e) => {
    setFilters(prevState => ({
      ...prevState,
      category: e.target.value
    }))
  }

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterId}>Min Price</label>
        <input
          type="range"
          id={minPriceFilterId}
          min="0"
          max="1000"
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <strong>${filters.minPrice}</strong>
      </div>
      <div>
        <label htmlFor={categoryFilterId}>Category</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">Todas</option>
          <option value="laptops">Notebooks</option>
          <option value="smartphones">Celulares</option>
        </select>
      </div>
    </section>
  )
}
