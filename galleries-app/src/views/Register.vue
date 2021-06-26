<template>
    <div class="container" style="max-width: 360px;">
        <div class="text-center mb-4">
            <h1 class="display-2 lobster"> Register </h1>
            <hr>
        </div>
        
        <form @submit.prevent="submit">

            <!-- First name -->
            <div class="form-group mb-3">
                <label> First name: </label>
                <input 
                    type="text"
                    class="form-control" 
                    :class="{ 'is-invalid': $v.data.first_name.$error }"
                    @blur="setFirstName($event.target.value)"
                />

                <!-- Errors -->
                <div v-if="$v.data.first_name.$dirty">
                    <div v-if="!$v.data.first_name.alpha">
                        <small class="text-danger"> First name must contain only letters. </small>
                    </div>
                </div>
            </div>

            <!-- Last name -->
            <div class="form-group mb-3">
                <label> Last name: </label>
                <input 
                    type="text"
                    class="form-control" 
                    :class="{ 'is-invalid': $v.data.last_name.$error }"
                    @blur="setLastName($event.target.value)"
                />

                <!-- Errors -->
                <div v-if="$v.data.last_name.$dirty">
                    <div v-if="!$v.data.last_name.alpha">
                        <small class="text-danger"> Last name must contain only letters. </small>
                    </div>
                </div>
            </div>

            <!-- Email -->
            <div class="form-group mb-3">
                <label> Email address: </label>
                <input 
                    type="text"
                    class="form-control" 
                    :class="{ 'is-invalid': $v.data.email.$error }"
                    @blur="setEmail($event.target.value)"
                />

                <!-- Errors -->
                <div v-if="$v.data.email.$dirty">
                    <div v-if="!$v.data.email.email">
                        <small class="text-danger"> Not a valid email address. </small>
                    </div>
                </div>
            </div>

            <!-- Password -->
            <div class="form-group mb-3">
                <label> Password: </label>
                <input 
                    type="password"
                    class="form-control" 
                    :class="{ 'is-invalid': $v.data.password.$error }"
                    @blur="setPassword($event.target.value)"
                />
                <small class="form-text text-muted"> At least 8 characters long with at least 1 number. </small>

                <!-- Errors -->
                <div v-if="$v.data.password.$dirty">
                    <div v-if="!$v.data.password.minLength">
                        <small class="text-danger"> Password must contain at least 8 characters. </small>
                    </div>

                    <div v-if="!$v.data.password.containsNumber && $v.data.password.required">
                        <small class="text-danger"> Password must contain at least 1 number. </small>
                    </div>
                </div>
            </div>

            <!-- Confirm password -->
            <div class="form-group mb-4">
                <label> Confirm password: </label>
                <input 
                    type="password"
                    class="form-control" 
                    :class="{ 'is-invalid': $v.data.password_confirmation.$error }"
                    @blur="setPasswordConfirmation($event.target.value)"
                />

                <!-- Errors -->
                <div v-if="$v.data.password_confirmation.$dirty">
                    <div v-if="!$v.data.password_confirmation.sameAs">
                        <small class="text-danger"> Passwords do not match. </small>
                    </div>
                </div>
            </div>

            <!-- Terms and Conditions -->
            <div class="form-check mb-4">
                <label class="form-check-label"> I accept the <strong class="nav-link m-0 p-0 d-inline">Terms and Conditions</strong>. </label>
                <input 
                    type="checkbox" 
                    class="form-check-input" 
                    :class="{ 'is-invalid': $v.terms.$error }"
                    v-model.trim="terms"
                    @change="$v.terms.$touch()"
                />
            </div>

            <!-- Submit -->
            <div class="text-center">
                <b-button variant="primary" type="submit" class="px-3 mb-3"> <h4 class="lobster mb-0"> Submit </h4> </b-button>
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
                password_confirmation: '',
            },
            terms: false,
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

        setTerms(value) {
            this.terms = value;
            this.$v.terms.$touch();
        }
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
        },

        terms: {
            sameAs: sameAs(() => true)
        }
    }
}
</script>