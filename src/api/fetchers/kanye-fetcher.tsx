import axios from "axios";

const FetchKanyeQuote = async () => {
  try {
    const response = await axios.get(
      "https://api.kanye.rest/"
    );

    return response.data.quote as string; 
  } catch (error) {
    console.error("Can't get Kanye quote");
    throw error;
  }
};

export default FetchKanyeQuote