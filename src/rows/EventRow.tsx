import React, { useState } from "react";
import type { Event } from "../types/types";
import { Alert } from "react-bootstrap";
import { deleteRegis } from "../hooks/useDelete";
import { eventDelEndpoint } from "../endpoints";

type EventRowProps = {
  prof: Event;
  setShowModal: (val: boolean)=>void
  setSelectedProf: (val: Event)=>void
};

const EventRow: React.FC<EventRowProps> = ({ prof, setSelectedProf, setShowModal }) => {
  const [source,setSource] = useState<boolean>(false)
    const handleDelete = async (id: number) => {
      const ok = await deleteRegis(eventDelEndpoint, id);
      if (ok) {
        setSource(true); // actualiza la lista en el estado del padre
      }
    };
  return (
    <tr key={prof.id}>
      <td><b>{prof.id}</b></td>
      <td><b>{prof.titulo}</b></td>
      <td><b>{prof.tipo}</b></td>
      {
      source ? <Alert  variant={"success"}>Se ha eliminado el recurso</Alert>
              : <td className="buttons-container">
                <button className="btn btn-primary" onClick={()=> {setSelectedProf(prof); setShowModal(true)}}>Ver</button>
                <button className="btn btn-success" onClick={()=> {setSelectedProf(prof); setShowModal(true)}}>Editar</button>
                <button className="btn btn-danger" onClick={()=> handleDelete(prof.id)}>Eliminar</button>
              </td>
      }
    </tr>
  );
};

export default EventRow;