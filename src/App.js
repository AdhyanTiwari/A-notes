import './App.css';
import Home from './myComponents/Home';
import About from './myComponents/About';
import Nav from './myComponents/Nav';
import Signup from "./myComponents/Signup"
import Signin from "./myComponents/Signin"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './contexts/notes/NoteState';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Nav />
          <div className="container" style={{ marginTop: "5rem" }}>
            <Routes>
              <Route exact path="/" element={
                <Home />
              }>
              </Route>
              <Route exact path="/about" element={
                <About />
              }>
              </Route>
              <Route exact path="/signup" element={
                <Signup/>
              }>
              </Route>
              <Route exact path="/signin" element={
                <Signin />
              }>
              </Route>

            </Routes>
          </div>
        </Router >
      </NoteState>

    </>
  );
}

export default App;
