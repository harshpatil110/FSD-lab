import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, selectProduct, addProduct } from './productsSlice.js'

export default function ProductsList() {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector((s) => s.products)

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [form, setForm] = useState({ title: '', price: '', description: '', category: '', image: '' })

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  const categories = useMemo(() => {
    const set = new Set(items.map(p => p.category).filter(Boolean))
    return ['all', ...Array.from(set)]
  }, [items])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return items.filter(p => {
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      const matchesCategory = category === 'all' || p.category === category
      return matchesQuery && matchesCategory
    })
  }, [items, query, category])

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    dispatch(addProduct(form))
    setForm({ title: '', price: '', description: '', category: '', image: '' })
  }

  return (
    <div className="panel">
      <h2 className="panel-title">Browse & Add Products</h2>

      <div className="controls">
        <input
          className="input"
          placeholder="Search by title/description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <form className="card add-form" onSubmit={onSubmit}>
        <div className="row">
          <input
            className="input"
            placeholder="Product title"
            value={form.title}
            onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
          />
          <input
            className="input"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
          />
        </div>
        <div className="row">
          <input
            className="input"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
          />
          <input
            className="input"
            placeholder="Image URL (optional)"
            value={form.image}
            onChange={(e) => setForm(f => ({ ...f, image: e.target.value }))}
          />
        </div>
        <textarea
          className="input"
          placeholder="Description"
          rows={3}
          value={form.description}
          onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
        />
        <button className="btn" type="submit">Add Product</button>
      </form>

      <div className="status">
        {status === 'loading' && <span>Loading products…</span>}
        {status === 'failed' && <span className="error">Error: {error}</span>}
      </div>

      <ul className="list">
        {filtered.map((p) => (
          <li key={p.id} className="card item" onClick={() => dispatch(selectProduct(p))}>
            <img src={p.image} alt={p.title} className="thumb" />
            <div>
              <h3 className="item-title">{p.title}</h3>
              <div className="muted">₹ {p.price}</div>
              <div className="chip">{p.category}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
