<template>
  <div class="list">
    <div class="list__header">
      <h3 class="list__ttl">{{ list.title }}</h3>
      <button class="list__delete" @click="removeList">×</button>
    </div>
    <div class="list__content">
      <Draggable
        :list="list.cards"
        animation="150"
        group="cards"
        @end="$emit('update')"
      >
        <Card
          v-for="(card, index) in list.cards"
          :title="card"
          :listIndex="listIndex"
          :cardIndex="index"
          :listId="list.id"
          :key="card.id"
        />
      </Draggable>
    </div>
    <CardCreate :listIndex="listIndex" :listId="list.id" />
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import Draggable from "vuedraggable";
import CardCreate from "@/components/CardCreate.vue";

export default {
  components: {
    Card,
    Draggable,
    CardCreate,
  },
  props: {
    list: {
      type: Object,
      required: true,
    },
    listIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    removeList() {
      if (confirm("リストを削除しますか？")) {
        this.$store.dispatch("removeList", {
          listIndex: this.listIndex,
          listId: this.list.id,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  position: relative;
  border: 1px solid;
  border-color: #aab4c4;
  background-color: #ebecf0;
  width: 24rem;
  padding: 1rem;
  border-radius: 0.5rem;
  &:not(:first-child) {
    margin-left: 2rem;
  }
  &__ttl {
    font-size: 1.5rem;
  }
  &__delete {
    position: absolute;
    right: 10px;
    top: 16px;
    border: none;
    background-color: red;
    border-radius: 50%;
    color: #fff;
    width: 1rem;
    height: 1rem;
  }
  &__content {
    margin-top: 2rem;
  }
}
</style>
