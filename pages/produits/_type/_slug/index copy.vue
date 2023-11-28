<template>
  <section v-if="!loading" class="product-catalog-section mt-5">
    <div class="grid-container">
      <nav
        class="breadcrumb is-small mb-2 show-for-large"
        aria-label="breadcrumbs"
      >
        <ul>
          <li>
            <NuxtLink to="/">Boutique</NuxtLink>
          </li>
          <!--          <li>-->
          <!--            <NuxtLink to="/">Catégorie</NuxtLink>-->
          <!--          </li>-->
          <li v-for="categogyLevel of categoryLevels" :key="categogyLevel._id">
            <NuxtLink :to="`/produits/categorie/${categogyLevel.slug}`">{{
              categogyLevel.name
            }}</NuxtLink>
          </li>
          <li class="is-active">
            <NuxtLink
              v-if="categories.length"
              aria-current="page"
              :to="`/produits/categorie/${categories[0].slug}`"
            >
              {{ categoryName }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <h2 class="is-size-4 is-uppercase is-bold">{{ categoryName }}</h2>

      <div class="catalog-module mt-2">
        <div class="grid-x">
          <div class="small-12 medium-3 cell">
            <div class="search-filter">
              <p class="mb-2">Filtres</p>

              <!-- filter components -->
              <div class="filter-box mt-2 mb-2" v-if="brandFilters.length">
                <p class="mb-2 has-text-weight-medium">Marque</p>
                <div class="divider mb-3"></div>
                <b-field
                  v-for="({ brand }, index) of elementToDisplay(
                    brandFilters,
                    'brand_filter'
                  )"
                  :key="brand._id"
                >
                  <b-checkbox
                    @input="runFilters"
                    v-model="brandFilters[index].selected"
                  >
                    <span class="is-capitalized"
                      >{{ brand.name }} ({{ brand.count }})</span
                    >
                  </b-checkbox>
                </b-field>
                <div v-show="brandFilters.length > 4">
                  <b-button
                    type="is-ghost"
                    :icon-left="
                      !showElements['brand_filter'] ? 'plus' : 'minus'
                    "
                    @click="
                      $set(
                        showElements,
                        'brand_filter',
                        !showElements['brand_filter']
                      )
                    "
                    :label="
                      !showElements['brand_filter']
                        ? `Plus (${brandFilters.length - 4})`
                        : `Moins`
                    "
                  />
                </div>
              </div>
              <!--END  filter components -->

              <!-- filter components -->
              <div class="filter-box mt-2 mb-2">
                <p class="mb-2 has-text-weight-medium">Prix</p>
                <div class="divider mb-3"></div>
                <b-field>
                  <b-slider
                    @change="runFilters"
                    size="is-medium"
                    v-model="priceRange"
                    :min="minPrice || 0"
                    :max="maxPrice || 2000000"
                    type="is-primary"
                    :step="10000"
                    tooltip-type="is-white"
                    lazy
                    :custom-formatter="formatCurrency"
                  />
                </b-field>
              </div>
              <!--END  filter components -->

              <!-- filter components -->
              <div class="filter-box mt-2 mb-2" v-if="categoryFilters.length">
                <p class="mb-2 has-text-weight-medium">Catégories</p>
                <div class="divider mb-3"></div>
                <b-collapse></b-collapse>
                <b-field
                  v-for="({ category }, index) of elementToDisplay(
                    categoryFilters,
                    'category_filter'
                  )"
                  :key="category._id"
                >
                  <b-checkbox
                    @input="runFilters"
                    v-model="categoryFilters[index].selected"
                  >
                    <span class="is-capitalized"
                      >{{ category.name }} ({{ category.count }})</span
                    >
                  </b-checkbox>
                </b-field>
                <div v-show="categoryFilters.length > 4">
                  <b-button
                    type="is-ghost"
                    :icon-left="
                      !showElements['category_filter'] ? 'plus' : 'minus'
                    "
                    @click="
                      $set(
                        showElements,
                        'category_filter',
                        !showElements['category_filter']
                      )
                    "
                    :label="
                      !showElements['category_filter']
                        ? `Plus (${categoryFilters.length - 4})`
                        : `Moins`
                    "
                  />
                </div>
              </div>
              <!--END  filter components -->
              <!-- filter components -->
              <div class="filter-box mt-2 mb-2" v-if="tagFilters.length">
                <p class="mb-2 has-text-weight-medium">Étiquettes</p>
                <div class="divider mb-3"></div>
                <b-collapse></b-collapse>
                <b-field
                  v-for="({ tag }, index) of elementToDisplay(
                    tagFilters,
                    'tag_filter'
                  )"
                  :key="tag._id"
                >
                  <b-checkbox
                    @input="runFilters"
                    v-model="tagFilters[index].selected"
                    >{{ tag.name }} ({{ tag.count }})
                  </b-checkbox>
                </b-field>
                <div v-show="tagFilters.length > 4">
                  <b-button
                    type="is-ghost"
                    :icon-left="!showElements['tag_filter'] ? 'plus' : 'minus'"
                    @click="
                      $set(
                        showElements,
                        'tag_filter',
                        !showElements['tag_filter']
                      )
                    "
                    :label="
                      !showElements['tag_filter']
                        ? `Plus (${tagFilters.length - 4})`
                        : `Moins`
                    "
                  />
                </div>
              </div>
              <!--END  filter components -->
              <!-- filter components -->
              <div
                class="filter-box mt-2 mb-2"
                v-for="(attribute, indexAtt) of attributeFilters"
                :key="indexAtt"
              >
                <p class="mb-2 has-text-weight-medium">{{ attribute.name }}</p>
                <div class="divider mb-3"></div>
                <b-collapse></b-collapse>
                <b-field
                  v-for="(term, indexTerm) of attribute.terms"
                  :key="indexTerm"
                >
                  <b-checkbox
                    @input="runFilters"
                    v-model="
                      attributeFilters[indexAtt].terms[indexTerm].selected
                    "
                    >{{ term.value.value }}
                  </b-checkbox>
                </b-field>
              </div>
              <!--END  filter components -->
            </div>
          </div>

          <!--  product list -->
          <div class="small-12 medium-9 cell">
            <div class="grid-x grid-margin-x">
              <div class="small-12 cell">
                <NuxtLink to="/produits/categorie/electromenager">
                  <div
                    class="category-banner"
                    v-if="bannerImage && bannerImage !== ''"
                    :style="`background-image: url(&quot;${bannerImage}&quot;);`"
                  ></div>
                  <div
                    v-else
                    class="category-banner"
                    style="
                      background-image: url('https://i.postimg.cc/MKJc2FDT/bannertst.webp');
                    "
                  ></div>
                </NuxtLink>
              </div>
              <div class="small-12 cell">
                <p class="pt-3 pb-3 pl-5 has-text-grey">
                  {{ computedProduct ? computedProduct.length : 0 }} produits
                  trouvés
                </p>

                <div class="divider"></div>
              </div>
            </div>
            <ul class="grid-x bdordered-cell">
              <li
                v-for="product in computedProduct"
                v-bind:key="product.slug"
                class="small-6 large-3 medium-4 cell"
              >
                <product-card
                  @addToCart="
                    addProductToCart({ product: product, quantityToBeAdd: 1 })
                  "
                  :product="product"
                />
              </li>
              <div class="small-12 cell">
                <infinite-scroll
                  :enough="false"
                  class="flex justify-center w-full h-40"
                  @load-more="loadMore"
                >
                  <template v-if="isLoading">
                    <svg
                      class="w-8 h-8 mr-3 border-0 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span class="sr-only" v-if="isLoading">
                      en chargement...</span
                    >
                  </template>
                </infinite-scroll>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions } from "vuex";
import ProductCard from "@/components/ProductCard";

export default {
  auth: false,
  components: { ProductCard },
  key(route) {
    return route.fullPath;
  },
  head() {
    return {
      title: "CAC Sénégal | " + this.categoryName,
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          hid: "description",
          name: "description",
          content: this.description,
        },
      ],
    };
  },
  watchQuery: true,
  async asyncData({ $axios, route }) {
    try {
      const slug = route.params.slug;
      const term = route.query.term??'';
      const query = route.query;
      const type =
        route.params.type === "categorie"
          ? "category"
          : route.params.type === "marque"
          ? "brand"
          : route.params.type === "rechercher"
          ? "search"
          : "tag";

      let urlFormatter = [];

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

      const { data, status } = await $axios.get(
        `/product?${urlFormatter.join("&")}`
      );

      if (status === 200) {
      
        return {
          products: data.data.products,
          brands: data.data.brands,
          tags: data.data.tags,
          categories: data.data.categories,
          attributes: data.data.attributes,
          pagination: data.data.pagination,
          minPrice: data.data.minPrice,
          maxPrice: data.data.maxPrice,
          initialMinPrice: data.data.minPrice,
          initialMaxPrice: data.data.maxPrice,
          categoryName: data.data.categoryName,
          categoryLevels: data.data.categoryLevels,
          bannerImage: data.data.bannerImage,
          description: data.data.description,
        };
      }
    } catch (e) {
      console.log("Product error", e);
    }
    return {
      products: [],
      brands: [],
      tags: [],
      categories: [],
      attributes: [],
      pagination: {},
      categoryName: "",
      categoryLevels: [],
      bannerImage: "",
      description: "",
    };
  },
  beforeMount() {
    this.prepareFilters();
  },
  mounted() {
    this.priceRange = [this.minPrice, this.maxPrice];
  },
  computed: {
    computedProduct() {
      return this.filteredProducts;
    },
    elementToDisplay() {
      return function (elements, index) {
        const length = this.showElements[index] ? elements.length : 4;
        return elements.slice(0, length);
      };
    },
  },
  created() {
    this.$nextTick(function () {
      this.loading = false;
    });
  },
  data() {
    return {
      loading: true,
      enough: false,
      filteredProducts: [],
      priceRange: [0, 2000000],
      brands:[],
      brandFilters: [],
      tagFilters: [],
      categoryFilters: [],
      attributeFilters: [],
      isLoading: false,
      showElements: {
        brand_filter: false,
        category_filter: false,
        tag_filter: false,
      },
    };
  },
  methods: {
    ...mapActions({
      addProductToCart: "cart/addProductToCart",
      filterByCategoryAction: "products/filterByCategory",
    }),
    async loadMore() {
      const params = this.$route.params;
      const query = this.$route.query;
      try {
        if (this.isLoading === false && this.pagination.hasNextPage) {
          this.isLoading = true;
          this.$nuxt.$loading.start();

          let { data, status } = await this.$axios.get(
            `/product?${this.$formatUrlFromQuery(query, params)}&page=${
              this.pagination.nextPage
            }`
          );

          if (status === 200) {
            this.products = this.products.concat(data.data);
            this.minPrice = data.minPrice;
            this.maxPrice = data.maxPrice;
            if (this.initialMinPrice !== data.minPrice) {
              this.$set(this.priceRange, 0, data.minPrice);
            }
            if (this.initialMaxPrice !== data.maxPrice) {
              this.$set(this.priceRange, 2, data.maxPrice);
            }
            this.pagination = data.pagination;

            this.filteredProducts = this.products;

            // this.prepareFilters();
            // Stop scroll-loader
            // data.data.length < this.pagination.page && (this.enough = true);
          }
          this.isLoading = false;
          this.$nuxt.$loading.finish();
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    prepareFilters() {
      let brandFilterQuery = [];
      if (this.$route.query.brand_filter) {
        brandFilterQuery = this.$route.query.brand_filter.split(";");
      }
      let tagFilterQuery = [];
      if (this.$route.query.tag_filter) {
        tagFilterQuery = this.$route.query.tag_filter.split(";");
      }
      let categoryFilterQuery = [];
      if (this.$route.query.category_filter) {
        categoryFilterQuery = this.$route.query.category_filter.split(";");
      }
      let attributeFilterQuery = [];
      if (this.$route.query.attribute_filter) {
        attributeFilterQuery = this.$route.query.attribute_filter.split(";");
      }

      this.filteredProducts = this.products;
      this.brandFilters = this.brands.map((brand) => {
        return {
          brand: brand,
          selected: brandFilterQuery.includes(brand._id),
        };
      });
      this.tagFilters = this.tags.map((tag) => {
        return {
          tag: tag,
          selected: tagFilterQuery.includes(tag._id),
        };
      });
      this.categoryFilters = this.categories.map((category) => {
        return {
          category: category,
          selected: categoryFilterQuery.includes(category._id),
        };
      });
      this.attributeFilters = this.attributes.map((attribute) => {
        return {
          ...attribute,
          terms: attribute.terms.map((term) => {
            return {
              value: term,
              selected: attributeFilterQuery.includes(term._id),
            };
          }),
        };
      });
    },
    formatCurrency(input) {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XOF",
      }).format(input);
    },
    runFilters() {
      this.filteredProducts = this.priceFilter(this.products);

      let brands = this.brandQuery();
      let tags = this.tagQuery();
      let categories = this.categoriesQuery();
      let attributes = this.attributesQuery();

      let urlFormatter = [];

      if (brands.length) {
        urlFormatter.push(`brand_filter=${brands.join(";")}`);
      }

      if (tags.length) {
        urlFormatter.push(`tag_filter=${tags.join(";")}`);
      }

      if (categories.length) {
        urlFormatter.push(`category_filter=${categories.join(";")}`);
      }

      if (attributes.length) {
        urlFormatter.push(`attribute_filter=${attributes.join(";")}`);
      }

      this.$router.push(`${this.$route.path}?${urlFormatter.join("&")}`);
    },
    brandFilter() {
      const selectedBrands = this.brandFilters.filter(
        (brandFilter) => brandFilter.selected === true
      );

      const brandMap = selectedBrands.map((brand) => brand.brand._id);

      if (brandMap.length) {
        return this.products.filter((product) => {
          return brandMap.some((someBrand) => {
            return someBrand.includes(product.brand._id);
          });
        });
      } else {
        return this.products;
      }
    },
    brandQuery() {
      const selectedBrands = this.brandFilters.filter(
        (brandFilter) => brandFilter.selected === true
      );

      return selectedBrands.map((brand) => brand.brand._id);
    },
    priceFilter(filteredProduct) {
      if (this.priceRange.length === 2) {
        return filteredProduct.filter((product) => {
          return (
            product.price >= this.priceRange[0] &&
            product.price <= this.priceRange[1]
          );
        });
      } else {
        return filteredProduct;
      }
    },
    tagFilter(filteredProduct) {
      const selectedTags = this.tagFilters.filter(
        (tagFilter) => tagFilter.selected === true
      );
      const tagMap = selectedTags.map((selectedTag) => {
        return selectedTag.tag._id;
      });

      if (selectedTags.length) {
        return filteredProduct.filter((product) => {
          return product.tags.some((tag) => {
            return tagMap.includes(tag._id);
          });
        });
      } else {
        return filteredProduct;
      }
    },
    tagQuery() {
      const selectedTags = this.tagFilters.filter(
        (tagFilter) => tagFilter.selected === true
      );
      return selectedTags.map((selectedTag) => {
        return selectedTag.tag._id;
      });
    },
    categoriesFilter(filteredProduct) {
      const selectedCategories = this.categoryFilters.filter(
        (categoryFilter) => categoryFilter.selected === true
      );

      const categoryMap = selectedCategories.map((selectedCategory) => {
        return selectedCategory.category._id;
      });

      if (selectedCategories.length) {
        return filteredProduct.filter((product) => {
          return product.categories.some((category) => {
            return categoryMap.includes(category._id);
          });
        });
      } else {
        return filteredProduct;
      }
    },
    categoriesQuery(filteredProduct) {
      const selectedCategories = this.categoryFilters.filter(
        (categoryFilter) => categoryFilter.selected === true
      );
      return selectedCategories.map((selectedCategory) => {
        console.log(selectedCategory);
        return selectedCategory.category._id;
      });
    },
    attributesFilter(filteredProduct) {
      const selectedAttributes = this.attributeFilters.map(
        (attributeFilter) => {
          const filteredTerms = attributeFilter.terms.filter(
            (term) => term.selected
          );

          return filteredTerms.map((term) => term.value._id);
        }
      );

      const flattenedSelection = _.flatten(selectedAttributes);

      if (flattenedSelection.length) {
        return filteredProduct.filter((product) => {
          return product.term_values.some((term) => {
            return flattenedSelection.includes(term);
          });
        });
      } else {
        return filteredProduct;
      }
    },
    attributesQuery(filteredProduct) {
      const selectedAttributes = this.attributeFilters.map(
        (attributeFilter) => {
          const filteredTerms = attributeFilter.terms.filter(
            (term) => term.selected
          );

          return filteredTerms.map((term) => term.value._id);
        }
      );

      return _.flatten(selectedAttributes);
    },
    queryBrand(slug) {
      this.insertParam("brand", slug);
    },
    queryTag($event) {
      alert(JSON.stringify($event));
      // this.insertParam("tags", "test");
    },
    isQueryPresent(field, slug) {
      const presentQueries = this.getParameterByName(field);
      if (this.getParameterByName(field)) {
        return this.getParameterByName(field) === slug;
      }
      return false;
    },
    isQueriesPresent(field, slug) {
      const presentQueries = this.getParameterByName(field);
      if (this.getParameterByName(field)) {
        return this.getParameterByName(field) === slug;
      }
      return false;
    },
    getParameterByName(name, url = this.$route.fullPath) {
      name = name.replace(/[\[\]]/g, "\\$&");
      const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    insertParam(key, value) {
      key = encodeURIComponent(key);
      value = encodeURIComponent(value);

      // kvp looks like ['key1=value1', 'key2=value2', ...]
      const kvp = document.location.search.substr(1).split("&");
      let i = 0;

      for (; i < kvp.length; i++) {
        if (kvp[i].startsWith(key + "=")) {
          let pair = kvp[i].split("=");
          pair[1] = value;
          kvp[i] = pair.join("=");
          break;
        }
      }

      if (i >= kvp.length) {
        kvp[kvp.length] = [key, value].join("=");
      }

      // can return this or...
      let params = kvp.join("&");

      // reload page with new params
      document.location.search = params;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/sass/partials/global.scss";

.category-banner {
  background-image: url("https://uae.sharafdg.com/wp-content/uploads/sites/7/2017/01/beauty.png");
  height: 120px;
  display: block;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
}

.catalog-module {
  @include standard-card-simple();
  padding: 0;

  .search-filter {
    border-right: 1px solid #f2f2f2;
    height: 100%;
    padding: 15px;
  }
}
</style>
