import React, { Component } from 'react'; 
import  './Chat.css'; 
import ImageFlashAuto from 'material-ui/SvgIcon';
class Chat extends Component {

    constructor(){
        super(); 
        this.state = {
            mensaje: '',
            message: [
            //     {id: 0, text: 'text1'},
            //     {id: 1, text: 'text2'},
            //     {id: 2, text: 'text3'}
             
             ]
        }
        this.updateMessage = this.updateMessage.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }
    handleSubmit(e){
        e.preventDefault();
        //const arrayMessages = this.state.message;
        const newMessage  = {
            id: this.state.message.length,
            text: this.state.mensaje
        };
        // arrayMessages.push(newMessage); 
        // this.setState({message: arrayMessages});
        window.firebase.database().ref(`messages/${newMessage.id}`).set(newMessage); 
        this.setState({mensaje: ''}); 
    }
    updateMessage(e){
        this.setState({mensaje: e.target.value}); 
        console.log(this.state.mensaje); 

    }
    componentDidMount(){
        window.firebase.database().ref('messages/').on('value', snapshot => { //Apenas cargue el render de la interfaz del chat
            const currentMessages = snapshot.val();  // se cargara lo que está en la base de datos y se llevara a lo que esta en el state
            if(currentMessages != null) {
                this.setState({
                    message: currentMessages
                })
            }
        })
    }
    render(){

        const { message } = this.state; 
        const messageList = message.map(message => {
            if(!(message.text == '')){
                if((message.id) % 2 == 0){
                    return <li key={message.id} className="jumbotron border-radius alert alert-primary d-flex justify-content-start my-1 col-md-6">{message.text}</li>
                }
                else{
                    return <li key={message.id} className="jumbotron border-radius alert alert-danger d-flex justify-content-end my-1 col-md-6">{message.text}</li>
                }
            }
            else{
                {};
            }
            
           
        }); 
        
        return(
           <div>
                <ul className="list-group list-group-flush">
                    {messageList}
                </ul>
                <div className="form-group form-inline my-4">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            
                            className="form-control rounded" 
                            placeholder="Ingrese"
                            type="text"
                            value={this.state.mensaje}
                            onChange={this.updateMessage}
                        />
                        <button className="btn boton mx-2"><strong>></strong></button>  
                    </form>
                </div> 
           </div>
        )
    }
}
export default Chat; 