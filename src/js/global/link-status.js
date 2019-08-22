window.getLinkStatus = (link) => {
  let url = link.getAttribute(`href`);

  if (url) {
    if (url === `#more`) {
      return `more`;
    } else if (url.startsWith(`#`)) {
      return `section`;
    } else if (link.target || url.startsWith(`http:`) || url.startsWith(`https:`) ||
        url.startsWith(`mailto:`) || url.startsWith(`tel:`)) {
      return `external`;
    } else if (link.hasAttribute(`data-popup`)) {
      return `popup`;
    }

    return `page`;
  }

  return false;
};
