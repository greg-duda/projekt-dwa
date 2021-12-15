import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import favourite from '../Images/favourite.png'
import sword from '../Images/sword.png'


const BackButton = styled.button`
display: block;
background-color: red;
color: white;
width: 50%;
height: 40px;
margin: 0 auto;
`
const HeartImage = styled.img`
width: 7%;
position: absolute;
top: 12%;
left: 1.5%;
background-color: ${prop => prop.background}
zIndex: '1'
`
const SwordImage = styled.img`
width: 65px;
position: absolute;
top: 60px;
left: 205px;
background-color: ${prop => prop.color}
zIndex: 1;
`
const FavBtn = styled.button`
cursor: pointer;
position: absolute;
width: 8em;
height: 6em;
top: 11%;
background-color: red;
border-radius: 5px;
zIndex: 2;
left: ${prop => prop.arena ? "17%" : "0"}
`


const SinglePoke = () => {
    const [favData, setFavData] = useState([])
    const [isFavourite, setIsFavourite] = useState(false)
    const [arena, setArena] = useState(false)
    const navigate = useNavigate()
    const [poke, setPoke] = useState([])
    const { id, name } = useParams()
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const lastPoke = favData?.length

    useEffect(()=> {
        axios.get(' http://localhost:3002/favourites').then((res) => {
            setFavData(res.data)
            console.log(res)
        })
    }, [])

    const addPoke = (e) => {
            const pika = { name, url}
            console.log(pika)
            axios.post('http://localhost:3002/favourites', pika)
       
    }




    useEffect(() => {
        axios.get(url).then((res) => {
            setPoke(res.data)
            console.log(res)
        })
    }, [])
    console.log(lastPoke)
    return (
        <>
        
            <div id="specific-poke">
            <FavBtn onClick={addPoke}></FavBtn><FavBtn arena onClick={addPoke}></FavBtn>
            {/* <HeartImage background={isFavourite ? 'red' : 'transparent'} onClick={() => setIsFavourite(!isFavourite)} src={favourite}></HeartImage><SwordImage onClick={() => setArena(!arena)} color={arena ? 'gray' : null} src={sword}></SwordImage> */}
                <div id='grid-header'>Pokedex</div>
                <div id="image-container"><img style={{width: '90%', height: '90%'}}src={poke?.sprites?.other?.dream_world?.front_default}></img></div>
                <div id="specific-details">
                    <div id='grid-item-1'>{poke?.name}</div>
                    <div className='grid-items-left'>{poke?.weight}<div style={{margin: '5px', color: 'black',textAlign: 'left'}}>Weight</div></div>
                    <div className='grid-items-right'>{poke?.height}<div style={{margin: '5px', color: 'black', textAlign: 'right'}}>Height</div></div>
                    <div className='grid-items-left'>{poke?.base_experience}<div style={{margin: '5px', color: 'black', textAlign: 'left'}}>Base experience</div></div>
                    <div className='grid-items-right'>{poke?.abilities?.[0]?.ability?.name}<div style={{margin: '5px', color: 'black',textAlign: 'right'}}>Ability</div></div>
                </div>
                
                
                
                
                
            </div>
            <BackButton onClick={() => navigate('/')}>Wróc</BackButton>

        </>
    )
}

export default SinglePoke

{/* <h3 style={{lineHeight: '20px'}}>Height: <StyledSpan>{poke.height}</StyledSpan></h3>
                        <h3>Weight: <StyledSpan>{poke?.weight}</StyledSpan></h3>
                        <h3>Base experience: <StyledSpan>{poke?.base_experience}</StyledSpan></h3>
                        <h3>Ability: <StyledSpan>{poke?.abilities?.[0]?.ability?.name} </StyledSpan></h3> */}