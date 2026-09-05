import { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import type { Profesional } from '../types/types';
import '../styles/profesinal-page-style.css'
import UserRow from '../rows/UserRow';
//import { ModalDEprofesional } from '../modales/ModalDEprofesional';
import { profGetEndpoint } from '../endpoints';
import { ProfesionalForm } from '../forms/ProfesionalForm';
import { ProfModal } from '../modales/ProfModal';


const tableHeaders = [
  "IDs", 
  "Nombre",
  "Estado",
  "Accion"
]

type Props = {
    auth: boolean
}
const ProfesionalesPage = ({auth}: Props) => {
  const [busqueda, setBusqueda] = useState("");
  const [formview,setFormview] = useState<boolean>(false)
  const [selectedProf,setSelectedProf] = useState<Profesional | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setmodalType] = useState<"view" | "put-form" | "hide">('hide');
  const { data, loading, error } = useFetch<Profesional[]>(profGetEndpoint);
  console.log(data)
  const lista = data?.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) 
    //|| p.especialidad.toLowerCase().includes(busqueda.toLowerCase()) 
    //|| p.ubicacion.toLowerCase().includes(busqueda.toLowerCase())
  );
  return (
     auth && <div className='container'>
      <h2>Gestión de Profesionales</h2>
      <div className="plus-button-container">
        <button className="btn btn-success" onClick={()=> setFormview(!formview)}>{formview ? "<- Volver atras" : "+ Nuevo Profesional"}</button>
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
      {formview ? <ProfesionalForm /> 
                : <table className='user-list'>
                  <thead>
                    <tr>
                      {tableHeaders.map(item => (<td key={item}>{item}</td>))}
                    </tr>
                  </thead>
                  <tbody>
                    {lista?.map((user) => (
                       <UserRow prof={user} setSelectedProf={setSelectedProf} setShowModal={setShowModal} setmodalType={setmodalType}/>
                    ))}
                    </tbody>
                  </table>
      }
      <ProfModal show={showModal} tipo={modalType} hide={() => {setShowModal(false); setmodalType("hide"); setSelectedProf(null)}} obj={selectedProf} />
      
      </div>
  )
}

export default ProfesionalesPage