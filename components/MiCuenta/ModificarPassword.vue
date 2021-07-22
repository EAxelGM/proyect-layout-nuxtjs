<template>
  <div>
    <v-card>
      <v-toolbar class="primary" dark flat >
        <v-toolbar-title>Cambia tu contraseña</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col>
            <h3>Introduce tu contraseña actual</h3>
            <v-text-field 
              v-model="pass_act"
              prepend-icon="mdi-lock"
              :type="show_pass_act ? 'text' : 'password'"
              :append-icon="show_pass_act ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show_pass_act = !show_pass_act"
            />
          </v-col>
          <v-col>
            <h3>Introduce tu nueva contraseña</h3>
            <v-text-field 
              v-model="pass_new"
              prepend-icon="mdi-lock"
              :type="show_pass_new ? 'text' : 'password'"
              :append-icon="show_pass_new ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show_pass_new = !show_pass_new"
            />
          </v-col>
          <v-col>
            <h3>Confirma tu nueva contraseña</h3>
            <v-text-field 
              v-model="pass_con"
              prepend-icon="mdi-lock"
              :type="show_pass_con ? 'text' : 'password'"
              :append-icon="show_pass_con ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show_pass_con = !show_pass_con"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-btn color="primary" :loading="loading" @click="changePassword()">
              Cambiar contraseña
            </v-btn>
            <GeneradorPasswords />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import GeneradorPasswords from '@/components/MiCuenta/GeneradorDePasswords';
export default {
  props:['user'],
  components:{
    GeneradorPasswords,
  },
  data(){
    return{
      pass_act: '',
      show_pass_act: false,
      pass_new: '',
      show_pass_new: false,
      pass_con: '',
      show_pass_con: false,

      loading: false,
    }
  },
  methods:{
    async changePassword(){
      this.loading = true;
      const url = 'profile/change-password';
      const info = {
        email: this.user.email,
        actual_password: this.pass_act,
        password: this.pass_new,
        withConfirm: true,
      };
      if(this.pass_new == this.pass_con){
        try {
          const {data} = await this.$axios.post(url,info);
          await this.$store.dispatch('alertas/GET_DATA', {
            color : 'success',
            snackbar : true,
            data: data.message,
          });
          this.pass_act = '';
          this.pass_new = '';
          this.pass_con = '';
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