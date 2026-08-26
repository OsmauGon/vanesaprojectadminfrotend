
import { Alert, Button, Modal, Spinner} from 'react-bootstrap';
import { useState } from 'react';
import type { Publicidad } from '../types/types';


type FormProps<Publicidad> ={
  props: Publicidad | null
  state: "standby" | "success" | "error" | "loading" | "view"
  changeState: (val: "standby" | "success" | "error" | "loading")=> void
}
type ModalProps = {
    obj: Publicidad | null;
    show: boolean;
    hide: (val: boolean) => void
}

export const PublicidadEditForm = ({props, changeState, state}: FormProps<Publicidad>)=> {
  const [formData, setFormData] = useState<Publicidad>({
    id: (props && props.id) ? props?.id : 0,
    titulo: (props && props.id) ? props?.titulo : "",
    contacto: props ? props.contacto : "",
    finDeSuscripcion: props ? props.finDeSuscripcion : "",
    imageUrlChico: props ? props.imageUrlChico : ""
  });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile = e.target.files?.[0];
  if (selectedFile) {
    setFile(selectedFile);
    // opcional: mostrar preview
    const url = URL.createObjectURL(selectedFile);
    setFormData((prev) => ({ ...prev, imagen: url }));
  }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      
    changeState("loading")
    const formDataToSend = new FormData();

    // imagen como archivo
    if (file) {formDataToSend.append("imagen", file);}
    const dataToSend = {
      titulo: formData.titulo,
      finDeSuscripcion: formData.finDeSuscripcion,
      contacto: formData.contacto
    }
    try {
      const response = await fetch("publiPutEndpoint", {
      method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
            });
            const result = await response.json();
            if(result.message === "PUT EXITOSO") {
        changeState("success")
      }
    } catch (error) {
      changeState("error")
      console.log("Error detectado: ", error)
    }
     
    
     for (const [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
    setTimeout(() => {
      changeState("standby")
    }, 2000);
    
  };
  return (
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
          <div className="mb-3">{/* IMAGEN */}
        <label className="form-label">Foto de perfil *</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleFileChange}
          disabled
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
              
            />
        </div>
      <button type="submit" className="btn btn-success" disabled={state === "loading"}>
        Guardar Publicidad
      </button>
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
    </form>
  );
}
const PublicidadModal = ({props}: FormProps<Publicidad>) => {
  //console.log(props)
  return (
    props && 
    <div>
      <p><b>ID: </b>{props.id}</p>
      <p><b>Nombre: </b>{props.titulo}</p>
      <p><b>Contacto: </b>{props.contacto ? props.contacto : "No asignado"}</p>
      <p><b>Estado: </b>{props.state}</p>
      <p><b>Fin de Suscripcion: </b>{props.finDeSuscripcion ? props.finDeSuscripcion : "No asigndado"}</p>
      <p><b>Fecha de creacion: </b>{props.createdAt}</p>
      <img className='w-25' src={props.imageUrlChico} alt="" />
    </div>
  )
}


export const ModalDEpublicidad = (props: ModalProps) => {
  const [requestState,setRequestState] = useState<"view" | "standby" | "success" | "error" | "loading">("view")

  return (
    <Modal show={props.show} onHide={() => props.hide(false)}>
          <Modal.Body>
                {requestState === "standby" && <PublicidadEditForm props={props.obj} changeState={setRequestState} state={requestState}/>}
                {requestState === "view" && <PublicidadModal props={props.obj} changeState={setRequestState} state={requestState}/>}
                
          </Modal.Body>
        <Modal.Footer>
          {/* <button className="btn btn-success">Enviar</button> */}
          <button className="btn btn-danger" onClick={()=> {props.hide(true)}}>{requestState === "success" ? "Hecho" : "Cancelar"}</button>
        </Modal.Footer>
      </Modal>
  )
}