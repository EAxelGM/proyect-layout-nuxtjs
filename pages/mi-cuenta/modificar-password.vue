<template>
  <div>
    <ModificarPassword :user="$auth.user" />
  </div>
</template>

<script>
import ModificarPassword from '@/components/MiCuenta/ModificarPassword';
export default {
  layout: 'logged',
  components:{
    ModificarPassword,
  },
  data(){
    return{
      
    }
  }
}
</script>

<style>

</style>