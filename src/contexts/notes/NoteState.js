import Notecontext from "./notecontext";
import React, { useState } from "react";

const NoteState = (props) => {
    const [hideEdit, setHideEdit] = useState(true);
    const [hideId, setHideId] = useState("");
    const [notes, setnotes] = useState([]);
    const [authToken, setAuthToken] = useState("");


    const signUp = async (email, password,name) => {
        const data = {
            email: email,
            password: password,
            name:name
        }
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

        })
        const json = await response.json();
        setAuthToken(json)
        console.log(authToken.authtoken)
    }

    const signIn = async (email, password) => {
        const data = {
            email: email,
            password: password
        }
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

        })
        const json = await response.json();
        if(json.error="password does not match"){
            console.log("bale bale ho gaya")
        }
        else{
        setAuthToken(json)

        }
        
    }

    const getNotes = async () => {

        const response = await fetch("http://localhost:5000/api/notes/getnotes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjOTI4NzkzNGFhYzNjOWQ1OTQwOTgwIn0sImlhdCI6MTY5MDkxMDk5M30.iIfRoK_J1hfJqRX0Ex3DAUWdemVyKLMELnIgVjKGBNE"
            }
        })
        const json = await response.json();
        setnotes(json)

    }

    const addNote = async (title, description, tag) => {
        let data = {}
        if (tag === "") {
            data = {
                "title": title,
                "description": description
            };
        }
        else {
            data = {
                "title": title,
                "description": description,
                "tag": tag
            };
        }
        const response = await fetch("http://localhost:5000/api/notes/createnote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjOTI4NzkzNGFhYzNjOWQ1OTQwOTgwIn0sImlhdCI6MTY5MDkxMDk5M30.iIfRoK_J1hfJqRX0Ex3DAUWdemVyKLMELnIgVjKGBNE"
            },
            body: JSON.stringify(data)
        })
        const json = await response.json();
        getNotes();
        console.log(json)
    }

    const deleteNote = async (id) => {
        const response = await fetch(`http://localhost:5000/api/notes/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjOTI4NzkzNGFhYzNjOWQ1OTQwOTgwIn0sImlhdCI6MTY5MDkxMDk5M30.iIfRoK_J1hfJqRX0Ex3DAUWdemVyKLMELnIgVjKGBNE"
            }
        })
        const json = await response.json();
        console.log(json);
        getNotes();
    }
    const editNote = async (id, title, description, tag) => {
        let data = {
            title: title,
            description: description,
            tag: tag
        };

        const response = await fetch(`http://localhost:5000/api/notes/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjOTI4NzkzNGFhYzNjOWQ1OTQwOTgwIn0sImlhdCI6MTY5MDkxMDk5M30.iIfRoK_J1hfJqRX0Ex3DAUWdemVyKLMELnIgVjKGBNE"
            },
            body: JSON.stringify(data)
        })
        const json = await response.json();
        console.log(json);
        getNotes();
    }


    return (
        <Notecontext.Provider value={{ notes, addNote, deleteNote, getNotes, hideEdit, setHideEdit, hideId, setHideId, editNote, signIn, signUp }}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default NoteState;