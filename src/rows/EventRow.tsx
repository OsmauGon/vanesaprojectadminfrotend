import React, { useState } from "react";
import type { Event } from "../types/types";
import { Alert } from "react-bootstrap";
import { deleteRegis } from "../hooks/useDelete";
import { eventDelEndpoint } from "../endpoints";

type EventRowProps = {
  prof: Event;
  setShowModal: (val: boolean)=>void
  setSelectedEvent: (val: Event)=>void
  setmodalType: (val: "view" | "put-form" | "hide")=> void
};
type InnerType ={
  targetId: number,
  setState: (val: "exito") => void
}
const DeleteInner =({targetId, setState}: InnerType)=>{
  const handleDelete = async () => {
     const ok = await deleteRegis(eventDelEndpoint, targetId);
     if (ok) {
       setState("exito"); // actualiza la lista en el estado del padre
     }
   };
  return (
    <Alert  variant={"danger"} className="w-75">¿Confirma eliminacion? <button className="btn btn-danger" onClick={handleDelete}>SI</button></Alert>
  )
}

const EventRow: React.FC<EventRowProps> = ({ prof, setSelectedEvent, setShowModal, setmodalType }) => {
  const [state,setState] = useState<"esperando" | "exito" | "a renovar" | "a borrar" | "a editar">("esperando")
 
  return (
    <tr key={prof.id}>
      <td><b>{prof.id}</b></td>
      <td><b>{prof.titulo}</b></td>
      <td><b>{prof.tipo}</b></td>
      <td>
      {state === "a borrar" && <DeleteInner targetId={prof.id} setState={()=>setState("exito")}/>}
      {state === "exito" && <Alert  variant={"warning"} >Cambio realizado con exito</Alert>}
      {state === "esperando" && <div className="buttons-container">
                <button className="btn btn-primary" onClick={()=> {setSelectedEvent(prof); setShowModal(true); setmodalType("view")}}>Ver</button>
                <button className="btn btn-success" onClick={()=> {setSelectedEvent(prof); setShowModal(true); setmodalType("put-form")}}>Editar Info</button>
                
                <button className="btn btn-danger" onClick={()=> setState("a borrar")}>Eliminar</button>
                </div>
              }
      </td>
    </tr>
  );
};

export default EventRow;