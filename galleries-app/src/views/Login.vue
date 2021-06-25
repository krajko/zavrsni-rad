<template>
    <div class="container" style="max-width: 360px;">
        <div class="text-center mb-4">
            <h1 class="display-2 lobster"> Login </h1>
            <hr>
        </div>
        
        <form @submit.prevent="submit">

            <!-- Email -->
            <div class="form-group mb-3">
                <label> Email address: </label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <i class="input-group-text fa fa-envelope fw-bold text-muted"/>
                    </div>
                    <input 
                        type="text"
                        class="form-control" 
                        :class="{ 'is-invalid': $v.credentials.email.$error }"
                        @blur="setEmail($event.target.value)"
                    />
                </div>

                <!-- Errors -->
                <div v-if="$v.credentials.email.$dirty">
                    <div v-if="!$v.credentials.email.email">
                        <small class="text-danger"> Not a valid email address. </small>
                    </div>
                </div>
            </div>

            <!-- Password -->
            <div class="form-group mb-4">
                <label> Password: </label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <i class="input-group-text fa fa-key fw-bold text-muted"/>
                    </div>
                    <input 
                        type="password"
                        class="form-control" 
                        :class="{ 'is-invalid': $v.credentials.password.$error }"
                        @blur="setPassword($event.target.value)"
                    />
                </div>
            </div>

            <!-- Submit -->
            <div class="text-center">
                <b-button variant="primary" type="submit" class="px-3 mb-3"> <h4 class="lobster mb-0"> Submit </h4> </b-button>
            </div>

            <!-- Invalid -->
            <div v-if="invalid" class="text-center">
                <small class="text-danger"> Invalid credentials. </small>
            </div>

            <!-- Error -->
            <div v-if="error" class="text-center">
                <small class="text-danger"> Something went wrong. Please try again. </small>
            </div>
        </form>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
    name: 'register',

    data() {
        return {
            credentials: {
                email: '',
                password: ''
            },
            invalid: false,
            error: false
        }
    },

    methods: {
        ...mapActions('auth', ['login']),

        async submit() {
            this.$v.$touch();

            if (!this.$v.$invalid) {
                try {
                    await this.login(this.credentials);
                    this.$router.push('/');
                } catch(e) {
                    if (e.response.status === 401) {
                        this.invalid = true;
                    } else {
                        console.log(e);
                        this.error = true;
                    }
                }
            }
        },

        setEmail(value) {
            this.credentials.email = value;
            this.$v.credentials.email.$touch();
        },

        setPassword(value) {
            this.credentials.password = value;
            this.$v.credentials.password.$touch();
        },
    },

    validations: {
        credentials: {
            email: { required, email },
            password: { required }
        }
    }
}
</script>