import axios from "axios";

export const get = async (url, headers = {}) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        ...headers,
      },
      // withCredentials: true,
    });

    return { ...data };
  } catch (err) {
    return { error: -1, ...err.response.data };
  }
};

export const post = async (url, body, headers = {}) => {
  try {
    const { data } = await axios.post(url, body, {
      headers: {
        ...headers,
      },
      withCredentials: true,
    });
    return { ...data };
  } catch (err) {
    return { error: -1, ...err.response.data };
  }
};
