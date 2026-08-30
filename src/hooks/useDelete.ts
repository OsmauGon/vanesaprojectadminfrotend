// Definimos el tipo de respuesta esperada
interface DeleteResponse {
  message: string;
}

export const deleteRegis = async (
  url: string,
  id: number
): Promise<boolean> => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    // Intentamos parsear JSON solo si hay contenido
    let result: DeleteResponse | null = null;
    try {
      result = (await response.json()) as DeleteResponse;
    } catch {
      // Si no hay body, lo dejamos en null
    }

    if (result?.message === "EXITO") {
      alert("Borrado exitoso");
    } else {
      alert("Recurso eliminado correctamente");
    }

    return true;
  } catch (error) {
    console.error("Error detectado: ", error);
    return false;
  }
};
// Definimos un tipo genérico para la respuesta del backend
interface PutResponse {
  message: string;
  updatedId?: string; // opcional, si tu backend devuelve el id actualizado
}

// T es el tipo de datos que vas a enviar en el body
export const updateRegis = async <T>(
  url: string,
  id: string,
  data: T
): Promise<PutResponse | null> => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = (await response.json()) as PutResponse;

    if (result.message === "EXITO") {
      alert("Actualización exitosa");
    }

    return result;
  } catch (error) {
    console.error("Error detectado: ", error);
    return null;
  }
};

export const renovRegis = async <T>(
  url: string,
  id: number,
  data: T
): Promise<PutResponse | null> => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({finDeSuscripcion: data}),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = (await response.json()) as PutResponse;

    if (result.message === "EXITO") {
      alert("Actualización exitosa");
    }

    return result;
  } catch (error) {
    console.error("Error detectado: ", error);
    return null;
  }
};

