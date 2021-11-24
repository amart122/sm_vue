<template>
    <div class="msg-notification">
        <div class="img-cont"></div>
        <div class="content">
            <h5>{{notification.message_notification.username}}</h5>
            <p class="message"> {{notification.message}} </p>
        </div>
        <span> Ignore </span>
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

<style lang="scss" scoped>
.msg-notification {
    display: flex;
    align-items: center;
}

.img-cont {
    min-width: 20%;
    min-height: 20%;
}

.content {
    text-align: left;
    width: 74%;
    inline-size: 50%;
    overflow: hidden;
    height: 85%;
    padding: 5px 0px;

    p {
        color: white;
        font-size: 0.6rem;
        overflow: hidden;
        height: 1.8rem;
        overflow-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
}

span {
    font-size: 0.65rem;
    margin: auto;
    cursor: pointer;
}
</style>