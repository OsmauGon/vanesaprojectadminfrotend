import type { MissingPost } from '../types/types';
import { useFetch } from '../hooks/useFetch';
import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import ExtraviadosForm from '../forms/ExtraviadosForm';
import LostRow from '../rows/LostRow';
import { missingsGetEndpoint } from '../endpoints';
import { MissingsModal } from '../modales/MissingsModal';

type Props = {
    auth: boolean,
    encabezados?: [],
    lista?: []
}
/*
const TableComponent: React.FunctionComponent = ({encabezados, lista}: Props)=>{
  return (
    <table className='user-list'>
      <thead>
        <tr>
          {encabezados.map(item => (<td>{item}</td>))}
          </tr>
      </thead>
      <tbody>
        {lista?.map((item) => (
          <LostRow prof={item}  setSelectedLost={setSelectedLost} setShowModal={setShowModal} />
        ))}
      </tbody>
    </table>
  )

}
*/

export const ExtraviadosPage = ({auth}: Props) => {
  const [busqueda, setBusqueda] = useState("");
  const [formview,setFormview] = useState<boolean>(false)
  const { data, loading, error, setReload } = useFetch<MissingPost[]>(missingsGetEndpoint);
  const [selectedLost,setSelectedLost] = useState<MissingPost | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false);
const [modalType, setmodalType] = useState<"view" | "put-form" | "hide">('hide');
  

  const tableHeaders = [
  "IDs", 
  "Tipo",
  "Titulo",
  "Accion"
]

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
                      {tableHeaders.map(item => (<td key={item}>{item}</td>))}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((user) => (
                      <LostRow prof={user}  setSelectedLost={setSelectedLost} setShowModal={setShowModal} setmodalType={setmodalType}/>
                    ))}
                    </tbody>
                  </table>
      }
      <MissingsModal 
        show={showModal} 
        tipo={modalType} 
        hide={() => {setShowModal(false); setmodalType("hide"); setSelectedLost(null)}} 
        obj={selectedLost} 
        reload={setReload}/>
      </div>
  )
}



