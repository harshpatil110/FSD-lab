import React from 'react'
import ProductsList from './features/products/ProductsList.jsx'
import ProductDetail from './features/products/ProductDetail.jsx'

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>Products Manager</h1>
        <p className="subtitle">Redux Toolkit + Async API + Local UI State</p>
      </header>

      <main className="content">
        <section className="left">
          <ProductsList />
        </section>
        <section className="right">
          <ProductDetail />
        </section>
      </main>

      <footer className="footer">
        <small>Demo app for managing complex state with Redux Toolkit.</small>
      </footer>
    </div>
  )
}
