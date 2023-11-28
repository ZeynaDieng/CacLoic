<template>
  <section class="mobile-nav-wrapper md:hidden pb-4">
    <b-sidebar
      type="is-light"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      v-model="open"
    >
      <b-menu class="p-2">
        <b-menu-list label="Menu">
          <b-menu-item
            label="Accueil"
            to="/"
            tag="nuxt-link"
            @click.native="open = false"
          ></b-menu-item>
 

 
          <b-menu-item
            label="Contact"
            to="/contact"
            tag="nuxt-link"
            @click.native="open = false"
          ></b-menu-item>
 
          <b-menu-item
            :label="`Mon panier (` + cartCount + `)`"
            to="/panier"
            tag="nuxt-link"
            @click.native="open = false"
          ></b-menu-item>
        </b-menu-list>
      </b-menu>

      <div class="p-2">
        <h3
          style="
            color: #7a7a7a;
            font-size: 0.75em;
            letter-spacing: 0.1em;
            text-transform: uppercase;
          "
        >
          Catégories
        </h3>

        <b-collapse
          class=""
          animation="slide"
          v-for="(menu, index) of getAppMenu"
          :key="Math.random()+menu._id"
          :open="isOpen == index"
          @open="isOpen = index"
        >
          <template #trigger="props">
            <div class="card-header first-level-menu" role="button">

              <p class="card-header-title">
                <NuxtLink  :to="`/produits/categorie/${menu.slug}`" class="card-header-title">
                {{ menu.name }}
                        </NuxtLink>
              </p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
              </a>
            </div>
          </template>
          <div class="card-content second-level-card-content">
            <div class="content">
              <b-collapse
                class=""
                animation="slide"
                v-for="(title, index) of menu.children"
                :key="Math.random()+title._id"
                :open="isSubMenuOpen == index"
                @open="isSubMenuOpen = index"
              >
                <template #trigger="props">
                  <div class="card-header second-level-menu" role="button">
                    <NuxtLink  :to="`/produits/categorie/${title.slug}`" class="card-header-title">
                   <!--    {{ title.name | capitalize }} -->{{title.name }}
                    </NuxtLink>
                    <a class="card-header-icon">
                      <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                      </b-icon>
                    </a>
                  </div>
                </template>
                <div class="card-content categories-list">
                  <div class="content">
                    <NuxtLink
                      v-for="category of title.children"
                      class="dropDown-menu-link"
                      @click.native="open = false"
                      :to="`/produits/categorie/${category.slug}`"
                      :key="Math.random()+category._id"
                      >{{ category.name }}
                    </NuxtLink>
                  </div>
                </div>
              </b-collapse>
            </div>
          </div>
        </b-collapse>
        <!--      <div class="cell small-12">
          <form action="#" class="search home-search">
            <b-field>
              <b-autocomplete
                icon-right="magnify"
                :data="data"
                :ellipsis="true"
                placeholder="Rechercher..."
                field="title"
                :loading="isFetching"
                @typing="getAsyncData"
                @select="(option) => $router.push(`/produits/${option.slug}`)"
                expanded
              >
                <template slot-scope="props">
                  <div class="media">
                    <div class="media-left">
                      <img width="32" :src="`${props.option.image}`" />
                    </div>
                    <div class="media-content" style="overflow-y: hidden">
                      <span class="text-2xl font-semibold">
                        {{ props.option.name }}</span
                      >
                      <br />
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
        </div> -->
      </div>
    </b-sidebar>
    <!-- ooooooooooooooooooo -->

    <div class="container mx-auto px-0 py-4 flex items-center">
      <!-- logo -->
      <div class="mr-auto md:40 flex flex-shrink-0 flex-row">
        <b-button
          icon-left="menu"
          @click="open = true"
          class="hamburger-menu sidenav-trigger"
          type="is-text"
          size="is-medium"
        />
        <nuxt-link to="/" class="flex align-middle">
          <img
            class="h-8 md:h-10"
            src="@/assets/images/logo.webp"
            alt="Cac sénégal. (logo)"
        /></nuxt-link>
      </div>

      <!-- phone number -->
      <div class="ml-auto md:w-48 hidden sm:flex flex-col place-items-end">
        <span class="font-bold md:text-md">+221 77 426 35 35</span>
        <span class="font-semibold text-sm text-gray-400">Support 24/7</span>
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
      <!--     <li class="ml-2 lg:ml-4 relative inline-block">
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
                {{ cartCount }}
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
        <span class="text-sm">CFA {{ cartCount }}</span>
      </div>
    </div>
    
    <div class="container px-4" >
      <form action="#" class="search home-search">
        <b-field>
     <!--     @typing="getAsyncData" -->
          <b-autocomplete
            @keyup.enter.native="$emit('doSearch', searchTerm)"
            v-model="searchTerm"
            icon-right="magnify"
            :data="prediction"
            :ellipsis="true"
            placeholder="Rechercher..."
            field="title"
            :loading="isFetching"
           
            @select="(option) => $router.push(`/produits/${option.slug}`)"
            expanded
          >
            <template slot-scope="props">
              <div class="media">
                <div class="media-left">
                  <img width="32" :src="`${props.option.image}`" />
                </div>
                <div class="media-content" style="overflow-y: hidden">
                  <span class="text-2xl font-semibold">
                    {{ props.option.name }}</span
                  >
                  <br />
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
    </div>

    <!--         ooooooooooooooooooo -->
  </section>
</template>

<script>
//   import AppIconButton from '@/components/AppIconButton.vue'
/*  import M from 'materialize-css'   */
import {mapActions, mapGetters} from "vuex";
export default {
  name: "AppMobileNav",

  /* watch: {
      '$route' () {
        const elem = document.querySelectorAll('.sidenav')[0]
        const sideNav = M.Sidenav.getInstance(elem)
        sideNav.close()
      }
    }   */
  props: {
    cartCount: { default: 0, type: Number },
    menus: {
      type: Array,
      default: () => [],
    },
    prediction: {
      type: Array,
      default: () => [],
    },
    getAsyncData: {
      type: Function,
    },
    doSearch: {
      type: Function,
    },
    getMoreAsyncData: {
      type: Function,
    },
    isFetching: {
      type: Boolean,
      default: () => false,
    },
  },

  computed: {

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
  data() {
    return {
      open: false,
      overlay: true,
      fullheight: true,
      fullwidth: false,
      right: false,
      searchTerm: "",
      ///menu content
      isOpen: 0,
      isSubMenuOpen: 0,
      collapses: [
        {
          title: "Title 1",
          text: "Text 1",
        },
        {
          title: "Title 2",
          text: "Text 2",
        },
        {
          title: "Title 3",
          text: "Text 3",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "assets/sass/partials/global.scss";

.shoppingBagIco {
  position: relative;

  .cartItemCount {
    position: absolute;
    color: $primary-color;
    top: 18%;
    right: 20%;
    font-size: 10px;
  }
}

.first-level-menu {
  .card-header-title {
    color: $primary-color !important;
  }

  .card-header-icon {
    color: $primary-color;
  }
}

.second-level-card-content {
  padding-right: 0 !important;
  padding-top: 10px;

  .card-content {
  }

  .second-level-menu {
    .card-header-title {
      margin-bottom: 0;
    }

    .card-header-icon {
      color: $the-black;
    }
  }

  .categories-list {
    padding-right: 0 !important;
    padding-top: 10px;
    font-size: 13px;
  }
}

a.dropDown-menu-link {
  color: $the-black;
  box-shadow: none !important;
  font-weight: 400;
  //padding: 0 0 15px 0px;
  padding: 5px 0px !important;
  display: block;

  &:hover {
    background: none !important;
    color: $primary-color;
  }
}

////
.card-header-title {
  font-weight: 600;
  font-size: 13px;

  padding: 9px;
  margin-bottom: 0;
}

////

.sidebar-background {
  transition: all ease-in-out 3s;
}

.b-sidebar {
  position: relative;
  z-index: 150;

  .sidebar-content {
    background-color: red !important;

    .menu {
      flex-direction: column;
    }
  }
}

.mobile-nav-wrapper {
/*   background: white;
  border-bottom: 1px solid #f2f2f2; */

  box-shadow: 0 2px 11px rgb(0 0 0 / 20%);
  //display: none;
  @include breakpoint(mobileonly) {
    display: block;
  }

  .mobile-nav {
    display: flex;
    // flex-shrink: 1;
    justify-content: space-between;
    align-items: center;

    .mobile-logo {
      display: inline-block;
      width: 35%;
      //padding-left: 22px;

      img {
        width: 100%;
      }
    }
  }
}

.mennu {
  display: inline-flex;

  li {
    padding: 5px;
  }
}
</style>