import React, {useState, useEffect} from 'react'
import axios from 'axios';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Card from './Card';

const NavBtn = styled.button`
cursor: ${prop => prop.disabled ? false : "pointer"};
width: 250px;
background-color: ${prop => prop.disabled ? "lightgray" : "#99D9EA"};
justify-self: center;
border-radius: 5px;
border: none;
transition: 0.5s;
&:hover {
    border: ${prop => prop.disabled ? false : '1px solid black'};
    font-size: ${prop => prop.disabled ? false : '13px'};

}

`



const Pokemons = () => {
    const [data, setData] = useState([])
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
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
        .then((res) => {
            setData(res.data)
            console.log(res)
        })
    }, [])
    const allPages = Math.ceil(limit / pokesPerPage)
    const lastIndex = currentPage * pokesPerPage
    const firstIndex = lastIndex - pokesPerPage
    const currentPokes = data?.results?.slice(firstIndex, lastIndex)
    
    return (
        <>
        <div id="search-bar">
            <NavBtn disabled={currentPage === 1 || search !== ''} onClick={prev}>Poprzednia</NavBtn>
            <TextField onChange={inputHandler} style={{width: '200px', justifySelf: 'center'}} color="success" id="standard-basic" label="Wyszukaj..." />
            <NavBtn disabled={currentPage === allPages || search !== ''} onClick={next}>Nastepna</NavBtn>
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
