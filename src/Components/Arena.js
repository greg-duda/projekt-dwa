import React, { useState, useEffect} from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom';
import { BackButton } from './SinglePoke'
import Card from './Card'



const Arena = () => {
    const [winner, setWinner] = useState('')
    const [clear, setClear] = useState(false)
    const [arenaPoke, setArenaPoke] = useState([])
    const [draw, setDraw] = useState(false)


    const navigate = useNavigate()
    let currentArena = []
   
    const clearHandler = () => {
        setClear(!clear)
        setWinner('')
        let item
        for(item of arenaPoke) {
            axios.delete(`http://localhost:3002/arena/${item.id}`)
        }
    }

    
    const fightHandler = async () => {
        let item
        for(item of arenaPoke) {
            const res = await axios.get(`${item.url}`)
                 currentArena.push(res.data)
                 if(currentArena.length === 2 && currentArena[0].base_experience > currentArena[1].base_experience) {
                    setWinner(currentArena[0].name.toUpperCase())
                
                } else if(currentArena.length === 2 && currentArena[1].base_experience > currentArena[0].base_experience) {
                    setWinner(currentArena[1].name.toUpperCase())
                     
                }else if((currentArena.length === 2 && currentArena[1].base_experience === currentArena[0].base_experience)) {
                    console.log('remis')
                    setWinner('UNKNOWN')
                    setDraw(true)}
            }
            
}
useEffect(() => {
    axios.get('http://localhost:3002/arena').then((res) =>{
        setArenaPoke(res.data)

    })
}, [clear, winner, draw])
    return (
        <>
        {draw ? <h1 style={{margin: '0', textAlign: 'center', color: 'snow'}}>IT'S A DRAW</h1> : null}
        {winner ? <h1 style={{margin: '0', textAlign: 'center', color: 'snow'}}>THE WINNER IS... {winner}</h1> : <h1 style={{margin: '0', textAlign: 'center', color: 'snow'}}>LET THE BATTLE BEGIN...</h1>}
        <div id='arena-grid'>
        
        <div id='arena-grid-item'>VS
        <button onClick={fightHandler} style={{display: 'block', border: 'none', cursor: 'pointer', margin: '10px auto', width: '200px', height: '50px', backgroundColor: 'snow', borderRadius: '5px'}} disabled={arenaPoke.length !== 2 || winner !== ''}>WALCZ</button>
        <button onClick={clearHandler} style={{display: 'block', border: 'none', cursor: 'pointer', margin: '10px auto', width: '200px', height: '50px', backgroundColor: 'snow', borderRadius: '5px'}} disabled={arenaPoke.length === 0}>Wyczyść</button>
        </div>
        
        {arenaPoke.length > 0 ? <>{arenaPoke?.map((item) => <> <Card key={item.id} url={item.url} name={item.name}  /> </>)}</> : <> <div style={{width: '350px', height: '450px', border: '1px solid white'}}> </div><div style={{width: '350px', height: '450px', border: '1px solid white'}}></div></>}
        </div>
        <div style={{backgroundColor: '#99D9EA'}}><BackButton style={{width: '100%'}} onClick={() => navigate('/')}>Powrót do listy</BackButton></div>
        
        
        </>
    )
}

export default Arena
