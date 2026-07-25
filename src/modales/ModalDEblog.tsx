import { Alert, Button, Modal, Spinner} from 'react-bootstrap';
import { useState } from 'react';
import type { Blog } from '../types/types';

type FormProps ={
  props: Blog | null
  changeState: (val: "standby" | "success" | "error" | "loading")=> void
}
type ModalProps = {
    obj: Blog | null;
    show: boolean;
    hide: (val: boolean) => void
}

const BlogEditForm = ({props, changeState}: FormProps)=> {
  const [formData, setFormData] = useState<Blog>({
    id: (props && props.id) ? props?.id : 0,
    idOwner: (props && props.idOwner) ? props?.idOwner : 0,
    title: (props && props.id) ? props?.title : "",
    description: props ? props.description : "",
    imageUrl: props ? props.imageUrl : "",
    videoUrl: props ? props.videoUrl : "",
    documentUrl: props ? props.documentUrl : "",
    state: props ? props.state : "standby"
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Podrías subirlo a tu backend o convertirlo en URL temporal
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, imageUrl: url }));
    }
  };
  
  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Podrías subirlo a tu backend o convertirlo en URL temporal
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, documentUrl: url }));
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changeState("loading")
    setTimeout(()=> changeState("success"), 3000)
    console.log("Nuevo blog:", formData);
    // Aquí podrías hacer un POST al backend
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
          required
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
      
      <div className="mb-3">{/* Video*/}
        <label className="form-label">Enlace del video</label>
        <input
          type="text"
          name="videoUrl"
          className="form-control"
          value={formData.videoUrl}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">{/* Documento */}
        <label className="form-label">Adjuntar documento</label>
        <input
          type="file"
          className="form-control"
          accept="document/*"
          onChange={handleDocumentChange}
        />
      </div>
      <button type="submit" className="btn btn-success">
        Guardar Blog
      </button>
    </form>
  );
}
export const ModalDEblog = (props: ModalProps) => {
  const [requestState,setRequestState] = useState<"standby" | "success" | "error" | "loading">("standby")

  return (
    <Modal show={props.show} onHide={() => props.hide(false)}>
          <Modal.Body>
                {requestState === "standby" && <BlogEditForm props={props.obj} changeState={setRequestState}/>}
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
          <button className="btn btn-danger" onClick={()=> {setRequestState("standby");props.hide(true)}}>{requestState === "success" ? "Hecho" : "Cancelar"}</button>
        </Modal.Footer>
      </Modal>
  )
}