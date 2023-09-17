import axios from "axios";

export const apiHandler = async (
  requestData = {},
  token = "",
  type = "",
  baseUrl,
  middleUrl,
  page,
  param1 = "",
  param2 = "",
  param3 = ""
) => {
  const url = `${baseUrl}${middleUrl}${page}`;
  const HEADER_TOKEN = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (type === "HOME")
    return await axios.get(`${url}/:${param1}/:${param2}/:${param3}`);
  else if (type === "CONTACT") return await axios.post(`${url}`, requestData);
  else if (type === "CREATE_BLOG")
    return await axios.post(`${url}`, requestData, HEADER_TOKEN);
  else if (type === "UPDATE_BLOG")
    return await axios.put(`${url}/${param1}`, requestData, HEADER_TOKEN);
  else if (type === "GET_BLOG")
    return await axios.get(`${url}/:${param1}/:${param2}`, HEADER_TOKEN);
  else if (type === "DELETE_BLOG")
    return await axios.delete(`${url}/:${param1}`, HEADER_TOKEN);
  else if (type === "AUTHOR_BLOGS" || type === "GET_ONE_BLOG")
    return await axios.get(`${url}/:${param1}`, HEADER_TOKEN);
  else if (type === "MEDIA")
    return await axios.get(`${url}/:${param1}/:${param2}`);
};
