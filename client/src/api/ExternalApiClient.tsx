import axios from "axios";

const externalApiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export default externalApiClient;
