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
