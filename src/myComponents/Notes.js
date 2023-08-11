import React from 'react';
import NoteComponent from './NoteComponent';
import {
    Link
} from "react-router-dom";

function Notes() {
    
    return (
        <>
            {/* <button className='btn btn-lg btn-primary rounded-circle position-fixed bottom-0 end-0 my-3 mx-3'><i className="fa-solid fa-plus"></i></button> */}
            <div style={{ marginLeft: "auto", marginRight: "auto", display: "flex", direction: "coloumn", flexWrap: "wrap", }}>
                <NoteComponent />
            </div>
        </>
    )
}

export default Notes