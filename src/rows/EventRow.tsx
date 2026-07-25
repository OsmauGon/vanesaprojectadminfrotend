import React from "react";
import type { Event } from "../types/types";

type EventRowProps = {
  prof: Event;
  setShowModal: (val: boolean)=>void
  setSelectedProf: (val: Event)=>void
};

const EventRow: React.FC<EventRowProps> = ({ prof, setSelectedProf, setShowModal }) => {
  
  return (
    <tr key={prof.id}>
      <td><b>{prof.id}</b></td>
      <td><b>{prof.titulo}</b></td>
      <td><b>{prof.tipo}</b></td>
      <td className="buttons-container">
        {/* <button className="btn btn-primary" onClick={()=> {setSelectedProf(prof); setShowModal(true)}}>Ver</button> */}
        <button className="btn btn-success" onClick={()=> {setSelectedProf(prof); setShowModal(true)}}>Editar</button>
        {/* <button className="btn btn-danger">Eliminar</button> */}
      </td>
      <td><button className="btn btn-danger">Eliminar</button></td>
    </tr>
  );
};

export default EventRow;