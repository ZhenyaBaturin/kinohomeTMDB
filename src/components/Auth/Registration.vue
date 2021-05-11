<template>
  <form class="pa-10">
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="15"
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      :counter="6"
      label="Password"
      type="password"
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
      required
    ></v-text-field>
    <v-text-field
      v-model="repeatPassword"
      :error-messages="repeatPasswordErrors"
      label="Repeat password"
      type="password"
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
      required
    ></v-text-field>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Do you agree?"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>

    <v-btn
      class="mr-4"
      @click="submit"
      :loading="loading"
    >
      Submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(20) },
    email: { required, email },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    checkbox: {
      checked (val) {
        return val
      }
    }
  },
  data () {
    return {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      checkbox: false
    }
  },

  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
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
      !this.$v.password.minLength && errors.push('Password must be at most 8 characters long')
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
    repeatPasswordErrors () {
      const errors = []
      if (!this.$v.repeatPassword.$dirty) return errors
      !this.$v.repeatPassword.sameAsPassword && errors.push('Passwords do not match')
      return errors
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const user = {
          name: this.name,
          email: this.email,
          password: this.password

        }
        this.$store.dispatch('registerUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch((error) => { console.log(error) })
      }
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.password = ''
      this.repeatPassword = ''
      this.checkbox = false
    }
  }
}
</script>
