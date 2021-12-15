import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Logo from '../Images/Logos.png'
import bulba from '../Images/bulbasaur.png'
import pika from '../Images/pikachu.png'
import stadium from '../Images/Stadium.png'
import heart from '../Images/Heart.png'

const Icon = styled.img`
justify-content: center;
height: 50px;
width: 50px; 
line-height: 70px;
vertical-align: middle;
margin-left: 10px;
transition: 0.5s;
&:hover {
    transform: rotate(35deg);

}
&:nth-child(2):hover {
    transform: rotate(-35deg)
}
`

const NavButton = styled.button `
border: none;
box-shadow: inset #CD274D 1px 1px 30px 16px;
background-color: whitesmoke;
height: 70px;
width: 20em;
text-align: center;
font-size: 20px;
line-height: 70px;
align-content: center;
vertical-align: middle;
border-radius: 10px;
cursor: pointer;
transition: 0.5s;
&:hover {
    background-color: #CD274D;
    box-shadow: inset 42px 12px 56px -27px;
}
&:nth-child(2) {
    background-color: whitesmoke;
    box-shadow: inset #FD7537 1px 1px 30px 16px;
}
&:nth-child(2):hover {
    background-color: #FD7537;
    box-shadow: inset 42px 12px 56px -27px;
}

`


const Nav = () => {
    return (
        <div className='Nav'>
            <div id='stFragment'>
            <img src={Logo}></img>
            </div>
            <div id='ndFragment'>
                <div><img id='imageLeft' src={bulba}></img></div>
                <div id='navbtns'>
                    <Link to={'/favourites'}>
                    <NavButton>Ulubione
                        <Icon src={heart} />
                    </NavButton>
                    </Link>
                    <NavButton>Arena
                        <Icon src={stadium}/>
                    </NavButton>
                </div>
                <div><img id ='imageRight' src={pika}></img></div>
            </div>
            
        </div>
    )
}

export default Nav
