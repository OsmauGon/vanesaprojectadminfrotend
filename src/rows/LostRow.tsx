import React from "react";
import type { MissingPost } from "../types/types";


type MissingRowProps = {
  prof: MissingPost;
  setShowModal: (val: boolean)=>void
  setSelectedLost: (val: MissingPost)=>void
};

const LostRow: React.FC<MissingRowProps> = ({ prof, setSelectedLost, setShowModal }) => {
  
  return (
    <tr key={prof.id}>
      <td><b>{prof.id}</b></td>
      <td><b>{prof.tipo}</b></td>
      <td><b>{prof.title}</b></td>
      <td className="buttons-container">
        {/* <button className="btn btn-primary" onClick={()=> {setSelectedProf(prof); setShowModal(true)}}>Ver</button> */}
        <button className="btn btn-success" onClick={()=> {setSelectedLost(prof); setShowModal(true)}}>Editar</button>
        {/* <button className="btn btn-danger">Eliminar</button> */}
      </td>
      <td><button className="btn btn-danger">Eliminar</button></td>
    </tr>
  );
};

export default LostRow;