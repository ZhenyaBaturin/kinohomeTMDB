<template>
  <form class="pa-10">
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      label="Password"
      required
    ></v-text-field>
    <v-btn
      class="mr-4"
      @click="submit"
      :loading="loading"
    >
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required }
  },

  data: () => ({
    email: '',
    password: ''
  }),

  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
    loading () {
      return this.$store.getters.loading
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('loginUser', user)
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => { console.log(error) })
    },
    clear () {
      this.$v.$reset()
      this.email = ''
    }
  },
  created () {
    if (this.$route.query['loginError']) {
      this.$store.dispatch('setError', 'Войдите в свой аккаут')
    }
  }
}
</script>
