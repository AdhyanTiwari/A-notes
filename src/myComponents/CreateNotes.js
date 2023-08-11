import React, { useContext, useState } from 'react';
import notecontext from '../contexts/notes/notecontext';
import "./css/CreateNotes.css";

function CreateNotes() {
    const context = useContext(notecontext);
    const border = {
        "border": "none",
        "borderRadius": "0"
    }
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const onAdd = (e) => {
        e.preventDefault();
        if (note.title === "" || note.title === null) {

        }
        else {
            context.addNote(note.title, note.description, note.tag);
            setNote({ title: "", description: "", tag: "" })
        }

    }
    const del = (e) => {
        e.preventDefault();
        setNote({ title: "", description: "", tag: "" });
    }
    return (

        <div className="my-3  container mx-auto " style={{ zIndex: "1", minHeight: "100%" }} >

            <form action="" className='small-middle-container border border-1 rounded-3' style={{ backgroundColor: 'white' }}>
                <div >
                    <input type="text" style={border} className="form-control" id="exampleFormControlInput1" name='tag' placeholder='Tag' onChange={onChange} value={note.tag} />
                </div>
                <div>
                    <input type="text" style={border} className="form-control" id="exampleFormControlInput1" name='title' placeholder='Title' onChange={onChange} value={note.title} />
                </div>
                <div>
                    <textarea className="form-control" style={border} id="exampleFormControlTextarea1" rows="1" name='description' placeholder='Description' onChange={onChange} value={note.description} ></textarea>
                </div>
                <div className="mt-3">
                    <button type='submit' style={{ marginLeft: "0.75rem", marginBottom: "0.75rem", backgroundColor: "white", border: "none" }} onClick={onAdd}><i className="fa-solid fa-plus"></i></button>
                    <button className='ml-3' style={{ backgroundColor: "white", border: "none" }} onClick={del}><i className="fa-solid fa-trash"></i></button>
                </div>
            </form>
        </div>

    )
}

export default CreateNotes