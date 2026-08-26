import { BrowserRouter, Routes, Route, Navigate,NavLink } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfesionalesPage from "./pages/ProfesionalesPage";
import EstablecimientosPage from "./pages/EstablecimientosPage";
import BlogsPage from "./pages/BlogsPage";
import InicioPage from "./pages/InicioPage";
import { useState } from "react";
import './App.css'
import '../src/styles/navbar.css'
import CalendarPage from "./pages/CalendarioPage";
import { ExtraviadosPage } from "./pages/ExtraviadosPage";
import PublicidadPage from "./pages/PublicidadPage";
import ServiciosPage from "./pages/ServicePage";

function App() {
  //const isAuthenticated = localStorage.getItem("token"); // simplificado
  const [isAuthenticated,setAuth] = useState<boolean>(false)

  return (
    <BrowserRouter>
       
      <nav id="barraDEnavegacion">
        <div className="nav-title"><h1>Sitio de Administracion</h1></div>
        <div className="nav-content">
          <ul >
            <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active fw-bold text-warning" : "")
                  }
                  to="/inicio"
                >
                  Inicio
                </NavLink>
              </li>
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
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active fw-bold text-warning" : "")
                  }
                  to="/publicidades"
                >
                  Publicidades
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active fw-bold text-warning" : "")
                  }
                  to="/servicios"
                >
                  Servicios
                </NavLink>
              </li>
            </ul>
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
            <Route path="/publicidades" element={<PublicidadPage auth={isAuthenticated}/>} />
            <Route path="/servicios" element={<ServiciosPage auth={isAuthenticated}/>} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
