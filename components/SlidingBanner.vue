<template>
  <div class="sliding-banner">
    <slick
      v-if="banners.length" ref="slick" :options="slickOptions">

      
            <span v-for="(banner, index) of banners" :key="index"  >

           <NuxtLink v-if="banner.externalLink==false"    :to="banner.linkTo"  >  <img :src="banner.image_url" >  <!--  <img :src="`https://cacapi.intech.sn/${banner.image.filename}-300.webp`" > -->  </NuxtLink>
           <a v-if="banner.externalLink" target="_blank"   :href="banner.linkTo"  >  <img :src="banner.image_url" >  <!--  <img :src="`https://cacapi.intech.sn/${banner.image.filename}-300.webp`" > -->  </a>
       
       <!--  <img :src="`https://cacapi.intech.sn/${banner.image.filename}-300.webp`" > -->
      </span>
 
      

    </slick>
  </div>

</template>

<script>
import Slick from 'vue-slick';


export default {
  props: {
    banners: {
      type: Array,
      default: () => ([])
    }
  },
  components: {Slick},
  data() {
    return {
      slickOptions: {
        slidesToShow: 1,
        autoplay: true,
        dots: true,
        arrows: false,
      },
      bannersTest:[
            {
              button_title: "",

              desciption :  "",

              typeSection : "",

              position : "1",
            
              image : {
                  filename:"https://i.postimg.cc/65MwVYn6/banner-Test.png"
              },

              urlRedirect : "",

              status: "active",
            },
                {
              button_title: "",

              desciption :  "",

              typeSection : "",

              position : "1",
            

              image : {
                  filename:"https://i.postimg.cc/65MwVYn6/banner-Test.png"
              },

              urlRedirect : "",

              status: "active",
            }
      ]
    };
  },

  // All slick methods can be used too, example here
  methods: {
    next() {
      this.$refs.slick.next();
    },

    prev() {
      this.$refs.slick.prev();
    },

    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$nextTick(() => {
        this.$refs.slick.reSlick();
      });
    },
  },

}
</script>

<style lang="scss">
@import "assets/sass/partials/global.scss";
.slick-dotted {
  margin-bottom: 0px !important;
}

.slick-dots {
  bottom: -17px !important;
}

.sliding-banner {
  /*  height: 100%;
   box-shadow: 0 2px 2px 0 rgb(0 0 0 / 8%);
   background: white; */
}

.slick-slider {
  min-height: 100%;
}

button.slick-arrow {
  height: 35px;
  width: 35px;
  z-index: 2;
}

.slick-prev::before {

  font-size: 35px !important;;
  opacity: 1 !important;
  color: $primary-color !important;

}

.slick-next::before {

  font-size: 35px !important;
  opacity: 1 !important;;
  color: $primary-color !important;

}
.slick-slide {
  margin: 0 7px!important;
  
}
  .slick-list {
      margin: 0 -7px;
  } 
</style>
