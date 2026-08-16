import { useState } from "react";
import type { Servicio } from "../types/types";
import { servDelEndpoint } from "../endpoints";
import { deleteRegis } from "../hooks/useDelete";
import { Alert } from "react-bootstrap";

type ServRowProps = {
  prof: Servicio;
  setShowModal: (val: boolean)=>void
  setSelectedProf: (val: Servicio)=>void
};

const ServRow: React.FC<ServRowProps> = ({ prof, setSelectedProf, setShowModal }) => {
  const hoy = new Date();
  const fin = new Date(prof.finDeSuscripcion);
  const vencido = fin < hoy;
  const [source,setSource] = useState<boolean>(false)
  const handleDelete = async (id: number) => {
    const ok = await deleteRegis(servDelEndpoint, id);
    if (ok) {
      setSource(true); // actualiza la lista en el estado del padre
    }
  };
  return (
    <tr key={prof.id}>
      <td><b>{prof.id}</b></td>
      <td><b>{prof.nombre}</b></td>
      <td><b>{prof.clase}</b></td>
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
                <button disabled className="btn btn-primary" onClick={()=> {setSelectedProf(prof); setShowModal(true)}}>Ver</button>
                {/* <button disabled className="btn btn-primary" onClick={()=> {setSelectedProf(prof); setShowModal(true)}}>Ver</button> */}
                <button disabled className="btn btn-success" onClick={()=> {setSelectedProf(prof); setShowModal(true)}} >Editar</button>
                <button disabled className="btn btn-danger" onClick={()=> handleDelete(prof.id)}>Eliminar</button>
              </td>
      }
    </tr>
  );
};

export default ServRow;