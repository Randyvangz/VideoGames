import React from "react";


export default function Paginado({charactersPerPage, allCharacters, paginado}){
     const pageNumbers = [];
    
 for(let i = 1; i<=Math.ceil(allCharacters/charactersPerPage);i++){
          pageNumbers.push(i);
     }
    
     return (
        <nav>
            <ul>
                {pageNumbers.map(e => {
                   if(e !== 0){
                       return <button key={e} onClick={() => paginado(e)}>{e}</button>
                   }
                })}
            </ul>
        </nav>
    )
}