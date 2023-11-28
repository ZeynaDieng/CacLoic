<template>
  <div class="product-card">
    <div class="product-thumbnail">
      <NuxtLink class="img-link" :to="`/produits/${product.slug}`">
        <img
          :alt="product.slug"
          :srcset="`
                    ${product.image_ext}-100.webp 100w,
                    ${product.image_ext}-180.webp 180w,
                    ${product.image_ext}-300.webp 300w,
                    ${product.image_ext}-600.webp 600w,
                    `"
        />
      </NuxtLink>
    </div>
    <div class="product-description">
      <NuxtLink :to="`/produits/${product.slug}`" :title="product.name">
        <h6 class="product-title">{{ product.name }}</h6></NuxtLink
      >
    </div>
    <div class="product-price mt-1">
      <h6 class="">{{ product.price | currency }}</h6>
    </div>
    <div class="buttons mt-2 buy-btn" v-if="addToCard">
      <b-button @click="$emit('addToCart')" type="is-primary" expanded
        >Ajouter au panier</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCardMini",
  props: {
    addToCard: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
    },
  },
  computed: {
    strippedProductName: function () {
      if (this.product.name.length > 47) {
        //this.product.name.length
        return this.product.name.slice(0, 46) + "...";
      }
      return this.product.name;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/sass/partials/global.scss";

.product-card {
  // @include standard-card();

  /*  @include breakpoint(laptop){
       min-height: 299px;
      }  */

  transition: all 0.1s;
  padding: 10px 0 10px 0;
  border-bottom: 1px solid #f2f2f2;
  border-right: 1px solid #f2f2f2;
  background: white;

  &:hover {
    box-shadow: 0 2px 13px rgb(0 40 53 / 20%);

    .product-thumbnail {
      transform: translate3d(0, -3px, 0);
    }
  }

  .product-thumbnail {
    transition: all 0.1s;
    // width: 200px;
    height: 110px;
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
      transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1),
        opacity 1s ease-in-out,
        -webkit-transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
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
      font-weight: 500;
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
