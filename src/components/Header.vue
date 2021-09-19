<template>
    <header v-if="this.$store.getters['getCurrentUser'] && true">
        <div id='navbar_main' class='row-flex'>
            <div class="logo-container nav-left col-2">
                <router-link to="/dashboard" class="logo-main">
                    <img src="/static/site/images/logo.png" alt="Home">
                </router-link>
            </div>
            <div class="nav-fill col-6">
                <h2 class="title">TITLE</h2>
            </div>
            <div class="nav-right col-3">
                <i tabindex="2" class="far fa-user-circle user"></i>
                <div class="account_dropdown">
                    <ul>
                        <li class="account_option">
                            <a> Account </a>
                        </li>
                        <li class="account_option">
                            <a> Settings </a>
                        </li>
                        <li class="account_option">
                            <a> Log Out </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
}

</script>