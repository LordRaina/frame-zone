<template>
  <div id="frame-zone" :class="{ 'hidden' : hidden }" :style="{ height: height + 'px', width: width + 'px' }">
    <div v-for="(zone,index) in frameZonesList" :key="zone.id" class="zone" @mouseover="hover(zone.id)" @mouseleave="leave($event,zone.id)"
      :style="{ top: zone.startY + 'px', left: zone.startX + 'px', width: zone.endX - zone.startX + 'px', height: zone.endY - zone.startY + 'px'}">
      <div class="label-container" ref="labels" :style="{ top: labelPosition[index] +'px' }">
        <div class="label" >
          {{ zone.tag.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FrameZone',
    props: {
      hidden: Boolean,
      height: Number,
      width: Number,
      frameZonesList: Array
    },
    computed: {
      labelPosition() {
        var positions = [];
        for (var i = 0; i < this.frameZonesList.length; i++) {
          var frameZone = this.frameZonesList[i];
          var pos = 0;
          if (frameZone.endY + 30 > this.height) {
            pos = frameZone.endY - frameZone.startY - 50;
          } else {
            pos = frameZone.endY - frameZone.startY;
          }
          positions.push(pos);
        }
        return positions;
      }
    },
    methods: {
      hover(id) {
        var idx = this.frameZonesList.findIndex(elem => elem.id == id);
        this.$refs.labels[idx].classList.add('active');
      },
      leave(event,id) {
        var idx = this.frameZonesList.findIndex(elem => elem.id == id);
        this.$refs.labels[idx].classList.remove('active');
      }
    }
  }
</script>

<style scoped>
  #frame-zone {
    position: absolute;
    z-index: 3;
  }
  #frame-zone.hidden {
    display: none;
  }
  .zone {
    position: absolute;
    z-index: 5;
  }
  .label-container {
    position: absolute;
    width: 100%;
    justify-content: center;
    display: none;
  }
  .label-container.active {
    display: flex;
  }
  .label {
    background-color: beige;
    padding: 5px;
    border: 1px solid black;
    width: fit-content;
  }
</style>
