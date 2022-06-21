<template>
    <div class="nav-wrapper">
        <div class="content">
            <slot />
        </div>
        <Nav />
    </div>
</template>

<script>
    import Nav from '@/components/Nav.vue'

    export default {
        components: {
            Nav
        }
    }
</script>

<style lang="scss" scoped>
    .nav-wrapper {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .content {
        flex-grow: 1;
        overflow: auto;
    }
</style>