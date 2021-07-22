<template>
  <div>
    <a href="#" @click="dialog = !dialog">Generar Contraseña</a>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>
          Generar una contraseña aleatoria.
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-slider
                v-model="numberCaracter"
                label="Selecciona el numero de caracteres"
                class="align-center"
                :min="minimo"
                :max="maximo"
                thumb-label
                @change="generador()"
                hide-details
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="numberCaracter"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    :min="minimo"
                    :max="maximo"
                    type="number"
                    style="width: 60px"
                    @change="generador()"
                  />
                </template>
              </v-slider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-checkbox
                v-model="mayusculas"
                label="Mayusculas"
                color="primary"
                hide-details
                @change="generador()"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-checkbox
                v-model="minusculas"
                label="Minusculas"
                color="primary"
                hide-details
                @change="generador()"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-checkbox
                v-model="numeros"
                label="Numeros"
                color="primary"
                hide-details
                @change="generador()"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-checkbox
                v-model="especiales"
                label="Caracteres Especiales"
                color="primary"
                hide-details
                @change="generador()"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="passwordFinal"
                :label="passwordFinal=='' ? 'Seleccione un campo para generar una contraseña' : 'Contraseña (Toque para copiar)'"
                dense
                :counter="numberCaracter"
                :disabled="passwordFinal==''"
                outlined
                readonly
                onclick="this.select();"
                @click="copiar()"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn @click="generador()" block color="primary" >
                Generar Otra Contraseña
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="restablecer()" outlined color="green">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return{
      dialog:false,
      numberCaracter: 15,
      mayusculas: true,
      minusculas: true,
      numeros: true,
      especiales: true,
      passwordFinal:'',
      minimo: 8,
      maximo: 50,
    }
  },
  mounted(){
    this.generador();
  },
  methods:{
    generador(){
      var str = '';
      var ref = '';
      var refmi = 'abcdefghijklmnñopqrstuvwxyz';
      var refma = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
      var especials = '*/@?¡¿!-+$#%&/()={}[]_';
      var numbers = '0123456789';
      if(this.mayusculas){
       ref = ref.concat(refma);
      }
      if(this.minusculas){
       ref = ref.concat(refmi);
      }
      if(this.numeros){
       ref = ref.concat(numbers);
      }
      if(this.especiales){
       ref = ref.concat(especials);
      }
      
      for (var i = 0; i < this.numberCaracter; i++){
        str += ref.charAt(Math.floor(Math.random()*ref.length));
      }
      this.passwordFinal = str;
    },
    restablecer(){
      this.dialog = false;
      this.numberCaracter = 15;
      this.mayusculas = true;
      this.minusculas = true;
      this.numeros = true;
      this.especiales = true;
      this.generador();
    },
    async copiar(){
      try {
          let exito = document.execCommand("copy");// devuelve true o false
          let msg = exito ? "exito" : "error";
          let alerta = {
              color : 'success',
              snackbar : true,
              data : 'Codigo copiado correctamente',
          }
          await this.$store.dispatch('alertas/GET_DATA', alerta);
      } catch (error) {
          let alerta = {
              color : 'success',
              snackbar : true,
              data : 'Oops.. ha ocurrido un error: '+error,
          }
          await this.$store.dispatch('alertas/GET_DATA', alerta);
      }
    },
  }
}
</script>