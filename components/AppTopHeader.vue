<template>
  <div v-if="banner[0]" class="top-header-container  medium:block hidden md:block"  >
      <nuxt-link   :to="banner[0].linkTo" :style="{'background-image': `url(${banner[0].image_url})` }"></nuxt-link>
  </div>
 
</template>

<script>
export default {
  name: "AppTopHeader",
  data() {
    return {
      isSending: false,
      email: '',
      isSent: false,
      banner:[ ]
    }
  },
 
   created() {
  this.getTopHeaderImg();
 },
  methods: {


  img(){
  return `url(${this.banner[0].image_url})` ; 
 // return `background-image: url(${this.banner[0].image_url})`
  },

 async getTopHeaderImg(){
      try {
  
      const { data, status } = await this.$axios.get(`/banner?type=TOP`);

      if (status === 200) {
       
          this.banner= data.data
           //  console.log( this.banner);
      
      
      }
    } catch (e) {
      console.error(e);
    }

  },
    async submitNewsletter() {
      this.isSending = true;
      try {
        const {status} = await this.$axios.post('/newsletter', {
          email: this.email
        });

        if (status === 201) {
          this.isSent = true;
        }
      } catch (e) {

      }
      this.isSending = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/sass/partials/global.scss";
.top-header-container{

        min-width: 720px;
    height: 80px;
    overflow: hidden;

    a{
    display: block;
    width: 100%;
    height: 100%;
    text-indent: -9999rem;
    background-repeat: no-repeat;
    background-position: top;
    //    background-image: url(https://ae01.alicdn.com/kf/Sf976308574f1440ab2a1eeb39ba829eal.jpg_Q90.jpg_.webp);
    }
}
</style>
