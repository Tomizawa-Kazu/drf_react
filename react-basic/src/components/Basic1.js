import React, { useState } from 'react'

const Basic1 = () => {
  const [product, setProducts] = useState({ name: '', price: '' })

  return (
    <div>
      <form>
        <input type='text' value={product.name} onChange={evt => setProducts({ ...product, name: evt.target.value })} />
        <input type='text' value={product.price} onChange={evt => setProducts({ ...product, price: evt.target.value })} />
      </form>
      <h1>Hello React1</h1>
      <h2>Product name is {product.name}</h2>
      <h2>Product price is {product.price}</h2>
    </div>
  )
}

export default Basic1