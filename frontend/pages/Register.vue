<template>
  <div class="contrainer">

    <v-alert
      outlined
      color="blue"
      style="padding:30px"
    >
    <v-container>
    <v-row style="display:flex;align-items:center">
      <v-col style="height:70vh;background-image:url(https://i.imgur.com/lGFc0nM.jpg);background-size:100% 100%">
    </v-col>

    <v-col>

    <h1 class="text-center" style="font-style:italic"><i class="fas fa-address-card"></i> Register</h1>
      <br>
      <v-text-field v-model="name" label="Name" :rules="nameRules" hide-details="auto"></v-text-field>
      <br>
      <v-text-field v-model="email" label="Email" :rules="emailRules" hide-details="auto"></v-text-field>
      <br>
      <v-text-field v-model="password" label="Password" :rules="passwordRules" hide-details="auto"></v-text-field>
      <br>
      <center>
          <v-btn
           @click="register"
           rounded color="primary"
           dark
           :disabled="name == '' || email == '' ||
            password == '' || name.length <6 ||
            password.length <6"
           >Register</v-btn>
      </center>
      </v-col>

      </v-row>
    </v-container>
    </v-alert>
<notifications group="foo" position="bottom right"/>
  </div>
</template>

<script>
export default {
data: () => ({
    name:"",
      nameRules: [
        value => !!value || 'Name required.',
        value => (value && value.length >= 6) || 'Name: Min 6 characters',
      ],
      email:"",
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password:"",
      passwordRules: [
        value => !!value || 'Password required.',
        value => (value && value.length >= 6) || 'Password: Min 6 characters',
      ],
    }),
    methods: {
        register(){
            let body ={
                name:this.name,
                email:this.email,
                password:this.password
            }

            this.$axios.post("/api/user/register", 
            body)
            .then(
                data => {console.log(data);
                this.$notify({
                group: 'foo',
                type: 'success',
                title: '<i class="fas fa-check"></i> Success',
                text: 'You has registred successfully!'
              });
                }
            ).catch(error=> {
          console.log(error)
          this.$notify({
          group: 'foo',
          type: 'error',
          title: '<i class="fas fa-exclamation-triangle"></i> Error',
          text: 'An error has occurred, please try again!'
        }
        )}
        );
        }
    },
}
</script>

<style>

</style>