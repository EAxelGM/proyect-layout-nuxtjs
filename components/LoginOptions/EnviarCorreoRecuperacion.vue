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
                <v-btn color="primary" @click="enviarCorreo(true)" :loading="loading" :disabled="email==''"> 
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
              type="number"
            />
            <v-row>
              <v-col>
                <v-btn color="secondary" small text :disabled="send_again_time != 0" @click="enviarCorreo(false)" :loading="loading">
                  No recibi ningun correo, enviar de nuevo {{send_again_time == 0 ? '' : 'en '+send_again_time}}
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
                <v-btn color="primary" @click="verificaCodigo()" :loading="loading_verify_code" :disabled="codigo_verificacion==''">
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
              label="Confirme su Contraseña"
              prepend-icon="mdi-lock"
              :type="show_password_confirm ? 'text' : 'password'"
              :append-icon="show_password_confirm ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show_password_confirm = !show_password_confirm"
            />
            <v-row>
              <v-col>
                <v-btn color="primary" :loading="loading" @click="changePassword()" :disabled="password=='' || password_confirm==''">
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
      loading_verify_code: false,
      send_again_time: 0,
    }
  },
  methods:{
    async enviarCorreo(avanza){
      this.loading = true;
      const url = 'send-email-recuperar-password';
      const info = {
        email: this.email
      };

      try {
        const { data } = await this.$axios.post(url,info);
        await this.$store.dispatch('alertas/GET_DATA', {
          color : 'success',
          snackbar : true,
          data: data.message,
        });
        if(avanza) this.step++;
        this.contador();
      } catch (error) {
        await this.$store.dispatch('alertas/GET_DATA', {
          color : 'error',
          snackbar : true,
          data: error.response.data.message,
        });
      }
      this.loading = false;
    },

    contador(){
      this.send_again_time = 40;
      var x = setInterval(() => {
        if(this.send_again_time == 0){ 
          clearInterval(x) 
          this.send_again_time++;
        }
        this.send_again_time--;
      },1000);
    },

    async verificaCodigo(){
      this.loading_verify_code = true;
      const url = 'verify-recuperar-password';
      const info = {
        code: parseInt(this.codigo_verificacion),
        email: this.email
      };

      try {
        const {data} = await this.$axios.post(url,info);
        await this.$store.dispatch('alertas/GET_DATA', {
          color : 'success',
          snackbar : true,
          data: data.message,
        });
        this.step++;
      } catch (error) {
        await this.$store.dispatch('alertas/GET_DATA', {
          color : 'error',
          snackbar : true,
          data: error.response.data.message,
        });
      }
      this.loading_verify_code = false;
    },

    async changePassword(){
      this.loading = true;
      const url = 'profile/change-password';
      const info = {
        email: this.email,
        password: this.password,
        withConfirm: false,
      };
      if(this.password == this.password_confirm){
        try {
          const {data} = await this.$axios.post(url,info);
          await this.$store.dispatch('alertas/GET_DATA', {
            color : 'success',
            snackbar : true,
            data: data.message,
          });
          this.$router.push('/login');
        } catch (error) {
          await this.$store.dispatch('alertas/GET_DATA', {
            color : 'error',
            snackbar : true,
            data: error.response.data.message,
          });
        }
      }else{
        await this.$store.dispatch('alertas/GET_DATA', {
          color : 'error',
          snackbar : true,
          data: 'Las contraseñas no son iguales.',
        });
      }
      this.loading = false;
      
    }
  }
}
</script>

<style>

</style>