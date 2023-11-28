<template>
  <div class="grid-container pt-8 pb-8">
    <nav
      class="breadcrumb is-small mb-2 show-for-large"
      aria-label="breadcrumbs"
    >
      <ul>
        <li>
          <NuxtLink to="/">Boutique</NuxtLink>
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
    <div class="grid-x grid-margin-x" v-if="product.images.length">
      <div class="small-12 medium-7 cell">
        <div class="white-card-board">
          <div class="product-meta mb-4">
            <p class="brand-name is-size-6-mobile">
              {{ product.brand ? product.brand.name : "" }}
            </p>
            <h2 class="product-name is-size-5 is-size-7-mobile">
              {{ product.name }}
            </h2>
            <p class="extra-detail">{{ product.shortDescription }}</p>
          </div>
          <div class="divider"></div>

          <div class="product-gallery mt-4">
            <div class="out-of-stock" v-if="product.status === 'SOLD_OUT'">
              <img src="@/assets/images/rs2.png" alt="" />
            </div>
            <div
              class="promo"
              v-if="product.promotion && product.status !== 'SOLD_OUT'"
            >
              Promo -{{ product.promotion }}%
            </div>
            <div class="mini-img-list show-for-large">
              <!-- hide-for-small-only -->
              <ul>
                <li
                  style="cursor: pointer"
                  v-for="(image, index) of product.images_ext"
                  :key="index"
                >
                  <a v-on:click="handleGoTo(index, true)">
                    <img
                      :src="`${image}.webp`"
                      :alt="product.slug"
                      :srcset="`
                    ${image}-100.webp 100w,
                    ${image}-180.webp 180w,
                    ${image}-300.webp 300w,
                    ${image}-600.webp 600w,
                    `"
                    />
                  </a>
                </li>
              </ul>
            </div>
            <div class="">
              <client-only>
                <ProductZoomer
                  ref="productPreview"
                  :base-images="processedImages"
                  :base-zoomer-options="zoomerOptions"
                  :key="key"
                />
              </client-only>
            </div>
          </div>
        </div>
      </div>
      <div class="small-12 medium-5 cell">
        <div class="white-card-board">
          <b-taglist class="mb-0">
            <b-tag v-if="product.promotion" type="is-warning" size="is-medium">
              -{{ product.promotion }}%
            </b-tag>
          </b-taglist>
          <div class="product-price">
            <span
              :class="{ 'line-through': product.promotion }"
              class="is-su"
              >{{ product.price | currency }}</span
            >
            <span v-if="product.promotion">{{
              (product.price - (product.price * product.promotion) / 100)
                | currency
            }}</span>
          </div>
          <div class="divider mt-4 mb-4"></div>
          <b-field grouped v-if="product.status === 'ACTIVE'">
            <b-select placeholder="Quantité" v-model="quantityToBeAdd">
              <option
                v-for="option in product.quantityPerSale"
                :value="option"
                :key="option"
              >
                {{ option }}
              </option>
            </b-select>
            <p style="width: 100%">
              <b-button
                @click="addProductToCart({ product, quantityToBeAdd })"
                label="Ajouter au panier"
                type="is-primary"
                expanded
              />
            </p>
          </b-field>
        </div>
        <div class="extra-btn">
           
          <span><h5 class="title is-5 mt-5">Partager via</h5></span>
          <ul class="menu share-socials-list">
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
        <template v-if="product.buyWith.length > 0">
          <h5 class="title is-5 mt-5">Acheter ensemble</h5>
        </template>
        <div v-if="product.buyWith.length > 0" class="buyWith-container mt-2">
          <ul class="grid-x bordered-cell">
            <li class="item-wrapper small-6 cell large-4 medium-4">
              <ProductCardMini
                class=""
                @addToCart="
                  addProductToCart({ product: product, productQuantity: 1 })
                "
                :product="product"
              />
            </li>
            <li
              v-for="product in product.buyWith"
              v-bind:key="product.title"
              class="item-wrapper small-6 cell large-4 medium-4"
            >
              <ProductCardMini
                class=""
                @addToCart="
                  addProductToCart({ product: product, productQuantity: 1 })
                "
                :product="product"
              />
            </li>
          </ul>
<!--           <div class="addToCartContainer">
            <p class="addComboToCartBtn" style="width: 60%">
              <b-button
                @click="
                  addProductToCart({
                    e: [product, ...product.buyWith],
                    quantityToBeAdd,
                  })
                "
                :label="
                  `Ajouter les ` + (product.buyWith.length + 1) + ` au panier`
                "
                type="is-primary"
                expanded
              />
            </p>
          </div> -->
        </div>
      </div>
    </div>
    <div class="grid-x mt-5">
      <div class="small-12 cell">
        <div class="white-card-board">
          <section class="product-informations">
            <b-tabs v-model="activeTab">
              <b-tab-item label="Description">
                <div v-html="product.description"></div>
              </b-tab-item>

              <b-tab-item label="Fiche technique">
                <div
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
                </div>
              </b-tab-item>
            </b-tabs>
          </section>
        </div>
      </div>
    </div>
    <div class="grid-x mt-5">
      <div class="small-12 cell">
        <HomeExpoB
          sectionTitle="Recommandations"
          subTitle="Nos meilleurs ventes en éléctroménagers"
          :products="suggestions"
          v-if="suggestions.length > 0"
        />
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
    try {
      const { data, status } = await $axios.get(`/products/${slug}`);

      if (status === 200) {
      console.log(data);
        return {
          products: data,
          isLoaded: true,
        };
      }
    } catch (e) {
      console.error(e);
    }

    return {
      product: {},
    };
  },
  mounted() {
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
      itvem: {
        productss: {},
        productQuantity: 1,
      },
      quantityToBeAdd: 1,
      activeTab: 0,

       product: {
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

.line-through {
  text-decoration: line-through;
  font-size: 0.8rem;
}

.shareNetwork {
  padding: 10px;
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

  .promo {
    position: absolute;
    right: 0;
    bottom: 0;
    color: white;

    background-color: #ffe08a;
    border-radius: 5px;
    padding: 2px 4px;
    font-weight: bolder;
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
        color: #4267b2;
      }
    }

    &.youtube {
      a {
        color: #ff0000;
      }
    }

    &.twitter {
      a {
        color: #1da1f2;
      }
    }

    &.instagram {
      a {
        color: #5b51d8;
      }
    }

    &.whatsapp {
      a {
        color: rgb(53, 182, 81);
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
</style>
