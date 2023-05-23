<script>
import appConfig from "../../../app.config";

import { required, helpers, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Lottie from "@/components/widgets/lottie.vue";
import AuthLayout from "../../layouts/authLayout.vue";
import alert from "../../helpers/alert"
import animationData from "@/components/widgets/rhvddzym.json";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
	components: {
		lottie: Lottie, 
		AuthLayout
	},
	setup() {
		const store = useStore()

		const state = ref({
			success: false,
			variant: true,
			email: "",

		})
		const rules = {
			email: {
				required: helpers.withMessage("ID đăng nhập là bắt buộc.", required),
				minLength: helpers.withMessage("ID đăng nhập phải có ít nhất 6 kí tự", minLength(6)) // Đặt độ dài tối thiểu là 6 ký tự
			},

		}
		const v$ = useVuelidate(rules, state)

		async function submitForm() {
			// stop here if form is invalid
			v$.value.$validate()
			if (v$.value.$invalid) {
				return;
			}
			else {
				const myPromise = new Promise((resolve) => {
					setTimeout(() => {
						resolve("foo");
					}, 2000);

				});

				const result = await store.dispatch("authentication/forgotPassword", state.value.email)
				state.value.success = true
				if (result) {
					myPromise.then(() => alert.getAlert(store.state.notification.message, store.state.notification.type, true))
						.then(() => state.value.success = false)

				}
				else {
					myPromise.then(() => alert.getAlert(store.state.notification.message, store.state.notification.type, true))
						.then(() => state.value.success = false)
				}
			}
		}
		return {
			v$: v$,
			state,
			submitForm,
			defaultOptions: { animationData: animationData },

		};
	},

	page: {
		title: "Forgot Password",
		meta: [
			{
				name: "description",
				content: appConfig.description,
			},
		],
	},
	data() {
		return {
		};
	},
	methods: {
	},
};
</script>
<template>
	<AuthLayout>
		<div class="auth-page-content">
			<b-container>
				<b-row class="justify-content-center">
					<b-col md="8" lg="6" xl="5">
						<b-card no-body class="mt-4">
							<b-card-body class="p-4">
								<div class="text-center mt-2">
									<h5 class="text-primary">Quên mật khẩu</h5>
									<p class="text-muted">Đặt lại mật khẩu với Adsplus</p>
									<lottie class="avatar-xl" colors="primary:#0ab39c,secondary:#405189"
										:options="defaultOptions" :height="120" :width="120" />
								</div>
								<div class="p-2">
									<form @submit.prevent="submitForm">
										<div class="mb-4">
											<label class="form-label">ID Đăng nhập</label>
											<input v-model="state.email" class="form-control" id="email"
												:class="{ 'is-invalid': v$.email.$error }"
												placeholder="Nhập ID Đăng nhập của bạn" @input="v$.email.$touch"
												@blur="v$.email.$touch" />
											<div v-for="(item, index) in v$.email.$errors" :key="index"
												class="invalid-feedback">
												<span v-if="item.$message">{{ item.$message }}</span>
											</div>
										</div>

										<div class="text-center mt-4">
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
													<b-button variant="success" class="w-100" type="submit">
														Gửi
													</b-button>
												</div>
											</div>
										</div>
									</form>
								</div>
							</b-card-body>
						</b-card>

						<div class="mt-4 text-center">
							<p class="mb-0">
								Tôi đã nhớ lại mật khẩu của mình...
								<router-link to="/login" class="fw-semibold text-primary text-decoration-underline">
									Đăng nhập
								</router-link>
							</p>
						</div>
					</b-col>
				</b-row>
			</b-container>
		</div>
	</AuthLayout>
</template>


