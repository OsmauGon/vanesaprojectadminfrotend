import { Alert, Button, Modal, Spinner} from 'react-bootstrap';
import { useState } from 'react';
import type { Blog } from '../types/types';

type FormProps ={
  props: Blog | null
  state: "standby" | "success" | "error" | "loading" | "view"
  changeState: (val: "view" | "standby" | "success" | "error" | "loading")=> void
}
type ModalProps = {
    obj: Blog | null;
    show: boolean;
    hide: (val: boolean) => void
}

const BlogEditForm = ({props, changeState, state}: FormProps)=> {
  const [formData, setFormData] = useState<Blog>({
    id: (props && props.id) ? props?.id : 0,
    idOwner: (props && props.idOwner) ? props?.idOwner : 0,
    title: (props && props.id) ? props?.title : "",
    description: props ? props.description : "",
    videoUrl: props ? props.videoUrl : "",
    documentUrl: props ? props.documentUrl : "",
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
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);

    if (formData.videoUrl && formData.videoUrl?.length > 5) formDataToSend.append("videoUrl", formData.videoUrl);
    if (formData.documentUrl && formData.documentUrl?.length > 5) formDataToSend.append("documentUrl", formData.documentUrl);

    // imagen como archivo
    if (file) {
      formDataToSend.append("imagen", file);
    }
    try {
      const response = await fetch("blogPutEndpoint", {
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
      <div className="mb-3">{/* ID dueño */}
        <label className="form-label">ID dueño</label>
        <input
          type="text"
          name="idOwner"
          className="form-control"
          value={formData.idOwner}
          onChange={handleChange}
          placeholder="ID del profesional"
        />
      </div>
      <div className="mb-3">{/* titulo */}
        <label className="form-label">Titulo *</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
          
          placeholder="Titulo del articulo"
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
          
          placeholder="Descripcion del articulo"
        />
      </div>

      <div className="mb-3">{/* IMAGEN */}
        <label className="form-label">Foto de perfil</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleFileChange}
          placeholder="Imagen del articulo"
        />
      </div>
      <div className="mb-3">{/* Video*/}
        <label className="form-label">Enlace del video</label>
        <input
          type="text"
          name="videoUrl"
          className="form-control"
          value={formData.videoUrl}
          onChange={handleChange}
          placeholder="Enlace al video"
        />
      </div>
      <div className="mb-3">{/* Documento */}
        <label className="form-label">Adjuntar documento</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          placeholder="Enlace al drive de descarga"
        />
      </div>
      <button type="submit" className="btn btn-success">
        Guardar Blog
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
const BlogModal = ({props}: FormProps) => {
  //console.log(props)
  return (
    props && 
    <div>
      <p><b>ID: </b>{props.id}</p>
      <p><b>Dueño: </b>{props.idOwner}</p>
      <p><b>Titulo: </b>{props.title}</p>
      <p><b>Descripcion: </b>{props.description}</p>
      <p><b>Enlace de video: </b>{props.videoUrl}</p>
      <p><b>Enlace de documento: </b>{props.documentUrl}</p>
      <p><b>Fecha de creacion: </b>{props.createdAt}</p>
      
      <img className='w-25' src={props.imagen} alt="" />
    </div>
  )
}
export const ModalDEblog = (props: ModalProps) => {
  const [requestState,setRequestState] = useState<"standby" | "success" | "error" | "loading" | "view">("view")

  return (
    <Modal show={props.show} onHide={() => props.hide(false)}>
          <Modal.Body>
                {requestState === "standby" && <BlogEditForm props={props.obj} changeState={setRequestState} state={requestState}/>}
                {requestState === "view" && <BlogModal props={props.obj} changeState={setRequestState} state={requestState}/>}
                
          </Modal.Body>
        <Modal.Footer>
          {/* <button className="btn btn-success">Enviar</button> */}
          <button className="btn btn-danger" onClick={()=> {props.hide(true)}}>{requestState === "success" ? "Hecho" : "Cancelar"}</button>
        </Modal.Footer>
      </Modal>
  )
}