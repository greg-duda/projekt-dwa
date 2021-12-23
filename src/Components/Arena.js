import React, { useState, useEffect} from 'react'
import Card from './Card'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { BackButton } from './SinglePoke'
import { CloudUpload } from '@material-ui/icons';


const Arena = () => {
    const [winner, setWinner] = useState([])
    const [clear, setClear] = useState(false)
    const [arenaPoke, setArenaPoke] = useState([])

    const navigate = useNavigate()
    let currentArena = []
   
    const clearHandler = () => {
        setClear(!clear)
        let item
        for(item of arenaPoke) {
            axios.delete(`http://localhost:3002/arena/${item.id}`)
        }
    }

    
    const fightHandler = () => {
        let item
        for(item of arenaPoke) {
            axios.get(`${item.url}`)
            .then((res) => {
                currentArena.push(res.data)
            })
            
    }  console.log(currentArena, 'current')
}
useEffect(() => {
    axios.get('http://localhost:3002/arena').then((res) =>{
        setArenaPoke(res.data)

    })
}, [clear])
    return (
        <>
        <div id='arena-grid'>
        <div id='arena-grid-item'>VS
        <button onClick={fightHandler} style={{width: '200px', height: '50px', display: 'block'}} disabled={arenaPoke.length !== 2}>WALCZ</button>
        <button onClick={clearHandler} style={{width: '200px', height: '50px', display: 'block'}} disabled={arenaPoke.length === 0}>Wyczyść</button>
        </div>
        {arenaPoke.length > 0 ? <>{arenaPoke?.map((item) => <> <Card key={item.id} url={item.url} name={item.name}  /> </>)}</> : <> <div style={{width: '350px', height: '450px', border: '1px solid white'}}> </div><div style={{width: '350px', height: '450px', border: '1px solid white'}}></div></>}
        </div>
        <div style={{backgroundColor: '#99D9EA'}}><BackButton style={{width: '100%'}} onClick={() => navigate('/')}>Powrót do listy</BackButton></div>
        
        
        </>
    )
}

export default Arena

  // const check = () => {
        
    //     let item
    //     for(item of arenaPoke) {
    //         axios.get(`${item.url}`)
    //         .then((res) => {
    //          baseExp.push(res.data.base_experience)
    //         })
    //     }
    //     if(baseExp[0] > baseExp[1]) {
    //         console.log('winner is', arenaPoke[0].name)
    //         setWinner(arenaPoke[0].name)
    //         alert(`Zwyciezca: ${arenaPoke[0].name}`)

    //     } else if (baseExp[1] > baseExp[0]) {
    //         console.log('winner is', arenaPoke[1].name)
    //         setWinner(arenaPoke[1].name)
    //         alert(`Zwyciezca: ${arenaPoke[1].name}`)
    //     }
    //     return(<h1>{winner}</h1>)
    // }


           // if(item[0]?.data.base_experience > item[1].data.base_experience) {
        //     setWinner(item[0]?.data.name)
        // }else if (item[1]?.data.base_experience > item[0].data.base_experience) {
        //     setWinner(item[1].data.name)
        // } else {
        //     console.log('draw')
        // }
        // console.log(winner)