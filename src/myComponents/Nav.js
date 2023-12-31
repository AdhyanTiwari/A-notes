// rfce
import React, { useContext } from 'react';
import {
    Link, useLocation
} from "react-router-dom";
import notecontext from '../contexts/notes/notecontext';

function Nav() {
    const a = useContext(notecontext);
    const { status } = a;
    let location = useLocation();

    const del = () => {
        localStorage.setItem("status", false)
    }

    return (
        <div className='position-fixed top-0 start-0' style={{ minWidth: "100%", zIndex: "2" }}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary " >
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">A-notes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>

                        </ul>
                        <div role="search" style={status ? { display: "none" } : {}}>
                            <Link to={"/signup"}><button className="btn btn-primary btn-sm mx-1" >Sign Up</button></Link>
                            <Link to={"/signin"}><button className="btn btn-primary btn-sm mx-1"> Sign In</button></Link>
                        </div>
                        <form onSubmit={del} style={status ? {} : { display: "none" }}>
                            <button type="submit" className="btn btn-primary btn-sm mx-1" >Log Out</button>
                        </form>
                    </div>
                </div>
            </nav>
            <hr style={{ margin: "0", padding: "0" }} />
        </div>
    )
}

export default Nav;