<template>
   <header class="sticky top-0 z-50 bg-white shadow-lbg md:px-0  ">
      <AppTopHeader/>
      <div class="container mx-auto px-0 py-4   items-center hidden md:flex">
         <!-- logo -->
         <div class="mr-auto md:40 flex-shrink-0">
            <nuxt-link to="/"> <img
               class="h-8 md:h-10"
               src="@/assets/images/logo.webp"
               alt="Cac sénégal. (logo)"
               /></nuxt-link>
         </div>
         <!-- search -->
         <div
            class="
            w-full
            max-w-xs
            xl:max-w-lg
            2xl:max-w-2xl
            bg-gray-100
            rounded-md
            hidden
            lg:flex
            items-center
            "
            >
            <!--         <select
               id=""
               class="border-0 bg-transparent  font-bold text-sm p-4 mr-4"
               name=""
               >
               <option>Toutes les catégories</option>
               </select> -->
            <!--   border-l border-gray-300 -->
            <form class="search home-search block w-full">
               <b-field >
                  <b-autocomplete
                  @keyup.enter.native="doSearch"
                  icon-right="magnify"
                  :data="predictions"
                  :ellipsis="true"
                  placeholder="Rechercher..."
                  field="title"
                  :loading="isFetching"
                  @typing="getSearchPrediction"
                  v-model="searchTerm"
                  @select="(option) => $router.push(`/produits/${option.slug}`)"
                  expanded
                  >
                  <template slot-scope="props">
                     <div class="media">
                        <div class="media-left">
                           <img width="32" :src="`${props.option.image}`"/>
                        </div>
                        <div class="media-content">
                           <span class="text-md text-cac-500 font-semibold">
                           {{ props.option.name }}</span>
                           <br/>
                           <small>
                              <b>{{ props.option.price | currency }}</b>
                              <b-taglist class="is-justify-content-flex-end">
                                 <b-tag
                                    type="is-primary is-capitalized"
                                    v-for="(
                                    category, index
                                    ) in props.option.categories.slice(0, 4)"
                                    :key="index"
                                    >{{ category }}
                                 </b-tag>
                              </b-taglist>
                           </small>
                        </div>
                     </div>
                  </template>
                  </b-autocomplete>
               </b-field>
            </form>
            <!--        <input
               class="
                w-full
                outline-0
                border-0
                
                 bg-transparent
                 font-semibold
                 text-sm
                 pl-4
               "
               type="text"
               placeholder="Recherche ..."
               />
               <svg
               class="
                 ml-auto
                 h-5
                 px-4
                 text-gray-500
                 svg-inline--fa
                 fa-search fa-w-16 fa-9x
               "
               aria-hidden="true"
               focusable="false"
               data-prefix="far"
               data-icon="search"
               role="img"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 512 512"
               >
               <path
                 fill="currentColor"
                 d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
               />
               </svg> -->
         </div>
         <!-- phone number -->
         <div class="ml-auto md:w-48 hidden sm:flex flex-col place-items-end">
            <span class="font-bold md:text-md">+221 77 426 35 35</span>
            <span class="font-semibold text-sm text-gray-400"
               >Support 24/7</span
               >
         </div>
         <!-- buttons -->
         <nav class="contents">
            <ul class="ml-4 xl:w-48 flex items-center justify-end">
               <li class="ml-2 lg:ml-4 relative inline-block">
                  <nuxt-link class="" to="/compte/infos">
                     <svg
                        class="
                        h-9
                        lg:h-10
                        p-2
                        text-gray-500
                        svg-inline--fa
                        fa-user fa-w-14 fa-9x
                        "
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="far"
                        data-icon="user"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        >
                        <path
                           fill="currentColor"
                           d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"
                           />
                     </svg>
                  </nuxt-link>
               </li>
               <!--         <li class="ml-2 lg:ml-4 relative inline-block">
                  <a class="" href="">
                    <div
                      class="
                        absolute
                        -top-1
                        right-0
                        z-10
                        bg-cac-500
                        text-xs
                        font-bold
                        px-1
                        py-0.5
                        rounded-sm
                        text-black
                      "
                    >
                      3
                    </div>
                    <svg
                      class="
                        h-9
                        lg:h-10
                        p-2
                        text-gray-500
                        svg-inline--fa
                        fa-heart fa-w-16 fa-9x
                      "
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="heart"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
                      />
                    </svg>
                  </a>
                  </li> -->
               <li class="ml-2 lg:ml-4 relative inline-block">
                  <nuxt-link class="" to="/panier">
                     <div
                        class="
                        absolute
                        -top-1
                        right-0
                        z-10
                        bg-cac-500
                        text-xs
                        font-bold
                        px-1
                        py-0.5
                        rounded-sm
                        text-black
                        "
                        >
                        {{ totalItems }}
                     </div>
                     <svg
                        class="
                        h-9
                        lg:h-10
                        p-2
                        text-gray-500
                        svg-inline--fa
                        fa-shopping-cart fa-w-18 fa-9x
                        "
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="far"
                        data-icon="shopping-cart"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        >
                        <path
                           fill="currentColor"
                           d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"
                           />
                     </svg>
                  </nuxt-link>
               </li>
            </ul>
         </nav>
         <!-- cart count -->
         <div class="ml-4 hidden sm:flex flex-col font-bold">
            <span class="text-xs text-gray-400">Panier</span>
            <span class="text-sm">CFA {{total}}</span>
         </div>
      </div>
      <app-mobile-nav :cartCount="totalItems" :get-more-async-data="getMoreSearchPrediction" :menus="menus" :getAsyncData="getSearchPrediction" @doSearch="doMobileSearch" ></app-mobile-nav>
      <hr class="m-0 hidden md:block"/>
      <!-- header navigation -->
      <div class="container mx-auto  grid-cols-4 gap-4 lg:grid hidden relative items-center">
         <!-- cta -->
        <div class=" relative floating-menu_wrapper ">
         <button
            class="
            peer
            w-full
            bg-cac-500
            hover:bg-white
            hover:text-cac-500
            hover:border-opacity-100
            border-opacity-0
            border-2
            font-bold
            uppercase
            px-4
            xl:px-6
            py-2
            xl:py-3
            flex-shrink-0 flex
            items-center
            text-white
            "
            >
            <svg
               class="h-8 p-1 svg-inline--fa fa-bars fa-w-14 fa-9x"
               aria-hidden="true"
               focusable="false"
               data-prefix="fal"
               data-icon="bars"
               role="img"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 448 512"
               >
               <path
                  fill="currentColor"
                  d="M442 114H6a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6z"
                  class=""
                  />
            </svg>
            <span class="ml-4">Catégorie</span>
         </button>
             <!-- the menu here -->
            <div  class=" h-full w-full shadow-md  absolute  bg-white pt-2 py-2 border-l-2 border-cac-500   overflow-y-scroll overflow-x-hidden hidden lg:block menu-container floating-menu ">
               <ul  class="flex  flex-col w-full left-menu    ">
                  <li  v-for="(category, index) of getAppMenu" :key="index" class="mx-4 left-menu-element ">
                     <dl>
                        <dt class="category-name">
                           <nuxt-link :to="`/produits/categorie/${category.slug}`" class="flex flex-row items-center py-1 px-4  rounded-md text-gray-800 hover:text-cac-800 hover:bg-cac-200">
                              <span class="ml-3">{{category.name}}</span>
                           </nuxt-link>
                        </dt>
                        <!-- grid-x grid-margin-x grid-margin-y -->
                        <dd v-if="1+1==9" class="dropDown-menu_wrapper "  style="display: block;">
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
           </div>
         <!-- menu -->
         <nav class="hidvden xl:contents col-span-3 ml-8">
            <ul class="flex items-center text-sm font-bold">
               <li class="">
                  <nuxt-link class="px-2 lg:px-3 flex items-center" to="/produits/categorie/cuisine">
                     <svg
                        class="
                        h-7
                        lg:h-8
                        p-2
                        flex-shrink-0
                        svg-inline--fa
                        fa-tag fa-w-16 fa-9x
                        "
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="far"
                        data-icon="tag"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        >
                        <path
                           fill="currentColor"
                           d="M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v204.118a47.998 47.998 0 0 0 14.059 33.941l211.882 211.882c18.745 18.745 49.137 18.746 67.882 0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zM259.886 463.996L48 252.118V48h204.118L464 259.882 259.886 463.996zM192 144c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48z"
                           />
                     </svg>
                     <span class="truncate max-w-24">Boutique</span>
                  </nuxt-link>
               </li>
               
               <!-- 
               <li class="">
                  <nuxt-link to="/produits/categorie/promo" class="px-2 lg:px-3 flex items-center">
                     <svg
                        class="
                        h-7
                        lg:h-8
                        p-2
                        flex-shrink-0
                        svg-inline--fa
                        fa-bolt fa-w-12 fa-9x
                        "
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="far"
                        data-icon="bolt"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        >
                        <path
                           fill="currentColor"
                           d="M377.8 167.9c-8.2-14.3-23.1-22.9-39.6-22.9h-94.4l28.7-87.5c3.7-13.8.8-28.3-7.9-39.7C255.8 6.5 242.5 0 228.2 0H97.7C74.9 0 55.4 17.1 52.9 37.1L.5 249.3c-1.9 13.8 2.2 27.7 11.3 38.2C20.9 298 34.1 304 48 304h98.1l-34.9 151.7c-3.2 13.7-.1 27.9 8.6 38.9 8.7 11.1 21.8 17.4 35.9 17.4 16.3 0 31.5-8.8 38.8-21.6l183.2-276.7c8.4-14.3 8.4-31.5.1-45.8zM160.1 457.4L206.4 256H47.5L97.7 48l127.6-.9L177.5 193H334L160.1 457.4z"
                           />
                     </svg>
                     <span class="truncate max-w-24">Ventes Flash</span>
                  </nuxt-link>
               </li> -->
<!--                <li class="px-2 lg:px-3  items-center">
                  <nuxt-link to="/nos-marques" class="px-2 lg:px-3 flex items-center">
                     <span class="truncate max-w-24">Nos marques</span>
                  </nuxt-link>
               
               </li> -->
               <li class="px-2 lg:px-3  items-center">
                  <nuxt-link to="/contact" class="px-2 lg:px-3 flex items-center">
                     <span class="truncate max-w-24">Contact</span>
                  </nuxt-link>
    
               </li>
                 <li class="">
                  <nuxt-link class="px-2 lg:px-3 flex items-center" to="/faq">
                     <svg
                        class="
                        h-7
                        lg:h-8
                        p-2
                        flex-shrink-0
                        svg-inline--fa
                        fa-tag fa-w-16 fa-9xa
                        "
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="far"
                        data-icon="tag"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        >
                        <path
                           fill="currentColor"
                           d="M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v204.118a47.998 47.998 0 0 0 14.059 33.941l211.882 211.882c18.745 18.745 49.137 18.746 67.882 0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zM259.886 463.996L48 252.118V48h204.118L464 259.882 259.886 463.996zM192 144c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48z"
                           />
                     </svg>
                     <span class="truncate max-w-24">FAQ</span>
                  </nuxt-link>
               </li>
            </ul>
         </nav>
      </div>
   </header>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import debounce from "lodash/debounce";
    export default {
    name: "AppHeader",
      fetchKey: 'site-header',
      async fetch() {
 //await this.getAppMenuAction();
    if (this.$auth.loggedIn && this.$store.getters.loggedInUser.cart) {
      this.setCart({
        items: this.$store.getters.loggedInUser.cart.items.map(
          ({product, quantity}) => {
            return {
              item: product,
              quantity,
            };
          }
        ),
      });
    }
  },
data(){
 return {
      menus: [],
      results: [],
      predictions: [],
      selected: null,
      isFetching: false,
      searchTerm: "",
      page: 1,
      totalPages: 1,
      searchPublicKey: "",
    };
},  beforeMount() {


    this.getSearchPublicKey();
  },  
  created() {
  
   // this.getMenu();
  },
 
   watch: {
    $route() {
      if (this.predictions.length){
        this.predictions = [];
      }
/* 
      const dropdowns = document.querySelectorAll(".dropDown-menu_wrapper");

      dropdowns.forEach((dropdown) => {
        if (dropdown.style.display !== "none") {
          dropdown.style.display = "none";
        }
      }); */
    },
  },
  mounted() {

 this.cartItems.forEach(item => {

       this.$store.dispatch("cart/updatedCartItemPrice", { id: item._id });
   // this.$store.commit('UPDATE_CART_ITEM_PRICE', { id: item._id });
  }); 
  
  },
     methods: {
      async getMenu () {
   try {
                const { status, data } = await this.$axios.get("/product_category/menu");
                if (status === 200) {
             
                       this.results = data.data;
                       console.log(this.results);
                       
                
         
                }  

            } catch (error) {
                    console.log('error', {...error.response});                               
                        if(error?.response){

                        for(var i=0; i<error.response.data.message.length; i++){
                                                               this.$buefy.toast.open({
          duration: 5000,
          message: `${error.response.data.message[i]}`,
          position: "is-bottom-right",
          type: "is-warning"
        });
                        }


                        }else{
                                this.$buefy.toast.open({
          duration: 5000,
          message: `${error}`,
          position: "is-bottom-right",
          type: "is-danger"
        });
                          
                        }
            }
    

    },

         doSearch(mobileSearchTerm) {

    console.log('pressed')
    console.log(mobileSearchTerm);
   
          this.$router.push(`/produits/rechercher/produit?term=${this.searchTerm}`)
   

    },

         doMobileSearch(mobileSearchTerm) {

    console.log('pressed')
    console.log(mobileSearchTerm);
             this.$router.push(`/produits/rechercher/produit?term=${mobileSearchTerm}`)

    },
               async getSearchPublicKey() {
      const {data, status} = await this.$axios.get(
        "product/search_public_key"
      );

      if (status === 200) {
      //console.log(data);
      
        this.searchPublicKey = data.key;
      }
    },
        getSearchPrediction: debounce(function (name) {
      // String update
      if (this.searchTerm !== name || !name.length) {
        this.searchTerm = name;
        this.data = [];
        this.page = 1;
        this.totalPages = 1;
 
      }

      // Reached last page
      if (this.page > this.totalPages) {
        return;
      }
      this.isFetching = true;

      this.$search
        .get(`/indexes/products/search?q=${this.searchTerm}`, {
          headers: {
            "Authorization": `Bearer ${this.searchPublicKey}`,
          },
        })
        .then(({data}) => {
        this.predictions=[];
          data.hits.forEach((item) => this.predictions.push(item));
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          this.isFetching = false;
        });
    }, 500),
    getMoreSearchPrediction: debounce(function () {
      this.getSearchPrediction(this.searchTerm);
    }, 250),
    ...mapActions({
      setCart: "cart/setCart",
            getAppMenuAction:"cart/getMenuAction"
    }),},
     computed: {
    count() {
      return this.totalItems;
    },
    ...mapGetters({
      currentCurrency: "currency/currentCurrency",
      authStatus: "authStatus",
      cartItems: "cart/cartItems",
      total: "cart/cartTotalPrice",
      totalItems: "cart/cartTotalItems",
      isAuthenticated: "isAuthenticated",
      loggedInUser: "loggedInUser",
            getAppMenu:"cart/getAppMenu" 
    }),

    
  },
    }
</script>

<style lang="scss" scoped>
@import "assets/sass/partials/global.scss";
.banner-section{

.menu-container{
      max-height: 475.2px;
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
 
 
 .floating-menu_wrapper{
  .floating-menu{
     opacity: 0;
     //display:none;
         transform: translatey(-10px);
         transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
 &:hover {
 
 .floating-menu{
     transform: translatey(0px);
      opacity: 1;
      display:block;
       height: 470px;
 }
 }
 }
 
 
    li.left-menu-element {


      // position: relative;

      &:hover {
        .dropDown-menu_wrapper {
          opacity: 1;
      
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
