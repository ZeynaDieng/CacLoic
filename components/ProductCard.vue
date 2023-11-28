<template>
  <div class="product-card">
    <div class="product-thumbnail">
      <div class="out-of-stock" v-if="product.status === 'SOLD_OUT'">
        <img src="@/assets/images/rs2.png" alt="">
      </div>
      <div class="promo" v-if="product.onSale">
        -{{ salePercentage }}%
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
      <NuxtLink class="img-link" :to="`/produits/${product.slug}`">
        <img :alt="product.slug"
             :src="`${product.image_ext}-300.webp`"
             :srcset="`
                    ${product.image_ext}-100.webp 100w,
                    ${product.image_ext}-180.webp 180w,
                    ${product.image_ext}-300.webp 300w,
                    `"
        >
      </NuxtLink>
    </div>
    <div class="product-description">
      <NuxtLink class="product-title" :to="`/produits/${product.slug}`" :title="product.name">
        {{ product.name }} 
      </NuxtLink>
    </div>
    <div class="product-price mt-1">
      <h6 class=" ">{{ product.onSale? product.salePrice : product.price | currency }}</h6>
    </div>
    <div v-if="product.onSale" class="pl-4 pr-4 line-through text-gray-500 ">
      <h6 class=" ">{{ product.price | currency }}</h6>
    </div>
    <div class="buttons mt-2 buy-btn" v-if="addToCard">
      <b-button @click="$emit('addToCart')" type="is-primary" expanded>Ajouter au panier</b-button>
    </div>
  </div>
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
    }
  },
  computed: {
    strippedProductName: function () {
      if (this.product.name.length > 47) {
        //this.product.name.length
        return this.product.name.slice(0, 46) + "...";
      }
      return this.product.name;
    },
    salePercentage() {
     return Math.round(((this.product.price - this.product.salePrice) / this.product.price) * 100);
    }
  }
};

</script>

<style lang="scss" scoped>
@import "assets/sass/partials/global.scss";

.product-card {
    @include standard-card();
  position: relative;

  .out-of-stock {
    position: absolute;

    img {
      width: 8rem;
    }
  }



  .promo {
    position: absolute;
    right: 7px;
    top:17px;
    color: white;

    background-color:$primary-color;
    border-radius: 5px;
    padding: 2px;
    font-weight: bolder;
  }
  /*  @include breakpoint(laptop){
        min-height: 299px;
       }  */

  transition: all .1s;
  padding: 10px 0 10px 0;
  border-bottom: 1px solid #f2f2f2;
  border-right: 1px solid #f2f2f2;
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
    height: 200px;
    margin: 0 auto;
    overflow: hidden;
    margin-bottom: 12px;

    .img-link {
      height: 100%;
      width: 100%;
      display: block;
    }

    img {
      margin: 0 auto;
      max-width: calc(100% - 3px);
      transition: transform .5s cubic-bezier(.215, .61, .355, 1), opacity 1s ease-in-out, -webkit-transform .5s cubic-bezier(.215, .61, .355, 1);
      max-height: calc(100% - 3px);
      text-align: center;
      display: block;
      height: auto;
    }

  }

  .product-description {
    font-size: 13px;
    padding: 0 15px 0 15px;

    .product-title {
      color: $the-black;
      margin-bottom: 6px;
      line-height: 19px;
      @include breakpoint(phablet) {
        min-height: 38px;
      }

      font-size: 12px;
      color: #333;
      //font-weight: 500;
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
    h6 {
      font-weight: 600;
    }

    padding: 0 15px 0 15px;
  }

  .buy-btn {
    padding: 0 15px 0 15px;
  }
}

</style>
