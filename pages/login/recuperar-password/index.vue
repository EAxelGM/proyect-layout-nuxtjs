<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col align="center" justify="center">
          <Form />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Form from '@/components/LoginOptions/EnviarCorreoRecuperacion'
export default {
  components:{
    Form,
  },
  data(){
    return{

    }
  },
  head(){
    return{
      titleTemplate: 'Recupera Contraseña'
    }
  }
}
</script>

<style>

</style>