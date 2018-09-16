import React, { Component } from 'react'; 
//importando interfaz del chat 
import Chat from './Components/Chat'; 


class App extends Component {
    render(){
        return(
            <div className="App">
                <nav class="navbar navbar-dark bg-dark">
                    <span class="navbar-brand mb-0 h1">Chat React JS</span>
                </nav>
                <div className="mx-3 my-4"> 
                    <Chat />
                </div> 
                
                 
            </div> 
                 
        )
    }
}
export default App; 