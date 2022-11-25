import React from "react";

export default function Card({name,image,genres}){
     return(
          <div>
               <img src={image} alt="img not found" width="200px" height="250px"/>
               <h3>{name}</h3>
               <h5>{genres}</h5>
               
          </div>
     );
}

