<template>
  <div>
    <MisDatos :user="$auth.user" />
  </div>
</template>

<script>
import MisDatos from '@/components/MiCuenta/MisDatos';
export default {
  layout: 'logged',
  components:{
    MisDatos,
  },
  data(){
    return{

    }
  }
}
</script>

<style>

</style>