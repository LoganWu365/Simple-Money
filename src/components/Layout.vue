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
        border: 1px solid red;
        height: 100vh;
    }
    .content {
        flex-grow: 1;
        border: 1px solid blue;
        overflow: auto;
    }
</style>