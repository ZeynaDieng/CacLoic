<template>
       <div class="address-card">
            <div class="delivery-address">
              <p class="address-title">{{address.title}}</p>
              <p class="name">{{address.fullName}}</p>
              <p class="adress">{{address.addressLineOne}}, {{address.addressLineTwo}}</p>
              <p class="address-details">({{address.moreInfos}})</p>
              <p>{{address.town}}, {{address.country}}</p>
              <p>Tél: {{address.phone}}</p>
            </div>

            <div class="footer">
                <AppTextButton @btn-clicked="$emit('modify-btn-clicked')" text="Modifier"/>
                <AppTextButton @btn-clicked="$emit('change-btn-clicked')" text="Changer"/>
            </div>
          </div>
</template>

<script>
import AppTextButton from '@/components/AppTextButton.vue'
export default {
  name: 'BaseAddressCard',
  props: {
    address: {
      type: Object
    }

  },
  components: { AppTextButton }
}
</script>

<style lang="scss"  >
@import "assets/sass/partials/global.scss";

</style>
