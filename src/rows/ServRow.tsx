import React, { useState } from "react";
import type { Servicio } from "../types/types";
import { deleteRegis, reimageRegis, renovRegis } from "../hooks/useDelete";
import { Alert } from "react-bootstrap";
import { servisDelEndpoint, servisPatchEndpoint, servisPatchImageEndpoint } from "../endpoints";

type ServisRowProps = {
  prof: Servicio;
  setShowModal: (val: boolean)=>void
  setmodalType: (val: "view" | "put-form" | "hide")=> void
  setSelectedProf: (val: Servicio)=>void
};

type InnerType ={
  targetId: number,
  setState: (val: "exito") => void
}

const DeleteInner =({targetId, setState}: InnerType)=>{

  const handleDelete = async () => {
     const ok = await deleteRegis(servisDelEndpoint, targetId);
     if (ok) {
       setState("exito"); // actualiza la lista en el estado del padre
     }
   };
  return (
    <Alert  variant={"danger"} className="w-75">¿Confirma eliminacion? <button className="btn btn-danger" onClick={handleDelete}>SI</button></Alert>
  )
}
const RenovInner =({targetId, setState}: InnerType)=>{
  const [newdate,setNewdate] = useState("")
  
  const handleRenov = async (e: React.FormEvent) => {
    e.preventDefault();
    
     const ok = await renovRegis(servisPatchEndpoint, targetId, newdate);
     if (ok) {
      alert("Renovacion Exitosa")
       setState("exito"); // actualiza la lista en el estado del padre
     }
   };
  return (
    <Alert  variant={"warning"} className="w-75">
    <form onSubmit={handleRenov} className="new-form p-0 d-flex gap-2">
      <label className="form-label">Nueva fecha</label>
      <input
              type="date"
              name="finDEsuscripcion"
              className="form-control w-25"
              value={newdate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setNewdate(e.target.value)}
            />
            
    <button type="submit" className="btn btn-success" disabled={newdate.length === 0}>
        Guardar
      </button>
    </form>
    </Alert>
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
     const ok = await reimageRegis(servisPatchImageEndpoint, targetId, file);
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

const ServRow: React.FC<ServisRowProps> = ({ prof, setSelectedProf, setShowModal, setmodalType }) => {
  const hoy = new Date();
  const fin = new Date(prof.finDeSuscripcion);
  const vencido = fin < hoy;
  const [state,setState] = useState<"esperando" | "exito" | "a renovar" | "a borrar" | "a editar">("esperando")
  return (
    <tr key={prof.id}>
      <td><b>{prof.id}</b></td>
      <td><b>{prof.nombre}</b></td>
      <td><b>{prof.clase}</b></td>
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
      <td>
            {state === "a editar" && <ImageEditInner targetId={prof.id} setState={()=>setState("exito")}/>}
            {state === "a renovar" && <RenovInner targetId={prof.id} setState={()=>setState("exito")}/>}
            {state === "a borrar" && <DeleteInner targetId={prof.id} setState={()=>setState("exito")}/>}
            {state === "exito" && <Alert  variant={"warning"} >Cambio realizado con exito</Alert>}
            {state === "esperando" && <div className="buttons-container">
                      <button className="btn btn-primary" onClick={()=> {setSelectedProf(prof); setShowModal(true); setmodalType("view")}}>Ver</button>
                      <button className="btn btn-success" onClick={()=> {setSelectedProf(prof); setShowModal(true); setmodalType("put-form")}}>Editar Info</button>
                      <button className="btn btn-success" onClick={()=> setState("a editar")}>Editar imagen</button>
                      <button className="btn btn-danger" onClick={()=> setState("a borrar")}>Eliminar</button>
                      {vencido && <button className="btn btn-warning" onClick={()=> setState("a renovar")}>Renovar</button>}
                      </div>
                    }
            </td>
    </tr>
  );
};

export default ServRow;