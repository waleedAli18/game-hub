import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "0238c0a2666f47f299086a5be04a89df",
  },
});
