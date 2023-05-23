<script>
import {
    required,
    email,
    helpers,
    minLength
} from "@vuelidate/validators";

import {
    reactive
} from 'vue'
import {
    useVuelidate
} from '@vuelidate/core'
import appConfig from "../../../app.config";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
import alert from '../../helpers/alert'
export default {
    setup() {
        const initialState = {
            email: 'admin@themesbrand.com',
            password: '123456',
            success: false,
            isSaveLogin: false,
            isShowPassword: false,
            message: ''
        }
        const rules = {
            email: {
                required: helpers.withMessage("ID đăng nhập là bắt buộc.", required),
                email: helpers.withMessage("Bạn vui lòng nhập E-Mail.", email),
            },
            password: {
                required: helpers.withMessage("Mật khẩu là bắt buộc.", required),
                minLength: helpers.withMessage("Mật khẩu mật khẩu ít nhất phải 8 ký tự.", minLength(6)),
            },

        }
        const state = reactive({
            ...initialState,
        })
        const v$ = useVuelidate(rules, state)

        const store = useStore()
        const router = useRouter()
        async function signinapi() {
            v$.value.$validate()
            if (v$.value.$invalid) {
                return;

            } else {
                state.success = true
                const respone = await store.dispatch("authentication/loginEmailPassword", { email: state.email, password: state.password, isSaveLogin: state.isSaveLogin })
                if (respone) {
                    state.success = false
                    console.log('router push')
                    alert.getAlert(store.state.notification.message, store.state.notification.type, false)
                   
                    setTimeout(() => {
                        router.push('/')
                    }, 1500);
                }
                else {
                    state.success = false
                    alert.getAlert(store.state.notification.message, store.state.notification.type)
                }
            }

        }
        return {
            v$,
            state,
            signinapi,
            router,
            store,

        }
    },

    page: {
        title: "Login",
        meta: [{
            name: "description",
            content: appConfig.description,
        },],
    },
};
</script>

<template>
    <div class="auth-page-wrapper pt-3">
        <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
            <div class="bg-overlay"></div>

            <div class="shape">

                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 1440 120">
                    <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                </svg>
            </div>
        </div>
 
        <div style="pb-2">
            <b-container>
                <b-row class="">
                    <b-col lg="12">
                        <div class="text-center  text-white-50">
                            <b-row class="justify-content-center">
                                <b-col md="8" lg="6" xl="5" style="z-index: 1 !important;">
                                    <img src="../../../public/images/adsplus-google-premier-partner.png" alt="logo_login"
                                        style="width: 100%; object-fit: cover;">
                                </b-col>
                            </b-row>
                            <p class="mt-2 fs-15 fw-medium">
                                Nền tảng báo cáo số liệu quảng cáo thực tế dành cho khách hàng.
                            </p>
                            <div class="d-flex justify-content-center">
                            </div>
                        </div>
                    </b-col>
                </b-row>

                <b-row class="justify-content-center">
                    <b-col md="8" lg="6" xl="5" style="z-index: 1 !important;">
                        <b-card no-body class="mt-2">
                            <b-card-body class="p-4">
                                <div class="text-center mt-2">
                                    <h5 class="text-primary">{{ $t("t-login-title") }}</h5>
                                    <p class="text-muted">Tiếp tục đăng nhập để thay đổi số liệu QC</p>
                                </div>

                                <div class="p-2 mt-4">
                                    <form>
                                        <div class="mb-2">
                                            <label for="email" class="form-label">ID Đăng nhập</label>
                                            <input type="email" class="form-control"
                                            :class="{ 'is-invalid': v$.email.$error, 'active': v$.email.$error }"
                                            @input="v$.email.$touch" @blur="v$.email.$touch" placeholder="Enter email"
                                                v-model="state.email" />
                                            <div v-for="(item, index) in v$.email.$errors" :key="index"
                                                class="invalid-feedback">
                                                <span v-if="item.$message">{{ item.$message }}</span>
                                            </div>
                                            <div class="float-end">
                                                <router-link to="/forgot-password" class="text-muted">Quên ID?</router-link>
                                            </div>
                                            <div class="invalid-feedback">
                                                <span></span>
                                            </div>
                                        </div>

                                        <div class="mb-3">

                                            <label class="form-label" for="password-input">Mật khẩu</label>
                                            <div class="position-relative auth-pass-inputgroup mb-3">
                                                <input :type="state.isShowPassword ? 'text' : 'password'"
                                                    v-model="state.password" @input="v$.password.$touch"
                                                    @blur="v$.password.$touch" class="form-control pe-5"
                                                    placeholder="Enter password"
                                                    :class="{ 'is-invalid': v$.password.$error }" id="password-input" />
                                                <div v-for="(item, index) in v$.password.$errors" :key="index"
                                                    class="invalid-feedback">
                                                    <span v-if="item.$message">{{ item.$message }}</span>
                                                </div>
                                                <b-button variant="link"
                                                    class="position-absolute end-0 top-0 text-decoration-none text-muted"
                                                    type="button" id="password-addon"
                                                    @click="state.isShowPassword = !state.isShowPassword">
                                                    <i class="ri-eye-fill align-middle"></i>
                                                </b-button>

                                            </div>
                                        </div>

                                        <div class="form-check">
                                            <input class="form-check-input" v-model="state.isSaveLogin" type="checkbox"
                                                value="" id="auth-remember-check" />
                                            <label class="form-check-label" for="auth-remember-check">Lưu thông tin đăng
                                                nhập</label>
                                            <div class="float-end">
                                                <router-link to="/forgot-password" class="text-muted">Quên mật
                                                    khẩu?</router-link>
                                            </div>
                                        </div>

                                        <div class="mt-4">
                                            <div v-if="state.success">
                                                <button type="button" class="btn w-100 btn-success btn-load">
                                                    <span class="d-flex align-items-center justify-content-center">
                                                        <span class="spinner-border flex-shrink-0" role="status">
                                                            <span class="visually-hidden">Loading...</span>
                                                        </span>
                                                    </span>
                                                </button>
                                            </div>
                                            <div v-else>
                                                <b-button variant="success" class="w-100" type="submit"
                                                    @click.prevent="signinapi">
                                                    Đăng nhập
                                                </b-button>
                                            </div>
                                        </div>

                                        <div class="mt-4 text-center">
                                            <div class="signin-other-title">
                                                <h5 class="fs-13 mb-4 title">Đăng nhập với</h5>
                                            </div>
                                            <div>
                                                <b-button variant="primary" type="button" class="btn btn-primary btn-icon">
                                                    <i class="ri-facebook-fill fs-16"></i>
                                                </b-button>
                                                <b-button variant="danger" type="button"
                                                    class="btn btn-danger btn-icon ms-1">
                                                    <i class="ri-google-fill fs-16"></i>
                                                </b-button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </b-card-body>
                        </b-card>

                        <div class="mt-4 text-center">
                            <p class="mb-0">
                                Chưa có thông tin đăng nhập !
                                <!-- <router-link to="/register" class="fw-semibold text-primarytext-decoration-underline">
                                    Nhận thông tin qua E-mail
                            </router-link> -->
                        </p>
                        <span>(Dành cho <strong>khách hàng Adsplus</strong> đang sử dụng dịch vụ tại adsplus)</span>
                    </div>
                </b-col>
            </b-row>
        </b-container>
   
    </div>
    <!-- Load More Buttons -->

</div></template>

<style scoped>.is-invalid {
    background-image: none;
}</style>
