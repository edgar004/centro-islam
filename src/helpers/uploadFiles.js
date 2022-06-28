import dotenv from "dotenv";
dotenv.config();

const { REACT_APP_API_URL } = process.env;

export const uploadFiles = async (files) => {
  const token = localStorage.getItem("Islam_auth_token");
  const url = [];

  await Promise.all(
    await Array.from(files).map(async (imagen) => {
      let formData = new FormData();
      formData.append("image", imagen);
      formData.append("nombre", "Enmanuel");

      const bodyOpts = {
        method: "POST",
        headers: {
          Islam_auth_token: token,
          credentials: "include",
        },
        body: formData,
      };

      const { data } = await fetch(
        `${REACT_APP_API_URL}/imagen`,
        bodyOpts
      ).then((res) => res.json());

      if (data) {
        url.push(data);
      }
    })
  );

  return url;
};
