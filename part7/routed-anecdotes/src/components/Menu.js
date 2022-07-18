import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./About";
import AnecdoteList from "./AnecdoteList";
import CreateNew from "./CreateNew";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <Router>
      <div>
        <Link to="/" style={padding}>
          anecdotes
        </Link>
        <Link to="/create" style={padding}>
          create new
        </Link>
        <Link to="/about" style={padding}>
          about
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<AnecdoteList />} />
        <Route path="/create" element={<CreateNew />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default Menu;
