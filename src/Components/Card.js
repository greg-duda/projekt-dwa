import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'

import back from '../Images/back.jpg'

const StyledSpan = styled.span `
font-size: 10px;
margin: 0;
`
const DetailStyle = styled.div `
display:grid;
vertical-align: center;
padding-top: 5px;
justify-content: center;
width: 350px;
height: 110px;
text-align: center;
color: white;
opacity: 90%;
background-color: gray;
border: 1px solid black;
`
const CardStyle = styled.div `
background-image: url(${back});
background-position: center;
border-radius: 5px;
height: 450px;
width: 350px;
background-color: rgb(252, 101, 101);
background-repeat: no-repeat;
display: grid;
border: rgb(61, 61, 61) solid 1px;
box-shadow: black 1px 1px 1px 1px;
transition: 0.5s;
opacity: 90%;
&:hover {
    transform:scale(102%);
  opacity: 100%;
}
`
export const CardHeader = styled.h2 `
font-size: 20px;
height: 30px;
line-height: 30px;
background-color: #656566;
width: 50%;
text-align: center;
color: whitesmoke;
justify-self: center;
`

const Card = ({url, name}) => {
    const [details, setDetails] = useState([])
    useEffect(() => {
        axios.get(url)
        .then((res) => {
            setDetails(res.data)
        })
    }, )
    return (
        <div id='pokemon-container'>
    <Link to={`/${details.id}/${details.name}`}>
        <CardStyle>
            <CardHeader>{details?.name}</CardHeader>
            <div style={{height: '270px', width: '350px', justifyContent: 'center',}}><img alt='pokemon' style={{width: '100%', height: '100%',}}  src={details?.sprites?.other?.dream_world?.front_default}></img></div>
            <DetailStyle>
            <StyledSpan>Ability: {details?.abilities?.[0]?.ability?.name}</StyledSpan>
            <StyledSpan>Base Experience: {details?.base_experience}</StyledSpan>
            <StyledSpan>Height: {details?.height}</StyledSpan>
            <StyledSpan>Weight: {details?.height}</StyledSpan>
            </DetailStyle>
            
        </CardStyle>
    </Link>
        </div>
    )
}

export default Card
