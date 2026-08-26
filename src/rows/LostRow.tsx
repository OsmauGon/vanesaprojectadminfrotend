import React, { useState } from "react";
import type { MissingPost } from "../types/types";
import { Alert } from "react-bootstrap";
import { deleteRegis } from "../hooks/useDelete";
import { missingsDelEndpoint } from "../endpoints";


type MissingRowProps = {
  prof: MissingPost;
  setShowModal: (val: "view" | "hide" | "put-form")=>void
  setSelectedLost: (val: MissingPost)=>void
};

const LostRow: React.FC<MissingRowProps> = ({ prof, setSelectedLost, setShowModal }) => {
 const [delstate,setDelstate] = useState<"esperando" | "borrado" | "seleccionado">("esperando")
    const handleDelete = async (id: number) => {
      const ok = await deleteRegis(missingsDelEndpoint, id);
      if (ok) {
        setDelstate("borrado"); // actualiza la lista en el estado del padre
      }
    };
  return (
    <tr key={prof.id}>
      <td><b>{prof.id}</b></td>
      <td><b>{prof.tipo}</b></td>
      <td><b>{prof.title}</b></td>
      {delstate === "seleccionado" && <Alert  variant={"danger"} >¿Confirma eliminacion? <button className="btn btn-danger" onClick={()=> handleDelete(prof.id)}>SI</button></Alert>}
            {delstate === "borrado" && <Alert  variant={"warning"} >Recurso eliminado</Alert>}
            {delstate === "esperando" && <td className="buttons-container">
                <button className="btn btn-primary" onClick={()=> {setSelectedLost(prof); setShowModal("view")}}>Ver</button>
                <button disabled className="btn btn-success"  onClick={()=> {setSelectedLost(prof); setShowModal("put-form")}}>Editar</button>
                <button className="btn btn-danger" onClick={()=> handleDelete(prof.id)}>Eliminar</button>
                
              </td>
      }
    </tr>
  );
};

export default LostRow;