<template>
  <div class="mx-auto container">
    <div class="w-full h-full pb-64 relative">
      <img
        class="absolute w-full h-full z-0"
        src="https://i.ibb.co/m8jcyZR/Hero.png"
      />
      <div class="relative z-20">
        <div class="flex items-center justify-between py-10 md:px-20 px-4">
          <div class="cursor-pointer">
            <svg
              width="64"
              height="40"
              viewBox="0 0 64 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 21.3189C0.0414124 31.586 8.42031 40 18.7135 40C29.0319 40 37.4263 31.6199 37.4263 21.3189V18.6817C37.4263 14.4401 40.8833 10.989 45.1321 10.989C49.3815 10.989 52.8379 14.4401 52.8379 18.6817C52.8379 19.8954 53.8237 20.8796 55.0395 20.8796H61.6445C62.8609 20.8796 63.8462 19.8954 63.8462 18.6817C63.8462 8.38072 55.4518 0 45.1327 0C34.8142 0 26.4192 8.38072 26.4192 18.6817V21.3189C26.4192 25.5611 22.9622 29.011 18.7141 29.011C14.4653 29.011 11.0083 25.5611 11.0083 21.3189C11.0083 20.1052 10.0224 19.121 8.80662 19.121H2.20166C0.985862 19.1216 0 20.1052 0 21.3189Z"
                fill="white"
              />
            </svg>
          </div>

          <div class="lg:flex hidden items-center justify-between">
            <p
              tabindex="0"
              class="focus:outline-none hover:text-gray-300 text-base cursor-pointer font-medium leading mr-4 p-2 focus:ring focus:ring-offset focus:ring-white text-center text-white"
            >
              Home
            </p>
            <p
              tabindex="0"
              class="focus:outline-none hover:text-gray-300 text-base cursor-pointer font-medium leading mr-4 p-2 focus:ring focus:ring-offset focus:ring-white text-center text-white"
            >
              About
            </p>
            <p
              tabindex="0"
              class="focus:outline-none hover:text-gray-300 text-base cursor-pointer font-medium leading mr-4 p-2 focus:ring focus:ring-offset focus:ring-white text-center text-white"
            >
              Pricing
            </p>
            <p
              tabindex="0"
              class="focus:outline-none hover:text-gray-300 text-base cursor-pointer font-medium leading mr-4 p-2 focus:ring focus:ring-offset focus:ring-white text-center text-white"
            >
              Resources
            </p>
            <button
              class="text-base font-medium leading-none text-center text-white py-3 px-4 border rounded border-white hover:text-gray-300 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:border-gray-100"
            >
              Get Started
            </button>
          </div>
          <div class="lg:hidden text-white">
            <svg
              id="open"
              onclick="MenuHandler(true)"
              aria-haspopup="true"
              aria-label="Main Menu"
              xmlns="http://www.w3.org/2000/svg"
              class="show-m-menu icon icon-tabler icon-tabler-menu"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <line x1="4" y1="8" x2="20" y2="8"></line>
              <line x1="4" y1="16" x2="20" y2="16"></line>
            </svg>
            <div
              id="close"
              class="hidden close-m-menu"
              onclick="MenuHandler(false)"
            >
              <svg
                aria-label="Close"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </div>
        </div>
        <nav class="lg:hidden relative z-40 px-4">
          <div class="w-full">
            <div class="visible flex items-center">
              <ul
                id="list"
                class="hidden p-2 bg-white absolute rounded top-0 left-0 right-0 shadow mt-4"
              >
                <li
                  class="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none"
                >
                  <a href="javascript:void(0)">
                    <span class="ml-2 font-bold">Home</span>
                  </a>
                </li>
                <li
                  class="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center"
                  onclick="dropdownHandler(this)"
                >
                  <a href="javascript:void(0)">
                    <span class="ml-2 font-bold">About</span>
                  </a>
                </li>
                <li
                  class="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none"
                >
                  <a href="javascript:void(0)">
                    <span class="ml-2 font-bold">Pricing</span>
                  </a>
                </li>
                <li
                  class="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center"
                  onclick="dropdownHandler(this)"
                >
                  <a href="javascript:void(0)">
                    <span class="ml-2 font-bold">Resources</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <p
          class="mt-40 text-base md:px-0 px-4 font-medium tracking-widest leading-none text-center text-white uppercase"
        >
          Accelerate your growth
        </p>
        <h1
          class="md:block hidden text-7xl font-bold text-center mt-6 text-white"
        >
          Top of the line technology<br />
          consultancy, keeping you ahead
        </h1>
        <h1
          class="md:hidden px-4 text-2xl font-bold text-center mt-6 text-white"
        >
          Top of the line technology consultancy, keeping you ahead
        </h1>
        <div
          class="flex items-center justify-center w-full md:mt-12 mt-6 md:pb-32 pb-24"
        >
          <button
            class="flex items-center justify-center text-base text-center text-indigo-700 font-semibold md:px-7 px-4 md:py-4 py-3 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-white-700 focus:outline-none bg-white rounded-lg"
          >
            Lets get started!
          </button>
        </div>
      </div>
    </div>
    <div
      class="flex items-center w-full xl:justify-end justify-center relative z-20"
    >
      <div class="-mt-32 xl:w-10/12 w-full">
        <div class="hidden lg:block">
          <Slick :arrows="false" ref="carousel">
            <div>
              <div class="lg:flex md:px-0 px-4 items-center">
                <div
                  class="py-10 pl-10 pr-8 bg-white shadow border rounded-xl mr-6"
                >
                  <h1 class="text-3xl font-medium text-gray-800">UX Design</h1>
                  <p class="text-base leading-6 pt-9 text-gray-800">
                    Best in class UX design services that launch and manage your
                    product with a lean methadology. Test, iterate and find the
                    perfect set of characteristics that match your target
                    audience
                  </p>
                  <p
                    class="text-base font-semibold leading-4 pt-9 underline cursor-pointer text-gray-500"
                  >
                    Explore
                  </p>
                </div>
                <div
                  class="py-10 md:my-0 my-8 pl-10 pr-8 bg-white shadow border rounded-xl mr-6"
                >
                  <h1 class="text-3xl font-medium text-gray-800">UX Design</h1>
                  <p class="text-base leading-6 pt-9 text-gray-800">
                    Best in class UX design services that launch and manage your
                    product with a lean methadology. Test, iterate and find the
                    perfect set of characteristics that match your target
                    audience
                  </p>
                  <p
                    class="text-base font-semibold leading-4 pt-9 underline cursor-pointer text-gray-500"
                  >
                    Explore
                  </p>
                </div>
                <div
                  class="py-10 pl-10 pr-8 bg-white shadow border rounded-xl mr-6"
                >
                  <h1 class="text-3xl font-medium text-gray-800">UX Design</h1>
                  <p class="text-base leading-6 pt-9 text-gray-800">
                    Best in class UX design services that launch and manage your
                    product with a lean methadology. Test, iterate and find the
                    perfect set of characteristics that match your target
                    audience
                  </p>
                  <p
                    class="text-base font-semibold leading-4 pt-9 underline cursor-pointer text-gray-500"
                  >
                    Explore
                  </p>
                </div>
              </div>
            </div>
            <div style="transform: translateX(200%)">
              <div class="lg:flex md:px-0 px-4 items-center">
                <div
                  class="py-10 pl-10 pr-8 bg-white shadow border rounded-xl mr-6"
                >
                  <h1 class="text-3xl font-medium text-gray-800">UX Design</h1>
                  <p class="text-base leading-6 pt-9 text-gray-800">
                    Best in class UX design services that launch and manage your
                    product with a lean methadology. Test, iterate and find the
                    perfect set of characteristics that match your target
                    audience
                  </p>
                  <p
                    class="text-base font-semibold leading-4 pt-9 underline cursor-pointer text-gray-500"
                  >
                    Explore
                  </p>
                </div>
                <div
                  class="py-10 md:my-0 my-8 pl-10 pr-8 bg-white shadow border rounded-xl mr-6"
                >
                  <h1 class="text-3xl font-medium text-gray-800">UX Design</h1>
                  <p class="text-base leading-6 pt-9 text-gray-800">
                    Best in class UX design services that launch and manage your
                    product with a lean methadology. Test, iterate and find the
                    perfect set of characteristics that match your target
                    audience
                  </p>
                  <p
                    class="text-base font-semibold leading-4 pt-9 underline cursor-pointer text-gray-500"
                  >
                    Explore
                  </p>
                </div>
                <div
                  class="py-10 pl-10 pr-8 bg-white shadow border rounded-xl mr-6"
                >
                  <h1 class="text-3xl font-medium text-gray-800">UX Design</h1>
                  <p class="text-base leading-6 pt-9 text-gray-800">
                    Best in class UX design services that launch and manage your
                    product with a lean methadology. Test, iterate and find the
                    perfect set of characteristics that match your target
                    audience
                  </p>
                  <p
                    class="text-base font-semibold leading-4 pt-9 underline cursor-pointer text-gray-500"
                  >
                    Explore
                  </p>
                </div>
              </div>
            </div>
            <div style="transform: translateX(400%)">
              <div class="lg:flex md:px-0 px-4 items-center">
                <div
                  class="py-10 pl-10 pr-8 bg-white shadow border rounded-xl mr-6"
                >
                  <h1 class="text-3xl font-medium text-gray-800">UX Design</h1>
                  <p class="text-base leading-6 pt-9 text-gray-800">
                    Best in class UX design services that launch and manage your
                    product with a lean methadology. Test, iterate and find the
                    perfect set of characteristics that match your target
                    audience
                  </p>
                  <p
                    class="text-base font-semibold leading-4 pt-9 underline cursor-pointer text-gray-500"
                  >
                    Explore
                  </p>
                </div>
                <div
                  class="py-10 md:my-0 my-8 pl-10 pr-8 bg-white shadow border rounded-xl mr-6"
                >
                  <h1 class="text-3xl font-medium text-gray-800">UX Design</h1>
                  <p class="text-base leading-6 pt-9 text-gray-800">
                    Best in class UX design services that launch and manage your
                    product with a lean methadology. Test, iterate and find the
                    perfect set of characteristics that match your target
                    audience
                  </p>
                  <p
                    class="text-base font-semibold leading-4 pt-9 underline cursor-pointer text-gray-500"
                  >
                    Explore
                  </p>
                </div>
                <div
                  class="py-10 pl-10 pr-8 bg-white shadow border rounded-xl mr-6"
                >
                  <h1 class="text-3xl font-medium text-gray-800">UX Design</h1>
                  <p class="text-base leading-6 pt-9 text-gray-800">
                    Best in class UX design services that launch and manage your
                    product with a lean methadology. Test, iterate and find the
                    perfect set of characteristics that match your target
                    audience
                  </p>
                  <p
                    class="text-base font-semibold leading-4 pt-9 underline cursor-pointer text-gray-500"
                  >
                    Explore
                  </p>
                </div>
              </div>
            </div>
          </Slick>
        </div>
        <div class="-mt-32 xl:w-10/12 w-full lg:hidden">
          <Slick :arrows="false" ref="carousel">
            <div class="lg:flex md:px-0 px-4 items-center">
              <div
                class="py-10 pl-10 pr-8 bg-white shadow border rounded-xl mr-6"
              >
                <h1 class="text-3xl font-medium text-gray-800">UX Design</h1>
                <p class="text-base leading-6 pt-9 text-gray-800">
                  Best in class UX design services that launch and manage your
                  product with a lean methadology. Test, iterate and find the
                  perfect set of characteristics that match your target audience
                </p>
                <p
                  class="text-base font-semibold leading-4 pt-9 underline cursor-pointer text-gray-500"
                >
                  Explore
                </p>
              </div>              
            </div>
            <div style="transform: translateX(200%)">
              <div class="lg:flex md:px-0 px-4 items-center">
                <div
                  class="py-10 pl-10 pr-8 bg-white shadow border rounded-xl mr-6"
                >
                  <h1 class="text-3xl font-medium text-gray-800">UX Design</h1>
                  <p class="text-base leading-6 pt-9 text-gray-800">
                    Best in class UX design services that launch and manage your
                    product with a lean methadology. Test, iterate and find the
                    perfect set of characteristics that match your target
                    audience
                  </p>
                  <p
                    class="text-base font-semibold leading-4 pt-9 underline cursor-pointer text-gray-500"
                  >
                    Explore
                  </p>
                </div>                
              </div>
            </div>
            <div style="transform: translateX(400%)">
              <div class="lg:flex md:px-0 px-4 items-center">
                <div
                  class="py-10 pl-10 pr-8 bg-white shadow border rounded-xl mr-6"
                >
                  <h1 class="text-3xl font-medium text-gray-800">UX Design</h1>
                  <p class="text-base leading-6 pt-9 text-gray-800">
                    Best in class UX design services that launch and manage your
                    product with a lean methadology. Test, iterate and find the
                    perfect set of characteristics that match your target
                    audience
                  </p>
                  <p
                    class="text-base font-semibold leading-4 pt-9 underline cursor-pointer text-gray-500"
                  >
                    Explore
                  </p>
                </div>                
              </div>
            </div>
          </Slick>
        </div>
        <div class="">
          <div
            class="flex items-center md:justify-start justify-between md:px-0 px-4 my-16 cursor-pointer"
          >
            <div id="prev2" @click="showPrev">
              <svg
                width="51"
                height="51"
                viewBox="0 0 51 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M39.5248 23.7291V27.2707H18.2749L28.0144 37.0103L25.4999 39.5249L11.4749 25.4999L25.4999 11.4749L28.0144 13.9895L18.2749 23.7291H39.5248Z"
                  fill="#6B7280"
                  fill-opacity="0.2"
                />
              </svg>
            </div>
            <div id="next2" @click="showNext">
              <svg
                width="51"
                height="51"
                viewBox="0 0 51 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4749 23.7291V27.2707H32.7248L22.9853 37.0103L25.4999 39.5249L39.5248 25.4999L25.4999 11.4749L22.9853 13.9895L32.7248 23.7291H11.4749Z"
                  fill="#4338CA"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
import Slick from "vue-slick";
import "slick-carousel/slick/slick.css";

export default {
  name: "MyComponent",
  components: { Slick },
  methods: {
    showNext() {
      this.$refs.carousel.next();
    },
    showPrev() {
      this.$refs.carousel.prev();
    },
  },
};
</script> 
