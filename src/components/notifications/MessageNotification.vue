<template>
    <div class="friend_request">
        <p> {{notification.message}} </p>
        <span></span>
        <span> X </span>
    </div>
</template>

<script>

export default {
    name: 'MessageNotification',
    props: ['notification'],
    data() {
        return {
            state: null,
        }
    },
    mounted() {
        this.$data.state = 1
    },
    computed: {
        currState() {
            return this.$data.state;
        }
    },
    methods: {
    }
}
</script>
