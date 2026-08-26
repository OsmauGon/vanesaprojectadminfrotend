import React, { useState } from "react";
import type { Event } from "../types/types";
import { Alert } from "react-bootstrap";
import { deleteRegis } from "../hooks/useDelete";
import { eventDelEndpoint } from "../endpoints";

type EventRowProps = {
  prof: Event;
  setShowModal: (val: "view" | "hide" | "put-form")=>void
  setSelectedProf: (val: Event)=>void
};

const EventRow: React.FC<EventRowProps> = ({ prof, setSelectedProf, setShowModal }) => {
 const [delstate,setDelstate] = useState<"esperando" | "borrado" | "seleccionado">("esperando")
    const handleDelete = async (id: number) => {
      const ok = await deleteRegis(eventDelEndpoint, id);
      if (ok) {
        setDelstate("borrado"); // actualiza la lista en el estado del padre
      }
    };
  return (
    <tr key={prof.id}>
      <td><b>{prof.id}</b></td>
      <td><b>{prof.titulo}</b></td>
      <td><b>{prof.tipo}</b></td>
     {delstate === "seleccionado" && <Alert  variant={"danger"} >¿Confirma eliminacion? <button className="btn btn-danger" onClick={()=> handleDelete(prof.id)}>SI</button></Alert>}
           {delstate === "borrado" && <Alert  variant={"warning"} >Recurso eliminado</Alert>}
           {delstate === "esperando" && <td className="buttons-container">
                <button className="btn btn-primary" onClick={()=> {setSelectedProf(prof); setShowModal("view")}}>Ver</button>
                <button disabled className="btn btn-success" onClick={()=> {setSelectedProf(prof); setShowModal("put-form")}}>Editar</button>
                <button className="btn btn-danger" onClick={()=> handleDelete(prof.id)}>Eliminar</button>
              </td>
      }
    </tr>
  );
};

export default EventRow;