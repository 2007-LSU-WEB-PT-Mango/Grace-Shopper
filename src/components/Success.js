import React, { useState } from 'react';
import Confetti from 'react-confetti'
 
const Success = () => {
  
  return (
    <>  
    <Confetti/>
    <div>
        <h1>Thank you for your purchase!</h1>
        <h1>Please contact us at:</h1>
        <ul>
            <li>
                <a href="https://www.linkedin.com/in/brandontalbright" target="_blank" rel="noopener noreferrer">
                    <i class="fa fa-linkedin-square"></i>
                </a>
                <a href="https://www.github.com/brandonalbright" target="_blank" rel="noopener noreferrer">
                <i class="fa fa-github"></i>
                </a>
                Brandon Albright</li>
            <li>
                <a href="https://www.linkedin.com/in/brandontalbright" target="_blank" rel="noopener noreferrer">
                    <i class="fa fa-linkedin-square"></i>
                </a>
                <a href="https://github.com/cboud31" target="_blank" rel="noopener noreferrer">
                <i class="fa fa-github"></i>
                </a>
                Cory Boudreaux</li>
            <li>
                <a href="https://www.linkedin.com/in/kippjennings/" target="_blank" rel="noopener noreferrer">
                    <i class="fa fa-linkedin-square"></i>
                </a>
                <a href="https://github.com/KippJenningsII" target="_blank" rel="noopener noreferrer">
                <i class="fa fa-github"></i>
                </a>
                Kipp Jennings</li>
            <li>
                <a href="https://www.linkedin.com/in/sophia-dooley-449105b5/" target="_blank" rel="noopener noreferrer">
                    <i class="fa fa-linkedin-square"></i>
                </a>
                <a href="https://github.com/sophiadooley" target="_blank" rel="noopener noreferrer">
                <i class="fa fa-github"></i>
                </a>
                Sophia Dooley</li>
        </ul>
    </div>
    </>
  )
}

export default Success;
