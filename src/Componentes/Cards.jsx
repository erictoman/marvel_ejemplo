import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router";
import { getPersonajes } from "../API/marvel-api";
import Modal from "./Modal";
const Cards = () => {
  const [personajes, setPersonajes] = useState([]);
  const [open, setOpen] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [pagina, setPagina] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPersonajes = async () => {
      let {
        data: {
          data: { results, ...data },
        },
      } = await getPersonajes();
      setPagina(data.total / data.count);
      setPersonajes(results);
    };
    cargarPersonajes();
  }, []);

  const cargarPersonajes = async (numero) => {
    let {
      data: {
        data: { results },
      },
    } = await getPersonajes(numero * 20);
    setPersonajes(results);
  };

  return (
    <div className="columns is-multiline is-mobile">
      {personajes.map((elem) => {
        const imagen = elem.thumbnail.path + "." + elem.thumbnail.extension;
        return (
          <div key={elem.name} className="column is-one-quarter">
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={imagen} alt="" />
                </figure>
              </div>
              <div className="card-content">
                <p>
                  <strong>Nombre:</strong> {elem.name}
                </p>
                <p>
                  <strong>Descripción:</strong>{" "}
                  {elem.description ? elem.description : "No data"}
                </p>
              </div>
              <div className="card-footer">
                <a
                  onClick={() => {
                    setImagen(imagen);
                    setOpen(true);
                  }}
                  href
                  className="card-footer-item"
                >
                  Ver imagen completa
                </a>
                <a
                  onClick={() => {
                    navigate(`/${elem.id}`);
                  }}
                  href
                  className="card-footer-item"
                >
                  Ver detalle
                </a>
              </div>
            </div>
          </div>
        );
      })}
      <Modal
        open={open}
        imagen={imagen}
        close={() => {
          setOpen(false);
        }}
      />
      <nav className="is-centered">
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Siguiente"}
          pageCount={pagina}
          onPageChange={(e) => {
            cargarPersonajes(e.selected);
          }}
          containerClassName={"pagination is-centered"}
          previousLinkClassName={"pagination-previous"}
          nextLinkClassName={"pagination-next"}
          activeClassName={"pagination-link is-current"}
          pageLinkClassName="pagination-link"
          breakLinkClassName="pagination-link ellipsis"
        />
      </nav>
    </div>
  );
};

export default Cards;
