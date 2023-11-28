<template>
  <section class="mt-4 homeExpoB_wrapper rounded-md bg-white shadow-sm py-2 px-2">
      <header class="section-heading heading-line is-size-5 is-size-4-mobile px-3 flex justify-between">
        <h6 class="title-section bold">Maison & Bureau</h6>
         <nuxt-link to="/produits" class="text-primary is-size-6 ">Plus</nuxt-link>
    </header>
    <slick
      class="homeExpoB show-for-medium"
      ref="slick"
      :options="slickOptions"
    >
      <ProductCard
        v-for="(product, index) of products"
        :key="index"
        class=""
        @addToCart="addProductToCart({ product: product, productQuantity: 1 })"
        :product="product"
      />
    </slick>

    <ul class="grid grid-cols-2 homeExpoB md:hidden">
      <li
        v-for="product in products"
        v-bind:key="product.title"
        class="small-6 large-2 medium-4 cell"
      >
        <ProductCard
          @addToCart="
            addProductToCart({ product: product, productQuantity: 1 })
          "
          :product="product"
        />
      </li>
<!--      <nuxt-link v-if="to !== ''" class="seemore_btn" to="/">Voir tout</nuxt-link>-->
    </ul>
  </section>
</template>

<script>
import Slick from "vue-slick";
import "slick-carousel/slick/slick-theme.scss";

import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "HomeExpoSmall",
  components: {
    ProductCard,
    Slick,
  },
  props: {
    sectionTitle: {
      type: String,
      default: "Votre titre ici",
    },
    subTitle: {
      type: String,
      default: "Votre sous titre ici",
    },
    products: {
      type: Array,
    },
    to: {
      type: String,
      default: () => ""
    }
  },

  data() {
    return {
      slickOptions: {
        slidesToShow: 4,
        // autoplay: true,
        //slidesToScroll: 3,
        //dots: true,
        arrows: false,
        adaptiveHeight: true,
        //  variableWidth: true,
        infinite: false,
        // settings: "unslick"
        // Any other options that can be got from plugin documentation
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "assets/sass/partials/global.scss";
.homeExpoB_wrapper{
  background: white;
  //@include standard-card-simple();
}
.seemore_btn {
  text-align: center;
  margin: 0 auto;
  padding: 5px 10px;
}

.homeExpoB {
  background-color: transparent;
  //  box-shadow: 0 2px 13px rgb(0 40 53 / 20%);

 

  @include breakpoint(laptop) {
    max-height: 300px;
  }
}

.slick-prev:before,
.slick-next:before {
  color: $primary-color !important;
  font-size: 37px !important;
}

.slick-slide {
  // width: 200px;
}
</style>
