<template>
  <section class="mt-4 homeExpoB_wrapper rounded-md  py-2 px-2">
      <header class="section-heading heading-line is-size-5 is-size-4-mobile  flex justify-between ">
        <h6 class="title-section bold">Maison & Bureau</h6>
        <nuxt-link to="/produits" class="text-primary is-size-6 ">Plus</nuxt-link>
      </header>
 

<div class="w-full flex flex-wrap">

    <ul  v-for="(arr, inde) in subArrays" :key="inde" class="w-1/2"  >
   <li  v-for="(prod, i) in arr" :key="i" class="w-full"  >
        <ProductCard @addToCart="  addProductToCart({ product: prod, productQuantity: 1 }) " :product="prod" :temp="checkPair(inde+i)"  />
      </li>  
<!--      <nuxt-link v-if="to !== ''" class="seemore_btn" to="/">Voir tout</nuxt-link>-->
    </ul>

</div>
  </section>
</template>

<script>
import Slick from "vue-slick";
import "slick-carousel/slick/slick-theme.scss";

import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "PinTest",
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
      theProd:this.products,
      slickOptions: {
        slidesToShow: 6,
        // autoplay: true,
        //slidesToScroll: 3,
        //dots: true,
        arrows: true,
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
  computed: {
    subArrays() {
     //console.log(this.theProd)
      var length = Math.ceil(this.theProd.length / 2);
      const result = new Array(length).fill().map((i) => {
          console.log(this.theProd.length)
          return this.theProd.splice(0, length)
        })
        return result
    }
  },
  methods:{
    checkPair(value){
        let numb=Math.random();
      if(value%2 == 0){
      return true
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/sass/partials/global.scss";
.homeExpoB_wrapper{
  //background: white;
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
