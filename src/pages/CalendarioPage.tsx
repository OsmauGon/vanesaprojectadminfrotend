import { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import '../styles/profesinal-page-style.css'
import type { Event } from '../types/types';
import EventRow from '../rows/EventRow';
import { eventGetEndpoint } from '../endpoints';
import { EventForm } from '../forms/EventForm';
import { EventModal } from '../modales/EventModal';

type Props = {
    auth: boolean
}
const CalendarPage = ({auth}: Props) => {
  const [busqueda, setBusqueda] = useState("");
  const [formview,setFormview] = useState<boolean>(false)
  const [selectedEvent,setSelectedEvent] = useState<Event | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setmodalType] = useState<"view" | "put-form" | "hide">('hide');
  const { data, loading, error, setReload } = useFetch<Event[]>(eventGetEndpoint);
  
  const lista = data?.filter(p => 
    p.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.tipo.toLowerCase().includes(busqueda.toLowerCase())
  );
  return (
     auth && <div className='container'>
      <h2>Gestión de Eventos</h2>
      <div className="plus-button-container">
        <button className="btn btn-success" onClick={()=> setFormview(!formview)}>{formview ? "<- Volver atras" : "+ Nuevo Eventos"}</button>
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
                       <EventRow prof={user} setSelectedEvent={setSelectedEvent} setShowModal={setShowModal} setmodalType={setmodalType}/>
                    ))}
                    </tbody>
                  </table>
      }
      <EventModal 
        show={showModal} 
        tipo={modalType} 
        hide={() => {setShowModal(false); setmodalType("hide"); setSelectedEvent(null)}} 
        obj={selectedEvent} 
        reload={setReload}/>
      </div>
  )
}

export default CalendarPage