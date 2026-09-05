import { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import '../styles/profesinal-page-style.css'
import type { Establishment } from '../types/types';
import EstablishmentRow from '../rows/EstablishmentRow';
import { EstablishmentForm } from '../forms/EstablishmentForm';
import { vetesGetEndpoint } from '../endpoints';
import { VetesModal } from '../modales/VeteModal';

const tableHeaders = [
  "IDs", 
  "Nombre",
  "Estado",
  "Accion"
]


type Props = {
    auth: boolean
}
const EstablecimientosPage = ({auth}: Props) => {
  const [busqueda, setBusqueda] = useState("");
  const [formview,setFormview] = useState<boolean>(false)
  const [selectedProf,setSelectedProf] = useState<Establishment | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setmodalType] = useState<"view" | "put-form" | "hide">('hide');
  const { data, loading, error, setReload } = useFetch<Establishment[]>(vetesGetEndpoint);
  
  const lista = data?.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) 
    //|| p.ubicacion.toLowerCase().includes(busqueda.toLowerCase())
  ); 
  return (
     auth && <div className='container'>
      <h2>Gestión de Establecimientos</h2>
      <div className="plus-button-container">
        <button className="btn btn-success" onClick={()=> setFormview(!formview)}>{formview ? "<- Volver atras" : "+ Nuevo Establecimiento"}</button>
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
      {formview ? <EstablishmentForm /> 
                : <table className='user-list'>
                  <thead>
                    <tr>
                      {tableHeaders.map(item => (<td key={item}>{item}</td>))}
                    </tr>
                  </thead>
                  <tbody>
                    {lista?.map((user) => (
                       <EstablishmentRow prof={user} setSelectedProf={setSelectedProf} setShowModal={setShowModal} setmodalType={setmodalType}/>
                    ))}
                    </tbody>
                  </table>
      }
      <VetesModal reload={setReload} show={showModal} tipo={modalType} hide={() => {setShowModal(false); setmodalType("hide"); setSelectedProf(null)}} obj={selectedProf} />
      </div>
  )
}

export default EstablecimientosPage