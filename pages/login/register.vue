<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col align="center" justify="center">
          <RegisterForm />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import RegisterForm from '@/components/LoginOptions/RegisterForm';
export default {
  layout:'noLogged',
  components:{
    RegisterForm
  },
  data(){
    return{

    }
  },
  head(){
    return{
      titleTemplate: 'Register'
    }
  }
}
</script>

<style>

</style>