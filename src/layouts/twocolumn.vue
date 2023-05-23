<script>
import router from "@/router";
import {
	SimpleBar
} from "simplebar-vue3";
import {
	layoutComputed
} from "@/state/helpers";
import Menu from "@/components/menu.vue";
import NavBar from "@/components/nav-bar";
import RightBar from "@/components/right-bar";
import Footer from "@/components/footer";
import sidebar from "../configs/sidebar";
/**
 * Vertical layout
 */
export default {
	components: {
		NavBar,
		RightBar,
		Footer,
		SimpleBar,
		Menu
	},
	data() {
		return {
			sidebar,
			isMenuCondensed: false,
			rmenu: localStorage.getItem('rmenu') ? localStorage.getItem('rmenu') : 'twocolumn',
		};
	},

	computed: {
		...layoutComputed,
	},
	created: () => {
		document.body.removeAttribute("data-layout", "horizontal");
		document.body.removeAttribute("data-topbar", "dark");
		document.body.removeAttribute("data-layout-size", "boxed");
	},
	methods: {
		initActiveMenu() {
			const pathName = window.location.pathname;
			const ul = document.getElementById("navbar-nav");
			if (ul) {
				const items = Array.from(ul.querySelectorAll("a.nav-link"));
				let activeItems = items.filter((x) => x.classList.contains("active"));
				this.removeActivation(activeItems);
				let matchingMenuItem = items.find((x) => {
					return x.getAttribute("href") === pathName;
				});
				if (matchingMenuItem) {
					this.activateParentDropdown(matchingMenuItem);
				} else {
					var id = pathName.replace("/", "");
					if (id) document.body.classList.add("twocolumn-panel");
					this.activateIconSidebarActive(pathName);
				}
			}
		},

		updateMenu(e) {
			document.body.classList.remove("twocolumn-panel");
			const ul = document.getElementById("navbar-nav");
			if (ul) {
				const items = Array.from(ul.querySelectorAll(".show"));
				items.forEach((item) => {
					item.classList.remove("show");
				});
			}
			const icons = document.getElementById("two-column-menu");
			if (icons) {
				const activeIcons = Array.from(
					icons.querySelectorAll(".nav-icon.active")
				);
				activeIcons.forEach((item) => {
					item.classList.remove("active");
				});
			}
			document.getElementById(e).classList.add("show");
			this.activateIconSidebarActive("#" + e);
		},

		removeActivation(items) {
			items.forEach((item) => {
				if (item.classList.contains("menu-link")) {
					if (!item.classList.contains("active")) {
						item.setAttribute("aria-expanded", false);
					}
					if(item.nextElementSibling)item.nextElementSibling.classList.remove("show");
					
				}
				if (item.classList.contains("nav-link")) {
					if (item.nextElementSibling) {
						item.nextElementSibling.classList.remove("show"); 
					}
					item.setAttribute("aria-expanded", false);
				}
				item.classList.remove("active");
			});
		},

		activateIconSidebarActive(id) {
			var menu = document.querySelector(
				"#two-column-menu .simplebar-content-wrapper a[href='" +
				id + 
				"'].nav-icon"
			);
			if (menu !== null) {
				menu.classList.add("active");
			}
		},

		activateParentDropdown(item) {
			// navbar-nav menu add active
			item.classList.add("active");
			let parentCollapseDiv = item.closest(".collapse.menu-dropdown");
			if (parentCollapseDiv) {
				// to set aria expand true remaining
				parentCollapseDiv.classList.add("show");
				parentCollapseDiv.parentElement.children[0].classList.add("active");
				parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
				if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
					if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown").previousElementSibling) {
						if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown").previousElementSibling.parentElement.closest(".collapse.menu-dropdown")) {
							const grandparent = parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown").previousElementSibling.parentElement.closest(".collapse.menu-dropdown");
							this.activateIconSidebarActive("#" + grandparent.getAttribute("id"));
							grandparent.classList.add("show");
						}
					}
					this.activateIconSidebarActive("#" + parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")
						.getAttribute("id"));

					parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
					if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
						parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
					return false;
				}
				this.activateIconSidebarActive("#" + parentCollapseDiv.getAttribute("id"));
				return false;
			}
			return false;
		},

		toggleMenu() {
			document.body.classList.toggle("sidebar-enable");

			if (window.screen.width >= 992) {
				// eslint-disable-next-line no-unused-vars
				router.afterEach((routeTo, routeFrom) => {
					document.body.classList.remove("sidebar-enable");
					document.body.classList.remove("vertical-collpsed");
				});
				document.body.classList.toggle("vertical-collpsed");
			} else {
				// eslint-disable-next-line no-unused-vars
				router.afterEach((routeTo, routeFrom) => {
					document.body.classList.remove("sidebar-enable");
				});
				document.body.classList.remove("vertical-collpsed");
			}
			this.isMenuCondensed = !this.isMenuCondensed;
		},

		toggleRightSidebar() {
			document.body.classList.toggle("right-bar-enabled");
		},

		hideRightSidebar() {
			document.body.classList.remove("right-bar-enabled");
		},
		getConfigLayout(){
			// if(layout === 'manager') return sidebar.manager
			// if(layour === 'user') return sidebar.user
		}
	},

	mounted() {
		this.initActiveMenu();
		if (this.rmenu == 'vertical' && this.layoutType == 'twocolumn') {
			document.documentElement.setAttribute("data-layout", "vertical");
		}
		document.getElementById('overlay').addEventListener('click', () => {
			document.body.classList.remove('vertical-sidebar-enable');
		});

		window.addEventListener("resize", () => {
			if (this.layoutType == 'twocolumn') {
				var windowSize = document.documentElement.clientWidth;
				if (windowSize < 767) {
					document.documentElement.setAttribute("data-layout", "vertical");
					this.rmenu = 'vertical';
					localStorage.setItem('rmenu', 'vertical');
				} else {
					document.documentElement.setAttribute("data-layout", "twocolumn");
					this.rmenu = 'twocolumn';
					localStorage.setItem('rmenu', 'twocolumn');
					setTimeout(() => {
						this.initActiveMenu();
					}, 50);

				}
			}
		});
	},
};
</script>

<template>
	<div id="layout-wrapper">
		<NavBar />
		<div>
			<!-- ========== Left Sidebar Start ========== -->
			<!-- ========== App Menu ========== -->
			<div class="app-menu navbar-menu">
				<!-- LOGO -->
				<div class="navbar-brand-box">
					<!-- Dark Logo-->
					<router-link to="/" class="logo logo-dark">
						<span class="logo-sm">
							<img src="@/assets/images/logo-sm.png" alt="" height="22" />
						</span>
						<span class="logo-lg">
							<img src="@/assets/images/logo-dark.png" alt="" height="17" />
						</span>
					</router-link>
					<!-- Light Logo-->
					<router-link to="/" class="logo logo-light">
						<span class="logo-sm">
							<img src="@/assets/images/logo-sm.png" alt="" height="22" />
						</span>
						<span class="logo-lg">
							<img src="@/assets/images/logo-light.png" alt="" height="17" />
						</span>
					</router-link>
					<button type="button" class=" btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
						id="vertical-hover">
						<i class="ri-record-circle-line"></i>
					</button>
				</div>

				<div id="scrollbar" v-if="rmenu == 'twocolumn'">
					<b-container fluid>
						<div id="two-column-menu">
							<SimpleBar class="twocolumn-iconview list-unstyled">
								<b-link href="#" class="logo"><img src="@/assets/images/logo-sm.png" alt="Logo" height="22" /></b-link>
								<li v-for="(item,index) in sidebar.sideBarIcon" :key="index">
									<b-link v-if="item.href !== ''" class="nav-icon" :href="item.href" role="button"
										@click.prevent="updateMenu(item.menuValue)">
										<i :class="item.icon"></i>
									</b-link>
									<router-link v-if="item.link !== ''" class="nav-icon" :to="item.link">
										<i :class="item.icon"></i>
									</router-link>
								</li>
								
							</SimpleBar>
						</div>
						<template v-if="layoutType === 'twocolumn'">
							<SimpleBar class="navbar-nav" id="navbar-nav">
								<!-- end Dashboard Menu -->
								<li class="nav-item" v-for="(item,index) in sidebar.sideBarList" :key="index">
									<div class="collapse menu-dropdown" :id="item.id">
										<ul class="nav nav-sm flex-column">
											<li class="nav-item" v-for="(router1,index) in item.list" :key="index">
												<b-link v-if="router1.id !== ''" :href="router1.id" class="nav-link" data-bs-toggle="collapse" role="button"
													aria-expanded="false" :aria-controls="router1.value" :data-key="router1.datakey">
													{{ $t(router1.t) }}
												</b-link>
												<router-link v-else :to="router1.link" class="nav-link" :data-key="router1.datakey">
													{{ $t(router1.t) }}
												</router-link>
												<div v-if="router1.list.length > 0" class="collapse menu-dropdown" id="sidebaremail">
													<ul class="nav nav-sm flex-column">
														<li v-for="(router2,index) in router1.list" :key="index" class="nav-item">
															<b-link v-if="router2.id !== ''" :href="router2.id" class="nav-link" data-bs-toggle="collapse" role="button"
																aria-expanded="false" :aria-controls="router2.value" data-key="t-projects">
																{{ $t("t-email-templates") }}
															</b-link>
															<router-link v-else :to="router2.link" class="nav-link" :data-key="router2.datakey">
																{{ $t(router2.t) }}
															</router-link>
															<div v-if="router2.list.length > 0" class="collapse menu-dropdown" :id="router2.value">
																<ul class="nav nav-sm flex-column">
																	<li class="nav-item" v-for="(router3,index) in router2.list" :key="index">
																		<router-link :to="router3.link" class="nav-link" :data-key="router3.datakey">
																			{{ $t(router3.t) }}
																		</router-link>
																	</li>
																</ul>
															</div>
														</li>
													</ul>
												</div>
											</li>
										</ul>
									</div>
								</li>
							</SimpleBar>
						</template>
					</b-container>
				</div>

				<SimpleBar id="scrollbar" class="h-100" ref="scrollbar" v-if="rmenu == 'vertical'">
					<Menu></Menu>
				</SimpleBar>

				<div class="sidebar-background"></div>
			</div>
			<!-- Left Sidebar End -->
			<!-- Vertical Overlay-->
			<div class="vertical-overlay" id="overlay"></div>
		</div>
		<!-- ============================================================== -->
		<!-- Start Page Content here -->
		<!-- ============================================================== -->

		<div class="main-content">
			<div class="page-content">
				<!-- Start Content-->
				<div >
					<slot />
				</div>
			</div>
			<Footer />
		</div>
		<RightBar />
	</div>
</template>