<template>
  <transition-group
    tag="div"
    name="fade"
    class="notification-group fixed z-1001"
  >
    <div
      v-for="(notification, i) in notifications"
      :key="notification.id || i"
      class="p-5 m-2 rounded-sm shadow-2xl leading-relaxed bg-secondary text-on-secondary relative text-sm"
    >
      <span
        v-if="notification.close"
        class="close rounded-full btn-hover inline-block p-2 absolute text-lg cursor-pointer"
        @click="removeNotificationById(notification.id)"
      >
        <icon-base name="x"></icon-base>
      </span>
      <h6
        v-if="notification.title"
        class="text-base mb-4 font-semibold text-primary"
      >
        {{ notification.title }}
      </h6>
      <div v-html="notification.text"></div>
    </div>
    <!-- TODO: add transition for notification show/hide -->
  </transition-group>
</template>
<script>
import { merge, uniqueId } from 'lodash'
import { SHOW_NOTIFICATION, REMOVE_NOTIFICATION } from '~/constants'
export default {
  name: 'Notification',
  data() {
    return {
      notifications: [],
    }
  },
  mounted() {
    this.$eventBus.$on(SHOW_NOTIFICATION, this.addNotification)
    this.$eventBus.$on(REMOVE_NOTIFICATION, this.removeNotification)
  },
  beforeDestroy() {
    this.$eventBus.$off(SHOW_NOTIFICATION, this.addNotification)
    this.$eventBus.$off(REMOVE_NOTIFICATION, this.removeNotification)
  },
  methods: {
    addNotification(payload = '') {
      let text = payload
      let notification = {}
      if (typeof payload !== 'string') {
        text = payload.text
        notification = payload
      }
      const id = uniqueId('notification_')
      const timeout = text.length * 200 + 1000
      const timeoutId = setTimeout(this.removeNotificationById, timeout, id)
      this.notifications.push(
        merge(
          {
            close: true,
            timeout,
            id,
          },
          notification,
          {
            timeoutId,
            text: this.$escapeHTML(text),
          },
        ),
      )
    },
    removeNotificationById(id) {
      const index = this.notifications.findIndex(
        notification => notification.id === id,
      )
      clearTimeout(this.notifications[index].timeoutId)
      this.notifications.splice(index, 1)
    },
    removeNotification(id) {
      if (id) this.removeNotificationById(id)
      else {
        this.notifications.forEach(notification =>
          clearTimeout(notification.timeoutId),
        )
        this.notifications = []
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.notification-group {
  width: 20rem;
  max-width: calc(100% - 5rem);
  top: 2rem;
  right: 3rem;
  .close {
    width: 1.5rem;
    height: 1.5rem;
    top: 0.5rem;
    right: 0.5rem;
  }
}
</style>
