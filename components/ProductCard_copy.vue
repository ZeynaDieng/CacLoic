<template>
<nuxt-link  :to="`/produits/${product.slug}`" class=" img-link product-card bg-white rounded-lg overflow-hidden block">
   <div class="product-thumbnail img-grey-bg product-img  " :style="`background-image: url(${product.image_ext}-300.webp);`" >
      <div class="out-of-stock" v-if="product.status === 'SOLD_OUT'">
         <img src="@/assets/images/rs2.png"  alt="">
      </div>
      <div class="promo" v-if="product.promotion && product.status !== 'SOLD_OUT'">
         -{{ product.promotion }}%
      </div>
      <!--      <div class="promo">-->
      <!--        <div class="promo-wrapper">-->
      <!--          <div class="image-container">-->
      <!--            <img src="@/assets/images/rs.png" alt="">-->
      <!--          </div>-->
      <!--          <div class="text-container">-->
      <!--            <span>-20%</span>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--    <img :alt="product.slug"
         :src="`${product.image_ext}-300.webp`"
         :srcset="`
                ${product.image_ext}-100.webp 100w,
                ${product.image_ext}-180.webp 180w,
                ${product.image_ext}-300.webp 300w,
                `"
         > -->
      <picture class="img-bg rounded-lg product-img ">
         <source 
         type="image/webp"     
                    :srcset="`
                    ${product.image_ext}-100.webp 100w,
                    ${product.image_ext}-180.webp 180w,
                    ${product.image_ext}-300.webp 300w,
                    `"
         >
      </picture>
      <!--       <img  :alt="product.slug" class="rounded-lg img-bg"
         :src="`${getStorageUrl()}/storage/${product.images[0]['filename']}-300.webp`"
         :srcset="`
                 ${getStorageUrl()}/storage/${product.images[0]['filename']}-100.webp 100w,
                 ${getStorageUrl()}/storage/${product.images[0]['filename']}-180.webp 180w,
                 ${getStorageUrl()}/storage/${product.images[0]['filename']}-300.webp 300w,
                 `"
         > -->
   </div>
   <div class="product-footer px-2">
      <div class="product-description">
  
            <h6 v-show="hideTitle==false" class="product-title text-sm font-normal">{{ product.name }}</h6>
      
         <p class="text-sm" v-if="temp">Livraison gratuite</p>
      </div>
      <div class="product-price  mt-2 text-md">
         <span class="font-medium ">{{ product.price | currency }}</span>
      </div>
      <span class="font-light text-xs block mb-0 line-through text-gray-400 ">{{ 50000 | currency }}</span>
      <div class="product-extra mt-1 ">
         <span class="font-light text-xs text-red-500 ">Livraison gratuite</span>
      </div>
      <div class="buttons mt-2 buy-btn" v-if="addToCard">
         <b-button @click="$emit('addToCart')" type="is-primary" expanded>Ajouter au panier</b-button>
      </div>
   </div>
</nuxt-link>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    addToCard: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object
    },
    temp: {
      type: Boolean,
      default: false
    },
    hideTitle: {
      type: Boolean,
      default: false
    },
    } ,
  computed: {
    strippedProductName: function () {
      if (this.product.name.length > 47) {
        //this.product.name.length
        return this.product.name.slice(0, 46) + "...";
      }
      return this.product.name;
    }
  },
  methods: {
    getStorageUrl(){
      return process.env.APP_ENV==="DEV"? 'http://localhost:3000' : process.env.API_BASE_URL;
    }
  },
} 

</script>

<style lang="scss" scoped>
@import "assets/sass/partials/global.scss";

.product-card {
  // @include standard-card();
  position: relative;
    margin: 3px;
    margin-bottom: 6px;
    padding-bottom: 4px;
  .out-of-stock {
    position: absolute;

    img {
      width: 8rem;
    }
  }



  .promo {
    position: absolute;
    right: 0;
    bottom:0;
    color: white;

    background-color: #ffe08a;
    border-radius: 5px;
    padding: 2px;
    font-weight: bolder;
  }
  /*  @include breakpoint(laptop){
        min-height: 299px;
       }  */

  transition: all .1s;
  //padding: 10px 0 10px 0;
  //border-bottom: 1px solid #f2f2f2;
  //border-right: 1px solid #f2f2f2;
  // background: white;

  &:hover {
    box-shadow: 0 2px 13px rgb(0 40 53 / 20%);

    .product-thumbnail {
      transform: translate3d(0, -3px, 0);

    }
  }

  .product-thumbnail {

    transition: all .1s;
    // width: 200px;
    //height: 200px;
       height: 100px;
             @include breakpoint(phablet) {
        height: 200px;
      }
    max-height: 200px;
    margin: 0 auto;
    overflow: hidden;
    margin-bottom: 5px;


    .img-link {
      height: 100%;
      width: 100%;
      display: block;
    }

    .product-img {
        //transform: scale(0.7);
      margin: 0 auto;
      max-width: calc(100%);
      transition: transform .5s cubic-bezier(.215, .61, .355, 1), opacity 1s ease-in-out, -webkit-transform .5s cubic-bezier(.215, .61, .355, 1);
      max-height: calc(100% - 3px);
      text-align: center;
      display: block;
      //height: auto;
    }

  }

  .product-description {
    font-size: 13px;
   // padding: 0 15px 0 15px;

    .product-title {
      color:black;
      margin-bottom: 6px;
      line-height: 19px;
      @include breakpoint(phablet) {
        min-height: 38px;
      }

      font-size: 12px;
      color: #333;
   /*    font-weight: 500; */
      display: block;
      display: -webkit-box;
      max-width: 400px;
      /* height: 38px; */
      overflow: hidden;
      margin: 0 auto;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      //color: $the-black;
      color: $the-black;
    }
  }

  .product-price {
    color:$the-black;
    h6 {
     // font-weight: 700;
     // color: $primary-color;
    }

    //padding: 0 15px 0 15px;
  }

  .buy-btn {
   // padding: 0 15px 0 15px;
  }
}

</style>
