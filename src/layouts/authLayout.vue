<template>
    <div class="auth-page-wrapper pt-5">
        <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
            <div class="bg-overlay"></div>

            <div class="shape">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 1440 120">
                    <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                </svg>
            </div>
        </div>
        <div class="auth-page-content">
            <b-container>
                <b-row>
                    <b-col lg="12">
                        <div class="text-center mb-4 text-white-50">
                            <b-row class="justify-content-center">
                                <b-col md="8" lg="6" xl="5" style="z-index: 1 !important;">
                                    <img src="../../public/images/adsplus-google-premier-partner.png" alt="logo_login"
                                        style="width: 100%; object-fit: cover;">
                                </b-col>
                            </b-row>
                            <p class="mt-3 fs-15 fw-medium">
                                Nền tảng báo cáo số liệu quảng cáo thực tế dành cho khách hàng.
                            </p>
                        </div>
                    </b-col>
                </b-row>
                <slot />
            </b-container>
        </div>
    </div>
</template>


<style scoped>
.auth-page-content{
    padding-bottom: 30px !important;
}
</style>