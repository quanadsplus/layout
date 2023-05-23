<script>
import {
  layoutComputed
} from "@/state/helpers";
import {
  SimpleBar
} from "simplebar-vue3";


import sidebar from '../configs/sidebar';


export default {
  components: {
    SimpleBar
  },
  data() {
    return {
      sidebar,
      settings: {
        minScrollbarLength: 60,
      },
    };
  },
  computed: {
    ...layoutComputed,
    layoutType: {
      get() {
        return this.$store ? this.$store.state.layout.layoutType : {} || {};
      },
    },
  },

  watch: {
    $route: {
      handler: "onRoutechange",
      immediate: true,
      deep: true,
    },
  },

  mounted() {
    if (document.querySelectorAll(".navbar-nav .collapse")) {
      let collapses = document.querySelectorAll(".navbar-nav .collapse");

      collapses.forEach((collapse) => {
        // Hide sibling collapses on `show.bs.collapse`
        collapse.addEventListener("show.bs.collapse", (e) => {
          e.stopPropagation();
          let closestCollapse = collapse.parentElement.closest(".collapse");
          if (closestCollapse) {
            let siblingCollapses =
              closestCollapse.querySelectorAll(".collapse");
            siblingCollapses.forEach((siblingCollapse) => {
              if (siblingCollapse.classList.contains("show")) {
                siblingCollapse.classList.remove("show");
                siblingCollapse.parentElement.firstChild.setAttribute("aria-expanded", "false");
              }
            });
          } else {
            let getSiblings = (elem) => {
              // Setup siblings array and get the first sibling
              let siblings = [];
              let sibling = elem.parentNode.firstChild;
              // Loop through each sibling and push to the array
              while (sibling) {
                if (sibling.nodeType === 1 && sibling !== elem) {
                  siblings.push(sibling);
                }
                sibling = sibling.nextSibling;
              }
              return siblings;
            };
            let siblings = getSiblings(collapse.parentElement);
            siblings.forEach((item) => {
              if (item.childNodes.length > 2) {
                item.firstElementChild.setAttribute("aria-expanded", "false");
                item.firstElementChild.classList.remove("active");
              }
              let ids = item.querySelectorAll("*[id]");
              ids.forEach((item1) => {
                item1.classList.remove("show");
                item1.parentElement.firstChild.setAttribute("aria-expanded", "false");
                item1.parentElement.firstChild.classList.remove("active");
                if (item1.childNodes.length > 2) {
                  let val = item1.querySelectorAll("ul li a");

                  val.forEach((subitem) => {
                    if (subitem.hasAttribute("aria-expanded"))
                      subitem.setAttribute("aria-expanded", "false");
                  });
                }
              });
            });
          }
        });

        // Hide nested collapses on `hide.bs.collapse`
        collapse.addEventListener("hide.bs.collapse", (e) => {
          e.stopPropagation();
          let childCollapses = collapse.querySelectorAll(".collapse");
          childCollapses.forEach((childCollapse) => {
            let childCollapseInstance = childCollapse;
            childCollapseInstance.classList.remove("show");
            childCollapseInstance.parentElement.firstChild.setAttribute("aria-expanded", "false");
          });
        });
      });
    }
  },

  methods: {
    onRoutechange(ele) {
      this.initActiveMenu(ele.path);
      if (document.getElementsByClassName("mm-active").length > 0) {
        const currentPosition = document.getElementsByClassName("mm-active")[0].offsetTop;
        if (currentPosition > 500)
          if (this.$refs.isSimplebar)
            this.$refs.isSimplebar.value.getScrollElement().scrollTop = currentPosition + 300;
      }
    },

    initActiveMenu(ele) {
      setTimeout(() => {
        if (document.querySelector("#navbar-nav")) {
          let a = document.querySelector("#navbar-nav").querySelector('[href="' + ele + '"]');
          if (a) {
            a.classList.add("active");
            let parentCollapseDiv = a.closest(".collapse.menu-dropdown");
            if (parentCollapseDiv) {
              parentCollapseDiv.classList.add("show");
              parentCollapseDiv.parentElement.children[0].classList.add("active");
              parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
              if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
                parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
                if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
                  parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
                const grandparent = parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.parentElement.closest(".collapse");
                if (grandparent && grandparent && grandparent.previousElementSibling) {
                  grandparent.previousElementSibling.classList.add("active");
                  grandparent.classList.add("show");
                }
              }
            }
          }
        }
      }, 0);
    },
  },
};
</script>

<template>
  <b-container fluid>
  <div id="two-column-menu"></div>

  <template v-if="layoutType === 'twocolumn'">
    <SimpleBar class="navbar-nav" id="navbar-nav">
      <li class="menu-title">
        <span data-key="t-menu"> {{ $t("t-menu") }}</span>
      </li>
      <li v-for="(item, index) in sidebar.sideBarListSm" :key="index" class="nav-item">
        <b-link v-if="item.href !== ''" class="nav-link menu-link" :href="item.href" data-bs-toggle="collapse"
          role="button" aria-expanded="false" :aria-controls="item.id">
          <i :class="item.icon"></i>
          <span :data-key="item.t"> {{ $t(item.t) }}</span>
        </b-link>
        <router-link v-if="item.link !== ''" :to="item.link" class="nav-link menu-link">
          <i :class="item.icon"></i>
          <span :data-key="item.t"> {{ $t(item.t) }}</span>
        </router-link>
        <div v-if="item.list.length > 0" class="collapse menu-dropdown" :id="item.id">
          <ul class="nav nav-sm flex-column">
            <li v-for="(router1, index) in  item.list" :key="index" class="nav-item">
              <b-link v-if="router1.id !== ''" :href="router1.id" class="nav-link" data-bs-toggle="collapse"
                role="button" aria-expanded="false" :aria-controls="router1.value" :data-key="router1.t">
                {{ $t(router1.t) }}
              </b-link>
              <router-link v-if="router1.link !== ''" :to="router1.link" class="nav-link menu-link">
                <i :class="router1.icon"></i>
                <span :data-key="router1.t"> {{ $t(router1.t) }}</span>
              </router-link>
              <div v-if="router1.list.length > 0" class="collapse menu-dropdown" :id="router1.value">
                <ul class="nav nav-sm flex-column">
                  <li v-for="(router2, index) in router1.list" :key="index" class="nav-item">
                    <b-link v-if="router2.id !== ''" :href="router2.id" class="nav-link" data-bs-toggle="collapse"
                      role="button" aria-expanded="false" :aria-controls="router2.value" :data-key="router2.t">{{
                        $t(router2.t) }}
                    </b-link>
                    <router-link v-if="router2.link !== ''" :to="router2.link" class="nav-link" :data-key="router2.t">
                      {{ $t(router2.t) }}
                    </router-link>
                    <div v-if="router2.list.length > 0" class="collapse menu-dropdown" :id="router2.value">
                      <ul class="nav nav-sm flex-column">
                        <li v-for="(router3, index) in router2.list" :key="index" class="nav-item">
                          <router-link :to="router3.link" class="nav-link" :data-key="router3.t">{{ $t(router3.t) }}
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
</template>