import React, {useState, useEffect} from 'react';
import io from 'socket.io-client'

export default props => {
    const [socket] = useState(io(':7000'));
    const[msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('send_data_to_other_client', msg => {
            setMessages(prevMessages => {
                return[msg,...prevMessages];
            })
        });
    },[]);

    const onSubmitHandler = event =>{
        event.preventDefault();
        socket.emit('event_from_client', msg);
        setMessages([msg, ...messages]);
        setMsg("");
        return false;
    }

    return (
        <>
        <form onSubmit ={onSubmitHandler}>
            <label>your text:</label>{''}
            <br/>
            <input type = "description" name = "chatText" value = {msg} onChange = {(event) => setMsg(event.target.value)} />
            <button>submit</button>
        </form>
        {messages.map((msg, index)=> {
            return(
                <p key = {index}> {msg} </p>
            )
        })}
        </>
    )
}