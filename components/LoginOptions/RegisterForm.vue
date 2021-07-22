<template>
  <div>
    <v-card max-width="600">
      <v-toolbar class="primary" dark flat >
        <v-toolbar-title>Crear Cuenta</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-text-field 
          v-model="name"
          label="Nombre"
          prepend-icon="mdi-account"
          type="text"
        />
        <v-text-field 
          v-model="lastname"
          label="Apellidos"
          prepend-icon="mdi-account"
          type="text"
        />
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
        <v-text-field 
          v-model="password_confirm"
          label="Confirma tu Contraseña"
          prepend-icon="mdi-lock"
          :type="show_password_confirm ? 'text' : 'password'"
          :append-icon="show_password_confirm ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show_password_confirm = !show_password_confirm"
        />
        <div class="my-3">
          <v-btn color="secondary" text x-small to="/login">
            Ya tengo una cuenta 
          </v-btn>
        </div>
      </v-container>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="create()" :loading="loading" :disabled="name=='' || lastname=='' || email=='' || password=='' || password_confirm==''">
          Crear Cuenta
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
      name: '',
      lastname: '',
      email: '',
      password: '',
      show_password: false,
      password_confirm: '',
      show_password_confirm: false,
      loading: false,
    }
  },
  methods:{
    async create(){
      this.loading = true;
      const url = 'register';
      const info = {
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirm,
      } 

      try {
        await this.$axios.post(url,info);
        await this.$store.dispatch('alertas/GET_DATA', {
          color : 'success',
          snackbar : true,
          data: 'Cuenta creada!',
        });
        await this.$router.push('/login');
      } catch (error) {
        await this.$store.dispatch('alertas/GET_DATA', {
          color : 'error',
          snackbar : true,
          data: error.response.data,
        });
      }

      this.loading = false;
    }
  }
}
</script>

<style>

</style>