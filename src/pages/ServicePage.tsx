import { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import '../styles/profesinal-page-style.css'
import type { Servicio } from '../types/types';
import { ServiciosForm } from '../forms/ServicioForm';
import { servGetEndpoint } from '../endpoints';
import ServRow from '../rows/ServRow';
import { ServisModal } from '../modales/ServisModal';


const tableHeaders = [
  "IDs", 
  "Nombre",
  "Clase",
  "Suscripcion",
  "Accion"
]

type Props = {
    auth: boolean
}
const ServiciosPage = ({auth}: Props) => {
  const [busqueda, setBusqueda] = useState("");
  const [formview,setFormview] = useState<boolean>(false)
  const [selectedProf,setSelectedProf] = useState<Servicio | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setmodalType] = useState<"view" | "put-form" | "hide">('hide');
  const { data, loading, error } = useFetch<Servicio[]>(servGetEndpoint);
  
  const lista = data?.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) 
    || p.topico.toLowerCase().includes(busqueda.toLowerCase()) 
    );
  return (
     auth && <div className='container'>
      <h2>Gestión de Servicios</h2>
      <div className="plus-button-container">
        <button className="btn btn-success" onClick={()=> setFormview(!formview)}>{formview ? "<- Volver atras" : "+ Nuevo Servicio"}</button>
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      <InputGroup className="mb-4">
        <Form.Control
          placeholder="Buscar por nombre, especialidad o ubicación..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <Button variant="outline-secondary">
          🔍
        </Button>
        </InputGroup>
      {formview ? <ServiciosForm /> 
                : <table className='user-list'>
                  <thead>
                    <tr>
                      {tableHeaders.map(item => (<td key={item}>{item}</td>))}
                    </tr>
                  </thead>
                  <tbody>
                    {lista?.map((user) => (
                       <ServRow prof={user} setSelectedProf={setSelectedProf} setShowModal={setShowModal} setmodalType={setmodalType}/>
                    ))}
                    </tbody>
                  </table>
      }
      <ServisModal show={showModal} tipo={modalType} hide={() => {setShowModal(false); setmodalType("hide"); setSelectedProf(null)}} obj={selectedProf} />
      
      </div>
  )
}

export default ServiciosPage