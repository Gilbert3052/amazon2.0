import React from 'react'
import Product from '../Product/index'

const ProductFeed = ( {product} ) => {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
        {product?.slice(0,4)
          .map(({ id, title, price, description, category, image, rating }) => (
          <Product 
            key={id} 
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
            rating={rating}
          />
        ))}

      <img className='md:col-span-full' src="https://links.papareact.com/dyz" alt="" />

      <div className="md:col-span-2">
        {product?.slice(4,5)
            .map(({ id, title, price, description, category, image, rating }) => (
            <Product 
              key={id} 
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
              rating={rating}
            />
          ))}
      </div>

      {product?.slice(5,product.length)
            .map(({ id, title, price, description, category, image, rating }) => (
            <Product 
              key={id} 
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
              rating={rating}
            />
          ))}
    </div>
  )
}

export default ProductFeed