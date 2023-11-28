<template>
   <div class="home-container ">
      <!-- header -->
      <!-- body -->
      <section class="banner-section">
         <div class="grid grid-cols-4 gap-4 container   ">
            <!-- Menu -->
            <!--       <div class=" h-full bg-white pt-2 py-2 border-l-2 border-cac-500 overflow-scroll hidden lg:block menu-container overflow-x-hidden ">
               <ul class="flex flex-col w-full ">
               
               <li v-for="category in results.categories" :key="category.id" class="mx-4">
               <nuxt-link :to="`/produits/categorie/${category.slug}`" class="flex flex-row items-center py-1 px-4  rounded-md text-gray-800 hover:text-cac-800 hover:bg-cac-200">
               
               <span class="ml-3">{{category.title}}</span>
               </nuxt-link>
               </li>
               </ul>
               </div> -->
            <div  class=" h-full bg-white pt-2 py-2 border-l-2 border-cac-500   overflow-y-scroll overflow-x-hidden hidden lg:block menu-container ">
               <ul  class="flex flex-col w-full left-menu    ">
                  <li  v-for="(category, index) of getAppMenu" :key="index" class="mx-4 left-menu-element ">
                     <dl>
                        <dt class="category-name">
                           <nuxt-link :to="`/produits/categorie/${category.slug}`" class="flex flex-row items-center py-1 px-4  rounded-md text-gray-800 hover:text-cac-800 hover:bg-cac-200">
                              <span class="ml-3">{{category.name}}</span>
                           </nuxt-link>
                        </dt>
                        <!-- grid-x grid-margin-x grid-margin-y -->
                        <dd v-if="category.children.length>0" class="dropDown-menu_wrapper "  style="display: block;">
                           <ul class="dropDown-menu dropDown-menu grid grid-cols-4 rounded-md" data-v-d2447884="">
                              <li v-for="(item, index) in category.children" :key="index" class="" data-v-d2447884="">
                                 <NuxtLink :to="`/produits/categorie/${item.slug}`" class=" nav-sub-menu-title" data-v-d2447884="">{{item.name}}</NuxtLink>
                                 <NuxtLink v-for="(subItem, index) in item.children" :key="index"  :to="`/produits/categorie/${subItem.slug}`" class="dropDown-menu-link" data-v-d2447884="">{{subItem.name }}
                                 </NuxtLink>
                              </li>
                           </ul>
                        </dd>
                     </dl>
                  </li>
               </ul>
            </div>
            <!-- END Menu -->
            <div class="col-span-4  lg:col-span-3  mt-4">
               <SlidingBanner :banners="results.banners"  />
            </div>
         </div>
      </section>
      <div class="container home-sections"  >
         <HomeExpoB :hideProductsTitle="true" :limit=6 :products="results.superPromos" class="hidden md:block "/>
         <HomeExpoB :hideProductsTitle="true" :limit=2 :products="results.superPromos" class=" md:hidden mx-2"/>
         <!--                  <Pintest :products="results.sections" class="block md:hidden "/>
            <br> -->
         <!--    <section class="md:grid grid-cols-2 gap-4 hidden ">
            <HomeExpoSmall :products="results.sections"/>
            <HomeExpoSmall :products="results.sections"/>
            </section> 
            <br> -->
         <section class="mt-5 double-row-banner mx-3">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
               <div class="long-banner">
                  <nuxt-link to="">     <img
                     class="img-responsive"
                     src="@/assets/images/banners-left.webp"
                     alt=""
                     /></nuxt-link>
               </div>
               <div class="long-banner">
                  <nuxt-link to="">     <img
                     class="img-responsive"
                     src="@/assets/images/banners-right.webp"
                     alt=""
                     /></nuxt-link>
               </div>
            </div>
         </section>
         <!-- banners lef and right -->
         <template v-for="(catSection, index)  of results.categorySection"  >
         <header class="section-heading md:mt-7 md:mb-4  heading-line is-size-4 is-size-5-mobile    justify-center  hidden md:flex  " :key="index">
            <h6 class="title-section semi-bold  text-black">{{results.categorySection[0].title}}</h6>
         </header>
         <!-- complexy categorie-->
         <section class="grid grid-cols-1 md:grid-cols-4  gap-4" :key="index">
            <!-- BIG ONE -->
         
                    <template v-for="box in catSection.boxes" >
                       <nuxt-link :to="`/produits/categorie/${box.category.slug}`" v-if="box.main===true" :key="box._id" class=" bg-white rounded-md px-4 py-4  row-span-2 text-black ">
                        <header class="section-heading heading-line is-size-4 is-size-4-mobile flex justify-between m-0">
                          <h6 class="title-section bold pb-2 ">{{box.category.name}}</h6>
                        </header>
                           <div class="grid grid-cols-2 gap-4">
               <div v-for="(product,index) in  box.products" :key="index" class="h-32 rounded-md home-cat-img-wrapper " :style="`background-image: url(${getStorageUrl()+'storage/'+product.images[0]['filename']});`">
                            <picture class="img-bg">
                              <source type="image/webp" :srcset="`${getStorageUrl()+'storage/'+product.images[0]['filename']}`">
                            </picture>
                         </div>
                        </div>
                      </nuxt-link >

                         <nuxt-link :to="`/produits/categorie/${box.category.slug}`" v-else :key="box._id"  class="  bg-white rounded-md px-4 py-4  h-52 text-black ">
                      <!-- TITLE -->
                        <header class="section-heading heading-line is-size-6 is-size-6-mobile flex justify-between m-0">
                          <h6 class="title-section bold pb-2">{{box.category.name}}</h6>
                        </header>
                      <!-- CONTENT -->

                        <div class="grid grid-cols-2 gap-4">
                          <div v-for="product in limitProductInCategorie(box)" :key="product._id" class="h-32 rounded-md home-cat-img-wrapper " :style="`background-image: url(${getStorageUrl()+'storage/'+product.images[0]['filename']});`">
                            <picture class="img-bg">
                              <source type="image/webp" :srcset="`${getStorageUrl()+'storage/'+product.images[0]['filename']}`">
                            </picture>
                         </div>
                      
                        </div> 
                       <!-- CONTENT -->
                     </nuxt-link>
                    </template>
               
            <!-- END LITTLE ONE -->
         </section>
         <br>
        </template>


 
         <header class="section-heading md:mt-7 md:mb-4  heading-line is-size-4 is-size-5-mobile   hidden md:flex justify-center   ">
            <h6 class="title-section semi-bold text-black ">Plus de produits</h6>
         </header>
         <header class="section-heading mb-2 mt-7 heading-line is-size-4 is-size-5-mobile  block md:hidden    ">
            <h6 class="title-section semi-bold mb-1 text-black mx-2">Plus de produits</h6>
         </header>
         <section class="mx-2">
            <ul class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 md:gap-3 sgrid-x bordbered-cell sgrid-margin-x sgrid-margin-y">
               <li v-for="(product, index) of results.sections" v-bind:key="index" class="ssmall-6 slarge-2 smedium-4 scell">
                  <ProductCard @addToCart="addProductToCart({product: product, quantityToBeAdd: 1})" :product="product"/>
               </li>
               <div class="xsmall-12 xcell">
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
                        <span class="sr-only bg-cac-500" v-if="isLoading"> en chargement...</span>
                     </template>
                  </infinite-scroll>
               </div>
            </ul>
         </section>
      </div>
   </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import HomeExpoSmall from '../components/HomeExpoSmall.vue';
export default {
  components: { HomeExpoSmall },
  auth: false,
  layout: "other",
  async asyncData({ $axios, store }) {
    const results = {
      sections: [],
      superPromos: [],
      categoriesSections:[],
      paginations: {},
      banners: [],
    };

    try {
    //await store.dispatch('cart/getMenuAction')
      const [sections, superPromos, banners, categorySection] = await Promise.all([
        await $axios.get("/product"),
        await $axios.get(`/product?page=${Math.random() * (20 - 3) + 3}`),
       // await $axios.get("/product_category/menu"),
        await $axios.get("/banner?type=BIG"),
        await $axios.get("/category-section"),
 
       // await $axios.get("/sections-home"),
        
        
       // await $axios.get("menu"),
      ]);
      // console.log(sections);
      results.sections = sections.data.data.products;
      results.superPromos = superPromos.data.data.products;
 
      results.banners = banners.data.data;
      results.pagination= sections.data.data.pagination
      results.categorySection = categorySection.data.data

       
      //results.menus = menu.data;
    } catch (e) {
      console.log(e);
    }

    return {
      results,
    };
  },
  data() {
    return {
      products:[],
        loading: true,
      enough: false,
       isLoading: false,
    }
  },
computed: {
    ...mapGetters({
 
      getAppMenu:"cart/getAppMenu"
    }),
},
  methods:  {
 
    getStorageUrl(){
      return process.env.APP_ENV==="DEV"? 'http://localhost:3000/' : process.env.API_URL+'/';
     
  },
//**FETCHED WHEN USER SCROLL DOWN **// 
    async loadMore() {
      const params = this.$route.params;
      const query = this.$route.query;
 
      
      
      try {
        if (this.isLoading === false && this.results.pagination.hasNextPage) {
          this.isLoading = true
          this.$nuxt.$loading.start()

          let {
            data,
            status
          } = await this.$axios.get(
            //`/product?${this.$formatUrlFromQuery(query, params)}&page=${this.pagination.nextPage}`
            `/product?page=${this.results.pagination.nextPage}`
          );


          if (status === 200) {
            this.results.sections = this.results.sections.concat(data.data.products);
           
     
            this.results.pagination = data.data.pagination;

            //this.filteredProducts = this.products

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

        limitProductInCategorie(box){
        
     
            
      
          if (box.main===false){
         
            return box.products.slice(0,2);
             
          } else{
          return box.products;
          }
       
     
    }
  },

 
};
</script>

<style lang="scss" scoped>
@import "assets/sass/partials/global.scss";
.banner-section{

 

    @include breakpoint(laptop) {
      //min-height: 23rem;
      height: 36vw;
max-height: 511px;
overflow: hidden;
    }
    .home-sections{
    margin-top: 0px;
    }
.menu-container{
      max-height: 475.2px;
       @media only screen and (max-width: 1407px) {
        max-height: 410.2px;
       }
              @media only screen and (max-width: 1215px) {
        max-height: 343.2px;
       }
}
}

.home-cat-img-wrapper{
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
}
     ul {
        a.nav-sub-menu-title {
          text-transform: uppercase;
          box-shadow: none !important;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          color: $primary-color !important;
          padding: 0;
          font-size: 14px !important;
          line-height: 20px;
          font-weight: 500;

          &:hover {
            text-decoration: underline;
          }
        }

        li{
          display: inline-flex;
          flex-direction: column;
          
          a.dropDown-menu-link {
            color: $the-black;
            box-shadow: none !important;
            font-weight: 400;
            //padding: 0 0 15px 0px;
            padding: 5px 0px !important;
            display: inline-block;
            font-size:13px;

            &:hover {
              background: none !important;
              color: $primary-color;
            }
          }
        }
      }
 
 
 
 
 
    li.left-menu-element {


      // position: relative;

      &:hover {
        .dropDown-menu_wrapper {
          opacity: 1;
          transform: translatex(40px);
          pointer-events: all;
        }
      }

      .dropDown-menu_wrapper {
        transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        z-index: 99;
        padding-top: 10px;
        opacity: 0;
        transform: translatex(-10px);
        position: absolute;
        left: 238px;
        width: 85%;
        //width: 135%;
        top:0;
        pointer-events: none;

        .dropDown-menu {
          opacity: 1;
          padding: 25px;
          background: white;
          // border-radius: 5px;
          box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.1);
          //box-shadow: 0 6px 31px -2px rgba(0, 0, 0, 0.1);
        //  border-bottom: 1px solid $secondary-color;
          align-items: flex-start;
          // margin-top: 10px;
          /* .dropDown-menu-link{
padding: 0;
}
*/
        }
      }
    }

.home-container{
  background-color: #F0F0F0;
padding-bottom: 119px;
}

.juice {
  background-image: url("https://i.ibb.co/4R1Gmtx/Slide-clim.jpg");
  //background-image: url("https://i.ibb.co/SN2Sp4T/juice.png");
}

.juice2 {
  background-image: url("https://i.ibb.co/yyMXMSF/juice2.png");
}

.juice3 {
  z-index: 10;
  position: relative;
}

.juice3::after {
  content: "";
  position: absolute;
  opacity: 0.2;
  z-index: -999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  //background-image: url("https://previews.123rf.com/images/olgasiv/olgasiv1403/olgasiv140300026/27343111-image-en-noir-sur-un-fond-blanc-dessin-de-l%C3%A9gumes-de-fruits-et-de-baies-.jpg");
}

.text-primary {
  color: #22B48C;
}

.text-primary-lite {
  color: #22B48C;
}

.text-secondary {
  color: #294356;
}

.text-secondary-lite {
  color: #d5dee5;
}

.bg-primary {
  background-color: #22B48C;
}

.bg-primary-lite {
  background-color: #22B48C;
}

.bg-secondary {
  background-color: #294356;
}

.bg-secondary-lite {
  background-color: #d5dee5;
}

.product {
  background-image: url("https://i.ibb.co/hgTD0WB/Banners-1-sur-2-sous-slider.webp");
}
.product2 {
  background-image: url("https://i.ibb.co/1fZMKPh/2021-11-07-14h08-07.png");
}
.product3 {
  background-image: url("https://i.ibb.co/f9tpvV3/2021-11-07-14h08-32.png");
}
.product4 {
  background-image: url("https://i.ibb.co/42BsKQ2/2021-11-07-14h08-17.png");
}
</style>
