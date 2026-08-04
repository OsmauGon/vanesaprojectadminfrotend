
import { Alert, Button, Modal, Spinner} from 'react-bootstrap';
import type { Profesional } from '../types/types';
import { useState } from 'react';
type FormProps ={
  props: Profesional | null
  changeState: (val: "standby" | "success" | "error" | "loading")=> void
}
type ModalProps = {
    obj: Profesional | null;
    show: boolean;
    hide: (val: boolean) => void
}

const ProfesionalEditForm = ({props, changeState}: FormProps)=> {
  const [formData, setFormData] = useState<Profesional>({
    id: (props && props.id) ? props?.id : 0,
    nombre: (props && props.id) ? props?.nombre : "",
    especialidad: props ? props.especialidad : "",
    practicas: props ? props.practicas : [],
    //imagen: "",
    ubicacion: props ? props.ubicacion : "",
    telefono: props ? props.telefono : "",
    email: props ? props.email : "",
    hacedomicilio: props ? props.hacedomicilio : false,
    finDEsuscripcion: props ? props.finDEsuscripcion : "",
    horarioDEcontacto: props ? props.horarioDEcontacto : ""
  });

  const [practicaInput, setPracticaInput] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, hacedomicilio: e.target.checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Podrías subirlo a tu backend o convertirlo en URL temporal
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, imagen: url }));
    }
  };

  const addPractica = () => {
    if (practicaInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        practicas: [...(prev.practicas ?? []), practicaInput.trim()],
      }));
      setPracticaInput("");
    }
  };

  const removePractica = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      practicas: prev.practicas?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changeState("loading")
    setTimeout(()=> changeState("success"), 3000)
    console.log("Nuevo profesional:", formData);
    // Aquí podrías hacer un POST al backend
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="nombre"
          className="form-control"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Especialidad</label>
        <input
          type="text"
          name="especialidad"
          className="form-control"
          value={formData.especialidad}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Foto de perfil</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleFileChange}
          placeholder='Nueva Foto de perfil'
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Ubicación</label>
        <input
          type="text"
          name="ubicacion"
          className="form-control"
          value={formData.ubicacion}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Teléfono</label>
        <input
          type="text"
          name="telefono"
          className="form-control"
          value={formData.telefono}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {/* Practicas */}
      <div className="mb-3">
        <label className="form-label">Prácticas</label>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control"
            value={practicaInput}
            onChange={(e) => setPracticaInput(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={addPractica}
          >
            Agregar
          </button>
        </div>
        <div>
          {formData.practicas?.map((p, i) => (
            <span key={i} className="badge bg-secondary me-2">
              {p}{" "}
              <button
                type="button"
                className="btn-close btn-close-white ms-1"
                onClick={() => removePractica(i)}
              ></button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          checked={formData.hacedomicilio}
          onChange={handleCheckbox}
          id="hacedomicilio"
        />
        <label className="form-check-label" htmlFor="hacedomicilio">
          Hace visitas a domicilio
        </label>
      </div>

      <button type="submit" className="btn btn-success">
        Guardar Profesional
      </button>
    </form>
  );
}

export const ModalDEprofesional = (props: ModalProps) => {
  const [requestState,setRequestState] = useState<"standby" | "success" | "error" | "loading">("standby")

  return (
    <Modal show={props.show} onHide={() => props.hide(false)}>
          <Modal.Body>
                {requestState === "standby" && <ProfesionalEditForm props={props.obj} changeState={setRequestState}/>}
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