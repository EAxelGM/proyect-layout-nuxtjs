<template>
  <div>
    <v-row >
      <v-col>
        <v-list>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Nombre</v-list-item-title>
              <v-list-item-subtitle>{{user.name}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Apellidos</v-list-item-title>
              <v-list-item-subtitle>{{user.lastname}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Correo</v-list-item-title>
              <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-row>
                <v-col>
                  <v-list-item-title>Fecha de creacion de la cuenta</v-list-item-title>
                  <v-list-item-subtitle>{{ user.created_at | dateAmigable }} </v-list-item-subtitle>
                </v-col>
                <v-col>
                  <v-list-item-title>Ultima actualizacion de datos</v-list-item-title>
                  <v-list-item-subtitle>{{ user.updated_at | dateAmigable }} </v-list-item-subtitle>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <EditarInfo :user="user" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { fechaAmigable } from '@/components/Moment/Momentjs';
import EditarInfo from '@/components/MiCuenta/EditarInfo';
export default {
  props:['user'],
  components: {
    fechaAmigable,
    EditarInfo
  },
  data(){
    return{
      
    }
  },
  filters: {
    dateAmigable(value) {
      return fechaAmigable(value);
    },
  }
}
</script>

<style>

</style>