<template>
  <div class="bord">
    <h2 class="bord__ttl">カード一覧</h2>
    <div class="bord__wrap">
      <Draggable
        class="bord__cards"
        animation="150"
        @end="updateList"
        :list="lists"
      >
        <List
          v-for="(list, index) in lists"
          :list="list"
          :listIndex="index"
          :key="list.id"
          @update="updateList"
        />
        <ListCreate />
      </Draggable>
    </div>
  </div>
</template>

<script>
import List from "@/components/List";
import ListCreate from "@/components/ListCreate";
import Draggable from "vuedraggable";

export default {
  components: {
    List,
    ListCreate,
    Draggable,
  },
  methods: {
    updateList() {
      this.$store.dispatch("updateList", { lists: this.lists });
    },
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
  },
};
</script>

<style lang="scss" scoped>
.bord {
  padding-top: 2rem;
  background-image: url("../assets/bg.jpg");
  background-size: cover;
  background-position: center;
  &__wrap {
    overflow-x: scroll;
    height: calc(100vh - 11rem);
    padding: 0 2rem;
    margin-top: 2rem;
  }
  &__cards {
    display: inline-flex;
    align-items: flex-start;
  }
  &__ttl {
    margin-left: 2rem;
    color: #ffffff;
  }
}
</style>
