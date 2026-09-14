import React, { useState } from "react";
import type { MissingPost } from "../types/types";
import { Alert } from "react-bootstrap";
import { deleteRegis, reimageRegis } from "../hooks/useDelete";
import { missingsDelEndpoint, missingsPatchImageEndpoint } from "../endpoints";


type MissingRowProps = {
  prof: MissingPost;
  setShowModal: (val:boolean)=>void
  setSelectedLost: (val: MissingPost)=>void
  setmodalType: (val: "view" | "put-form" | "hide")=> void
};
type InnerType ={
  targetId: number,
  state: "esperando" | "exito" | "a borrar" | "a editar",
  setState: (val: "exito") => void
}

const DeleteInner =({targetId, setState}: InnerType)=>{
  const handleDelete = async () => {
     const ok = await deleteRegis(missingsDelEndpoint, targetId);
     if (ok) {
       setState("exito"); // actualiza la lista en el estado del padre
     }
   };
  return (
    <Alert  variant={"danger"} className="w-75">¿Confirma eliminacion? <button className="btn btn-danger" onClick={handleDelete}>SI</button></Alert>
  )
}
const ImageEditInner =({targetId,setState}: InnerType)=>{
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile = e.target.files?.[0];
  if (selectedFile) {
    setFile(selectedFile);
    
  }
  };
  const handleReimage = async (e :React.FormEvent) => {
    e.preventDefault()
    if(!file) return
     const ok = await reimageRegis(missingsPatchImageEndpoint, targetId, file);
     if (ok) {
      alert("Renovacion exitosa")
       setState("exito"); // actualiza la lista en el estado del padre
     }
   };
  return (
    <Alert  variant={"warning"} className="w-75">
    <form onSubmit={handleReimage} className="new-form p-0 d-flex gap-2">
       <div className="mb-3">{/* IMAGEN */}
            <label className="form-label">Nueva Foto</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
            
    <button type="submit" className="btn btn-success" disabled={file === null}>
        Guardar
      </button>
    </form>
    </Alert>
  )
}

const LostRow: React.FC<MissingRowProps> = ({ prof, setSelectedLost, setShowModal, setmodalType }) => {
 const [state,setState] = useState<"esperando" | "exito" | "a borrar" | "a editar">("esperando")
 return (
    <tr key={prof.id}>
      <td><b>{prof.id}</b></td>
      <td><b>{prof.tipo}</b></td>
      <td><b>{prof.title}</b></td>
      
            <td>
            {state === "a editar" && <ImageEditInner targetId={prof.id} setState={()=>setState("exito")} state={state} />}
            {state === "a borrar" && <DeleteInner targetId={prof.id} setState={()=>setState("exito")} state={state}/>}
            {state === "exito" && <Alert  variant={"warning"} >Cambio realizado con exito</Alert>}
            {state === "esperando" && <div className="buttons-container">
                      <button className="btn btn-primary" onClick={()=> {setSelectedLost(prof); setShowModal(true); setmodalType("view")}}>Ver</button>
                      <button className="btn btn-success" onClick={()=> {setSelectedLost(prof); setShowModal(true); setmodalType("put-form")}}>Editar Info</button>
                      <button className="btn btn-success" onClick={()=> setState("a editar")}>Editar imagen</button>
                      <button className="btn btn-danger" onClick={()=> setState("a borrar")}>Eliminar</button>
                      </div>
                    }
            </td>
    </tr>
  );
};

export default LostRow;