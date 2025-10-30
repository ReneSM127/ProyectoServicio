import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'
import api from '../../api/api'

const NewCollections = () => {

    const [new_collection, setNew_Collection] = useState([]);

    useEffect(() => {
        api.get('/products/newcollections')
            .then((response) => {
                setNew_Collection(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener nuevas colecciones:", error);
            });
    }, []);

    return (
        <div className='new-collections'>
            <h1>Conoce las últimas artesanias</h1>
            <hr />
            <div className="collections">
                {new_collection.map((item, i)=>{
                    return <Item key={i} id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>

                })}
            </div>
        </div>
    )
}

export default NewCollections