<template>
  <div>
    <h1>Saliendo del sistema...</h1> <br /><br />
    <small v-if="mensaje">Si no te redirije al login has <a href="#" @click="loggout()">click aqui</a></small>
  </div>
</template>

<script>
export default {
  data(){
    return{
      mensaje:false,
    }
  },
  
  head() {
    return {
      title: 'Saliendo del sistema...'
    }
  },
  mounted(){
    this.loggout();
  },
  methods:{
    mostrarMensaje(){
      this.mensaje=true;
    },
    async loggout(){
      setTimeout(() => this.mostrarMensaje(),5000);
      try {
        await this.$auth.logout();
        this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>