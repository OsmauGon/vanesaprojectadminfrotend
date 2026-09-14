import { Alert, Button, Modal, Spinner } from "react-bootstrap"
import { useState } from "react";
import type { MissingPost } from "../types/types";
import { missingsPutEndpoint } from "../endpoints";

type FormProps ={
  props: MissingPost | null
  reload?: (val:true)=> void
}
type ModalProps = {
    obj: MissingPost | null;
    show: boolean;
    hide: (val: boolean) => void
    tipo: "view" | "put-form" | "hide"
    reload: (val:true)=> void
}

const MissInfoView = ({props}: FormProps) => {
  return (
    props && 
    <div>
      <p><b>ID: </b>{props.id}</p>
      <p><b>Titulo: </b>{props.title ? props.title : "No asignado"}</p>
      <p><b>Tipo: </b>{props.tipo}</p>
      <p><b>Contacto: </b>{props.contact ? props.contact : "No asignado"}</p>
      <p><b>Descripcion: </b>{props.description ? props.description : "No asignado"}</p>
      <p><b>Ubicacion: </b>{props.location ? props.location : "No asignado"}</p>
      <p><b>Titulo: </b>{props.title ? props.title : "No asignado"}</p>
      <p><b>Fecha de creacion: </b>{props.createdAt}</p>
      {props.imageUrl === null && <p>Ninguna imagen registrada</p>} 
      <img className='w-25' src={props.imageUrl} alt="" />
    </div>
  )
}
const MissEditForm = ({props, reload}: FormProps) => {
    const [state,setState] = useState<"standby" | "loading" | "success"  | "error">("standby")
    const [tipe,setTipe] = useState<"EXTRAVIADO" | "ENCONTRADO" | "ADOPCION">("EXTRAVIADO")
    const [formData, setFormData] = useState<MissingPost>({
        id: props ? props.id : 0,
        title: props ? props.title : "",
        description: props ? props.description : "",
        imageUrl: "",
        tipo: props ? props.tipo : 0,
        contact: props ? props.contact : ""
    
      });
      const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState("loading")
        
        if(formData.tipo == 0) setTipe("EXTRAVIADO");
        if(formData.tipo == 1) setTipe("ENCONTRADO");
        if(formData.tipo == 2) setTipe("ADOPCION");

        const dataToSend = {
            title: formData.title,
            description: formData.description,
            tipo: tipe,
            contact: formData.contact
            }
        
        try {
          const response = await fetch(missingsPutEndpoint + props?.id, {
          method: "PUT",
          headers: {
                          "Content-Type": "application/json",
                          },
          body: JSON.stringify(dataToSend),
          });
          const result = await response.json();
          if(result.message === "PUT EXITOSO") {
            setState("success")
            if(reload) reload(true)
          }
        } catch (error) {
          setState("error")
          console.log("Error detectado: ", error)
        } 
       
      };
    
    
      return (
         <>
            {state === "standby" && 
                <form onSubmit={handleSubmit} className="p-3 new-form">
                <div className="mb-3">{/* titulo */}
                    <label className="form-label">Titulo *</label>
                    <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Titulo"
                    />
                </div>
                <div className="mb-3">{/* Descripcion */}
                    <label className="form-label">Descripcion *</label>
                    <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descripcion"
                    />
                </div>
                <div className="mb-3">{/* Tipo */}
                    <label className="form-label">Tipo de posteo *</label>
                    <select name="tipo" id="tipo" className="form-control" onChange={handleChange}>
                    <option value={0}>Perdido</option>
                    <option value={1}>Encontrado</option>
                    <option value={2}>En Adopcion</option>
                    </select>
                </div>
                <div className="mb-3">{/* Contacto */}
                    <label className="form-label">Contacto *</label>
                    <input
                    placeholder="Enlace de publicacion"
                    type="text"
                    name="contact"
                    className="form-control"
                    value={formData.contact}
                    onChange={handleChange}
                    />
                </div>
                
                <button type="submit" className="btn btn-success">
                    Guardar MissingPost
                </button>
                </form>
            }
            {state === "error" && <Alert  variant={"danger"}>This is a {"danger"} alert—check it out!</Alert>}
            {state === "success" && <Alert  variant={"success"}>This is a {"success"} alert—check it out!</Alert>}
            {state === "loading" && <Button variant="primary" disabled>
                                                <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                />
                                                Loading...
                                            </Button> }
         </>
  );
}
export const MissingsModal = (props: ModalProps) => {
    return (
    <Modal show={props.show} onHide={() => props.hide(false)}>
          <Modal.Body>
                {props.tipo === "put-form" && < MissEditForm props={props.obj} reload={props.reload}/>}
                {props.tipo === "view" && < MissInfoView props={props.obj} />}
                
          </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={()=> {props.hide(true)}}>Salir</button>
          </Modal.Footer>
      </Modal>
  )
}