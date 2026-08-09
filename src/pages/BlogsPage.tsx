import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import type { Blog } from '../types/types';
import { Button, Form, InputGroup } from 'react-bootstrap';
import BlogRow from '../rows/BlogRow';
import { ModalDEblog } from '../modales/ModalDEblog';
import { blogGetEndpoint } from '../endpoints';
import { BlogForm } from '../forms/BlogForm';

type Props = {
    auth: boolean
}

const BlogsPage = ({auth}: Props) => {
  const [busqueda, setBusqueda] = useState("");
  const [formview,setFormview] = useState<boolean>(false)
  const [selectedBlog,setSelectedBlog] = useState<Blog | null>(null)
  const [showModal, setShowModal] = useState(false);
  const { data, loading, error } = useFetch<Blog[]>(blogGetEndpoint);
  
  const lista = data?.filter(p => 
    p.title.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.description.toLowerCase().includes(busqueda.toLowerCase())
  ); 
  const tableHeaders = [
  "IDs", 
  "ID dueño",
  "Titulo",
  "Accion"
  ]
  return (
     auth && <div className='container'>
      <h2>Gestión de Blogs</h2>
      <div className="plus-button-container">
        <button className="btn btn-success" onClick={()=> setFormview(!formview)}>{formview ? "<- Volver atras" : "+ Nuevo Blog"}</button>
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      <InputGroup className="mb-4">
        <Form.Control
          placeholder="Buscar por nombre, especialidad o ubicación..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <Button variant="outline-secondary">
          🔍
        </Button>
        </InputGroup>
      {formview ? <BlogForm /> 
                : <table className='user-list'>
                  <thead>
                    <tr>
                      {tableHeaders.map(item=> (<td key={item}>{item}</td>))}
                    </tr>
                  </thead>
                  <tbody>
                    {lista?.map((user) => (
                      <BlogRow prof={user} setSelectedBlog={setSelectedBlog} setShowModal={setShowModal} />
                    ))}
                    </tbody>
                  </table>
      }
      
      <ModalDEblog show={showModal} hide={() => setShowModal(false)} obj={selectedBlog} />
      </div>
  )
}

export default BlogsPage