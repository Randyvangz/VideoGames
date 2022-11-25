import React from "react";
import {Link} from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage(){
     return(
          <div className="text">
               <h1>Video Games</h1>
               <Link to='/home'>
                    <button className="btn">Ingresar</button>
               </Link>
          </div>
     )
}
