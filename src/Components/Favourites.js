import React, { useState, useEffect} from 'react'
import Card from './Card'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import { BackButton } from './SinglePoke'

const Favourites = () => {
    const [clear, setClear] = useState(false)
    const [favPoke, setFavPoke] = useState([])
    const navigate = useNavigate()

    const clearHandler = () => {
        setClear(!clear)
        let item
        for(item of favPoke) {
            axios.delete(`http://localhost:3002/favourites/${item.id}`)
        }
    }

    useEffect(() => {
        axios.get(' http://localhost:3002/favourites').then((res) => {
            setFavPoke(res.data)
        })
    }, [clear])
    return (
        <>
        <div style={{backgroundColor: '#99D9EA'}}><button style={{display: 'block', border: 'none', cursor: 'pointer', margin: '0 auto', width: '300px', height: '50px', backgroundColor: 'snow', borderRadius: '5px'}} disabled={favPoke.length === 0} onClick={clearHandler}>Wyczyść wszystkie</button></div>
        
        <div id="favourite-grid">
            {favPoke?.map((item) => <Card  key={item.id}url={item.url} name={item.name}/>)}
        </div>
        <div style={{backgroundColor: '#99D9EA'}}><BackButton style={{width: '100%'}} onClick={() => navigate('/')}>Wróc do listy</BackButton></div>
        </>
    )
}

export default Favourites
