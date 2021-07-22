<template>
  <div>
    <v-card max-width="600">
      <v-toolbar class="primary" dark flat >
        <v-toolbar-title>Iniciar Sesion</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-text-field 
          v-model="email"
          label="Correo Electronico"
          prepend-icon="mdi-email"
          type="text"
        />
        <v-text-field 
          v-model="password"
          label="Contraseña"
          prepend-icon="mdi-lock"
          :type="show_password ? 'text' : 'password'"
          :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show_password = !show_password"
        />
        <div class="my-3">
          <v-btn color="secondary" text x-small to="/login/recuperar-password">
            Olvide mi contraseña
          </v-btn>
          <v-btn color="secondary" text x-small to="/login/register">
            No tengo cuenta
          </v-btn>
        </div>
      </v-container>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="login()" :loading="loading">
          Iniciar Sesion
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data(){
    return{
      email: '',
      password: '',
      show_password: false,
      loading: false,
    }
  },
  methods:{
    async login() {
      this.loading = true;
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        
        this.$router.push('/');
        console.log('CONSOLA DE USUARIO');
        console.log(this.$auth.user);
      } catch (e) { 
        await this.$store.dispatch('alertas/GET_DATA', {
          color : 'error',
          snackbar : true,
          data : e.response.data.message
        });
      }
      this.loading = false
    }
  }
}
</script>

<style>

</style>