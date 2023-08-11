import React, { useState, useContext } from 'react';
import {
  Link
} from "react-router-dom";
import notecontext from '../contexts/notes/notecontext';

function Signup() {
  const a = useContext(notecontext)
  const { signUp } = a;
  const [note, setNote] = useState({ password: "", Cpassword: "", email: "", name: "" })
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const onClick = (e) => {
    e.preventDefault();
      signUp(note.email, note.password, note.name)
  }
  return (
    <form onSubmit={onClick} className='container border rounded' style={{ width: "40%", padding: "1rem" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Sign Up!</h1>
      </div>
      <div className='container mt-3' style={{ width: "90%", paddingTop: "1rem" }} >
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">name:</label>
          <input type="text" onChange={onChange} className="form-control" id="exampleFormControlInput1" name='name' value={note.name} minLength={3} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">email:</label>
          <input type="email" onChange={onChange} className="form-control" id="exampleFormControlInput1" name='email' value={note.email} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">password:</label>
          <input type="password" onChange={onChange} className="form-control" id="exampleFormControlInput1" name='password' value={note.password} minLength={5} />
        </div >
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">confirm password:</label>
          <input type="password" onChange={onChange} className="form-control" id="exampleFormControlInput1" name='Cpassword' value={note.Cpassword} />
        </div >
        <Link to={"/signin"}>Already a user? Sign In</Link>
        <button type='submit' className='btn btn-primary mt-3' style={{ width: "100%" }} >Sign Up</button>
      </div>
    </form>
  )
}

export default Signup