<template>
  <v-app style="background-color: #ababab;">
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <Alerta />
  </v-app>
</template>

<script>
import Alerta from '@/components/Alertas/Alerta'
export default {
  components:{
    Alerta
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  mounted(){
    if(this.$auth.loggedIn){
      this.$router.push('/');
    }
  }
}
</script>
