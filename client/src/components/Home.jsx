import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getCharacters, filterGamesByStatus } from "../actions";
import {Link} from 'react-router-dom'
import Card from "./Card";
import Paginado from "./Paginado";
import './home.css'

export default function Home(){

     const dispatch = useDispatch()     
     const allCharacters = useSelector((state)=> state.characters)

     const [currentPage,setCurrentPage] = useState(1)//pagina actual que arranca en 1
     const [charactersPerPage, setCharactersPerPage]= useState(15)// juegos que se mostraran por pagina 15
     const indexOfLastCharacter = currentPage * charactersPerPage//indice de el ultimo personaje (pagina * juegos por pagina = 15)
     const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage// indice del primer juego (indice del ultimo juego - la catidad de juegos por pagina = 0)
     const currentCharacters = allCharacters.slice(indexOfFirstCharacter,indexOfLastCharacter)//constante que guarda todos los juegos que tendre en cada pagina(agarra el indice del primer juego y el indice del ultimo juego)

     // pagina 1 ------------0------------15
     // pagina 2 ------------16-----------31
     // pagina 3 ------------32-----------47

     const paginado = (pageNumber) => {
          setCurrentPage(pageNumber)
     }


     useEffect(()=>{
          dispatch(getCharacters())
     },[dispatch])

     function handleClick(e){
          e.preventDefault();
          dispatch(getCharacters());
     }

     function handleFilterStatus(e){
          dispatch(filterGamesByStatus(e.target.value))
     }

     return (
          <div>
               <Link to= '/character'>Crear personaje</Link>
               <h1>VIDEO GAMES RANDY</h1>
               <button onClick={e=>{handleClick(e)}}>
                    volver a cargar
               </button>
          <div>
               <select>
                    <option value = 'asc'>Ascendente</option>
                    <option value = 'desc'>Descendente</option>
               </select>
               <select onChange={e=> handleFilterStatus(e)}>
                    <option value = 'RPG'>RPG</option>
                    <option value = 'Indie'>Indie</option>
                    <option value = 'Strategy'>Strategy</option>
                    <option value = 'Adventure'>Adventure</option>
                    <option value = 'Action'>Action</option>
                    <option value = 'Simulation'>Simulation</option>
                    <option value = 'Puzzle'>Puzzle</option>
                    <option value = 'Arcade'>Arcade</option>
                    <option value = 'Casual'>Casual</option>
                    <option value = 'Shooter'>Shooter</option>
                    <option value = 'Platformer'>Platformer</option>
                    <option value = 'Racing'>Racing</option>
                    <option value = 'Massively Multiplaye'>Massively Multiplayer</option>
                    <option value = 'Fighting'>Fighting</option>
                    <option value = 'Sports'>Sports</option>
                    <option value = 'Family'>Family</option>
               </select>

               <select onChange={handleFilterStatus}>
                <option>genres</option>
                {allCharacters != "No activities"  && allCharacters.map(e => {
                   return (<option value={e.name} key={e.name}>{e.name}</option>) 
                })}
                </select>


               <select>
                    <option value = 'all'>todos</option>
                    <option value = 'created'>creados</option>
                    <option value = 'api'>existente</option>
               </select>

          <Paginado
          allCharacters={allCharacters.length}
          charactersPerPage={charactersPerPage}
          paginado={paginado}
          />     
          <div className="paginado" >
                {currentCharacters && currentCharacters.map(e => {
                return <Card
                image={e.image} 
                name={e.name}  
                 genres={e.genres} 
                 key={e.id}
                />
                })}
            </div>


              
          </div>
          </div>
     )

}