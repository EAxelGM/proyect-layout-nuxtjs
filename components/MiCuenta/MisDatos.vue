<template>
  <div>
    <v-card>
      <v-toolbar class="primary" dark flat >
        <v-toolbar-title>Configuracion de la cuenta</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col cols="12" md="4" align="center">
            <v-row>
              <v-col>
                <v-avatar color="secondary" size="250" >
                  <v-img 
                    :src="user.image ? user.image : 'http://localhost:8000/default/avatar.jpg'"
                  />
                </v-avatar>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <ModificarImagen :user="user" />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="8">
            <ModificarData :user="user" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import ModificarImagen from '@/components/MiCuenta/ModificarImagen'
import ModificarData from '@/components/MiCuenta/ModificarData'
export default {
  components:{
    ModificarImagen,
    ModificarData,
  },
  props:['user'],
  data(){
    return{

    }
  }

}
</script>

<style>

</style>