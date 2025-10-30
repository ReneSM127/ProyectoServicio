import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import {useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import ArtisanBox from '../Components/ArtisanBox/ArtisanBox';

const Product = () => {
  const {all_product}  = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e) => e._id === productId);
  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product}/>
      <DescriptionBox />
      <ArtisanBox />
      <RelatedProducts />
    </div>
  )
}

export default Product;
