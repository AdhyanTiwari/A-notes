import Notecontext from "./notecontext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
    const [hideEdit, setHideEdit] = useState(true);
    const [hideId, setHideId] = useState("");
    const [notes, setnotes] = useState([]);
    const [authToken, setAuthToken] = useState("");
    let navigate = useNavigate();


    //SIGN UP
    const signUp = async (email, password, name) => {
        const data = {
            email: email,
            password: password,
            name: name
        }
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

        })
        const json = await response.json();
        if (json.status) {
            setAuthToken(json);
            navigate("/")
        }
        else {
            alert("user already exists")
        }
    }


    //SIGN IN 
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
        if (json.status) {
            setAuthToken(json);
            navigate("/")
        }
        else {
            alert("invalid credentials")
        }
    }


    //GET NOTES
    const getNotes = async () => {
        if (authToken.status) {
            const response = await fetch("http://localhost:5000/api/notes/getnotes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken.authtoken
                }
            })
            const json = await response.json();
            setnotes(json)
        }
        else {
            navigate('/signin')
        }

    }


    //ADD NOTE
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
                "auth-token": authToken.authtoken
            },
            body: JSON.stringify(data)
        })
        const json = await response.json();
        getNotes();
        console.log(json)
    }


    //DELETE NOTE
    const deleteNote = async (id) => {
        const response = await fetch(`http://localhost:5000/api/notes/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken.authtoken
            }
        })
        const json = await response.json();
        console.log(json);
        getNotes();
    }


    //EDIT NOTE
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
                "auth-token": authToken.authtoken
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