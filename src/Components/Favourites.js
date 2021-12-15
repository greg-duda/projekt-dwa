import React, { useState, useEffect} from 'react'
import Card from './Card'
import axios from 'axios'

const Favourites = () => {
    const [favPoke, setFavPoke] = useState([])

    useEffect(() => {
        axios.get(' http://localhost:3002/favourites').then((res) => {
            setFavPoke(res.data)
            console.log(res)
        })
    }, [])
    return (
        <div id="favourite-grid">
            {favPoke?.map((item) => <Card  key={item.id}url={item.url} name={item.name}/>)}
            
        </div>
    )
}

export default Favourites
