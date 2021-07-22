<template>
  <div>
    <v-btn color="primary" @click="dialog = !dialog" :loading="dialog">
      Modificar Imagen
    </v-btn>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          Cambia tu foto de perfil!
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-file-input
                label="Selecciona una imagen *" 
                append-icon="mdi-file-image" 
                v-model="file" 
                @change="validarImagen()"
                accept="image/*" 
              />
            </v-col>
          </v-row>
          <v-row align="center" v-if="fileLocal != ''">
            <v-col align="center">
              <v-avatar size="250">
                <v-img :src="fileLocal" />
              </v-avatar>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="secondary" @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="primary" @click="modificar()" :loading="loading" :disabled="!file">
            Modificar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props:['user'],
  data(){
    return{
      dialog: false,
      file: null,
      fileLocal: '',
      loading: false,
    }
  },
  methods:{
    async modificar(){
      this.loading = true;
      const url = 'user-modificar-imagen';
      try {
        let formData = new FormData();
        let config = { headers: { 'Content-Type': 'multipart/form-data' } };
        formData.append('id', this.user._id);
        formData.append('image', this.file);
        const {data} = await this.$axios.post(url,formData,config)
        await this.$store.dispatch('alertas/GET_DATA', {
          color : 'success',
          snackbar : true,
          data : data.message
        });
        this.file = null;
        this.validarImagen();
        this.dialog = false;
        await this.$auth.fetchUser()
      } catch (error) {
        await this.$store.dispatch('alertas/GET_DATA', {
          color : 'error',
          snackbar : true,
          data : error.response.data.message
        });
      }
      this.loading = false;
    },
    validarImagen(){
      if(this.file != null){
        const file = this.file;
        if(file.size > 10500000){
          alert('No se aceptan imagenes con mas de 10 MB.');
          this.file = null; 
          return
        }
        var img = new Image();
        img.src = URL.createObjectURL(file, this.fileLocal = file.name);
        this.fileLocal = img.src;
      }else{
        this.fileLocal = '';
      }
    },
  }

}
</script>

<style>

</style>