<template>
  <div id="tag-selector" :class="{ 'hidden' : hidden }" :style="{ width: width + 'px', height: height + 'px', top: posY + 'px', left: posX + 'px' }">
    <v-autocomplete class="tag-select" placeholder="Add a tag"
      v-model="tag" :items="tagsList" item-text="label" return-object dense hide-details
    />
    <div class="btn-container">
      <v-btn :dark="!!tag" color="purple" :disabled="!tag" @click="handleSubmit" depressed small>Ok</v-btn>
      <v-btn dark color="purple" @click="handleCancel" depressed small>Cancel</v-btn>
    </div>
  </div>
</template>


<script>
  import {getTagsFromApi} from '../fakeApi/api';

  export default {
    name: 'TagSelector',
    props: {
      posX: Number,
      posY: Number,
      width: Number,
      height: Number,
      hidden: Boolean
    },
    data: () => ({
      tag: null,
      tagsList: []
    }),
    methods: {
      handleSubmit() {
        this.$emit('add:tag', this.tag);
        this.tag = null;
      },
      handleCancel() {
        this.$emit('cancel:tag');
        this.tag = null;
      },
    },
    watch: {
      hidden(newValue) {
        if (!newValue) {
          this.tagsList = getTagsFromApi();
        }
      }
    }
  }
</script>

<style scoped>
  #tag-selector {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    position: absolute;
    top: 0;
    z-index: 10;
    background-color: white;
    box-shadow: 1px 1px 12px black;
    padding: 10px;
  }

  #tag-selector.hidden {
    display: none;
  }

  .tag-select {
    margin-bottom: 20px;
  }

  .btn-container {
    display: flex;
  }
  .btn-container button {
    margin:0 5px;
  }
</style>
