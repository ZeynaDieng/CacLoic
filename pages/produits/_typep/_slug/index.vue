<template>
  <section class="product-catalog-section mt-5">
    <div class="grid-container">
 <br> <br>
      <h2 class=" is-size-4 is-uppercase font-bold">{{ categoryName }}</h2>

      <div class="catalog-module mt-2">
        <div class="grid-x ">
          <div class="small-12 medium-3 cell">
            <div class="search-filter">
              <p class="mb-2">Filtres</p>

              <!-- filter components -->
      <div class="filter-box mt-2 mb-4">
                <p class="mb-2 has-text-weight-medium">Marque</p>
                <div class="divider mb-3"></div>
                <b-field >
                  <b-checkbox
                     
                   
                  >Tijinou (24)
                  </b-checkbox>
                </b-field>

                 <b-field >
                  <b-checkbox
                     
                   
                  >Foker (20)
                  </b-checkbox>
                </b-field>
                <b-field >
                  <b-checkbox
                     
                   
                  >Valsecchi (29)
                  </b-checkbox>
                </b-field>
              </div> 
               <!-- filter components -->
              <div class="filter-box mt-2 mb-2">
                <p class="mb-2 has-text-weight-medium">Prix</p>
                <div class="divider mb-3"></div>
                <b-field>
                  <b-slider
                    
                    size="is-medium"
                   
                     v-model="priceRange"
                            :min="minPrice || 0"
                            :max="maxPrice || 2000000"
                    type="is-primary"
                    :step="500"
                    tooltip-type="is-white"
                    lazy
                  
                  />
                </b-field>
              </div>
        <!-- filter components -->
               <div class="filter-box  mb-6">
                <p class="mb-2 has-text-weight-medium">Catégories</p>
                <div class="divider mb-3"></div>
                <b-field >
                  <b-checkbox
                     
                   
                  >Tijinou (2)
                  </b-checkbox>
                </b-field>
              </div> 
            </div>

            
            
          </div>

          <!--  product list -->
          <div class="small-12 medium-9 cell">
            <div class="grid-x grid-margin-x">
              <div class="small-12 cell">
               <!--  <p class="pt-3 pb-3 pl-5 has-text-grey">{{ products.length }} produits trouvés</p>
 -->
                <div class="divider"></div>
              </div>
            </div>
            <ul class="grid-x bordbered-cell grid-margin-x grid-margin-y">
          <li v-for="(product, index) of computedProduct" v-bind:key="index" class="small-6 large-3 medium-4 cell">
                <ProductCard @addToCart="addProductToCart({product: product, quantityToBeAdd: 1})" :product="product"/>
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
                        stroke="green"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="green"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span class="sr-only" v-if="isLoading">produits en chargement...</span>
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
import {mapActions, mapGetters} from "vuex";
export default {
  auth: false,
 watchQuery: true,
  async asyncData({$axios, $_, route}) {
    try {
    console.log(route.params.slug)
      const slug = route.params.slug;
      const term = route.params.term;
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
        `/product`
        //`/products?${urlFormatter.join("&")}`
      );

      // const { data, brands, tags } = await $axios.get("/product");
   
        if (status === 200) {
           console.log(data.data.products);
        return {
          products: data.data.products,
          brands: data.data.brands,
          tags: data.data.tags,
          categories: data.data.categories,
          attributes: data.data.attributes,
          pagination: data.data.paginations,
          minPrice: data.minPrice,
          maxPrice: data.maxPrice,
          initialMinPrice: data.data.minPrice,
          initialMaxPrice: data.data.maxPrice,
          categoryName: route.params.slug,
          categoryLevels: data.data.categoryLevels,
          bannerImage: data.data.bannerImage,
          description: data.data.description,
        };
      }
    } catch (e) {
      console.log(e);
      if (e.response.status === 404) {
        console.log(e.response.statusText);
      }


    }

     return {
      products: [],
      brands: [],
      tags: [],
      categories: [],
      attributes: [],
      pagination: {},
      categoryName: '',
      categoryLevels: [],
      bannerImage: '',
      description: ''
    }

  },
    beforeMount() {
    this.prepareFilters();
  },
    mounted() {
    this.priceRange = [this.minPrice, this.maxPrice]
  },
  data() {
    return {
      loading: true,
      enough: false,
      filteredProducts: [],
      categoryLevels:[],
      priceRange: [0, 2000000],
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
  computed: {
    //watch and update the products listed
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
      this.loading = false
    })
  },
  methods: {
       ...mapActions({
      addProductToCart: "cart/addProductToCart",
      filterByCategoryAction: "products/filterByCategory"
    }),

//**FETCHED WHEN USER SCROLL DOWN **// 
    async loadMore() {
      const params = this.$route.params;
      const query = this.$route.query;
      try {
        if (this.isLoading === false && this.pagination.hasNextPage==true) {
          this.isLoading = true
          this.$nuxt.$loading.start()

          let {
            data,
            status
          } = await this.$axios.get(
            //`/product?${this.$formatUrlFromQuery(query, params)}&page=${this.pagination.nextPage}`
            `/products?skip=${this.pagination.nextPage}`
          );


          if (status === 200) {
            this.products = this.products.concat(data.data.products);
            this.minPrice = data.data.minPrice;
            this.maxPrice = data.data.maxPrice;
            if (this.initialMinPrice !== data.data.minPrice) {
              this.$set(this.priceRange, 0, data.data.minPrice)
            }
            if (this.initialMaxPrice !== data.data.maxPrice) {
              this.$set(this.priceRange, 2, data.data.maxPrice)
            }
            this.pagination = data.data.paginations;

            this.filteredProducts = this.products

            // this.prepareFilters();
            // Stop scroll-loader
            // data.data.length < this.pagination.page && (this.enough = true);
          }
          this.isLoading = false;
          this.$nuxt.$loading.finish()
        }

      } catch (error) {
        console.log('error', error)
      }
    },

  prepareFilters() {
        let categoryFilterQuery = []
      if (this.$route.query.category_filter) {
        categoryFilterQuery = this.$route.query.category_filter.split(';')
      }
  /*     let brandFilterQuery = []
      if (this.$route.query.brand_filter) {
        brandFilterQuery = this.$route.query.brand_filter.split(';')
      }
      let tagFilterQuery = []
      if (this.$route.query.tag_filter) {
        tagFilterQuery = this.$route.query.tag_filter.split(';')
      }
  
      let attributeFilterQuery = []
      if (this.$route.query.attribute_filter) {
        attributeFilterQuery = this.$route.query.attribute_filter.split(';')
      }
 */
      this.filteredProducts = this.products
     /*  this.brandFilters = this.brands.map((brand) => {
        return {
          brand: brand,
          selected: brandFilterQuery.includes(brand._id)
        }
      })
      this.tagFilters = this.tags.map((tag) => {
        return {
          tag: tag,
          selected: tagFilterQuery.includes(tag._id)
        }
      })
      this.categoryFilters = this.categories.map((category) => {
        return {
          category: category,
          selected: categoryFilterQuery.includes(category._id)
        }
      })
      this.attributeFilters = this.attributes.map((attribute) => {
        return {
          ...attribute,
          terms: attribute.terms.map((term) => {
            return {
              value: term,
              selected: attributeFilterQuery.includes(term._id)
            }
          })

        }
      }); */
    },
         priceFilter(filteredProduct) {
      if (this.priceRange.length === 2) {
        return filteredProduct.filter((product) => {

          return product.price >= this.priceRange[0] && product.price <= this.priceRange[1];
        })
      } else {
        return filteredProduct
      }

    },
//**THEQUERIES**//
    categoriesQuery(filteredProduct) {

      const selectedCategories = this.categoryFilters.filter(categoryFilter => categoryFilter.selected === true)
      return selectedCategories.map(selectedCategory => {
        console.log(selectedCategory)
        return selectedCategory.category._id
      });
    },
//**THEQUERIES**//     

//***silently reload the page with new selected paramaters***///
     runFilters() {
      this.filteredProducts = this.priceFilter(this.products);

    //  let brands = this.brandQuery();
    //  let tags = this.tagQuery();
      let categories = this.categoriesQuery();
    //  let attributes = this.attributesQuery();

      let urlFormatter = []

/*       if (brands.length) {
        urlFormatter.push(`brand_filter=${brands.join(';')}`)
      }

      if (tags.length) {
        urlFormatter.push(`tag_filter=${tags.join(';')}`)
      } */

      if (categories.length) {
        urlFormatter.push(`category_filter=${categories.join(';')}`)
      }

/* 
      if (attributes.length) {
        urlFormatter.push(`attribute_filter=${attributes.join(';')}`)
      } */

      this.$router.push(`${this.$route.path}?${urlFormatter.join('&')}`)
    },
  },

}
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
