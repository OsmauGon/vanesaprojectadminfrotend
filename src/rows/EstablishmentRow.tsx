import React, { useState } from "react";
import type { Establishment } from "../types/types";
import { deleteRegis } from "../hooks/useDelete";
import { Alert } from "react-bootstrap";
import { vetesDelEndpoint } from "../endpoints";

type EstablishmentRowProps = {
  prof: Establishment;
  setShowModal: (val: boolean)=>void
  setSelectedProf: (val: Establishment)=>void
};

const EstablishmentRow: React.FC<EstablishmentRowProps> = ({ prof, setSelectedProf, setShowModal }) => {
  const hoy = new Date();
  const fin = new Date(prof.finDeSuscripcion);
  const vencido = fin < hoy;

 const [delstate,setDelstate] = useState<"esperando" | "borrado" | "seleccionado">("esperando")
  
  const handleDelete = async (id: number) => {
    const ok = await deleteRegis(vetesDelEndpoint, id);
    if (ok) {
      setDelstate("borrado"); // actualiza la lista en el estado del padre
    }
  };
  return (
    <tr key={prof.id}>
      <td><b>{prof.id}</b></td>
      <td><b>{prof.nombre}</b></td>
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
      {delstate === "seleccionado" && <Alert  variant={"danger"} >¿Confirma eliminacion? <button className="btn btn-danger" onClick={()=> handleDelete(prof.id)}>SI</button></Alert>}
      {delstate === "borrado" && <Alert  variant={"warning"} >Recurso eliminado</Alert>}
      {delstate === "esperando" && <td className="buttons-container">
                <button className="btn btn-primary" onClick={()=> {setSelectedProf(prof); setShowModal(true)}}>Ver</button>
                <button disabled className="btn btn-success" onClick={()=> {setSelectedProf(prof); setShowModal(true)}}>Editar</button>
                <button className="btn btn-danger" onClick={()=> setDelstate("seleccionado")}>Eliminar</button>
                {vencido && <button className="btn btn-warning" onClick={()=> alert("En construccion")}>Renovar</button>}
              </td>
              }
    </tr>
  );
};

export default EstablishmentRow;