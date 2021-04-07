<template>
  <div class="page-container">

    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>


      <md-table-empty-state md-label="Usuario no encontrado"
        :md-description="`No se encontraron resultados para `">

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
      
    </md-table>
        <div class="md-toolbar-section-start">
          
          <md-button class="md-raised md-accent all"  @click="csvExport()">Exportar</md-button>
        </div>
        


  </div>

</template>

<script>

  export default {
    name: 'Favorites',
    data: () => ({
      search: null,
      searched: [],
      searchBy: 'Genero',
    }),
    mounted() {
      // this.users = JSON.parse(localStorage.favorites);
      this.$store.dispatch('loadFavorites', { nickname: 'nickname' });
    },
    methods: {
      csvExport() {
        const datae = [];
        this.users.forEach((reg) => {
          datae.push([reg.gender, `${reg.name.first} ${reg.name.last}`, reg.email, reg.location.country, reg.dob.date, reg.registered.date]);
        });
        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += [
          'gender, name, email, nationality, DOB, Reg Date;',
          ...datae.map(item => Object.values(item).join(';')),
        ]
          .join('\n')
          .replace(/(^\[)|(\]$)/gm, '');

        const data = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', 'export.csv');
        link.click();
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
  
  };

</script>
<style scoped>
.page_container{
  min-height: 100vh;
}
.all{
  width: 100%;
}
</style>