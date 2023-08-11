import React, { useState, useContext } from 'react';
import {
  Link
} from "react-router-dom";
import notecontext from '../contexts/notes/notecontext';

function Signup() {
  const a = useContext(notecontext)
  const { signUp } = a;
  const [note, setNote] = useState({ password: "", Cpassword: "", email: "",name:"" })
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const onClick = () => {
    if (note.Cpassword === note.password) {
      signUp(note.email, note.password,note.name)
    }
    else {
      alert("password and confirm password does not match")
    }
  }
  return (
    <div className='container border rounded' style={{ width: "40%", padding: "1rem" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Sign Up!</h1>
      </div>
      <div className='container mt-3' style={{ width: "90%", paddingTop: "1rem" }} >
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">name:</label>
          <input type="email" onChange={onChange} className="form-control" id="exampleFormControlInput1" name='name' value={note.name} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">email:</label>
          <input type="email" onChange={onChange} className="form-control" id="exampleFormControlInput1" name='email' value={note.email} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">password:</label>
          <input type="password" onChange={onChange} className="form-control" id="exampleFormControlInput1" name='password' value={note.password} />
        </div >
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">confirm password:</label>
          <input type="password" onChange={onChange} className="form-control" id="exampleFormControlInput1" name='Cpassword' value={note.Cpassword} />
        </div >
        <Link to={"/signin"}>Already a user? Sign In</Link>
        <button className='btn btn-primary mt-3' style={{ width: "100%" }} onClick={onClick}>Sign Up</button>
      </div>
    </div>
  )
}

export default Signup