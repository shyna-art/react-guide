import React from 'react'
import './card.css'



const Card = (props) => {

  
    return (
        <div className = "Card">
              <div className="image-wrapper">
                <img src={props.image} alt={props.name} />
            </div>
            <h2>{props.name}</h2>
            <p>Price: {props.price}</p  >
           <div className="button-group">
                <button >
                    Add to Cart
                </button>

                <button >
                    Buy Now
                </button>
            </div>
        </div>
    )
}

export default Card