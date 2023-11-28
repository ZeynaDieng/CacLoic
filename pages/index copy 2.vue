<template>
 
    <div class="home-container ">
      <!-- header -->
     

      <!-- body -->

      <section class="">
          <div class="grid grid-cols-4 gap-4 container  banner-section">
                <!-- Menu -->
      <!--       <div class=" h-full bg-white pt-2 py-2 border-l-2 border-cac-500 overflow-scroll hidden lg:block menu-container overflow-x-hidden ">
              <ul class="flex flex-col w-full ">
              
          <li v-for="category in results.categories" :key="category.id" class="mx-4">
					<nuxt-link :to="`/produits/categorie/${category.slug}`" class="flex flex-row items-center py-1 px-4  rounded-md text-gray-800 hover:text-cac-800 hover:bg-cac-200">
 
						<span class="ml-3">{{category.title}}</span>
					</nuxt-link>
				</li>
              </ul>
            </div> -->


<div  class=" h-full bg-white pt-2 py-2 border-l-2 border-cac-500   overflow-y-scroll overflow-x-hidden hidden lg:block menu-container ">
   <ul  class="flex flex-col w-full left-menu    ">
      <li  v-for="(category, index) of results.categories" :key="index" class="mx-4 left-menu-element ">
        <dl>
          <dt class="category-name">          
					<nuxt-link :to="`/produits/categorie/${category.slug}`" class="flex flex-row items-center py-1 px-4  rounded-md text-gray-800 hover:text-cac-800 hover:bg-cac-200">
 
						<span class="ml-3">{{category.title}}</span>
					</nuxt-link>
          </dt>
       <!-- grid-x grid-margin-x grid-margin-y -->

              <dd class="dropDown-menu_wrapper "  style="display: block;">
                <ul class="dropDown-menu dropDown-menu grid grid-cols-4 rounded-md" data-v-d2447884="">
                    <li class="" data-v-d2447884=""><a href="/produits/categorie/tv" class=" nav-sub-menu-title" data-v-d2447884="">TV
                      </a> <a href="/produits/categorie/tv-android-smart" class="dropDown-menu-link" data-v-d2447884="">Tv android smart 
                      </a><a href="/produits/categorie/smart-tv" class="dropDown-menu-link" data-v-d2447884="">Smart tv
                      </a><a href="/produits/categorie/tv-led" class="dropDown-menu-link" data-v-d2447884="">Tv led
                      </a><a href="/produits/categorie/tv-android-oled" class="dropDown-menu-link" data-v-d2447884=""> tv android  oled
                      </a>
                    </li>
                    <li class="" data-v-d2447884=""><a href="/produits/categorie/videoprojecteur" class="is-size-6 nav-sub-menu-title" data-v-d2447884="">VIDEOPROJECTEUR
                      </a> <a href="/produits/categorie/videoprojecteur_2" class="dropDown-menu-link" data-v-d2447884="">Vidéoprojecteur
                      </a><a href="/produits/categorie/videoprojecteur-portable" class="dropDown-menu-link" data-v-d2447884="">Vidéoprojecteur portable
                      </a><a href="/produits/categorie/ecran-de-projection" class="dropDown-menu-link" data-v-d2447884="">Ecran de projection
                      </a>
                    </li>
                    <li class="" data-v-d2447884=""><a href="/produits/categorie/accessoires-tv-video" class="is-size-6 nav-sub-menu-title" data-v-d2447884="">ACCESSOIRES TV, VIDÉO
                      </a> <a href="/produits/categorie/box" class="dropDown-menu-link" data-v-d2447884="">Box
                      </a><a href="/produits/categorie/support-mural-tv" class="dropDown-menu-link" data-v-d2447884="">Support mural tv
                      </a><a href="/produits/categorie/casque-tv-sans-fil" class="dropDown-menu-link" data-v-d2447884="">Casque tv sans fil
                      </a><a href="/produits/categorie/cable-video" class="dropDown-menu-link" data-v-d2447884="">Cable video
                      </a><a href="/produits/categorie/meuble-tv" class="dropDown-menu-link" data-v-d2447884="">Meuble tv
                      </a><a href="/produits/categorie/telecommande" class="dropDown-menu-link" data-v-d2447884="">Télécommande
                      </a><a href="/produits/categorie/accessoires-electroniques" class="dropDown-menu-link" data-v-d2447884="">Accessoires électroniques 
                      </a>
                    </li>
                    <li class="" data-v-d2447884=""><a href="/produits/categorie/home-cinema-and-enceinte" class="is-size-6 nav-sub-menu-title" data-v-d2447884="">HOME CINEMA &amp; ENCEINTE
                      </a> <a href="/produits/categorie/amplificateur-home-cinema" class="dropDown-menu-link" data-v-d2447884="">Amplificateur home cinéma
                      </a><a href="/produits/categorie/accessoires-home-cinema" class="dropDown-menu-link" data-v-d2447884="">Accessoires home cinéma
                      </a><a href="/produits/categorie/lecteur-dvd" class="dropDown-menu-link" data-v-d2447884="">Lecteur dvd 
                      </a><a href="/produits/categorie/lecteur-blu-ray" class="dropDown-menu-link" data-v-d2447884="">Lecteur blu-ray
                      </a><a href="/produits/categorie/lecteur-dvd_2" class="dropDown-menu-link" data-v-d2447884="">Lecteur dvd
                      </a><a href="/produits/categorie/enceinte" class="dropDown-menu-link" data-v-d2447884="">Enceinte
                      </a><a href="/produits/categorie/barre-de-son" class="dropDown-menu-link" data-v-d2447884="">Barre de son
                      </a>
                    </li>
                    <li class="" data-v-d2447884=""><a href="/produits/categorie/casque-ecouteurs" class="is-size-6 nav-sub-menu-title" data-v-d2447884="">CASQUE / ÉCOUTEURS
                      </a> <a href="/produits/categorie/casque-audio-filaire" class="dropDown-menu-link" data-v-d2447884="">Casque audio filaire
                      </a><a href="/produits/categorie/casque-bluetooth" class="dropDown-menu-link" data-v-d2447884="">Casque bluetooth
                      </a><a href="/produits/categorie/ecouteurs" class="dropDown-menu-link" data-v-d2447884="">Ecouteurs
                      </a><a href="/produits/categorie/ecouteurs-bluetooth" class="dropDown-menu-link" data-v-d2447884="">Ecouteurs bluetooth
                      </a>
                    </li>
                    <li class="" data-v-d2447884=""><a href="/produits/categorie/radio-et-dictaphone" class="is-size-6 nav-sub-menu-title" data-v-d2447884="">RADIO ET DICTAPHONE
                      </a> <a href="/produits/categorie/radio" class="dropDown-menu-link" data-v-d2447884="">Radio
                      </a><a href="/produits/categorie/radio-reveil" class="dropDown-menu-link" data-v-d2447884="">Radio-réveil
                      </a><a href="/produits/categorie/lecteur-audio-video-mp3-mp4" class="dropDown-menu-link" data-v-d2447884="">Lecteur audio vidéo mp3-mp4
                      </a><a href="/produits/categorie/dictaphone" class="dropDown-menu-link" data-v-d2447884="">Dictaphone
                      </a><a href="/produits/categorie/radio-enceinte" class="dropDown-menu-link" data-v-d2447884="">Radio enceinte
                      </a><a href="/produits/categorie/mini-chaine" class="dropDown-menu-link" data-v-d2447884="">Mini-chaine
                      </a>
                    </li>
                    <li class="" data-v-d2447884=""><a href="/produits/categorie/console-te-jeux-video" class="is-size-6 nav-sub-menu-title" data-v-d2447884="">CONSOLE DE JEUX VIDEO
                      </a> <a href="/produits/categorie/console" class="dropDown-menu-link" data-v-d2447884="">Console 
                      </a><a href="/produits/categorie/accessoires_3" class="dropDown-menu-link" data-v-d2447884="">Accessoires
                      </a><a href="/produits/categorie/jeux" class="dropDown-menu-link" data-v-d2447884="">Jeux
                      </a>
                    </li>
                    <li class="" data-v-d2447884=""><a href="/produits/categorie/telephone-tablette" class="is-size-6 nav-sub-menu-title" data-v-d2447884="">TELEPHONE/TABLETTE
                      </a> <a href="/produits/categorie/telephone" class="dropDown-menu-link" data-v-d2447884="">Telephone
                      </a><a href="/produits/categorie/smart-phone" class="dropDown-menu-link" data-v-d2447884="">Smart phone
                      </a><a href="/produits/categorie/tablette" class="dropDown-menu-link" data-v-d2447884="">Tablette
                      </a>
                    </li>
                </ul>
              </dd>
        </dl>
      </li>

  </ul>
</div>
              <!-- END Menu -->
            <div class="col-span-4  lg:col-span-3  mt-4"> <SlidingBanner  /> </div>
        </div>
      </section>

        <div class="container">
               <HomeExpoB :products="results.sections" class="hidden md:block "/>
                  <br>
              <!--                  <Pintest :products="results.sections" class="block md:hidden "/>
                  <br> -->
                  <section class="md:grid grid-cols-2 gap-4 hidden ">
                         <HomeExpoSmall :products="results.sections"/>
                         <HomeExpoSmall :products="results.sections"/>
                  </section>
                  <br>
                   <header class="section-heading heading-line is-size-3 is-size-5-mobile  flex justify-center m-0 my-4">
                     <h6 class="title-section bold">Sélection par catégorie</h6>
                  </header>
    
                  <section class="grid grid-cols-1 md:grid-cols-4  gap-4">
                        <!-- BIG ONE -->
                      <div class=" bg-white rounded-md px-4 py-4  row-span-2">
                        <header class="section-heading heading-line is-size-4 is-size-4-mobile flex justify-between m-0">
                          <h6 class="title-section bold pb-2 ">Éclairage</h6>
                        </header>
                           <div class="grid grid-cols-2 gap-4">
                          <div class="h-32 rounded-md bg-gray-100"></div>
                          <div class="h-32 rounded-md bg-gray-100"></div>
                            <div class="h-32 rounded-md bg-gray-100"></div>
                          <div class="h-32 rounded-md bg-gray-100"></div>
                        </div>
                      </div>
                 <!-- LITTLE ONE -->
                      <div class=" bg-white rounded-md px-4 py-4  h-52">
                      <!-- TITLE -->
                        <header class="section-heading heading-line is-size-6 is-size-6-mobile flex justify-between m-0">
                          <h6 class="title-section bold py-2">Éclairage</h6>
                        </header>
                      <!-- CONTENT -->
                        <div class="grid grid-cols-2 gap-4">
                          <div class="h-32 rounded-md home-cat-img-wrapper " style="background-image: url(https://cacapi.intech.sn/storage/dxAoNOlGMWKe-300.webp);">
                            <picture class="img-bg">
                              <source type="image/webp" srcset="https://cacapi.intech.sn/storage/dxAoNOlGMWKe-300.webp">
                            </picture>
                         </div>
                          <div class="h-32 rounded-md home-cat-img-wrapper " style="background-image: url(https://i0.wp.com/cacsenegal.com/wp-content/uploads/2021/06/05.jpg?resize=300%2C300&ssl=1);">
                            <picture class="img-bg">
                              <source type="image/webp" srcset="https://i0.wp.com/cacsenegal.com/wp-content/uploads/2021/06/05.jpg?resize=300%2C300&ssl=1">
                            </picture>
                          </div>
                        </div>
                       <!-- CONTENT -->
                     </div>
                    
                    <div class=" bg-white rounded-md px-4 py-4  h-52">
                      <!-- TITLE -->
                        <header class="section-heading heading-line is-size-6 is-size-6-mobile flex justify-between m-0">
                          <h6 class="title-section bold py-2">Éclairage</h6>
                        </header>
                      <!-- CONTENT -->
                        <div class="grid grid-cols-2 gap-4">
                          <div class="h-32 rounded-md home-cat-img-wrapper " style="background-image: url(https://i0.wp.com/cacsenegal.com/wp-content/uploads/2020/04/Bouilloire-CAC-200x200.jpg);">
                            <picture class="img-bg">
                              <source type="image/webp" srcset="https://i0.wp.com/cacsenegal.com/wp-content/uploads/2020/04/Bouilloire-CAC-200x200.jpg">
                            </picture>
                         </div>
                          <div class="h-32 rounded-md home-cat-img-wrapper " style="background-image: url(https://i0.wp.com/cacsenegal.com/wp-content/uploads/2021/12/TV-CAC.jpg?resize=200%2C200&ssl=1);">
                            <picture class="img-bg">
                              <source type="image/webp" srcset="https://i0.wp.com/cacsenegal.com/wp-content/uploads/2021/12/TV-CAC.jpg?resize=200%2C200&ssl=1">
                            </picture>
                          </div>
                        </div>
                       <!-- CONTENT -->
                     </div>

                  <div class=" bg-white rounded-md px-4 py-4  h-52">
                      <!-- TITLE -->
                        <header class="section-heading heading-line is-size-6 is-size-6-mobile flex justify-between m-0">
                          <h6 class="title-section bold py-2">Éclairage</h6>
                        </header>
                      <!-- CONTENT -->
                        <div class="grid grid-cols-2 gap-4">
                          <div class="h-32 rounded-md home-cat-img-wrapper " style="background-image: url(https://i0.wp.com/cacsenegal.com/wp-content/uploads/2022/02/1-195-200x200.jpg);">
                            <picture class="img-bg">
                              <source type="image/webp" srcset="https://i0.wp.com/cacsenegal.com/wp-content/uploads/2022/02/1-195-200x200.jpg">
                            </picture>
                         </div>
                          <div class="h-32 rounded-md home-cat-img-wrapper " style="background-image: url(https://i0.wp.com/cacsenegal.com/wp-content/uploads/2022/02/1-145-200x200.jpg);">
                            <picture class="img-bg">
                              <source type="image/webp" srcset="https://i0.wp.com/cacsenegal.com/wp-content/uploads/2022/02/1-145-200x200.jpg">
                            </picture>
                          </div>
                        </div>
                       <!-- CONTENT -->
                  </div>

                  <div class=" bg-white rounded-md px-4 py-4  h-52">
                      <!-- TITLE -->
                        <header class="section-heading heading-line is-size-6 is-size-6-mobile flex justify-between m-0">
                          <h6 class="title-section bold py-2">Éclairage</h6>
                        </header>
                      <!-- CONTENT -->
                        <div class="grid grid-cols-2 gap-4">
                          <div class="h-32 rounded-md home-cat-img-wrapper " style="background-image: url(https://i0.wp.com/cacsenegal.com/wp-content/uploads/2018/02/premium_L-200x200.jpg);">
                            <picture class="img-bg">
                              <source type="image/webp" srcset="https://i0.wp.com/cacsenegal.com/wp-content/uploads/2018/02/premium_L-200x200.jpg">
                            </picture>
                         </div>
                          <div class="h-32 rounded-md home-cat-img-wrapper " style="background-image: url(https://i0.wp.com/cacsenegal.com/wp-content/uploads/2022/02/houshold-fitness-200x200.jpg);">
                            <picture class="img-bg">
                              <source type="image/webp" srcset="https://i0.wp.com/cacsenegal.com/wp-content/uploads/2022/02/houshold-fitness-200x200.jpg">
                            </picture>
                          </div>
                        </div>
                       <!-- CONTENT -->
                  </div>

                  <div class=" bg-white rounded-md px-4 py-4  h-52">
                      <!-- TITLE -->
                        <header class="section-heading heading-line is-size-6 is-size-6-mobile flex justify-between m-0">
                          <h6 class="title-section bold py-2">Éclairage</h6>
                        </header>
                      <!-- CONTENT -->
                        <div class="grid grid-cols-2 gap-4">
                          <div class="h-32 rounded-md home-cat-img-wrapper " style="background-image: url(https://i0.wp.com/cacsenegal.com/wp-content/uploads/2022/02/1-70-200x200.jpg);">
                            <picture class="img-bg">
                              <source type="image/webp" srcset="https://i0.wp.com/cacsenegal.com/wp-content/uploads/2022/02/1-70-200x200.jpg">
                            </picture>
                         </div>
                          <div class="h-32 rounded-md home-cat-img-wrapper " style="background-image: url(https://i0.wp.com/cacsenegal.com/wp-content/uploads/2022/02/1-39-200x200.jpg);">
                            <picture class="img-bg">
                              <source type="image/webp" srcset="https://i0.wp.com/cacsenegal.com/wp-content/uploads/2022/02/1-39-200x200.jpg">
                            </picture>
                          </div>
                        </div>
                       <!-- CONTENT -->
                  </div>

                  <div class=" bg-white rounded-md px-4 py-4  h-52">
                      <!-- TITLE -->
                        <header class="section-heading heading-line is-size-6 is-size-6-mobile flex justify-between m-0">
                          <h6 class="title-section bold py-2">Éclairage</h6>
                        </header>
                      <!-- CONTENT -->
                        <div class="grid grid-cols-2 gap-4">
                          <div class="h-32 rounded-md home-cat-img-wrapper " style="background-image: url(https://cacapi.intech.sn/storage/dxhIlUBDIndM-300.webp);">
                            <picture class="img-bg">
                              <source type="image/webp" srcset="https://cacapi.intech.sn/storage/dxhIlUBDIndM-300.webp">
                            </picture>
                         </div>
                          <div class="h-32 rounded-md home-cat-img-wrapper " style="background-image: url(https://cacapi.intech.sn/storage/jjlZeMYDEDMC-300.webp);">
                            <picture class="img-bg">
                              <source type="image/webp" srcset="https://cacapi.intech.sn/storage/jjlZeMYDEDMC-300.webp">
                            </picture>
                          </div>
                        </div>
                       <!-- CONTENT -->
                  </div>
                   <!-- END LITTLE ONE -->
               </section>
                  <br>
    
         <!-- complexy categorie-->
                  <section v-for="(catSection, index) in results.categoriesSections" :key="index" class="grid  grid-cols-1 md:grid-cols-4  gap-4">
                        <!-- BIG ONE -->
               
                    <template v-for="content in catSection.content" >
                       <nuxt-link :to="`/produits/categorie/${content.category.slug}`" v-if="content.main===true" :key="content._id" class=" bg-white rounded-md px-4 py-4  row-span-2 text-black ">
                        <header class="section-heading heading-line is-size-4 is-size-4-mobile flex justify-between m-0">
                          <h6 class="title-section bold pb-2 ">{{content.category.title}}</h6>
                        </header>
                           <div class="grid grid-cols-2 gap-4">
               <div v-for="(product,index) in  content.products" :key="index" class="h-32 rounded-md home-cat-img-wrapper " :style="`background-image: url(https://cacapi.intech.sn${product.images[0]['filename']}-300.webp);`">
                            <picture class="img-bg">
                              <source type="image/webp" :srcset="`https://cacapi.intech.sn${product.images[0]['filename']}-300.webp`">
                            </picture>
                         </div>
                        </div>
                      </nuxt-link >

                         <nuxt-link :to="`/produits/categorie/${content.category.slug}`" v-else :key="content._id"  class="  bg-white rounded-md px-4 py-4  h-52 text-black ">
                      <!-- TITLE -->
                        <header class="section-heading heading-line is-size-6 is-size-6-mobile flex justify-between m-0">
                          <h6 class="title-section bold pb-2">{{content.category.title}}</h6>
                        </header>
                      <!-- CONTENT -->

                        <div class="grid grid-cols-2 gap-4">
                          <div v-for="product in limitProductInCategorie(content)" :key="product._id" class="h-32 rounded-md home-cat-img-wrapper " :style="`background-image: url(https://cacapi.intech.sn${product.images[0]['filename']}-300.webp);`">
                            <picture class="img-bg">
                              <source type="image/webp" :srcset="`https://cacapi.intech.sn${product.images[0]['filename']}-300.webp`">
                            </picture>
                         </div>
                      
                        </div> 
                       <!-- CONTENT -->
                     </nuxt-link>
                    </template>
               




       
                   <!-- END LITTLE ONE -->
                  </section>
        </div>

 
    </div>
 
</template>

<script>
import HomeExpoSmall from '../components/HomeExpoSmall.vue';
export default {
  components: { HomeExpoSmall },
  auth: false,
  async asyncData({ $axios }) {
    const results = {
      sections: [],
      categories: [],
      categoriesSections:[]
    };

    try {
      const [sections, categories,categoriesSections] = await Promise.all([
        await $axios.get("/product"),
        await $axios.get("/categories"),
        await $axios.get("/sections-home"),
        
        
       // await $axios.get("menu"),
      ]);
      // console.log(sections);
      results.sections = sections.data.data.products;
      results.categories = categories.data.data;
      results.categoriesSections= categoriesSections.data.data
      //results.menus = menu.data;
    } catch (e) {
      console.log(e);
    }

    return {
      results,
    };
  },

  methods:  {


        limitProductInCategorie(content){
        
     
            
      
          if (content.main===false){
         
            return content.products.slice(0,2);
             
          } else{
          return content.products;
          }
       
     
    }
  },

 
};
</script>

<style lang="scss" scoped>
@import "assets/sass/partials/global.scss";
.banner-section{

.menu-container{
      max-height: 475.2px;
}
}

.home-cat-img-wrapper{
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
}
     ul {
        a.nav-sub-menu-title {
          text-transform: uppercase;
          box-shadow: none !important;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          color: $primary-color !important;
          padding: 0;
          font-size: 14px !important;
          line-height: 20px;
          font-weight: 500;

          &:hover {
            text-decoration: underline;
          }
        }

        li{
          display: inline-flex;
          flex-direction: column;
          
          a.dropDown-menu-link {
            color: $the-black;
            box-shadow: none !important;
            font-weight: 400;
            //padding: 0 0 15px 0px;
            padding: 5px 0px !important;
            display: inline-block;
            font-size:13px;

            &:hover {
              background: none !important;
              color: $primary-color;
            }
          }
        }
      }
 
 
 
 
 
    li.left-menu-element {


      // position: relative;

      &:hover {
        .dropDown-menu_wrapper {
          opacity: 1;
          transform: translatex(40px);
          pointer-events: all;
        }
      }

      .dropDown-menu_wrapper {
        transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        z-index: 99;
        padding-top: 10px;
        opacity: 0;
        transform: translatex(-10px);
        position: absolute;
        left: 238px;
        width: 85%;
        //width: 135%;
        top:0;
        pointer-events: none;

        .dropDown-menu {
          opacity: 1;
          padding: 25px;
          background: white;
          // border-radius: 5px;
          box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.1);
          //box-shadow: 0 6px 31px -2px rgba(0, 0, 0, 0.1);
        //  border-bottom: 1px solid $secondary-color;
          align-items: flex-start;
          // margin-top: 10px;
          /* .dropDown-menu-link{
padding: 0;
}
*/
        }
      }
    }

.home-container{
  background-color: #F0F0F0;
padding-bottom: 119px;
}

.juice {
  background-image: url("https://i.ibb.co/4R1Gmtx/Slide-clim.jpg");
  //background-image: url("https://i.ibb.co/SN2Sp4T/juice.png");
}

.juice2 {
  background-image: url("https://i.ibb.co/yyMXMSF/juice2.png");
}

.juice3 {
  z-index: 10;
  position: relative;
}

.juice3::after {
  content: "";
  position: absolute;
  opacity: 0.2;
  z-index: -999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  //background-image: url("https://previews.123rf.com/images/olgasiv/olgasiv1403/olgasiv140300026/27343111-image-en-noir-sur-un-fond-blanc-dessin-de-l%C3%A9gumes-de-fruits-et-de-baies-.jpg");
}

.text-primary {
  color: #22B48C;
}

.text-primary-lite {
  color: #22B48C;
}

.text-secondary {
  color: #294356;
}

.text-secondary-lite {
  color: #d5dee5;
}

.bg-primary {
  background-color: #22B48C;
}

.bg-primary-lite {
  background-color: #22B48C;
}

.bg-secondary {
  background-color: #294356;
}

.bg-secondary-lite {
  background-color: #d5dee5;
}

.product {
  background-image: url("https://i.ibb.co/hgTD0WB/Banners-1-sur-2-sous-slider.webp");
}
.product2 {
  background-image: url("https://i.ibb.co/1fZMKPh/2021-11-07-14h08-07.png");
}
.product3 {
  background-image: url("https://i.ibb.co/f9tpvV3/2021-11-07-14h08-32.png");
}
.product4 {
  background-image: url("https://i.ibb.co/42BsKQ2/2021-11-07-14h08-17.png");
}
</style>
