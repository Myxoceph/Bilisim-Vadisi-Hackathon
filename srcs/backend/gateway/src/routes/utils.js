async function checkServiceLinks(servicesLinks, urlPath) {
  return servicesLinks[urlPath] || null;
}

export default {
  checkServiceLinks,
};
