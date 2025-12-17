// check-links public path etc

async function checkServiceLinks(servicesLinks, urlPath)
{
    return (servicesLinks[urlPath] || null);
}

export default {
    checkServiceLinks
};