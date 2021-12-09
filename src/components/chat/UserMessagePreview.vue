<template>
    <div class="user-message-preview row-flex">
        <a class="profile">
            <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/cat-icon.png">
        </a>
        <router-link :to="{name: 'Message', params: { id: chat_message['id'] } }" class="chat_message">
            <h3>{{ chat_message['participant_set'].map( (x) => x['username'] ).join(", ") }}</h3>
            <p class="message">
                <span v-if="chat_message['message_set'][0]['owner']">You: </span>
                {{chat_message['message_set'][0]['content']}}
            </p>
        </router-link>

        <div class="options">

        </div>
    </div>
</template>

<script>
export default ({
    name: "UserMessagePreview",
    props: ['chat_message'],
})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sm_variables.scss";

.user-message-preview {
    height: 100%;

    &:hover {
        background-color: rgba($color: $main-blue, $alpha: 0.7);
    }
}

a {
    text-decoration: none;
    width: 90%;
    text-align: start;
}

.profile {
    width: 10%;
    opacity: 0;

    img {
        max-width: 100%;
    }
}

.chat_message {
    height: 100%;

    h3 {
        color: $main-orange;
        margin: 0.5em 0;
    }
}

.message {
    color: white;
    
    span {
        color: #8e89a9;
    }
}


</style>