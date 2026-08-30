import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { countEndpoint } from "../endpoints";

type Numeros = {
  profes: number;
  vetes: number;
  blogs: number;
  events: number;
  missingposts: number;
  publicidades: number;
  servis?: number
}
const InicioInnerPage = ()=> {
  const [counts,setCounts] = useState<Numeros | null>(null)
  useEffect(() => {
  fetch(countEndpoint)
    .then(res => res.json())
    .then(data => setCounts(data));
  }, []);

  return (
    <div>

      {/* Contenido principal */}
      <div className="container mt-4">
        <h1>Bienvenido al Panel de Administración</h1>
        <p>Selecciona una sección desde la barra de navegación.</p>
        <h3>Profesionales registrados:  {counts?.profes}</h3>
        <h3>Veterinarias registrados:  {counts?.vetes}</h3>
        <h3>Blogs registrados:  {counts?.blogs}</h3>
        <h3>Extraviados registrados:  {counts?.missingposts}</h3>
        <h3>Fechas registrados:  {counts?.events}</h3>
        <h3>Publicidades registrados:  {counts?.publicidades}</h3>
        <h3>Servicios registrados:  {counts?.servis}</h3>
      </div>
    </div>
  );
}

type Props = {
    auth: boolean
}

const InicioPage = ({auth}: Props) => {
    
  const navigate = useNavigate()
  useEffect(()=>{
    if(!auth) navigate('/login')
  },[auth,navigate])
  return (
    auth && <InicioInnerPage />
  )
}

export default InicioPage
