import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const InicioInnerPage = ()=> {

  return (
    <div>

      {/* Contenido principal */}
      <div className="container mt-4">
        <h1>Bienvenido al Panel de Administración</h1>
        <p>Selecciona una sección desde la barra de navegación.</p>
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
