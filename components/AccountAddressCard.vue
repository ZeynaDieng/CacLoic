<template>
  <div class="address-card">
    <div class="delivery-address" @click="$emit('cardClicked')">
      <AppBadge v-if="isDefault" :text="badgeText" color="success"/>
      <p class="name">{{ address.full_name }}</p>
      <p class="address">{{ address.address + ', ' + address.region }}</p>
      <p>Tél: {{ address.phone }}</p>
    </div>

    <div class="address-footer">
      <slot></slot>

    </div>
  </div>
</template>

<script>


import BaseAddressCard from '../mixins/BaseAddressCard.vue'
import AppBadge from "./AppBagde";

export default {
  name: 'AccountAddressCard',
  props: {
    badgeText: {
      type: String,
      default: 'Livrer ici par défaut'
    },
    isDefault: {
      type: Boolean,
      default: false
    },
    address: {
      type: Object
    }

  },
  components: {
    AppBadge

  },
  methods: {
    changeDefault(address) {
      address.default = true
    }
  },
  mixins: [BaseAddressCard]
}
</script>

<style lang="scss" scoped>
@import "assets/sass/partials/global.scss";

.address-card {
  @include standard-card();
  display: flex;
  cursor: auto;
  flex-direction: column;
  justify-content: space-between;
  //min-height: 250px;
  border-top: 1px solid $primary-color;

  .delivery-address {

    flex-grow: 1;

    color: $the-black;

    p {
      margin: 5px 0;
      font-size: 13px;
    }

    .address-title {
      color: $primary-color;
      font-weight: 600;
      font-size: 17px;
    }

    .name {
      color: $the-black;
      font-size: 17px;
    }
  }

  .footer {
    a {
      margin-right: 10px !important;
      font-size: 12px;

    }
  }
}
</style>
