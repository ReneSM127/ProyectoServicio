import React, { useEffect, useState } from 'react'
import "./Popular.css"
import api from '../../api/api'
import Item from "../Item/Item"
const Popular = () => {

    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
        api.get('/products/popularinwomen')
            .then((response) => {
                setPopularProducts(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener productos populares:", error);
            });
    }, []);

    return (
        <div className="popular">
            <h1>Lo más popular</h1>
            <hr />
            <div className="popular-item">
                {popularProducts.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />

                })}
            </div>

        </div>
    )
}

export default Popular