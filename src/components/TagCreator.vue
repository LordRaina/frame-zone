<template>
  <div>
    <v-btn dark color="purple" class="btn" @click.stop="dialog = true">
      Create a new tag
    </v-btn>
    <v-dialog v-model="dialog" max-width="300" persistent>
      <v-card>
        <v-card-title class="headline">Create a tag</v-card-title>
        <div id="content">
          <v-text-field v-model="tag" label="Tag" required/>
          <div class="error-msg" v-show="error">
            This tag already exists!
          </div>
        </div>
        <v-card-actions class="btn-container">
          <v-btn color="green darken-1" text @click="addTag" :disabled="!tag">
            Create
          </v-btn>
          <v-btn color="green darken-1" text @click="close">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {addTagFromApi} from '../fakeApi/api';
  export default {
    name: 'TagCreator',
    data: () => ({
      tag: '',
      dialog: false,
      error: false
    }),
    methods: {
      addTag() {
        console.log("EEE");
        if (addTagFromApi(this.tag)) {
          this.close()
         } else {
           this.error = true;
         }
      },
      close() {
        this.tag = '';
        this.dialog = false;
        this.error = false;
      }
    }
  }
</script>

<style scoped>
  #content {
    width: 80%;
    margin: auto;
  }
  .headline {
    display: flex;
    justify-content: center;
  }

  .btn-container {
    display: flex;
    justify-content: center;
  }

  .error-msg {
    color: red;
  }
</style>
