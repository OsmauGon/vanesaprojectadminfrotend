import { Alert, Button, Modal, Spinner } from "react-bootstrap"
import { useState } from "react";
import type { Publicidad } from "../types/types";
import { publisPutEndpoint } from "../endpoints";

type FormProps ={
  props: Publicidad | null
  reload?: (val:true)=> void
}
type ModalProps = {
    obj: Publicidad | null;
    show: boolean;
    hide: (val: boolean) => void
    tipo: "view" | "put-form" | "hide"
    reload: (val:true)=> void
}

const PublisInfoView = ({props}: FormProps) => {
  return (
    props && 
    <div>
      <p><b>ID: </b>{props.id}</p>
      <p><b>Titulo: </b>{props.titulo ? props.titulo : "No asignado"}</p>
      
      <p><b>Contacto: </b>{props.contacto ? props.contacto : "No asignado"}</p>
      <p><b>Fin de Suscripcion: </b>{props.finDeSuscripcion ? props.finDeSuscripcion : "No asignado"}</p>
      <p><b>Fecha de creacion: </b>{props.createdAt}</p>
      {props.imageUrlChico === null && <p>Ninguna imagen registrada</p>} 
      <img className='w-25' src={props.imageUrlChico} alt="" />
    </div>
  )
}
const PublisEditForm = ({props, reload}: FormProps) => {
    const [state,setState] = useState<"standby" | "loading" | "success"  | "error">("standby")
    const [formData, setFormData] = useState<Publicidad>({
        id: props ? props.id : 0,//el backend lo asignara
        titulo: props ? props.titulo : "",//es campo obligatorio para el backend
        contacto: props ? props.contacto : "",
        imageUrlChico: "",//es campo obligatorio para el backend
        finDeSuscripcion: props ? props.finDeSuscripcion : "",//es campo obligatorio para el backend
      });
      const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
      
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState("loading")
        const dataToSend = {
                    titulo: formData.titulo,
                    finDeSuscripcion: new Date(formData.finDeSuscripcion),
                    contacto: formData.contacto
            }
        try {
                  const response = await fetch(publisPutEndpoint + props?.id, {
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
                        <label className="form-label">Nombre *</label>
                        <input
                        type="text"
                        name="titulo"
                        className="form-control"
                        value={formData.titulo}
                        onChange={handleChange}
                        placeholder="nombre publicidad"
                        />
                        
                    </div>
                    <div className="mb-3">{/* contacto */}
                        <label className="form-label">Contacto *</label>
                        <input
                        type="text"
                        name="contacto"
                        className="form-control"
                        value={formData.contacto}
                        onChange={handleChange}
                        placeholder="contacto de publicidad"
                        />
                        
                    </div>
                    <div className="mb-3">{/* Limite de Suscripcion */}
                        <label className="form-label">Limite de suscripcion</label>
                        <input
                        type="date"
                        name="finDeSuscripcion"
                        className="form-control"
                        value={formData.finDeSuscripcion}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    <button type="submit" className="btn btn-success">
                        Guardar Publicidad
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

export const PublisModal = (props: ModalProps) => {
    return (
    <Modal show={props.show} onHide={() => props.hide(false)}>
          <Modal.Body>
                {props.tipo === "put-form" && <PublisEditForm props={props.obj} reload={props.reload}/>}
                {props.tipo === "view" && <PublisInfoView props={props.obj} />}
                
          </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={()=> {props.hide(true)}}>Salir</button>
          </Modal.Footer>
      </Modal>
  )
}

