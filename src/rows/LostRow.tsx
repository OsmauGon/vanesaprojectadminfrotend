import React, { useState } from "react";
import type { MissingPost } from "../types/types";
import { Alert } from "react-bootstrap";
import { deleteRegis } from "../hooks/useDelete";
import { missingsDelEndpoint } from "../endpoints";


type MissingRowProps = {
  prof: MissingPost;
  setShowModal: (val: boolean)=>void
  setSelectedLost: (val: MissingPost)=>void
};

const LostRow: React.FC<MissingRowProps> = ({ prof, setSelectedLost, setShowModal }) => {
  const [source,setSource] = useState<boolean>(false)
    const handleDelete = async (id: number) => {
      const ok = await deleteRegis(missingsDelEndpoint, id);
      if (ok) {
        setSource(true); // actualiza la lista en el estado del padre
      }
    };
  return (
    <tr key={prof.id}>
      <td><b>{prof.id}</b></td>
      <td><b>{prof.tipo}</b></td>
      <td><b>{prof.title}</b></td>
      {
      source ? <Alert  variant={"success"}>Se ha eliminado el recurso</Alert>
              : <td className="buttons-container">
                <button className="btn btn-primary" onClick={()=> {setSelectedLost(prof); setShowModal(true)}}>Ver</button>
                <button className="btn btn-success" disabled onClick={()=> {setSelectedLost(prof); setShowModal(true)}}>Editar</button>
                <button className="btn btn-danger" onClick={()=> handleDelete(prof.id)}>Eliminar</button>
              </td>
      }
    </tr>
  );
};

export default LostRow;