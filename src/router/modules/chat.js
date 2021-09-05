import Chat from "@/views/Chat.vue"
import Index from "@/components/chat/Index.vue"

export default [
    {
        path: '/chat/',
        name: "Chat",
        component: Chat,
        children: [
            { path: 'index', component: Index, alias: 'home' }
        ],
    }
]