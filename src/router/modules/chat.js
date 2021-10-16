import Chat from "@/views/Chat.vue"
import Index from "@/components/chat/Index.vue"
import MessageView from "@/components/chat/MessageView.vue"

export default [
    {
        path: '/chat/',
        name: "Chat",
        component: Chat,
        children: [
            { path: 'index', component: Index, alias: 'home', name: "Chat Index" },
            { path: 'message/:id', component: MessageView, name: "Message" },
        ],
        meta: {
            authRequired: true,
        },
    }
]