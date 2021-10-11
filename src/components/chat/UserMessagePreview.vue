<template>
    <div class="user-message-preview row-flex">
        <a class="profile">
            <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/cat-icon.png">
        </a>
        <a class="message">
            <h3>NAME</h3>
            <p class="message">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, modi aperiam, aliquam possimus doloribus ipsum quisquam itaque iusto nulla sint fugit saepe animi tempora eos fugiat! Expedita architecto dicta nobis?
            </p>
        </a>
        <div class="options">

        </div>
    </div>
</template>

<script>
export default ({
    name: "UserMessagePreview",
})
</script>

<style lang="scss" scoped>
.user-message-preview {
    
}

a {
    text-decoration: none;
    width: 90%;
    text-align: start;
}

.profile {
    width: 10%;

    img {
        max-width: 100%;
    }
}


</style>