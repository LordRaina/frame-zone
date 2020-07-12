<template>
  <v-app>
    <v-app-bar
      app
      color="purple"
      dark
    >
      <v-spacer></v-spacer>
      <h2>Frame zone</h2>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <frame-editor/>
    </v-main>
  </v-app>
</template>

<script>
import FrameEditor from './components/FrameEditor';

export default {
  name: 'App',
  components: {
    FrameEditor
  }
};
</script>
