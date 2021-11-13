var Axios = require("axios");
const instancia = Axios.default.create({
  baseURL: "https://gateway.marvel.com/",
  params: {
    apikey: "70a92c0b025cdee6e0ca4a22ce49a97e",
  },
});

const getPersonajes = async (offset = 0) => {
  return instancia.get("/v1/public/characters", {
    params: {
      offset: offset,
    },
  });
};

const getDetallePersonaje = async (id) => {
  return instancia.get(`/v1/public/characters/${id}`);
};

export { getPersonajes, getDetallePersonaje };
