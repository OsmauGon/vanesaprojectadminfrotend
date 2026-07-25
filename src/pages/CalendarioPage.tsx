import { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import '../styles/profesinal-page-style.css'
import { citasIniciales } from '../fakeObjects';
import type { Event } from '../types/types';
import EventForm from '../forms/EventForm';
import EventRow from '../rows/EventRow';
import { ModalDEevento } from '../modales/ModalDEevento';

type Props = {
    auth: boolean
}
const CalendarPage = ({auth}: Props) => {
  const [busqueda, setBusqueda] = useState("");
  const [formview,setFormview] = useState<boolean>(false)
  const [selectedProf,setSelectedProf] = useState<Event | null>(null)
  const [showModal, setShowModal] = useState(false);
  const { data, loading, error } = useFetch<Event[]>("https://api.example.com/users");
  
  const lista = data?.filter(p => 
    p.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.tipo.toLowerCase().includes(busqueda.toLowerCase())
  ); 
  const lista2 = citasIniciales.filter(p => 
    p.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.tipo.toLowerCase().includes(busqueda.toLowerCase())
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
      {formview ? <EventForm /> 
                : <table className='user-list'>
                  <thead>
                    <tr>
                      <td>IDs</td>
                      <td>Titulo</td>
                      <td>Tipo</td>
                      <td>Modificar</td>
                      <td>Eliminar</td>
                    </tr>
                  </thead>
                  <tbody>
                    {lista?.map((user) => (
                       <EventRow prof={user} setSelectedProf={setSelectedProf} setShowModal={setShowModal}/>
                    ))}
                    </tbody>
                  </table>
      }
      {formview ? ""
                : <table className='user-list'>
                  <thead>
                    <tr>
                      <td>IDs</td>
                      <td>Titulo</td>
                      <td>Tipo</td>
                      <td>Modificar</td>
                      <td>Eliminar</td>
                    </tr>
                  </thead>
                  <tbody>
                    {lista2?.map((user) => (
                      <EventRow prof={user} setSelectedProf={setSelectedProf} setShowModal={setShowModal}/>
                    ))}
                    </tbody>
                  </table>
      }
      <ModalDEevento show={showModal} hide={() => setShowModal(false)} obj={selectedProf} />
      </div>
  )
}

export default CalendarPage