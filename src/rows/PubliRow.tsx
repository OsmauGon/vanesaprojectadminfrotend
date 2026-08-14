import { useState } from "react";
import type { Publicidad } from "../types/types";
import { deleteRegis } from "../hooks/useDelete";
import { Alert } from "react-bootstrap";
import { publiDelEndpoint } from "../endpoints";

type PubliRowProps = {
  prof: Publicidad;
  setShowModal: (val: boolean)=>void
  setSelectedProf: (val: Publicidad)=>void
};

const PubliRow: React.FC<PubliRowProps> = ({ prof, setSelectedProf, setShowModal }) => {
  const hoy = new Date();
  const fin = new Date(prof.finDeSuscripcion);
  const vencido = fin < hoy;
  const [source,setSource] = useState<boolean>(false)
  const handleDelete = async (id: number) => {
    const ok = await deleteRegis(publiDelEndpoint, id);
    if (ok) {
      setSource(true); // actualiza la lista en el estado del padre
    }
  };
  return (
    <tr key={prof.id}>
      <td><b>{prof.id}</b></td>
      <td><b>{prof.titulo}</b></td>
      <td><span
            style={{
              fontWeight: "bold",
              marginLeft: "8px",
            }}
            title="Suscripción vencida"
          >
            {vencido ? "Vencido ❌" : "Al dia ✅"}
          </span>
      </td>
      {
      source ? <Alert  variant={"success"}>Se ha eliminado el recurso</Alert>
              : <td className="buttons-container">
                <button className="btn btn-primary" onClick={()=> {setSelectedProf(prof); setShowModal(true)}}>Ver</button>
                {/* <button className="btn btn-primary" onClick={()=> {setSelectedProf(prof); setShowModal(true)}}>Ver</button> */}
                <button className="btn btn-success" onClick={()=> {setSelectedProf(prof); setShowModal(true)}} disabled>Editar</button>
                <button className="btn btn-danger" onClick={()=> handleDelete(prof.id)}>Eliminar</button>
              </td>
      }
    </tr>
  );
};

export default PubliRow;