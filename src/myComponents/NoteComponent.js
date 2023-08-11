import React, { useEffect, useContext, useState, useRef } from 'react'
import notecontext from '../contexts/notes/notecontext';

function NoteComponent() {

    const ref = useRef(null)
    const a = useContext(notecontext);
    useEffect(() => {
        a.getNotes()
    }, [])
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "", id: "" })
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const noteEdit = (currentNote) => {
        ref.current.click();
        setNote({ etitle: currentNote.data.title, etag: currentNote.data.tag, edescription: currentNote.data.description, id: currentNote._id })

    }
    const saveNote = () => {
        a.editNote(note.id, note.etitle, note.edescription, note.etag);
        ref.current.click();
    }

    return (
        <>
            {a.notes.slice(0).reverse().map(e => {
                return (
                    <>
                        
                        <div className="card my-2  mx-2 rounded-3" style={{ flex: "1", minWidth: "16.2rem", maxWidth: "16.2rem" }} key={e._id}>
                            <div className="card-body">
                                <span className="position-absolute top-0 end-0  badge rounded-pill bg-info">
                                    {e.data.tag}
                                </span>
                                <h6 className="card-title fs-5">{e.data.title}</h6>
                                <p className="card-text my-3 lh-sm fs-6">{e.data.description}</p>
                                <div style={{ marginTop: "1rem" }}>
                                    <i className="fa-solid fa-trash" onClick={() => { a.deleteNote(e._id) }}></i>
                                    <i className="fa-solid fa-pen-to-square mx-3" onClick={() => { noteEdit(e) }}></i>
                                </div>

                            </div>
                        </div>
                    </>

                )
            })}
            <div className='container' style={{textAlign:'center'}}>
                          <h2>  {a.notes.length === 0 && "No notes, create new note"}</h2>
                        </div>
            <div className='container'>
                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Tag:</label>
                                    <input type="text" onChange={onChange} className="form-control" id="exampleFormControlInput1" placeholder="tag" name='etag' value={note.etag} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Title:</label>
                                    <input type="text" onChange={onChange} className="form-control" id="exampleFormControlInput1" placeholder="title" name='etitle' value={note.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                    <textarea onChange={onChange} className="form-control" id="exampleFormControlTextarea1" rows="3" name='edescription' value={note.edescription}></textarea>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={saveNote}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteComponent