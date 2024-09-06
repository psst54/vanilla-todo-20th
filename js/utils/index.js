function createElement(tag, attributes = {}) {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    if (key in element) {
      element[key] = value;
    } else {
      element.setAttribute(key, value);
    }
  });

  return element;
}

function getRandomId() {
  return Math.random() // generate random number between 0 to 1
    .toString(36) // convert to base-36 string
    .substring(2); // remove leading '0.'
}
