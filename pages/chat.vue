<template>
  <div class="chat">
    <h1>Chat page</h1>
    <div class="users-online">
      <TalkUser v-for="u in onlineUsers" :key="u.id" :user="u" />
    </div>
    <div class="chat-container">
      <div class="conversations">
        <SelectConversation
          v-for="(c, i) in conversations"
          :key="i"
          :users="c.users"
          :lastMessage="lastMessage(c.messages)"
          @click.native="selectConv(i)"
        />
      </div>
      <div v-if="openedConversation" class="current-conversation">
        <Message
          v-for="(msg, i) in openedConversation.messages"
          :key="i"
          :text="msg.text"
          :sender="isSender(msg.sender)"
        />
        <form class="send" @submit.prevent="sendMessage">
          <b-field>
            <b-input v-model="message"></b-input>
          </b-field>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SelectConversation from '../components/SelectConversation';
import Message from '../components/Message';
import TalkUser from '../components/TalkUser';
import ApiService from '~/plugins/ApiService';

export default {
  components: {
    SelectConversation,
    TalkUser,
    Message,
  },
  data() {
    return {
      currentConversation: null,
      message: '',
      onlineUsers: [],
      conversations: [],
    };
  },
  sockets: {
    connect() {
      // console.log('socket to notification channel connected');
    },
    newMessage({ conversation, message }) {
      const current = this.conversations.find(
        (conv) => conv._id === conversation
      );
      current.messages.push(message);
    },
  },
  computed: {
    openedConversation() {
      return this.conversations[this.currentConversation];
    },
  },
  async mounted() {
    try {
      const res = await ApiService.getUserConversations();
      this.conversations = res.data;
    } catch (e) {
      // console.log(e);
    }
  },
  methods: {
    lastMessage(messages) {
      const index = messages.length - 1;
      return messages[index]?.text;
    },
    // TODO
    isSender(id) {
      console.log(this.$store.state.user._id, id);
      return this.$store.state.user._id === id;
    },
    sendMessage() {
      if (!this.message.length || !this.openedConversation) return;
      // console.log(this.openedConversation);
      ApiService.sendMessage({
        conversation: this.openedConversation._id,
        text: this.message,
      });
    },
    selectConv(index) {
      this.currentConversation = index;
    },
  },
};
</script>

<style lang="scss">
.chat-container {
  max-width: 600px;
  border: 1px solid gray;
  margin: auto;
  display: flex;
}
.conversations {
  max-width: 200px;
  width: 100%;
  border-right: 1px solid gray;
}
.current-conversation {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}
</style>
