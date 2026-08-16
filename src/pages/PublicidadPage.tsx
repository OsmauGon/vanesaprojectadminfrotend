import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { publicidadGetEndpoint } from "../endpoints";
import { Button, Form, InputGroup } from "react-bootstrap";
import type { Publicidad } from "../types/types";
import { PublicidadForm } from "../forms/PublicidadForm";
import PubliRow from "../rows/PubliRow";
import { ModalDEpublicidad } from "../modales/ModalDEpublicidad";

const tableHeaders = [
  "IDs", 
  "Nombre",
  "Estado",
  "Accion"
]

type Props = {
    auth: boolean
}
const PublicidadPage = ({auth}: Props) => {
  const [busqueda, setBusqueda] = useState("");
  const [formview,setFormview] = useState<boolean>(false)
  const [selectedProf,setSelectedProf] = useState<Publicidad | null>(null)
  const [showModal, setShowModal] = useState(false);
  const { data, loading, error } = useFetch<Publicidad[]>(publicidadGetEndpoint);
  
  const lista = data?.filter(p => 
    p.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );
  return (
     auth && <div className='container'>
      <h2>Gestión de Publicidades</h2>
      <div className="plus-button-container">
        <button className="btn btn-success" onClick={()=> setFormview(!formview)}>{formview ? "<- Volver atras" : "+ Nueva Publicidad"}</button>
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
      {formview ? <PublicidadForm /> 
                : <table className='user-list'>
                  <thead>
                    <tr>
                      {tableHeaders.map(item => (<td key={item}>{item}</td>))}
                    </tr>
                  </thead>
                  <tbody>
                    {lista?.map((user) => (
                       <PubliRow prof={user} setSelectedProf={setSelectedProf} setShowModal={setShowModal}/>
                    ))}
                    </tbody>
                  </table>
      }
      <ModalDEpublicidad show={showModal} hide={() => setShowModal(false)} obj={selectedProf} />
      </div>
  )
}

export default PublicidadPage