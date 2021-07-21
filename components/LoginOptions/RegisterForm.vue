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
        <div class="my-3">
          <v-btn color="secondary" text x-small to="/login">
            Ya tengo una cuenta 
          </v-btn>
        </div>
      </v-container>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary">
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
      loading: false,
    }
  }
}
</script>

<style>

</style>