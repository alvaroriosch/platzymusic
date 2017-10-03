<template lang="pug">
#app
  img(src='./assets/logo.png')
  h1 PlatziMusic
  select(v-model="selectedCountry")
    option(v-for="country in countries" :value="country.value") {{ country.name }}
  spiner(v-show="loading")
  ul(v-show="!loading")
    artist(v-for="artist in artists" :artist="artist" :key="artist.mbid")
</template>

<script>
import Artist from './components/Artist.vue';
import Spiner from './components/Spiner.vue';
import getArtists from './api/index';
export default {
  name: 'app',
  data () {
    return {
      artists: [],
      selectedCountry: 'venezuela',
      countries: [
        {name:"Venezuela", value: "venezuela"},
        {name:"Japón", value: "japan"},
        {name:"España", value: "spain"},
        {name:"Colombia", value: "colombia"},
      ],
      loading: true
    }
  },
  components: {
    Artist,
    Spiner
  },
  methods: {
    refreshArtists() {
      const self = this;
      this.loading = true;
      getArtists(this.selectedCountry)
        .then(function (artists) {
          self.artists = artists;
          self.loading = false;
        });
    }
  },
  mounted: function() {
    this.refreshArtists();
  },
  watch: {
    selectedCountry: function() {
      this.refreshArtists();
    }
  }
}
</script>

<style lang="stylus" scoped>
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px

h1, h2
  font-weight normal

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
