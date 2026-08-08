import { BrowserRouter, Routes, Route, Navigate,NavLink } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfesionalesPage from "./pages/ProfesionalesPage";
import EstablecimientosPage from "./pages/EstablecimientosPage";
import BlogsPage from "./pages/BlogsPage";
import ExtraviadosPage from "./pages/ExtraviadosPage";
import InicioPage from "./pages/InicioPage";
import { useState } from "react";
import './App.css'
import CalendarPage from "./pages/CalendarioPage";

function App() {
  //const isAuthenticated = localStorage.getItem("token"); // simplificado
  const [isAuthenticated,setAuth] = useState<boolean>(false)

  return (
    <BrowserRouter>
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Veterinet Admin
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active fw-bold text-warning" : "")
                  }
                  to="/profesionales"
                >
                  Profesionales
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active fw-bold text-warning" : "")
                  }
                  to="/establecimientos"
                >
                  Establecimientos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active fw-bold text-warning" : "")
                  }
                  to="/blogs"
                >
                  Blogs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active fw-bold text-warning" : "")
                  }
                  to="/extraviados"
                >
                  Extraviados
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active fw-bold text-warning" : "")
                  }
                  to="/eventos"
                >
                  Eventos
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        
        <Route path="/login" element={<LoginPage setAuth={setAuth}/>} />
        {isAuthenticated ? (
          <>
            <Route path="/inicio" element={<InicioPage auth={isAuthenticated}/>} />
            <Route path="/profesionales" element={<ProfesionalesPage auth={isAuthenticated}/>} />
            <Route path="/establecimientos" element={<EstablecimientosPage auth={isAuthenticated}/>} />
            <Route path="/blogs" element={<BlogsPage auth={isAuthenticated}/>} />
            <Route path="/extraviados" element={<ExtraviadosPage auth={isAuthenticated}/>} />
            <Route path="/eventos" element={<CalendarPage auth={isAuthenticated}/>} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
