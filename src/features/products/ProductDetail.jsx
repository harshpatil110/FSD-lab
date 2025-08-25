import React from 'react'
import { useSelector } from 'react-redux'

export default function ProductDetail() {
  const { selectedProduct } = useSelector((s) => s.products)

  if (!selectedProduct) {
    return (
      <div className="panel">
        <h2 className="panel-title">Product Details</h2>
        <p className="muted">Select a product from the list to see details.</p>
      </div>
    )
  }

  const p = selectedProduct
  return (
    <div className="panel">
      <h2 className="panel-title">Product Details</h2>
      <div className="card detail">
        <img src={p.image} alt={p.title} className="hero" />
        <h3 className="detail-title">{p.title}</h3>
        <div className="price">₹ {p.price}</div>
        <div className="chip">{p.category}</div>
        <p className="body">{p.description}</p>
      </div>
    </div>
  )
}
