<template>
  <div class="bg-gray-200">
    <div class="flex items-center justify-center h-screen ">
      <div class="flex-1">
      <input
        v-model="url"
        class="p-4 mr-0 text-white bg-gray-500 border-t border-b border-l rounded-l-lg md:w-1/3 md:ml-8 "
        placeholder="https://www.google.com/"
      />
      <button
        @click="submit"
        class="p-4 px-8 font-bold text-white transition duration-500 ease-in-out bg-red-600 border-t border-b border-r border-yellow-500 rounded-r-lg hover:bg-red-400 hover:animate-pulse"
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
    <div v-if="shortUrl" class="fixed top-0 left-0 z-10 block w-full h-full bg-white" >
      <div class="flex items-center justify-center h-screen">
        <span class="px-6 py-3 bg-red-400 rounded-lg rounded-r-none">
          {{ shortUrl['link'] }}
        </span>
        <span @click="reset" class="px-6 py-3 text-gray-300 bg-blue-700 rounded-lg rounded-l-none cursor-pointer">
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
    reset () {
      this.shortUrl = null
      this.loading = null
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
