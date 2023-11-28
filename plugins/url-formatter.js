export default function ({}, inject) {
  const formatUrlFromQuery = (query, params) => {
    let urlFormatter = [];
    const slug = params.slug;
    const term = query.term;
    const type =
      params.type === "categorie"
        ? "category"
        : params.type === "marque"
        ? "brand"
        : params.type === "rechercher"
        ? "search"
        : "tag";

    if (query.brand) {
      urlFormatter.push(`brand=${query.brand}`);
    }

    if (query.tags) {
      urlFormatter.push(`tags=${query.tags}`);
    }

    if (slug) {
      if (type === "search") {
        urlFormatter.push(`${type}=${term}`);
      } else {
        urlFormatter.push(`${type}=${slug}`);
      }
    }

    if (query.brand_filter) {
      urlFormatter.push(`brand_filter=${query.brand_filter}`);
    }

    if (query.attribute_filter) {
      urlFormatter.push(`attribute_filter=${query.attribute_filter}`);
    }

    if (query.tag_filter) {
      urlFormatter.push(`tag_filter=${query.tag_filter}`);
    }

    if (query.category_filter) {
      urlFormatter.push(`category_filter=${query.category_filter}`);
    }

    return urlFormatter.join("&");
  };

  inject("formatUrlFromQuery", formatUrlFromQuery);
}
