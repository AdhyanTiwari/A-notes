//rfce
import React, { useContext } from 'react';
import CreateNotes from './CreateNotes';
import Notes from './Notes';
import notecontext from '../contexts/notes/notecontext';

function Home() {
  let a = useContext(notecontext);
  const { hideEdit } = a;
  return (
    <>
      <div className="conatiner my-3">
        <div style={{ zIndex: 1 }}>
          <CreateNotes />
        </div>
        <div style={{ zIndex: 0 }}>
          <Notes />
        </div>

      </div>
    </>
  )
}

export default Home