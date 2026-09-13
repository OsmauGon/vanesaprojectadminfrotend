import { Alert, Button, Modal, Spinner } from "react-bootstrap"
import { useState } from "react";
import type { Blog } from "../types/types";
import { blogPutEndpoint } from "../endpoints";

type FormProps ={
  props: Blog | null
  reload?: (val:true)=> void
}
type ModalProps = {
    obj: Blog | null;
    show: boolean;
    hide: (val: boolean) => void
    tipo: "view" | "put-form" | "hide"
    reload: (val:true)=> void
}

const BlogInfoView = ({props}: FormProps) => {
  return (
    props && 
    <div>
      <p><b>ID: </b>{props.id}</p>
      <p><b>ID de dueño: </b>{props.idOwner ? props.idOwner : "No asignado"}</p>
      <p><b>Titulo: </b>{props.title}</p>
      <p><b>Enlace-video: </b>{props.videoUrl ? props.videoUrl : "No asignado"}</p>
      <p><b>Enlace-documento: </b>{props.documentUrl ? props.documentUrl : "No asignado"}</p>
      <p><b>Descripcion: </b>{props.description}</p>
      <p><b>Estado: </b>{props.state}</p><p><b>Fecha de creacion: </b>{props.createdAt}</p>
      
      {props.imageUrl === null && <p>Ninguna imagen registrada</p>} 
      <img className='w-25' src={props.imageUrl} alt="" />
    </div>
  )
}

const BlogEditForm = ({props, reload}: FormProps) => {
    const [state,setState] = useState<"standby" | "loading" | "success"  | "error">("standby")
    const [formData, setFormData] = useState<Blog>({
    id: (props && props.id) ? props?.id : 0,
    idOwner: (props && props.idOwner) ? props?.idOwner : 0,
    title: (props && props.title) ? props?.title : "",
    description: (props && props.description) ? props?.description : "",
    imageUrl: "",
    videoUrl: (props && props.videoUrl) ? props?.videoUrl : "",
    documentUrl: (props && props.documentUrl) ? props?.documentUrl : "",
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
                    title: formData.title,
                    description: formData.description,
                    idOwner: Number(formData.idOwner),
                    videoUrl: formData.videoUrl,
                    documentUrl: formData.documentUrl,
                    }
      
                  try {
                          const response = await fetch(blogPutEndpoint + props?.id, {
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
                  
                  
                  setTimeout(() => {
                    if(state === "loading")
                  setState("standby")
                  alert("Limite de tiempo alcanzado")
                  }, 5000);//BORRAR
                  
    };



  return (
    <>
    {state === "standby" &&
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
        <label className="form-label">Titulo</label>
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
        <label className="form-label">Descripcion</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Descripcion del articulo"
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
        <label className="form-label">Documento</label>
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

export const BlogModal = (props: ModalProps) => {
    return (
    <Modal show={props.show} onHide={() => props.hide(false)}>
          <Modal.Body>
                {props.tipo === "put-form" && <BlogEditForm props={props.obj} reload={props.reload}/>}
                {props.tipo === "view" && <BlogInfoView props={props.obj} />}
                
          </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={()=> {props.hide(true)}}>Salir</button>
          </Modal.Footer>
      </Modal>
  )
}