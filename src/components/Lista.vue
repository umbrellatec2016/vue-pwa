<template>
  <div class="page-container">

    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>


      <md-table-empty-state md-label="Usuario no encontrado"
        :md-description="`No se encontraron resultados para '${search}'.`">

      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Genero" md-sort-by="gender">{{ item.gender }}</md-table-cell>
        <md-table-cell md-label="Nombre" md-sort-by="name.first">{{ item.name.first }} {{item.name.last}}
        </md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Nacionalidad" md-sort-by="location.country">{{ item.location.country }}</md-table-cell>
        <md-table-cell md-label="Fecha nacimiento" md-sort-by="location.dob.date">{{ item.dob.date }}</md-table-cell>
        <md-table-cell md-label="Registro" md-sort-by="registered.date">{{ item.registered.date }}</md-table-cell>
        <md-table-cell md-label="Registro" md-sort-by="registered.date">
          <md-button class="md-icon-button md-dense md-primary"  @click="openUser(item)"><md-icon>person</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
      -->
    </md-table>
    <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Filtro</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Filtro de busqueda" v-model="search" @input="searchOnTable" />
        </md-field>
        <div>
          <md-select v-model="searchBy" name="selecteBy" id="selectBy">
            <md-option value="Genero">Genero</md-option>
            <md-option value="edad">Edad</md-option>
            <md-option value="Nacionalidad">Nacionalidad</md-option>
          </md-select>
        </div>
    </md-table-toolbar>


  </div>

</template>

<script>
  const toLower = text => text.toString().toLowerCase();


  const searchByNat = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.location.country).includes(toLower(term)));
    }
    return items;
  };

  const searchByGender = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.gender) === toLower(term));
    }
    return items;
  };
  const searchByAge = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.dob.age).includes(toLower(term)));
    }
    return items;
  };

  export default {
    name: 'User',
    data: () => ({
      search: null,
      searched: [],
      searchBy: 'Genero',
    }),
    beforeMount() {
      this.$store.dispatch('getUsers');
    },
    methods: {
      searchOnTable() {
        if (this.searchBy === 'Genero') {
          this.searched = searchByGender(this.users, this.search);
        } else if (this.searchBy === 'Edad') {
          this.searched = searchByAge(this.users, this.search);
        } else if (this.searchBy === 'Nacionalidad') {
          this.searched = searchByNat(this.users, this.search);
        }
      },
      openUser(item) {
        this.$router.push({ name: 'User', params: { id: item.login.uuid, user: item } });
      },
    },
    computed: {
      users() {
        return this.$store.state.users;
      },
    },
    watch: {
      users() {
        this.searched = this.users;
      },
    },
    beforeDestroy() {
      this.MdField = null;
    },
  };

</script>
<style scoped>
.page_container{
  min-height: 100vh;
}
</style>