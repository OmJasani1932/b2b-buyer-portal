const ExpImageParser = (imageData: string) => {
  const imgObj = JSON.parse(imageData);

  return imgObj;
};

export default ExpImageParser;
