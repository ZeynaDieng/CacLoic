<template>
  <header class="myHeader">
    <section id="top-nav" class="show-for-large">
      <div class="grid-container">
        <div class="grid-x">
          <div class="small-12 medium-2 cell logo-container">
            <NuxtLink to="/">
              <img src="@/assets/images/logo.png" alt/>
            </NuxtLink>
          </div>
          <div class="small-12 medium-10 large-6 cell">
            <form class="search home-search">
              <b-field>
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
                        <span class="text-2xl font-semibold">
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
            <ul class="menu company-extra-menu">
              <li class="st-menu-item">
                <NuxtLink to="/articles">Blog</NuxtLink>
              </li>
              <li class="st-menu-item">
                <NuxtLink to="/showrooms">Showrooms</NuxtLink>
              </li>
              <li class="st-menu-item">
                <NuxtLink to="/nos-marques">Nos marques</NuxtLink>
              </li>
              <li class="st-menu-item">
                <NuxtLink to="/service-client">Service Client</NuxtLink>
              </li>
              <li class="st-menu-item">
                <NuxtLink to="/contact">Contact</NuxtLink>
              </li>
              <li class="st-menu-item">
                <NuxtLink to="/a-propos">A propos</NuxtLink>
              </li>
            </ul>
          </div>

          <div class="show-for-large small-4 large-4 cell">
            <div class="widgets-wrap user-actions float-right">
              <div class="widget-header mr-3">
                <NuxtLink
                  class="icon-sm bordered-circle border"
                  style="margin-right: 11px"
                  to="/panier"
                >
                  <b-icon icon="cart" size="is-small"></b-icon>
                </NuxtLink>
                <span class="badge badge-pill badge-danger notify">{{ totalItems }}</span>
              </div>
              <div class="widget-header icontext">
                <NuxtLink
                  class="icon-sm bordered-circle border"
                  style="margin-right: 11px"
                  to="/compte/infos"
                >
                  <b-icon icon="account" size="is-small"></b-icon>
                </NuxtLink>

                <div class="text">
                  <span class="grey-text">Bienvenue!</span>
                  <div v-if="isAuthenticated">
                    {{ loggedInUser.firstName }} {{ loggedInUser.lastName }}
                  </div>
                  <div v-else>
                    <NuxtLink to="/login">Connexion</NuxtLink>
                    |
                    <NuxtLink to="/register">Inscription</NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <AppMobileNav :get-async-data="getSearchPrediction"
                  :is-fetching="isFetching"
                  :data="predictions"
                  :get-more-async-data="getMoreSearchPrediction"
                  :menus="menus"
                  :do-search="doSearch"
                  :cartCount="totalItems"/>
    <!-- main nav bar -->
    <section id="main-nav" class="show-for-large">
      <div class="grid-container">
        <div class="grid-x">
          <nav class="hover-underline-menu" data-menu-underline-from-center>
            <ul class="menu align-center" v-if="!$fetchState.pending">
              <!-- DROPDOWN -->
              <li
                v-for="menu of menus"
                class="menu-btn menu-item"
                @mouseover="showDropdown"
                :key="menu._id"
              >
                <NuxtLink
                  class="waves-effect menu-item"
                  :to="`/produits/categorie/${menu.slug}`"
                >{{ menu.name }}
                </NuxtLink>
                <div class="dropDown-menu_wrapper">
                  <ul class="dropDown-menu grid-x grid-margin-x grid-margin-y">
                    <!-- submenu -->
                    <li
                      class="small-2 cell"
                      v-for="title of menu.children"
                      :key="title._id"
                    >
                      <!-- SUBMENU TITLE -->
                      <NuxtLink
                        class="is-size-6 nav-sub-menu-title"
                        :to="`/produits/categorie/${title.slug}`"
                      >{{ title.name }}
                      </NuxtLink>
                      <!-- LIST OF SUBMENU CONTENT -->

                      <NuxtLink
                        v-for="category of title.children"
                        class="dropDown-menu-link"
                        :to="`/produits/categorie/${category.slug}`"
                        :key="category._id"
                      >{{ category.name | capitalize }}
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
    <!--      <section class="static-menu show-for-large" >
           <div class="grid-container align-center">
             <div class="grid-x align-center">
               <ul class="menu">
                 <li class="st-menu-item"><NuxtLink to="">Blog</NuxtLink></li>
                 <li class="st-menu-item"><NuxtLink to="">Service Aprés-vente</NuxtLink></li>
               </ul>
             </div>
           </div>
         </section> -->
  </header>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
// import AppIconButton from "@/components/AppIconButton.vue";
import debounce from "lodash/debounce";

//import M from "materialize-css"

export default {
  middleware: 'auth',
  name: "AppHeader",
  components: {
    // AppIconButton,
  },
  props: {
    cartEmpty: {
      type: Boolean,
      default: true,
    },
  },
  async created() {
    this.getMenu();
  },
  beforeMount() {
    this.getSearchPublicKey();
  },
  fetchKey: 'site-header',
  async fetch() {
    await this.getMenu();

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
  data() {
    return {
      menus: [],
      predictions: [],
      selected: null,
      isFetching: false,
      searchTerm: "",
      page: 1,
      totalPages: 1,
      searchPublicKey: "",
    };
  },
  methods: {
    ...mapActions({
      setCart: "cart/setCart",
    }),
    doSearch() {
      console.log('pressed')
      this.$router.push(`/produits/rechercher/produit?term=${this.searchTerm}`)
    },
    async getSearchPublicKey() {
      const {data, status} = await this.$axios.get(
        "product/search_public_key"
      );

      if (status === 200) {
        this.searchPublicKey = data;
      }
    },
    showDropdown(event) {
      event.preventDefault();
      if (event.target.parentNode)
        if (event.target.parentNode.childNodes.length >= 3)
          if (
            event.target.parentNode.childNodes[2].className ===
            "dropDown-menu_wrapper"
          ) {
            event.target.parentNode.childNodes[2].style.display = "block";
          }
    },
    async getMenu() {
      try {
        const {data} = await this.$axios.get("product_category/menu");

        if (data) {
          this.menus = data;
        }
      } catch (e) {
        console.error(e)
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
            "X-Meili-API-Key": this.searchPublicKey,
          },
        })
        .then(({data}) => {
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
  },
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
    }),
  },
  watch: {
    $route() {
      if (this.predictions.length){
        this.predictions = [];
      }

      const dropdowns = document.querySelectorAll(".dropDown-menu_wrapper");

      dropdowns.forEach((dropdown) => {
        if (dropdown.style.display !== "none") {
          dropdown.style.display = "none";
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/sass/partials/global.scss";

$menu-underline-from-center-bg: #2c3840;
$menu-underline-from-center-border-thickness: calculateRem(5px);

.nav-sub-menu-title {
  font-weight: 600;
}

.static-menu {
  background-color: white;
  border-bottom: 1px solid #ddd;

  box-shadow: 0 1px 1px rgb(0 0 0 / 10%);

  .st-menu-item {
    a {
      color: black;
      //color: $the-black;
      font-size: 12px;
      text-transform: uppercase;
    }
  }
}

.company-extra-menu {
  margin-top: 12px;

  .st-menu-item {
    a {
      font-weight: 600;
      color: black;
      //color: $the-black;
      font-size: 12px;
      text-transform: uppercase;
      // padding-right: 5px;
      &:nth-child(1) {
        padding-left: 0px;
      }
    }
  }
}

.bordered-circle {
  border: 1px solid #9e9e9e;
}

.hover-underline-menu {
  width: 100%;

  .menu {
    //  background-color: red;
    // padding-left: 11vw;

    @media only screen and (min-width: 1023px) and (max-width: 1274px) {
      padding-left: 0;
    }

    a.menu-item {
      display: block;
      color: white;
      padding: 1.8rem 1.5rem;
      text-transform: uppercase;
      font-weight: 300;
    }

    li {
      // position: relative;

      &:hover {
        .dropDown-menu_wrapper {
          opacity: 1;
          transform: translateY(40px);
          pointer-events: all;
        }
      }

      .dropDown-menu_wrapper {
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        z-index: 12;
        padding-top: 10px;
        opacity: 0;
        transform: translateY(-10px);
        position: absolute;
        left: 0;
        width: 100%;
        //width: 135%;
        pointer-events: none;

        .dropDown-menu {
          opacity: 1;
          padding: 25px;
          background: white;
          // border-radius: 5px;
          box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.1);
          //box-shadow: 0 6px 31px -2px rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid $secondary-color;
          align-items: flex-start;
          // margin-top: 10px;
          /* .dropDown-menu-link{
padding: 0;
}
*/
        }
      }
    }

    li.active a.menu-item {
      background-color: $secondary-color;
    }

    .underline-from-center {
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: calc(100% - #{$menu-underline-from-center-border-thickness});
        border-bottom: $menu-underline-from-center-border-thickness solid $secondary-color;
        left: 50%;
        right: 50%;
        transition: all 0.5s ease;
      }

      &:hover::after {
        left: 0;
        right: 0;
        transition: all 0.3s ease;
      }
    }
  }
}

header.myHeader {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 15; //120
}

#top-nav {
  background: white;

  .menu {
    li {
      margin: 3px;

      a {
        color: $the-black;

        i.chevron {
          font-size: 10px;
        }
      }
    }
  }

  .top-nav-right {
    li {
      display: flex;
      align-items: center;
    }

    li.header-cart {
      a.app-icon-button {
        display: flex;
        align-items: center;

        .cart-text {
          margin-left: 5px !important;

          .cart-title {
            font-weight: 600;
          }

          .item-count {
            margin-top: 5px;
            font-size: 13px;
            color: $the-dark-grey;
          }
        }
      }

      span {
        display: block;
      }
    }
  }

  .logo-container {
    padding: 13px 0 15px 0;
    text-align: center;

    img {
      width: 75%;
    }
  }
}

.home-search {
  margin-top: 15px;
}

.user-actions {
  margin-top: 15px;
}

#main-nav {
  //border: 1px solid $primary-color;
  background: $primary-color;

  .menu {
    li.menu-item {
      //margin: 15px;
      a {
        //padding: 20px;
        color: white;
        transition: all 0.2s ease-in-out;
        // text-transform: uppercase;
        font-size: 13px; //14px;
        padding: 20px 7.5px;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1) !important;
        font-weight: 600;

        &:hover {
          background: white;
          color: $primary-color;
        }
      }

      ul {
        a.nav-sub-menu-title {
          text-transform: uppercase;
          box-shadow: none !important;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          color: $primary-color !important;
          padding: 0;
          font-size: 16px !important;
          line-height: 24px;
          font-weight: 500;

          &:hover {
            text-decoration: underline;
          }
        }

        li {
          display: inline-flex;
          flex-direction: column;

          a.dropDown-menu-link {
            color: $the-black;
            box-shadow: none !important;
            font-weight: 400;
            //padding: 0 0 15px 0px;
            padding: 5px 0px !important;
            display: inline-block;

            &:hover {
              background: none !important;
              color: $primary-color;
            }
          }
        }
      }
    }
  }
}
</style>