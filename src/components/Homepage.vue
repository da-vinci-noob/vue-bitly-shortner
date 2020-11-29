<template>
  <div class="bg-gray-200">
    <div class="flex items-center justify-center h-screen ">
      <div class="flex-1">
      <input
        v-model="url"
        class="text-white rounded-l-lg p-4 border-t mr-0 border-b border-l bg-gray-500 md:w-1/3 md:ml-8 "
        placeholder="https://www.google.com/"
      />
      <button
        @click="submit"
        class="transition duration-500 ease-in-out px-8 rounded-r-lg bg-red-600 hover:bg-red-400 text-white font-bold p-4 border-yellow-500 border-t border-b border-r hover:animate-pulse"
      >
        Short it
      </button>

      </div>
    </div>
    <div v-if="loading">
      <div class="w-full h-full fixed block top-0 left-0 bg-white z-10">
        <span class="flex items-center justify-center h-screen">
          <svg class="h-32 w-32 animate-spin text-green-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 3v2a5 5 0 0 0-3.54 8.54l-1.41 1.41A7 7 0 0 1 10 3zm4.95 2.05A7 7 0 0 1 10 17v-2a5 5 0 0 0 3.54-8.54l1.41-1.41zM10 20l-4-4 4-4v8zm0-12V0l4 4-4 4z"/>
          </svg>
        </span>
      </div>
    </div>
    <div v-if="shortUrl" class="w-full h-full fixed block top-0 left-0 bg-white z-10" >
      <div class="flex items-center justify-center h-screen">
        <span class="bg-red-400 px-6 py-3 rounded-lg rounded-r-none">
          {{ shortUrl['link'] }}
        </span>
        <span @click="reset" class="cursor-pointer bg-blue-700 text-gray-300 px-6 py-3 rounded-lg rounded-l-none">
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
