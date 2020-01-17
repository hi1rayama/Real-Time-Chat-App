<template>
  <div class="user-list">
    <h4>
      <font color="white">Members</font>
    </h4>
    <hr />
    <b-list-group>
      <b-list-group-item variant="success" v-for="user in users" :key="user.username">
        {{ user.name }}
        <b-badge v-if="user.presence" :variant="statusColor(user.presence)" pill>{{ user.presence }}</b-badge>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "user-list",
  computed: {
    ...mapState(["loading", "users"])
  },
  methods: {
    statusColor(status) {
      return status === "online" ? "primary" : "warning";
    }
  }
};
</script>
<style>
.user-list {
  margin-top: 10px;
}
</style>
