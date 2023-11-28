export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const searchApi = $axios.create();

  // Set baseURL to something different
  searchApi.setBaseURL(
    process.env.APP_ENV === "DEV" ? "http://localhost:7700" : "https://search.cacsenegal.com"
  );

  // Inject to context as $api
  inject("search", searchApi);
}
