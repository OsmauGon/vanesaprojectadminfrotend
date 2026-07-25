import type { MissingPost } from '../types/types';
import { useFetch } from '../hooks/useFetch';
import { useState } from 'react';
import { fakeMissingPosts } from '../fakeObjects';
import { Button, Form, InputGroup } from 'react-bootstrap';
import ExtraviadosForm from '../forms/ExtraviadosForm';
import LostRow from '../rows/LostRow';
import { ModalDEextraviados } from '../modales/ModalDEextraviados';

type Props = {
    auth: boolean
}

const ExtraviadosPage = ({auth}: Props) => {
      const [busqueda, setBusqueda] = useState("");
  const [formview,setFormview] = useState<boolean>(false)
  const { data, loading, error } = useFetch<MissingPost[]>("https://api.example.com/users");
  const [selectedLost,setSelectedLost] = useState<MissingPost | null>(null)
    const [showModal, setShowModal] = useState(false);

  const lista = data?.filter(p => 
    p.title.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.description.toLowerCase().includes(busqueda.toLowerCase())
  ); 
  const lista2 = fakeMissingPosts?.filter(p => 
    p.title.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.description.toLowerCase().includes(busqueda.toLowerCase())
  ); 
  return (
     auth && <div className='container'>
      <h2>Gestión de Perdidos/encontrados</h2>
      <div className="plus-button-container">
        <button className="btn btn-success" onClick={()=> setFormview(!formview)}>{formview ? "<- Volver atras" : "+ Nuevo Post"}</button>
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
      {formview ? <ExtraviadosForm /> 
                : <table className='user-list'>
                  <thead>
                    <tr>
                      <td>IDs</td>
                      <td>Tipo</td>
                      <td>Titulo</td>
                      <td>Modificar</td>
                      <td>Eliminar</td>
                    </tr>
                  </thead>
                  <tbody>
                    {lista?.map((user) => (
                      <LostRow prof={user}  setSelectedLost={setSelectedLost} setShowModal={setShowModal} />
                    ))}
                    </tbody>
                  </table>
      }
      {formview ? ""
                : <table className='user-list'>
                  <thead>
                    <tr>
                      <td>IDs</td>
                      <td>Tipo</td>
                      <td>Titulo</td>
                      <td>Modificar</td>
                      <td>Eliminar</td>
                    </tr>
                  </thead>
                  <tbody>
                    {lista2?.map((user) => (
                      <LostRow prof={user} setSelectedLost={setSelectedLost} setShowModal={setShowModal}  />
                    ))}
                    </tbody>
                  </table>
      }
      <ModalDEextraviados show={showModal} hide={() => setShowModal(false)} obj={selectedLost} />
      </div>
  )
}


export default ExtraviadosPage
