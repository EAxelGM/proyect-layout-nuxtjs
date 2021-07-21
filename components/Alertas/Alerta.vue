<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    :color="alerta.color"
    bottom
  >
    {{ alerta.data }}

    <template v-slot:action="{ attrs }">
      <v-btn
        dark
        text
        v-bind="attrs"
        @click="snackbar = false"
        icon
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
	export default {
    data () {
      return {
        timeout: 3000
      }
    },
    computed:{
      snackbar:{
        get(){
          return this.$store.state.alertas.data.snackbar
        },
        set(newVal){
          const data = {
            color : '',
            snackbar : newVal,
            data : ''
          }
          this.$store.dispatch('alertas/GET_DATA', data);
        }
      },
      alerta(){
        return this.$store.state.alertas.data
      }
    }
	}
</script>