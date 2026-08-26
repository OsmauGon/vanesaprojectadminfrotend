import React, { useState } from "react";
import type { Profesional } from "../types/types";
import { deleteRegis } from "../hooks/useDelete";
import { Alert } from "react-bootstrap";
import { profDelEndpoint } from "../endpoints";

type UserRowProps = {
  prof: Profesional;
  setShowModal: (val: boolean)=>void
  setmodalType: (val: "view" | "put-form" | "hide")=> void
  setSelectedProf: (val: Profesional)=>void
};

const UserRow: React.FC<UserRowProps> = ({ prof, setSelectedProf, setmodalType, setShowModal }) => {
  const hoy = new Date();
  const fin = new Date(prof.finDeSuscripcion);
  const vencido = fin < hoy;
 const [delstate,setDelstate] = useState<"esperando" | "borrado" | "seleccionado">("esperando")
   
   const handleDelete = async (id: number) => {
     const ok = await deleteRegis(profDelEndpoint, id);
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
                      <button className="btn btn-primary" onClick={()=> {setSelectedProf(prof); setShowModal(true); setmodalType("view")}}>Ver</button>
                      <button disabled className="btn btn-success" onClick={()=> {setSelectedProf(prof); setShowModal(true); setmodalType("put-form")}}>Editar</button>
                      <button className="btn btn-danger" onClick={()=> setDelstate("seleccionado")}>Eliminar</button>
                      {vencido && <button className="btn btn-warning" onClick={()=> alert("En construccion")}>Renovar</button>}
                    </td>
                    }
    </tr>
  );
};

export default UserRow;