

<script>
import i18n from "../i18n";
export default {
    data() {
        return {
            languages: [{
                flag: require("@/assets/images/flags/us.svg"),
                language: "en",
                title: "English",
            },
            {
                flag: require("@/assets/images/flags/spain.svg"),
                language: "sp",
                title: "Española",
            },
            {
                flag: require("@/assets/images/flags/germany.svg"),
                language: "gr",
                title: "Deutsche",
            },
            {
                flag: require("@/assets/images/flags/italy.svg"),
                language: "it",
                title: "italiana",
            },
            {
                flag: require("@/assets/images/flags/russia.svg"),
                language: "ru",
                title: "русский",
            },
            {
                flag: require("@/assets/images/flags/china.svg"),
                language: "ch",
                title: "中國人",
            },
            {
                flag: require("@/assets/images/flags/french.svg"),
                language: "fr",
                title: "Français",
            },
            {
                flag: require("@/assets/images/flags/ae.svg"),
                language: "ar",
                title: "Arabic",
            },
            {
                flag: require("@/assets/images/flags/vn.svg"),
                language: "vi",
                title: "Việt Nam",
            },
            ],
            lan: i18n.locale,
            text: null,
            flag: null,
            value: null,
            myVar: 1,
            title: 'English'
        };
    },
    methods: {
        setLanguage(locale, country, flag) {
            this.lan = locale;
            this.text = country;
            this.flag = flag;
            this.title = country
            document.getElementById("header-lang-img").setAttribute("src", flag);
            i18n.global.locale = locale;
        },
    },
    mounted() {
        if (process.env.VUE_APP_I18N_LOCALE) {
            this.flag = process.env.VUE_APP_I18N_LOCALE;
            this.languages.forEach((item) => {
                if (item.language == this.flag) {

                    document.getElementById("header-lang-img").setAttribute("src", item.flag);
                }
            });
        }
    },
}
</script>


<template>
    <div>
        <div class="d-flex align-items-center">
            <div class="dropdown d-md-none topbar-head-dropdown header-item">
                <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                    id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="bx bx-search fs-22"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                    aria-labelledby="page-header-search-dropdown">
                    <form class="p-3">
                        <div class="form-group m-0">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search ..."
                                    aria-label="Recipient's username" />
                                <b-button variant="primary" type="submit">
                                    <i class="mdi mdi-magnify"></i>
                                </b-button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="dropdown ms-1 topbar-head-dropdown header-item">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary"
                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width: fit-content; padding: 4px 8px; background-color: #fff; display: flex; align-item: center; gap:8px;">
                <img id="header-lang-img" ref="refheader" src="@/assets/images/flags/us.svg" alt="Header Language"
                    height="20" class="rounded" />
                <div>{{ title }}</div>
                <div>
                    <i class="bx bx-chevron-down"></i>
                </div>
            </button>
            <div class="dropdown-menu dropdown-menu-end">
                <b-link href="javascript:void(0);" v-for="(entry, i) in languages" :key="`Lang${i}`" :value="entry"
                    @click="setLanguage(entry.language, entry.title, entry.flag)"
                    :class="{ active: lan === entry.language }" class="dropdown-item notify-item language py-2"
                    data-lang="en" :title="entry.title">
                    <img :src="entry.flag" alt="user-image" class="me-2 rounded" height="18" />
                    <span class="align-middle">{{ entry.title }}</span>

                </b-link>
            </div>

        </div>
    </div>
</template>



<style lang="scss" scoped></style>