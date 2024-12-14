import React from 'react';
import Confetti from 'react-confetti'
import { completeOrder } from '../api';
 


const Success = ({shoppingCart}) => {
    
    function updateOrder(orderID) {
        completeOrder(orderID);
    }

    updateOrder(shoppingCart.id)

    const listStyle = {fontsize: "20pt"}
    

  return (
    <>  
    <Confetti/>
    <div 
        style={{background: "white", marginTop: "200px", display: "inline-block", padding: "20px", border: "1px solid white", borderRadius: "15px"}}>
        <h1>Thank you for your purchase!</h1>
        <h1>Please contact us at:</h1>
        <ul style={{listStyle: "none"}}>
            <li style={{fontSize: "30pt"}}>
                <a 
                    href="https://www.linkedin.com/in/brandontalbright" 
                    target="_blank" rel="noopener noreferrer">
                    <i class="fa fa-linkedin-square"></i>
                </a>
                <a 
                    href="https://www.github.com/brandonalbright" 
                    target="_blank" rel="noopener noreferrer">
                <i class="fa fa-github"></i>
                </a>
                Brandon Albright</li>
            <li style={{fontSize: "30pt"}}>
                <a 
                    href="https://www.linkedin.com/in/cory-boudreaux-6018bb200/" 
                    target="_blank" rel="noopener noreferrer">
                    <i class="fa fa-linkedin-square"></i>
                </a>
                <a 
                    href="https://github.com/cboud31" 
                    target="_blank" rel="noopener noreferrer">
                <i class="fa fa-github"></i>
                </a>
                Cory Boudreaux</li>
            <li style={{fontSize: "30pt"}}>
                <a 
                    href="https://www.linkedin.com/in/kippjennings/" 
                    target="_blank" rel="noopener noreferrer">
                    <i class="fa fa-linkedin-square"></i>
                </a>
                <a 
                    href="https://github.com/KippJenningsII" 
                    target="_blank" rel="noopener noreferrer">
                <i class="fa fa-github"></i>
                </a>
                Kipp Jennings</li>
            <li style={{fontSize: "30pt"}}>
                <a 
                    href="https://www.linkedin.com/in/sophia-dooley-449105b5/" 
                    target="_blank" rel="noopener noreferrer">
                    <i class="fa fa-linkedin-square"></i>
                </a>
                <a 
                    href="https://github.com/sophiadooley" 
                    target="_blank" rel="noopener noreferrer">
                <i class="fa fa-github"></i>
                </a>
                Sophia Dooley</li>
        </ul>
    </div>
    </>
  )
}

export default Success;
