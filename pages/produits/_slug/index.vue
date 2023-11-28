<template>
<div>
  <div class="bg-white">
  
    <div  class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8" >
      <nav
      class="breadcrumb is-small mb-2 show-for-large"
      aria-label="breadcrumbs"
    >
      <ul>
        <li>
          <NuxtLink to="/produits">Boutique</NuxtLink>
        </li>
        <li v-if="product.categories.length">
          <NuxtLink :to="`/produits/categorie/${product.categories[0].slug}`"
            >{{ product.categories[0].name }}
          </NuxtLink>
        </li>

        <li class="is-active">
          <NuxtLink to="#" aria-current="page">{{ product.name }}</NuxtLink>
        </li>
      </ul>
    </nav>
    <br>
      <div class="lg:grid lg:grid-cols-3 lg:gap-x-8 lg:items-start">
        <!-- Image gallery -->
        <div class="flex flex-col-reverse  col-span-1">
          <!-- Image selector -->
          <div
            class="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none"
          >
            <div
              class="grid grid-cols-4 gap-6"
              aria-orientation="horizontal"
              role="tablist"
            >
              <button
                id="tabs-1-tab-1"
                class="
                  relative
                  h-24
                  bg-white
                  rounded-md
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-medium
                  uppercase
                  text-gray-900
                  cursor-pointer
                  hover:bg-gray-50
                  focus:outline-none
                  focus:ring
                  focus:ring-offset-4
                  focus:ring-opacity-50
                "
                aria-controls="tabs-1-panel-1"
                role="tab"
                type="button"
              >
                <span class="sr-only"> Angled view </span>
                <span
                  class="
                    absolute
                    inset-0
                    rounded-md
                    overflow-hidden
                    border border-gray-200
                  "
                >
                  <img
                    :src="`${product.image_ext}.webp`"
                    alt=""
                    class="w-full h-full object-center object-cover"
                  />
                </span>
                <!-- Selected: "ring-indigo-500", Not Selected: "ring-transparent" -->
                <span
                  class="
                    ring-transparent
                    absolute
                    inset-0
                    rounded-md
                    ring-2 ring-offset-2
                    pointer-events-none
                  "
                  aria-hidden="true"
                ></span>
              </button>

              <!-- More images... -->
            </div>
          </div>

          <div class="w-full aspect-w-1 aspect-h-1 border border-gray-200">
            <!-- Tab panel, show/hide based on tab state. -->
            <div
              id="tabs-1-panel-1"
              aria-labelledby="tabs-1-tab-1"
              role="tabpanel"
              tabindex="0"
            >
              <img
                :src="`${product.image_ext}.webp`"
                :alt="product.name"
                class="w-full h-full object-center object-cover sm:rounded-lg"
              />
            </div>

            <!-- More images... -->
          </div>
        </div>

        <!-- Product info -->
        <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0 col-span-2">

          <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
         <!--  product primary infomation -->
            <div class="product-info">
                <span class="text-primary">{{ product.categories.title }}</span>
          <h1 class="text-2xl font-medium tracking-tight text-gray-900">
            {{ product.name }}
          </h1>
          <!-- Reviews -->
          <div class="mt-4">
            <h3 class="sr-only">Reviews</h3>
            <div class="flex items-center">
              <div class="flex items-center">
                <!--
                Heroicon name: solid/star

                Active: "text-yellow-500", Inactive: "text-gray-300"
              -->
                <svg
                  class="h-5 w-5 flex-shrink-0 text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>

                <!-- Heroicon name: solid/star -->
                <svg
                  class="h-5 w-5 flex-shrink-0 text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>

                <!-- Heroicon name: solid/star -->
                <svg
                  class="h-5 w-5 flex-shrink-0 text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>

                <!-- Heroicon name: solid/star -->
                <svg
                  class="h-5 w-5 flex-shrink-0 text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>

                <!-- Heroicon name: solid/star -->
                <svg
                  class="h-5 w-5 flex-shrink-0 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
              <p class="sr-only">4 out of 5 stars</p>
            </div>
          </div>
          <!-- Share btn -->
          <div class="extra-btn mt-3">
            <ul class="flex share-socials-list">
              <li class="facebook">
                <ShareNetwork
                  class="shareNetwork"
                  network="facebook"
                  :url="`https://cacsenegal.sn/produits/${product.slug}`"
                  :title="product.name"
                  :media="product.image_url"
                  :description="product.shortDescription"
                >
                  <b-icon icon="facebook" size="is-medium"></b-icon>
                </ShareNetwork>
              </li>
              <li class="twitter">
                <ShareNetwork
                  class="shareNetwork"
                  network="twitter"
                  :url="`https://cacsenegal.sn/produits/${product.slug}`"
                  :title="product.name"
                  :media="product.image_url"
                  hashtag="cacsenegal"
                  :description="product.shortDescription"
                >
                  <b-icon icon="twitter" size="is-medium"></b-icon>
                </ShareNetwork>
              </li>
              <li class="whatsapp">
                <ShareNetwork
                  class="shareNetwork"
                  network="whatsapp"
                  :media="product.image_url"
                  :url="`https://cacsenegal.sn/produits/${product.slug}`"
                  :title="product.name"
                  :description="product.shortDescription"
                >
                  <b-icon icon="whatsapp" size="is-medium"></b-icon>
                </ShareNetwork>
              </li>
              <li></li>
            </ul>
          </div>
              <!-- divder -->
          <div class="mt-4 mb-4 border-t divide-y divide-gray-200"></div>

          <div class="short-description text-gray-500 pl-4 ">
          <span v-html="product.description"></span>
          </div>

          <div class="mt-0">
            <h3 class="sr-only">Description</h3>

            <!-- <div
              class="text-base text-gray-500 space-y-6"
              v-html="product.description"
            ></div> -->
          </div>
                  <!-- divder -->
          <div class="mt-4 mb-4 border-t divide-y divide-gray-200"></div>
          <div class="extra-description ">
            <ul class="list-disc pl-4 text-gray-500">
              <li>SKU: {{product.sku}}</li>
              <li>Catégorie: <NuxtLink :to="`/produits/categorie/${product.categories[0].slug}`" class="text-primary" >{{product.categories[0].name}}</NuxtLink> </li>
            </ul>
          </div>
          <br>
          <p>Livraison rapide partout au sénégal</p>
          <p>Transaction 100% Sécurisé</p>

      <!--     <section aria-labelledby="details-heading" class="mt-4">
            <h2 id="details-heading" class="sr-only">Additional details</h2>

            <div class="border-t divide-y divide-gray-200"></div>
          </section> -->
            </div>
            <div class="h-full rounded-lg border border-gray-300 px-5 py-4">
            <span>Diponibilité: <span class="text-green-600 font-bold">{{getStatusHumain(product.status)}}</span></span>
         <div class="mt-2 mb-4 border-t divide-y divide-gray-200"></div>
        <div class="">
          <h2 class="sr-only">Product information</h2>
        <div class="flex ">
            <p class="text-3xl text-gray-900">{{ product.onSale? product.salePrice : product.price | currency }}</p>
          <div class="promo ml-2" v-if="product.onSale">
        -{{ salePercentage }}%
      </div>
        </div>
    <div v-if="product.onSale" class="">
      <h6 class="text-lg line-through pr-4 text-gray-500 " >{{ product.price | currency }}</h6>

    </div>
        </div> 
        <br>
               <b-field grouped v-if="product.status == 'ACTIVE'">
            <b-select placeholder="Quantité" v-model="quantityToBeAdd">
              <option
                v-for="option in 10"
                :value="option"
                :key="option"
              >
                {{ option }}
              </option>
            </b-select>
            <p style="width: 100%" >
              <b-button
                @click="addProductToCart({ product, quantityToBeAdd })"
                label="Ajouter au panier"
                type="is-primary"
                expanded
              />
            </p>
          </b-field>
            </div>
           
          </div>
        
        </div>
       <!-- Product info -->
      </div>
    </div>
  </div>
  <!-- Product specs -->
  <section class="bg-cac-bg-gray pt-10 pb-10">
    <div class="bg-white max-w-2xl mx-auto py-5 px-10 sm:px-6 lg:px-28 sm:py-13 lg:max-w-7xl min-h-96 ">
         <section class="product-informations">
            <b-tabs v-model="activeTab">
              <b-tab-item label="Description">
                <div v-html="product.description"></div>
              </b-tab-item>

              <b-tab-item label="Fiche technique">
           <!--      <div
                  v-for="({ name, specifications }, index1) of product.details"
                  :key="index1"
                >
                  <div>
                    <h4 class="spec-name">{{ name }}</h4>
                  </div>
                  <div>
                    <table class="specs-table">
                      <tbody>
                        <tr
                          v-for="(spec, index2) of specifications"
                          :key="index2"
                        >
                          <td class="table-key">{{ spec.name }}</td>
                          <td class="table-value">{{ spec.value }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div> -->
              </b-tab-item>
            </b-tabs>
          </section>
    </div>


  </section>
    <div  class="max-w-2xl mx-auto  px-4  sm:px-6 lg:max-w-7xl lg:px-8" >
 
          <div class="grid-x mt-5">
      <div class="small-12 cell">
       

           <HomeExpoB v-if="suggestions.length > 0" :hideProductsTitle="true" :limit=6 sectionTitle="Produits similaires" :products="suggestions"
         class="hidden md:block " />
      <HomeExpoB v-if="suggestions.length > 0" :hideProductsTitle="true" :limit=2 sectionTitle="Produits similaires" :products="suggestions"
        class=" md:hidden mx-2" />
      </div>
    </div>

</div>
</div>

  
</template>
<script>
import Slick from "vue-slick";
import { mapActions, mapGetters } from "vuex";
import "slick-carousel/slick/slick-theme.scss";

export default {
  components: {
    Slick,
  },
  auth: false,
  head() {
    return {
      title: "CAC SENEGAL | " + this.product.name,
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          hid: "description",
          name: "description",
          content: this.product.name,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.product.name,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.product.shortDescription,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.product.image_url,
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: this.product.name,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.product.name,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.product.shortDescription,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.product.image_url,
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: this.product.image_url,
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: this.product.name,
        },
      ],
    };
  },
  async asyncData({ $axios, route }) {
    const slug = route.params.slug;
    console.log(route.params.slug);
    
    try {
      const { data, status } = await $axios.get(`/product/${slug}`);

      if (status === 200) {
       // console.log(data);
        return {
          product: data.data,
          isLoaded: true,
        };
      }
    } catch (e) {
      console.error(e);
    }
  },
  mounted() {
    this.getTest();
    this.key++;
    if (this.product && this.product.categories.length > 0) {
      this.getSuggestions(this.product.categories[0]._id);
    }
  },
  destroyed() {},
  data() {
    return {
      suggestions: [],
      isLoaded: false,
      key: 0,
      product: {},
      itvem: {
        productss: {},
        productQuantity: 1,
      },
      quantityToBeAdd: 1,
      activeTab: 0,

      productTest: {
        images: [
          {
            _id: "6231ced5a6841c0042402fb0",
            filename: "16-2-2022/1_ed_u8ewgthd2ylphtmm2v.png",
            scope: "INTERNAL",
            size: 745266,
            contentType: "image/png",
            createdAt: "2022-03-16T11:49:41.227Z",
            updatedAt: "2022-03-16T11:49:41.227Z",
            __v: 0,
          },
        ],
        tags: [],
        categories: [
          {
            children: [],
            _id: "60b5c47cb85af600289ed8ae",
            level: 3,
            order: 1,
            name: "Split Mural",
            slug: "split-mural",
            parent: "60b5c0e5b85af600289ed89a",
            show: true,
            __v: 0,
            id: "60b5c47cb85af600289ed8ae",
          },
        ],
        _id: "61f9262aa4ff1500336bcc06",
        name: "Split Mural Inverter 1.5 CV 12000 Btu Beko BBVGM121",
        sku: "BEKOBBVGM121",
        description:
          "<h2>Utilisé dans le cadre résidentiel comme professionnel, le système de climatisation split se distingue de la climatisation monobloc par la « séparation » des unités qui le composent. Le terme « split » signifie d’ailleurs « séparé » en anglais. Le climatiseur split est constitué d’une unité extérieure et d’une ou plusieurs unités intérieures qui sont réparties dans les différentes pièces du logement en fonction des besoins de rafraichissement. Ce type de climatisation séduit par sa modularité et ses excellentes performances. la climatisation split absorbe les calories contenues dans les pièces pour les transporter vers l’extérieur du logement, ce qui aura pour effet immédiat de les rafraîchir. En aspirant l’air intérieur, votre climatiseur va progressivement s’encrasser. Il est donc impératif de procéder régulièrement au nettoyage des différents filtres qui se trouvent dans les unités. Cette simple opération permettra à la fois d’assurer le bon fonctionnement du système mais également d’allonger sa durée de vie.</h2>",
        shortDescription: "Split Mural Inverter 1.5 CV 12000 Btu",
        attributes: [],
        brand: {
          _id: "60ac256a70071e0028b9da50",
          name: "Beko",
          slug: "beko",
          __v: 0,
          logo: "6107d15e9620e9001c9156b7",
        },
        price: 280000,
        tax: 0,
        quantityPerSale: 5,
        composables: [],
        buyWith: [
          {
            images: [
              {
                _id: "61375976eb91fb0043c4af1e",
                filename:
                  "7-8-2021/nouveau-projet-12_yzes-1kbea3frvpcp-fqy.png",
                scope: "INTERNAL",
                size: 163977,
                contentType: "image/png",
                createdAt: "2021-09-07T12:22:14.233Z",
                updatedAt: "2021-09-07T12:22:14.233Z",
                __v: 0,
              },
            ],
            tags: [],
            categories: ["60b5ce8eb85af600289ed8eb"],
            _id: "613759997ffe9a003043cd78",
            name: "Support split mural 9000/12000 BTU",
            sku: "SPLITSUPPORT1",
            description: "<h2>Support split mural 9000/12000 BTU</h2>",
            shortDescription: "Support split mural",
            attributes: [],
            brand: "6113af3b2abf680028b6e095",
            price: 10000,
            tax: 0,
            quantityPerSale: 99,
            composables: [],
            buyWith: [],
            keywords: "",
            variations: [],
            details: [],
            status: "ACTIVE",
            promotion: 0,
            slug: "support-split-mural-900012000-btu_WHdoe3URK0",
            createdAt: "2021-09-07T12:22:49.531Z",
            updatedAt: "2021-11-23T11:24:34.543Z",
            __v: 0,
            term_values: [],
            image_url:
              "https://api.cacsenegal.com/storage/7-8-2021/nouveau-projet-12_yzes-1kbea3frvpcp-fqy.png",
            images_url: [
              "https://api.cacsenegal.com/storage/7-8-2021/nouveau-projet-12_yzes-1kbea3frvpcp-fqy.png",
            ],
            image_ext:
              "https://api.cacsenegal.com/storage/7-8-2021/nouveau-projet-12_yzes-1kbea3frvpcp-fqy",
            images_ext: [
              "https://api.cacsenegal.com/storage/7-8-2021/nouveau-projet-12_yzes-1kbea3frvpcp-fqy",
            ],
            id: "613759997ffe9a003043cd78",
          },
          {
            images: [
              {
                _id: "6138bca2034be90029fbf902",
                filename: "8-8-2021/nouveau-projet_jdjmofh7-1j_gxfhyd6sw.png",
                scope: "INTERNAL",
                size: 1617676,
                contentType: "image/png",
                createdAt: "2021-09-08T13:37:38.982Z",
                updatedAt: "2021-09-08T13:37:38.982Z",
                __v: 0,
              },
            ],
            tags: [],
            categories: ["60b5ce8eb85af600289ed8eb"],
            _id: "6138bb40034be90029fbf8f8",
            name: "Installation Split ",
            sku: "INSTALSPLIT",
            description: "<h2>Installation Split</h2>",
            shortDescription: "Installation Split ",
            attributes: [],
            brand: "6113af3b2abf680028b6e095",
            price: 25000,
            tax: 0,
            quantityPerSale: 99,
            composables: [],
            buyWith: [],
            keywords: "",
            variations: [],
            details: [],
            status: "ACTIVE",
            promotion: 0,
            slug: "installation-split_Oe37AWuvvN",
            createdAt: "2021-09-08T13:31:44.935Z",
            updatedAt: "2021-12-03T12:41:08.784Z",
            __v: 0,
            term_values: [],
            image_url:
              "https://api.cacsenegal.com/storage/8-8-2021/nouveau-projet_jdjmofh7-1j_gxfhyd6sw.png",
            images_url: [
              "https://api.cacsenegal.com/storage/8-8-2021/nouveau-projet_jdjmofh7-1j_gxfhyd6sw.png",
            ],
            image_ext:
              "https://api.cacsenegal.com/storage/8-8-2021/nouveau-projet_jdjmofh7-1j_gxfhyd6sw",
            images_ext: [
              "https://api.cacsenegal.com/storage/8-8-2021/nouveau-projet_jdjmofh7-1j_gxfhyd6sw",
            ],
            id: "6138bb40034be90029fbf8f8",
          },
        ],
        keywords: "",
        variations: [],
        details: [
          {
            _id: "61f9262aa4ff1500336bcc07",
            name: "SPÉCIFICATIONS",
            specifications: [
              {
                name: "Puissance",
                value: "12000 Btu",
              },
              {
                name: "Classe énergétique",
                value: "A+",
              },
              {
                name: "Fonction Inverter ",
                value: "Oui",
              },
              {
                name: "IonGuard",
                value: "Oui",
              },
              {
                name: "Redémarrage Automatique",
                value: "Oui",
              },
              {
                name: "Fonction de Déshumidification",
                value: "Oui",
              },
              {
                name: "Filtre à Carbone Actif",
                value: "Oui",
              },
            ],
          },
        ],
        status: "ACTIVE",
        promotion: 0,
        slug: "split-mural-inverter-15-cv-12000-btu-beko-bbvgm121_UGCd2nPwm4",
        createdAt: "2022-02-01T12:23:06.825Z",
        updatedAt: "2022-03-25T10:24:04.158Z",
        __v: 0,
        term_values: [],
        image_url:
          "https://api.cacsenegal.com/storage/16-2-2022/1_ed_u8ewgthd2ylphtmm2v.png",
        images_url: [
          "https://api.cacsenegal.com/storage/16-2-2022/1_ed_u8ewgthd2ylphtmm2v.png",
        ],
        image_ext:
          "https://api.cacsenegal.com/storage/16-2-2022/1_ed_u8ewgthd2ylphtmm2v",
        images_ext: [
          "https://api.cacsenegal.com/storage/16-2-2022/1_ed_u8ewgthd2ylphtmm2v",
        ],
        categoryLevel3: "Split Mural",
        id: "61f9262aa4ff1500336bcc06",
      },
      itemA: {
        product: {
          detail: [
            {
              name: "Nombre de Programmes",
              value: "15",
            },
            {
              name: "Classe Energétique",
              value: "A+++",
            },
            {
              name: "Niveau Sonore-Lavage/Essorage (dB)",
              value: "61/77",
            },
            {
              name: "Couleur du Produit",
              value: "Blanc",
            },
          ],
        },
        productQuantity: 1,
      },
      quantityPerSale: 10,

      slickOptions: {
        centerMode: true,
        slidesToShow: 1,
        //autoplay: true,
        dots: false,
        arrows: false,
        adaptiveHeight: true,
        fade: true,

        asNavfor: ".sliderNav",
        // Any other options that can be got from plugin documentation
      },

      bottomSlickOptions: {
        // centerMode:true,
        /// centerPadding: '60px',
        slidesToShow: 4,
        slidesToScroll: 4,

        //autoplay: true,
        dots: true,
        inifinite: false,
        arrows: true,
        //adaptiveHeight: true,
        focusOnSelect: true,
        asNavfor: ".sliderFor",
        // Any other options that can be got from plugin documentation
      },
      zoomerOptions: {
        zoomFactor: 2, // scale for zoomer
        pane: "container-round",
        hoverDelay: 600,
        namespace: "zoomer",
        move_by_click: false,
        scroll_items: 5,
        choosed_thumb_border_color: "orange",
        scroller_button_style: "line",
        scroller_position: "bottom",
        zoomer_pane_position: "right",
      },
    };
  },
  computed: {
      salePercentage() {
     return ((this.product.price - this.product.salePrice) / this.product.price) * 100;
    },
    processedImages() {
      return {
        thumbs: this.product.images_ext.map((image, index) => {
          return {
            id: index + 1,
            url: `${image}-100.webp`,
          };
        }),
        normal_size: this.product.images_ext.map((image, index) => {
          return {
            id: index + 1,
            url: `${image}-600.webp`,
          };
        }),
        large_size: this.product.images_ext.map((image, index) => {
          return {
            id: index + 1,
            url: `${image}-1080.webp`,
          };
        }),
      };
    },
  },
  methods: {
    ...mapActions({
      addProductToCart: "cart/addProductToCart",
    }),
           getStatusHumain(status){
            switch (status) {
                case "ACTIVE":
                    return "EN STOCK"
                    break;

                case "SOLD_OUT":
                    return "RUPTURE DE STOCK"
                    break;

                case "ECHEC":
                    return "badge-soft-danger"
                    break;
                
                 case "ANNULÉ":
                    return "badge-soft-danger"
                    break;
                
                case "TERMINÉE":
                    return "badge-success"
                    break;

                case "ANNULÉE":
                    return "badge-danger"
                    break;
                
                 case "VALIDÉE":
                    return "badge-info"
                    break;
                
                case "EN COURS":
                    return "badge-warning"
                    break;
            
                default:
                return "badge-soft-warning";
                    break;
            }
        },
    async getSuggestions(category) {
      try {
        const { data, status } = await this.$axios.get(
          `product/suggest/${category}`
        );

        if (status === 200) {
          this.suggestions = data;
        }
      } catch (e) {
        console.error(e);
      }
    },
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
    handleGoTo(slideIndex, dontAnimate) {
      const doc = document.getElementsByClassName(".sliderFor");
      this.$refs.sliderFor.goTo(slideIndex);
    },
    handleSwipe(event, slick, direction) {
      const doc = document.getElementsByClassName(".sliderNav");
      console.log("handleSwipe", slick.currentSlide, direction);
      this.$refs.sliderNav.goTo(slick.currentSlide);
    },
    async getTest() {
      const slug = route.params.slug;
      try {
        const { data, status } = await $axios.get(`/products/${slug}`);

        // const { data, brands, tags } = await $axios.get("/product");
       // console.log(data);
      } catch (e) {
        console.log(e);
        if (e.response.status === 404) {
          console.log(e.response.statusText);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/sass/partials/global.scss";

.buyWith-container {
  @include standard-card-simple();
  background: floralwhite;
  position: relative;

  &:hover {
    .addToCartContainer {
      background-color: rgb(255 255 255 / 0.8);
      display: flex;
    }
  }

  .addToCartContainer {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgb(255 255 255 / 0);
    display: flex;
    align-items: center;
    justify-content: center;
    display: none;

    .addComboToCartBtn {
    }
  }
}

 

.shareNetwork {
  padding: 10px  15px;
  &:nth-child(1){
  padding-left: 0;
  }
}

.spec-name {
  font-size: 18px;
  font-weight: 600;
  margin-top: 11px;
  margin-bottom: 4px;
}

.whatsapp-btn {
  margin: 10px 0;

  a {
    @include standard-card();

    &::before {
      border-radius: 50vh;
    }

    position: relative;

    .wa-icon {
      position: absolute;
      left: 10px;
    }

    display: flex;
    // align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-left: 70px;
    color: white;
    // text-align: center;
    width: 300px;
    background: #2db742;
    min-height: 60px;
    //display: block;
    border-radius: 50vh;

    .wa-title {
      font-size: 12px;
      display: block;
    }

    .wa-desc {
      font-weight: 600;
      display: block;
    }
  }
}

.specs-table {
  td {
    padding-right: 25px;
    padding-left: 25px;
  }

  .table-key {
    background-color: $the-grey;
  }

  .table-value {
  }
}

.white-card-board {
  background: #fff;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 5%);
  padding: 16px;

  .sliderFor {
    min-height: 7rem;
    margin-bottom: 10px;
    @include breakpoint(mobileonly) {
      //min-height: 23rem;
    }
  }

  .sliderNav {
    width: 75%;
    margin: 0 auto;
    //min-height: 7rem;

    @include breakpoint(mobileonly) {
      //min-height: 23rem;
    }
  }
}

.product-meta {
  .product-name {
    font-weight: 500;
  }

  .extra-detail {
    color: grey;
    // display: none;
  }
}

.brand-name {
  color: $primary-color;
  text-transform: uppercase;
  font-weight: 600;
}

.product-price {
  font-size: calculateRem(30px);
  font-weight: 600;
}

.product-gallery {
  padding-left: 0;
  position: relative;

  .out-of-stock {
    position: absolute;

    img {
      width: 8rem;
    }
  }

 

  @include breakpoint(latop) {
    padding-left: 125px;
  }

  .sliding-img {
    padding: 0 65px;

    img {
      max-width: 65%;
      margin: 0 auto;
    }
  }

  .slidingNav-img {
    padding: 13px;

    img {
      max-width: 65%;
      margin: 0 auto;
      border: 1px grey solid;
    }
  }

  .mini-img-list {
    position: absolute;
    display: none;
    left: 0;
    top: 0;

    ul {
      width: 124px;

      @include breakpoint(phablet) {
        // flex-direction: column;
      }

      flex-direction: column;
      display: flex;
      justify-content: space-between;
      margin: 0;
      flex-wrap: wrap;

      li {
        a {
          height: 87px;
          width: 87px;
          /*      @include breakpoint(laptop) {
         height: 100%;
         width: 100%;
       } */
          display: block;
          margin: 0 auto;
          margin-bottom: 10px;
          padding: 5px 0;
          border: 1px grey solid;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
}

.share-socials-list {
  li {
    &.facebook {
      a {
        color: #4267b2 !important;
      }
    }

    &.youtube {
      a {
        color: #ff0000 !important;
      }
    }

    &.twitter {
      a {
        color: #1da1f2 !important;
      }
    }

    &.instagram {
      a {
        color: #5b51d8 !important;
      }
    }

    &.whatsapp {
      a {
        color: rgb(53, 182, 81) !important;
      }
    }

    &:hover {
      color: $the-black !important;

      a {
        color: $the-black !important;
      }
    }
  }
}

.tabs li.is-active a {
  color: blue !important;
}
  .promo {
 
    
    color: $primary-color;

    background-color: rgba(34,180,140, 0.2);
    border-radius: 5px;
    padding: 3px;
    height: 30px;
    font-weight: bolder;
  }
</style>
