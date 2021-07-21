<template>
  <div>
    <v-card max-width="600">
      <v-toolbar class="primary" dark flat >
        <v-toolbar-title>
          <v-btn icon to="/login" small text >
            <v-icon>
              mdi-keyboard-backspace
            </v-icon>
          </v-btn>
          Recuperar Contraseña
        </v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-window v-model="step">

          <v-window-item :value="0">
            <v-text-field 
              v-model="email"
              label="Correo Electronico"
              prepend-icon="mdi-email"
              type="text"
            />
            <v-row>
              <v-col>
                <v-btn color="primary" @click="step++" :loading="loading"> 
                  Enviar Codigo de Recuperacion
                </v-btn>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item :value="1">
            <v-text-field 
              v-model="codigo_verificacion"
              label="Ingresa el codigo de verificacion."
              prepend-icon="mdi-email"
              type="text"
            />
            <v-row>
              <v-col>
                <v-btn color="secondary" small text>
                  No recibi ningun correo, enviar de nuevo.
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn color="secondary" @click="step--">
                  Atras
                </v-btn>
              </v-col>
              <v-col>
                <v-btn color="primary" @click="step++" :loading="loading">
                  Verificar Codigo
                </v-btn>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item :value="2">
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
              label="Contraseña"
              prepend-icon="mdi-lock"
              :type="show_password_confirm ? 'text' : 'password'"
              :append-icon="show_password_confirm ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show_password_confirm = !show_password_confirm"
            />
            <v-row>
              <v-col>
                <v-btn color="primary" :loading="loading" @click="changePassword()">
                  Cambiar Contraseña
                </v-btn>
              </v-col>
            </v-row>
          </v-window-item>

        </v-window>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data(){
    return{
      step: 0,
      email: '',
      password: '',
      codigo_verificacion: '',
      show_password: false,
      password_confirm: '',
      show_password_confirm: false,
      loading: false,
    }
  },
  methods:{
    async changePassword(){
      console.log('hola')
      await this.$store.dispatch('alertas/GET_DATA', {
          color : 'success',
          snackbar : true,
          data: 'emessage',
      });
    }
  }
}
</script>

<style>

</style>