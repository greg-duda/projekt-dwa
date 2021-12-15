import React, {useState, useEffect} from 'react'
import axios from 'axios';
import styled from 'styled-components';
import back from '../Images/back.jpg'
import TextField from '@mui/material/TextField';
import Card from './Card';

const NavBtn = styled.button`
cursor: pointer;
width: 250px;
background-color: ${prop => prop.disabled ? "lightgray" : "#99D9EA"};
justify-self: center;
border-radius: 5px;
border: none;
transition: 0.5s;
&:hover {
    border: 1px solid black;
    font-size: 13px;
}

`



const Pokemons = () => {
    const [data, setData] = useState([])
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(151)
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pokesPerPage, setPokesPerPage] = useState(15)

    const prev = () => {
        setCurrentPage((prev) => prev - 1)
    }
    const next = () => {
       setCurrentPage((prev) => prev + 1)
    }
    const inputHandler = (e) => {
        setSearch(e.target.value.toLowerCase())
    }
    
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then((res) => {
            setData(res.data)
            console.log(res)
        })
    }, [offset])
    const allPages = Math.ceil(limit / pokesPerPage)
    const lastIndex = currentPage * pokesPerPage
    const firstIndex = lastIndex - pokesPerPage
    const currentPokes = data?.results?.slice(firstIndex, lastIndex)
    
    return (
        <>
        <div id="search-bar">
            <NavBtn disabled={currentPage === 1 || search !== ''} onClick={prev}>Poprzednia</NavBtn>
            <TextField onChange={inputHandler} style={{width: '200px', justifySelf: 'center'}} id="standard-basic" label="Wyszukaj..." />
            <NavBtn disabled={currentPage == allPages || search !== ''} onClick={next}>Nastepna</NavBtn>
        </div>
            
        <div style={{display: 'grid'}}>
             <div className='grid'>
            {search !== '' ? data?.results?.filter((item) => item.name.toLowerCase().includes(search)).map((item) => <Card key={item.name} name={item.name} url={item.url} />) : currentPokes?.map((item) => <Card key={item.name} name={item.name} url={item.url} />) }
             </div>
        </div>
        </>
        
    )
}

export default Pokemons



// const Pokemons = () => {
//     const [data, setData] = useState([])
//     const [offset, setOffset] = useState(0)
//     const [limit, setLimit] = useState(150)
//     const [search, setSearch] = useState('')
//     const prev = () => {
//         setOffset((prev) => prev - 15)
//         if(limit === 1 && offset === 150) {
//             setLimit(15)
//         }

//     }
//     const next = () => {
//         setOffset((prev) => prev +15)
//         if( offset === 135) {
//             setLimit(1)
//         }
//     }
//     const inputHandler = (e) => {
//         setSearch(e.target.value)
//     }
    
//     useEffect(() => {
//         axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
//         .then((res) => {
//             setData(res.data)
//             console.log(res)
//         })
//     }, [offset])
//     return (
//         <>
//         <div style={{display: 'grid'}}>
//             <TextField onChange={inputHandler} style={{width: '200px', justifySelf: 'center'}} id="standard-basic" label="Wyszukaj..." />
//             <button disabled={offset === 150 ? true : false} onClick={next}>Nastepna</button>
//             <button disabled={offset === 0} onClick={prev}>Poprzednia</button>
//              <div className='grid'>
//             {data?.results?.filter((item) => search === '' ? item : item.name.toLowerCase().includes(search.toLowerCase()))
//             .map((item) => <Card key={item.name} name={item.name} url={item.url} />)}
//              </div>
//         </div>
//         </>
//     )
// }

// export default Pokemons