<template>
    <div class="container mt-5" style="max-width: 360px;">
        <div class="text-center mb-4">
            <h1> <strong> Register </strong> </h1>
            <hr>
        </div>
        
        <form @submit.prevent="submit">

            <!-- First name -->
            <div class="form-group mb-3">
                <label> <small> First name: </small> </label>
                <input 
                    type="text"
                    class="form-control" 
                    :class="{ 'is-invalid': $v.data.first_name.$error }"
                    @blur="setFirstName($event.target.value)"
                />

                <!-- Errors -->
                <div v-if="$v.data.first_name.$dirty">
                    <div v-if="!$v.data.first_name.required">
                        <small class="text-danger"> First name must not be empty. </small>
                    </div>

                    <div v-if="!$v.data.first_name.alpha">
                        <small class="text-danger"> First name must contain only letters. </small>
                    </div>
                </div>
            </div>

            <!-- Last name -->
            <div class="form-group mb-3">
                <label> <small> Last name: </small> </label>
                <input 
                    type="text"
                    class="form-control" 
                    :class="{ 'is-invalid': $v.data.last_name.$error }"
                    @blur="setLastName($event.target.value)"
                />

                <!-- Errors -->
                <div v-if="$v.data.last_name.$dirty">
                    <div v-if="!$v.data.last_name.required">
                        <small class="text-danger"> Last name must not be empty. </small>
                    </div>

                    <div v-if="!$v.data.last_name.alpha">
                        <small class="text-danger"> Last name must contain only letters. </small>
                    </div>
                </div>
            </div>

            <!-- Email -->
            <div class="form-group mb-3">
                <label> <small> Email address: </small> </label>
                <input 
                    type="text"
                    class="form-control" 
                    :class="{ 'is-invalid': $v.data.email.$error }"
                    @blur="setEmail($event.target.value)"
                />

                <!-- Errors -->
                <div v-if="$v.data.email.$dirty">
                    <div v-if="!$v.data.email.required">
                        <small class="text-danger"> Email must not be empty. </small>
                    </div>

                    <div v-if="!$v.data.email.email">
                        <small class="text-danger"> Not a valid email address. </small>
                    </div>
                </div>
            </div>

            <!-- Password -->
            <div class="form-group mb-3">
                <label> <small> Password: </small> </label>
                <input 
                    type="password"
                    class="form-control" 
                    :class="{ 'is-invalid': $v.data.password.$error }"
                    @blur="setPassword($event.target.value)"
                />

                <!-- Errors -->
                <div v-if="$v.data.password.$dirty">
                    <div v-if="!$v.data.password.required">
                        <small class="text-danger"> Password must not be empty. </small>
                    </div>

                    <div v-if="!$v.data.password.minLength">
                        <small class="text-danger"> Password must contain at least 8 characters. </small>
                    </div>

                    <div v-if="!$v.data.password.containsNumber">
                        <small class="text-danger"> Password must contain at least 1 number. </small>
                    </div>
                </div>
            </div>

            <!-- Confirm password -->
            <div class="form-group mb-4">
                <label> <small> Confirm password: </small> </label>
                <input 
                    type="password"
                    class="form-control" 
                    :class="{ 'is-invalid': $v.data.password_confirmation.$error }"
                    @blur="setPasswordConfirmation($event.target.value)"
                />

                <!-- Errors -->
                <div v-if="$v.data.password_confirmation.$dirty">
                    <div v-if="!$v.data.password_confirmation.required">
                        <small class="text-danger"> Password confirmation must not be empty. </small>
                    </div>

                    <div v-if="!$v.data.password_confirmation.sameAs">
                        <small class="text-danger"> Passwords do not match. </small>
                    </div>
                </div>
            </div>

            <!-- Submit -->
            <div class="text-center">
                <b-button variant="primary" type="submit" class="px-3"> Submit </b-button>
            </div>

            <!-- Error -->
            <div v-if="error" class="text-center">
                <small class="text-danger"> Something went wrong. Please try again. </small>
            </div>
        </form>
    </div>
</template>

<script>
import { required, alpha, email, minLength, sameAs } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
    name: 'register',

    data() {
        return {
            data: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            error: false
        }
    },

    methods: {
        ...mapActions('auth', ['register']),

        async submit() {
            this.$v.$touch();

            if (!this.$v.$invalid) {
                try {
                    await this.register(this.data);
                    this.$router.push('/');
                } catch(e) {
                    console.log(e);
                    this.error = true;
                }
            }
        },

        setFirstName(value) {
            this.data.first_name = value;
            this.$v.data.first_name.$touch();
        },

        setLastName(value) {
            this.data.last_name = value;
            this.$v.data.last_name.$touch();
        },

        setEmail(value) {
            this.data.email = value;
            this.$v.data.email.$touch();
        },

        setPassword(value) {
            this.data.password = value;
            this.$v.data.password.$touch();
        },

        setPasswordConfirmation(value) {
            this.data.password_confirmation = value;
            this.$v.data.password_confirmation.$touch();
        },
    },

    validations: {
        data: {
            first_name: {
                required,
                alpha
            },
    
            last_name: {
                required,
                alpha
            },
    
            email: {
                required,
                email
            },
            
            password: {
                required,
                minLength: minLength(8),
                containsNumber: function(value) {
                return /[0-9]/.test(value)
                }
            },
    
            password_confirmation: {
                required,
                sameAs: sameAs('password')
            }
        }
    }
}
</script>