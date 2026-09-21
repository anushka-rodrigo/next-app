import React from 'react'
import AddToCart from './../AddToCart'

const ProductCard = () => {
  return (
    <div>
        <AddToCart />
    </div>
  )
}

export default ProductCard

//This is a server component because it does not use any state or event handlers.
//This imports a client component AddToCart and uses it in the server component ProductCard.