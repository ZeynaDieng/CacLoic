<template>
  <div class="address-card">

    <div class="delivery-address" @click="$emit('cardClicked')">
      <AppBadge color="" :text="badgeText"></AppBadge>

      <p class="name">{{ address.full_name }}</p>
      <p class="address">{{ address.address + ', ' + address.region }}</p>
      <p>Tél: {{ address.phone }}</p>
    </div>

    <div class="footer-card">
      <slot></slot>

    </div>
  </div>
</template>

<script>
import AppBadge from './AppBagde'
import BaseAddressCard from '../mixins/BaseAddressCard'

export default {
  name: 'CartAddressCard',
  props: {
    badgeText: {
      type: String,
      default: 'Adresse par défaut'
    },
    isDefault: {
      type: Boolean,
      default: false
    },
    isDeliveryAddress: {
      type: Boolean,
      default: false
    },
    address: {
      type: Object
    }

  },
  components: {AppBadge},
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
  min-height: 250px;
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

  .footer-card {
    a {
      margin-right: 10px !important;
      font-size: 12px;

    }
  }
}
</style>
