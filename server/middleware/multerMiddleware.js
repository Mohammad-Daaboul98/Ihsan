import path from "path";



export const formatImage = (dataURL) => {
  const base64Data = dataURL.replace(/^data:image\/\w+;base64,/, ""); // Remove data URL prefix
  const buffer = Buffer.from(base64Data, "base64"); // Convert to buffer
  return { content: buffer };
};
