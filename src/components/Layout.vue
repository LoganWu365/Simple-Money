<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`   ">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script>
    import Nav from '@/components/Nav.vue'

    export default {
        components: {
            Nav
        },
        props: ['classPrefix'],
        name: 'Layout'
    };
</script>

<style lang="scss" scoped>
    .layout-wrapper {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .content {
        flex-grow: 1;
        overflow:auto;
    }
</style>