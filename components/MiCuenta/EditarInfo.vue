<template>
  <div>
    <v-btn @click="dialog = !dialog" :loading="dialog" block color="primary">
      Editar informacion
    </v-btn>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>Hola {{user.name}}</v-card-title>
        <v-card-text>
          <v-text-field
            label="Nombre"
            v-model="nombre"
          />
          <v-text-field
            label="Apellidos"
            v-model="apellidos"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialog = false" color="secondary">
            Cancelar
          </v-btn>
          <v-btn color="primary" @click="modificar()" :loading="loading">
            Modificar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props:['user'],
  data(){
    return{
      nombre: this.user.name,
      apellidos: this.user.lastname,
      dialog: false,
      loading: false,
    }
  },
  methods:{
    async modificar(){
      this.loading = true;
      const url = `user/${this.user._id}`;
      const info = {
        name: this.nombre,
        lastname: this.apellidos,
      }
      try {
        const {data} = await this.$axios.put(url,info);
        await this.$store.dispatch('alertas/GET_DATA', {
          color : 'success',
          snackbar : true,
          data : data.message
        });
        await this.$auth.fetchUser()
        this.dialog = false;
      } catch (error) {
        await this.$store.dispatch('alertas/GET_DATA', {
          color : 'error',
          snackbar : true,
          data : e.response.data.message
        });
      }
      this.loading = false;
    }
  }
}
</script>

<style>

</style>