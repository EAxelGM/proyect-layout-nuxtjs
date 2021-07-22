<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col align="center" justify="center">
          <LoginForm />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginOptions/LoginForm';
export default {
  layout:'noLogged',
  components:{
    LoginForm,
  },
  data(){
    return{
      
    }
  },
  head(){
    return{
      titleTemplate: 'Login'
    }
  }
}
</script>

<style>

</style>