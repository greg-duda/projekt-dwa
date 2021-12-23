import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { RestaurantMenu, RestaurantMenuOutlined } from '@material-ui/icons';



export const BackButton = styled.button`
display: block;
background-color: crimson;
color: white;
width: 50%;
height: 40px;
margin: 0 auto;
cursor: pointer;
`

const FavBtn = styled.button`
cursor: pointer;
height: 100%;
background-color: ${prop => prop.fav ? "crimson" : "transparent"};
border-radius: 5px;
`
const ArenaBtn = styled.button`
cursor: pointer;
height: 100%;
background-color: ${prop => prop.arena ? "steelblue" : "transparent"};
border-radius: 5px;
`


const SinglePoke = () => {
    const [isArena, setIsArena] = useState(false)
    const [arenaData, setArenaData] = useState([])
    const [favData, setFavData] = useState([])
    const [isFavourite, setIsFavourite] = useState(false)
    const [poke, setPoke] = useState([])

    const { id, name } = useParams()
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3002/arena').then((res) => {
            setArenaData(res.data)
            console.log(res)
        })
    }, [isArena])
    useEffect(() => {
        axios.get(' http://localhost:3002/favourites').then((res) => {
            setFavData(res.data)
        })
    }, [isFavourite])

    const addArena = (e) => {
        if (arenaData.length >= 2 && !isAddedArena) {
            alert('Mozesz dodac maksymalnie dwa pokemony do areny, usuń pokemony z areny i spróbuj ponownie')
        }
        else if (!isAddedArena && arenaData.length < 2) {
            setIsArena(!isAddedArena)
            const pikaArena = { name, url }
            console.log('dodano')
            axios.post('http://localhost:3002/arena', pikaArena)
        } else if (isAddedArena) {
            setIsArena(isAddedArena)
            axios.delete(`http://localhost:3002/arena/${isAddedArena.id}`)
            console.log("usunieto")
        } else return true


    }
    const addFav = (e) => {
        if (!isAddedFav) {
            setIsFavourite(!isAddedFav)
            const pikaFav = { name, url }
            console.log('dodano')
            axios.post('http://localhost:3002/favourites', pikaFav)
        } else if (isAddedFav) {
            setIsFavourite(isAddedFav)
            axios.delete(`http://localhost:3002/favourites/${isAddedFav.id}`)
            console.log("usunieto")
        } else return true


    }

    const isAddedFav = favData?.find(index => index.name === poke?.name)
    const isAddedArena = arenaData?.find(index => index.name === poke?.name)



    useEffect(() => {
        axios.get(url).then((res) => {
            setPoke(res.data)
            setIsFavourite(isAddedFav)
        })
    }, [isFavourite])
    return (
        <>

            <div id="specific-poke">
                <div id='grid-header'>Pokedex</div>
                <div id='grid-nav'><FavBtn fav={isAddedFav}  onClick={addFav}>{isAddedFav ? <FavoriteIcon fontSize='large' /> : <FavoriteBorderIcon fontSize="large" />}</FavBtn><ArenaBtn  arena={isAddedArena} onClick={addArena}>{isAddedArena ? <RestaurantMenu fontSize='large' /> : <RestaurantMenuOutlined fontSize='large' />}</ArenaBtn></div>
                <div id="image-container"><img alt='pokemon' style={{ width: '90%', height: '90%', marginLeft: '10px' }} src={poke?.sprites?.other?.dream_world?.front_default}></img></div>
                <div id="specific-details">
                    <div id='grid-item-1'>{poke?.name}</div>
                    <div className='grid-items-left'>{poke?.weight}<div style={{ margin: '5px', color: 'black', textAlign: 'center' }}>Weight</div></div>
                    <div className='grid-items-right'>{poke?.height}<div style={{ margin: '5px', color: 'black', textAlign: 'center' }}>Height</div></div>
                    <div className='grid-items-left'>{poke?.base_experience}<div style={{ margin: '5px', color: 'black', textAlign: 'center' }}>Base experience</div></div>
                    <div className='grid-items-right'>{poke?.abilities?.[0]?.ability?.name}<div style={{ margin: '5px', color: 'black', textAlign: 'center' }}>Ability</div></div>
                </div>





            </div>
            <BackButton onClick={() => navigate('/')}>Powrót do listy</BackButton>

        </>
    )
}

export default SinglePoke
