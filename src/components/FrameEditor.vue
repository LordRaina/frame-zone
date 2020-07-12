<template>
  <div id="frame-editor">
    <div id="toolbar">
      <div class="frame-select">
        <v-select
          :items="framesList" item-text="id" return-object :disabled="isFrameZoneDisable"
          v-model="currentFrame" label="Frames"  hide-details
        ></v-select>
      </div>
      <v-btn dark color="purple"
        class="btn" @click="createFrameZone">
        Add a frame zone
      </v-btn>
      <tag-creator/>
    </div>
    <div id="frame-container">
      <div>
        <frame-zone :hidden="isFrameZoneDisable" :height="frameHeight" :width="frameWidth" :frameZonesList="currentFrame ? currentFrame.frameZones : [] "/>
        <frame-zone-creator ref="frameZoneCreator" :height="frameHeight" :width="frameWidth"
          @add:frame-zone="addFrameZone" @cancel:frame-zone="cancelFrameZone"
        />
        <img id="frame" :src="currentFrame ? currentFrame.source : null">
      </div>
    </div>
  </div>
</template>

<script>
  import FrameZoneCreator from './FrameZoneCreator';
  import FrameZone from './FrameZone';
  import TagCreator from './TagCreator';
  import { getFramesFromApi, addFrameZoneFromApi } from '../fakeApi/api';

  export default {
    name: 'FrameEditor',
    components: {
      FrameZoneCreator,
      FrameZone,
      TagCreator
    },
    data: () => ({
      frameHeight: 0,
      frameWidth: 0,
      isFrameZoneDisable: false,
      framesList: [],
      currentFrame: null
    }),
    methods: {
      createFrameZone() {
        this.isFrameZoneDisable = true;
        this.$refs.frameZoneCreator.startProcess();
      },
      addFrameZone(frameZone) {
        this.isFrameZoneDisable = false;
        //fake api call, todo change the name
        var newFrameZone = addFrameZoneFromApi(this.currentFrame.id, frameZone); //get the newId too
        this.currentFrame.frameZones.push(newFrameZone);
      },
      cancelFrameZone() {
        this.isFrameZoneDisable = false;
      }
    },
    mounted() {
      this.framesList = getFramesFromApi() // API call
      this.currentFrame = this.framesList[0];
      window.addEventListener('load', () => {
        if (document.getElementById('frame')) {
          this.frameHeight = document.getElementById('frame').clientHeight;
          this.frameWidth = document.getElementById('frame').clientWidth;
        }
      })
    },
    updated() {
      this.frameHeight = document.getElementById('frame').clientHeight;
      this.frameWidth = document.getElementById('frame').clientWidth;
    }
  }
</script>

<style scoped>
  #toolbar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }

  #frame-container {
    display: flex;
    justify-content: center;
  }

  #frame {
    position: relative
  }

  .btn {
    margin: 0 10px;
  }

  .frame-select {
    width: 200px;
  }

</style>
