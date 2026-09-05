import { useState, useEffect } from "react";


export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reload,setReload] = useState<boolean>(false)
  useEffect(()=>{
    console.log("se modifico el valor de reload", url)
  },[reload])
  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true); // ✅ ahora dentro de la función asíncrona
        setError(null);

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        const json = await res.json();
        
        setData(json.data);
      } catch (err: unknown) {
        console.log(err)
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
      } finally {
        if(reload) setReload(false)
        setLoading(false);
        
      }
    };

    fetchData();
  }, [url,reload]);

  return { data, loading, error, setReload };
}