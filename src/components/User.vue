<template>
  <div class="page-container">
    <div class="md-layout md-gutter">
      <div class="md-layout-item supply" >
        <md-card md-with-hover>
          <md-ripple>
            <md-card-media-actions>
              <md-card-media class="centered">
                <img :src="user.picture.large" alt="Cover">
              </md-card-media>
            </md-card-media-actions>
          </md-ripple>
        </md-card>
      </div>
      <div class="md-layout-item map supply">
        
            <l-map :center="center" :zoom='zoom' style="height: 100%">
              <l-tile-layer :url="url" :attribution="attribution" />
              <l-marker :lat-lng="center">
                <l-tooltip :options="{ permanent: true, interactive: true }">
                  <div>
                    I am In
                  </div>
                </l-tooltip>
              </l-marker>
            </l-map>
          
      </div>
      <div class="md-layout-item supply">
        <md-card md-with-hover style="min-height: 100%">
          <md-ripple>
        <md-button class="md-icon-button md-dense md-primary favorite" @click="addFavorite()">
          <md-icon>favorite</md-icon>
        </md-button>
          </md-ripple>
        </md-card>
      </div>
    </div>
    <div class="md-layout ">
      <md-card md-with-hover class="personal-data">
        <md-ripple>

          <div class="viewport">
            <md-list class="md-double-line">
              <md-subheader>Datos personales</md-subheader>
              <md-list-item>
                <md-icon class="md-primary">person</md-icon>

                <div class="md-list-item-text">
                  <span>{{user.name.first}} {{user.name.last}}</span>
                  <span>Nombre</span>
                </div>
              </md-list-item>
              <md-list-item>
                <md-icon class="md-primary">gender</md-icon>

                <div class="md-list-item-text">
                  <span>{{user.gender}}</span>
                  <span>Genero</span>
                </div>
              </md-list-item>
              <md-list-item>
                <md-icon class="md-primary">phone</md-icon>

                <div class="md-list-item-text">
                  <span>{{user.phone}}</span>
                  <span>Telefono</span>
                </div>
              </md-list-item>
            </md-list>
          </div>
        </md-ripple>
      </md-card>
    </div>
    <div class="content">
      <md-card md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">Ubicación </div>
            <div class="md-subhead">Posición geografica del usuario</div>
          </md-card-header>

          <md-card-content>
            <md-divider class="md-inset"></md-divider>
            Ciudad: {{user.location.city}}
            Estado/Comunidad: {{user.location.state}}
            Pais: {{user.location.country}}
          </md-card-content>
        </md-ripple>
      </md-card>
    </div>
  </div>

</template>

<script>
  import {
    LMap,
    LMarker,
    LTileLayer,
    LTooltip,
  } from 'vue2-leaflet';
  import {
    latLng,
  } from 'leaflet';

  export default {
    name: 'User',
    components: {
      LMap,
      LMarker,
      LTileLayer,
      LTooltip,
    },
    props: {
      user: {
        type: Object,
      },
    },
    data() {
      return {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        zoom: 13,
      };
    },
    mounted() {

    },
    methods: {
      addFavorite() {
        const favorites = localStorage.favorites;
        if (typeof favorites === 'undefined') {
          const parsed = JSON.stringify([this.user]);
          localStorage.favorites = parsed;
        } else {
          const parsed = JSON.parse(favorites);
          parsed.push(this.user);
          localStorage.favorites = JSON.stringify(parsed);
        }
        const encoded = JSON.stringify(localStorage.favorites).slice(1, -1);
        this.$store.dispatch('saveUsers', {
          data: encoded,
          nickname: 'nickname',
        });
      },
    },
    computed: {
      center() {
        return latLng(this.user.location.coordinates.latitude,
          this.user.location.coordinates.longitude);
      },
    },
    watch: {},
  };

</script>
<style scoped>
  .page_container {
    min-height: 100vh;
  }

  .map {
    min-height: 350px;
  }

  .centered {
    margin: auto;
  }

  md-gutter {
    max-height: 390px;
  }

  .personal-data {
    margin: auto;
    min-width: 100%;
  }
  .supply{
    min-height: 90%;
    margin-bottom: 15px;
  }

</style>
