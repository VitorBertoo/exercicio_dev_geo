export const buildHtml = (object: {
  [key: string]: string | number | undefined;
}): string => {
  let popupContent: string = '';
  Object.keys(object).forEach(key => {
    popupContent += `<p><strong>${key}</strong>: ${object[key]} </p>`;
  });

  return popupContent;
};
