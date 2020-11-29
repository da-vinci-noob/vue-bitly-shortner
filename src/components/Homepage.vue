<template>
  <div class="bg-gray-200 dark:bg-gray-900">
    <div class="theme-switch-wrapper">
      <label class="theme-switch" for="switch_theme" @change="theme_switcher">
        <input type="checkbox" id="switch_theme" />
        <div class="slider round"></div>
      </label>
    </div>
    <div class="flex items-center justify-center h-screen ">
      <div class="flex-1">
      <input
        v-model="url"
        class="p-4 mr-0 text-white bg-gray-500 rounded-l-lg ring-4 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-500 md:w-1/3 md:ml-8"
        placeholder="https://www.google.com/"
      />
      <button
        @click="submit"
        class="p-4 px-8 font-bold text-white transition ease-in-out bg-red-600 rounded-r-lg duration-600 ring-4 dark:ring-gray-700 hover:bg-blue-400 hover:animate-pulse"
      >
        Short it
      </button>

      </div>
    </div>
    <div v-if="loading">
      <div class="fixed top-0 left-0 z-10 block w-full h-full bg-white">
        <span class="flex items-center justify-center h-screen">
          <svg class="w-32 h-32 text-green-500 fill-current animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 3v2a5 5 0 0 0-3.54 8.54l-1.41 1.41A7 7 0 0 1 10 3zm4.95 2.05A7 7 0 0 1 10 17v-2a5 5 0 0 0 3.54-8.54l1.41-1.41zM10 20l-4-4 4-4v8zm0-12V0l4 4-4 4z"/>
          </svg>
        </span>
      </div>
    </div>
    <div v-if="shortUrl" class="fixed top-0 left-0 z-10 block w-full h-full bg-white dark:bg-gray-600" >
      <div class="flex items-center justify-center h-screen">
        <span class="px-6 py-3 bg-red-400 rounded-lg rounded-r-none ring-4 ring-blue-600">
          {{ shortUrl['link'] }}
        </span>
        <span @click="reset" class="px-6 py-3 text-gray-300 bg-blue-700 rounded-lg rounded-l-none cursor-pointer ring-4 ring-blue-600 hover:animate-pulse">
          Cancel
        </span>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "Homepage",
  data() {
    return {
      shortUrl: null,
      loading: false,
      url: null
    };
  },
  mounted() {
    //do something after mounting vue instance
    window.addEventListener('load', () => {
         // run after everything is in-place
      this.switch_theme()
      if (document.querySelector('html').className === 'dark')
        document.getElementById('switch_theme').checked = true
    })
  },
  methods: {
    async submit() {
      this.loading = true
      try {
        await axios
          .post('https://api-ssl.bitly.com/v4/shorten', {
                  long_url: this.url, //varEmail is a variable which holds the email
                  "domain": "bit.ly"
                }, {
                  headers: {
                    Authorization: 'Bearer ' + process.env.VUE_APP_BITLY_API_KEY,
                    'Content-Type': 'application/json'
                  }
                }).then((response) => (this.shortUrl = response.data))
      } catch (err) {
        console.log(err)
      }
      this.loading = false
      // window.test = this.shortUrl
    },
    theme_switcher () {
      if (event.target.checked) {
        localStorage.theme = 'dark'
      } else {
        localStorage.theme = 'light'
      }
      this.switch_theme()
    },
    switch_theme () {
      if (localStorage.theme === 'dark' ) {
        document.querySelector('html').classList.add('dark')
        document.getElementById('switch_theme').checked = true
      } else if (localStorage.theme === 'dark') {
        document.querySelector('html').classList.add('dark')
        document.getElementById('switch_theme').checked = true
      } else if (localStorage.theme === 'light') {
        document.querySelector('html').classList.remove('dark')
      }
    },
    reset () {
      this.shortUrl = null
      this.loading = null
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .theme-switch-wrapper {
  display: flex;
  align-items: center;
  }
  .theme-switch {
  display: inline-block;
  height: 20px;
  position: relative;
  width: 40px;
  }

  .theme-switch input {
  display:none;
  }

  .slider {
  background-color: #ccc;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: .2s;
  }

  .slider:before {
  background-color: #fff;
  bottom: 4px;
  content: "";
  height: 12px;
  left: 4px;
  position: absolute;
  transition: .4s;
  width: 12px;
  }

  input:checked + .slider {
  background-color: black;
  }

  input:checked + .slider:before {
  transform: translateX(20px);
  }

  .slider.round {
  border-radius: 34px;
  }

  .slider.round:before {
  border-radius: 50%;
  }
</style>
