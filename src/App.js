import React from "react";
import "./App.css";
import logo from "./Logo/marvel_logo.png";
import Cards from "./Componentes/Cards";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Detalle from "./Componentes/Detalle";
const App = () => {
  return (
    <section className="hero is-dark">
      <header className="hero-head">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src={logo} width="112" height="28" alt="" />
            </a>
          </div>
        </nav>
      </header>
      <main className="main hero-body">
        <div className="section">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Cards />} />
              <Route path="/:id" element={<Detalle />} />
              <Route path="/*" element={<Navigate to={"/"} />} />
            </Routes>
          </BrowserRouter>
        </div>
      </main>
      <footer className="hero-foot">
        <div className="section">Creado por: Eric Uriel Trejo Trejo</div>
      </footer>
    </section>
  );
};

export default App;
