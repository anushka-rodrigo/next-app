'use client'
import React from 'react'

const AddToCart = () => {
  return (
    <div>
        <button className='btn btn-primary' onClick={() => console.log('Click')}>Add to Cart</button>
    </div>
  )
}

export default AddToCart

//this is a client component because it has a button with an onClick event handler. 
// In Next.js, components that use state or event handlers must be client components.