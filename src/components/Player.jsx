import { useState } from "react"

export default function Player({initialName,symbol,isActive,onNameChange}){
    const [playerName,setPlayerName]=useState(initialName);
    const [isEditing,setIsEditing]=useState(false);
    function handleChange(event){
        setPlayerName(event.target.value);
    }
    function handleEditClick(){
        setIsEditing((edit)=>!edit);
        if(isEditing){
            onNameChange(symbol,playerName);
        }
    }
    let editablePlayerName=<span className="player-name">{playerName}</span>
    if(isEditing){
        editablePlayerName=<input type="text" value={playerName} onChange={handleChange} required/>
    }
    return(
        <li className={isActive?'active':null}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
                <button onClick={handleEditClick}>{isEditing?"Save":"Edit"}</button>
            </span>
        </li>
    )
}