import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getDetallePersonaje } from "../API/marvel-api";
const Detalle = () => {
  let { id } = useParams();
  const [detalle, setDetalle] = useState(null);
  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        let {
          data: {
            data: { results },
          },
        } = await getDetallePersonaje(id);
        setDetalle(results);
      } catch (e) {
        setDetalle(null);
      }
    };
    cargarDetalle();
  }, [id]);
  console.log(detalle);
  return (
    <section className="box">
      {detalle != null ? (
        detalle.map((elem) => {
          const imagen = elem.thumbnail.path + "." + elem.thumbnail.extension;
          const comics = elem.comics.items;
          const series = elem.series.items;
          return (
            <div className="section">
              <h1 className="title" style={{ color: "black" }}>
                {elem.name}
              </h1>
              <figure className="image container ">
                <img className="is-rounded " src={imagen} alt="" />
              </figure>
              <p>
                <strong>Comics:</strong>{" "}
                {comics.length > 0
                  ? comics
                      .map((elem) => {
                        return elem.name;
                      })
                      .join(" , ")
                  : "No data"}
              </p>
              <p>
                <strong>Series:</strong>{" "}
                {series.length > 0
                  ? series
                      .map((elem) => {
                        return elem.name;
                      })
                      .join(" , ")
                  : "No data"}
              </p>
            </div>
          );
        })
      ) : (
        <p>Información sobre super-heroe no encontrada :c</p>
      )}
    </section>
  );
};

export default Detalle;
