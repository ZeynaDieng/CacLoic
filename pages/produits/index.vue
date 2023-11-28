<template>
  <section class="product-catalog-section mt-5">
    <div class="grid-container">
 <br> <br>
      <h2 class=" is-size-4 is-uppercase font-bold">Electroménager</h2>

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
                   
                    :min="1500 || 0"
                    :max="2000000 || 2000000"
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
            <ul class="grid-x bdordbered-cell grid-margin-x grid-margin-y">
          <li v-for="product in products" v-bind:key="product._id" class="small-6 large-3 medium-4 cell">
                <ProductCard @addToCart="addProductToCart({product: product, quantityToBeAdd: 1})" :product="product"/>
              </li> 

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
 // watchQuery: true,
  async asyncData({$axios, $_, route}) {
    
 
    try {
      //const slug = route.params.slug;
      //const query = route.query;
      
      const {data} = await $axios.get('/product');

      // const { data, brands, tags } = await $axios.get("/product");
      console.log(data);
      return {products: data.data.products};
    } catch (e) {
      console.log(e);
      if (e.response.status === 404) {
        console.log(e.response.statusText);
      }
    }

  },
  data() {
    return {
      categoryLevels:[

      ],
      value: [22000, 150000]
    };
  },

  methods: {
       ...mapActions({
      addProductToCart: "cart/addProductToCart",
      filterByCategoryAction: "products/filterByCategory"
    }),
  }
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
