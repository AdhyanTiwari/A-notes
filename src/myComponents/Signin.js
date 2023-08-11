import React, { useState, useContext } from 'react';
import notecontext from '../contexts/notes/notecontext';

function Signin() {
  const a = useContext(notecontext);
  const { signIn } = a;
  const [note, setNote] = useState({ password: "", email: "" })
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const onClick = (e) => {
    e.preventDefault();
    signIn(note.email, note.password)
  }
  return (
    <form className='container border rounded' style={{ width: "40%", padding: "1rem" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Sign In!</h1>
      </div>
      <div className='container mt-3' style={{ width: "90%", paddingTop: "1rem" }} >
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">email:</label>
          <input type="email" onChange={onChange} className="form-control" id="exampleFormControlInput1" name='email' value={note.email} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">password:</label>
          <input type="password" onChange={onChange} className="form-control" id="exampleFormControlInput1" name='password' value={note.password} />
        </div >
        <button type='submit' className='btn btn-primary' style={{ width: "100%" }} onClick={onClick}>Sign In</button>
      </div>
    </form>
  )
}

export default Signin