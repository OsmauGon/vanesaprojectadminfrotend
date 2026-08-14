import React, { useState } from "react";
import type { Blog } from "../types/types";
import { Alert } from "react-bootstrap";
import { deleteRegis } from "../hooks/useDelete";
import { blogDelEndpoint } from "../endpoints";

type UserRowProps = {
  prof: Blog;
  setShowModal: (val: boolean)=>void
  setSelectedBlog: (val: Blog)=>void
};

const BlogRow: React.FC<UserRowProps> = ({ prof, setSelectedBlog, setShowModal }) => {
  const [source,setSource] = useState<boolean>(false)
  const handleDelete = async (id: number) => {
    const ok = await deleteRegis(blogDelEndpoint, id);
    if (ok) {
      setSource(true); // actualiza la lista en el estado del padre
    }
  };
  return (
    <tr key={prof.id}>
      <td><b>{prof.id}</b></td>
      <td><b>{prof.idOwner}</b></td>
      <td><b>{prof.title}</b></td>
      {
      source ? <Alert  variant={"success"}>Se ha eliminado el recurso</Alert>
              : <td className="buttons-container">
                <button className="btn btn-primary" onClick={()=> {setSelectedBlog(prof); setShowModal(true)}}>Ver</button>
                <button className="btn btn-success" disabled onClick={()=> {setSelectedBlog(prof); setShowModal(true)}}>Editar</button>
                <button className="btn btn-danger" onClick={()=> handleDelete(prof.id)}>Eliminar</button>
              </td>
      }
      
    </tr>
  );
};

export default BlogRow;