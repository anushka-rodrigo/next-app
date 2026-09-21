import React from 'react'
import AddToCart from './../AddToCart'
import styles from './ProductCard.module.css'

const ProductCard = () => {
  return (
    <div className={styles.card}>
        <AddToCart />
    </div>
  )
}

export default ProductCard

//This is a server component because it does not use any state or event handlers.
//This imports a client component AddToCart and uses it in the server component ProductCard.