import { Alert, Button, Modal, Spinner} from 'react-bootstrap';
import { useState } from 'react';
import type { MissingPost } from '../types/types';

type FormProps ={
  props: MissingPost | null
  changeState: (val: "standby" | "success" | "error" | "loading")=> void
}
type ModalProps = {
    obj: MissingPost | null;
    show: boolean;
    hide: (val: boolean) => void
}

const MissingPostEditForm = ({props, changeState}: FormProps)=> {
  const [formData, setFormData] = useState<MissingPost>({
    id: (props && props.id) ? props?.id : 0,
    title: (props && props.id) ? props?.title : "",
    description: props ? props.description : "",
    imageUrl: props ? props.imageUrl : "",
    tipo: props ? props.tipo : 0,
    contact: props ? props.contact : ""
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
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
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("contact", formData.contact);
      if(formData.tipo == 0) formDataToSend.append("tipo", "EXTRAVIADO");
      if(formData.tipo == 1) formDataToSend.append("tipo", "ENCONTRADO");
      if(formData.tipo == 2) formDataToSend.append("tipo", "ADOPCION");
  
      
      // imagen como archivo
      if (file) {
        formDataToSend.append("imagen", file);
      }
      try {
        const response = await fetch("missingsPutEndpoint", {
        method: "PUT",
        body: formDataToSend,
        });
        const result = await response.json();
        if(result.message === "EXITO") {
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
        <label className="form-label">Titulo</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
        
        />
      </div>

      <div className="mb-3">{/* Descripcion */}
        <label className="form-label">Descripcion</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
        
        />
      </div>
      <div className="mb-3">{/* IMAGEN */}
        <label className="form-label">Foto de perfil</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div className="mb-3">{/* Tipo */}
        <label className="form-label">Foto de perfil</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleFileChange}
        />
        <select name="tipo" id="tipo" className="form-control" onChange={handleChange}>
          <option value="0">Extraviado</option>
          <option value="1">Encontrado</option>
          <option value="2">En Adopcion</option>
        </select>
      </div>
      <div className="mb-3">{/* Contacto */}
        <label className="form-label">Contacto</label>
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
  );
}
export const ModalDEextraviados = (props: ModalProps) => {
  const [requestState,setRequestState] = useState<"standby" | "success" | "error" | "loading">("standby")

  return (
    <Modal show={props.show} onHide={() => props.hide(false)}>
          <Modal.Body>
                {requestState === "standby" && <MissingPostEditForm props={props.obj} changeState={setRequestState}/>}
                {requestState === "error" && <Alert  variant={"danger"}>This is a {"danger"} alert—check it out!</Alert>}
                {requestState === "success" && <Alert  variant={"success"}>This is a {"success"} alert—check it out!</Alert>}
                {requestState === "loading" && <Button variant="primary" disabled>
                                                  <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                  />
                                                   Loading...
                                                </Button> }
          </Modal.Body>
        <Modal.Footer>
          {/* <button className="btn btn-success">Enviar</button> */}
          <button className="btn btn-danger" onClick={()=> {props.hide(true)}}>{requestState === "success" ? "Hecho" : "Cancelar"}</button>
        </Modal.Footer>
      </Modal>
  )
}