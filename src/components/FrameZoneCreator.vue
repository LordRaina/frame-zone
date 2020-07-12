<template>
  <div id="frame-zone-creator" :class="{ 'hidden' : !isStarting }" @mousemove="move" @mousedown="mouseDown" @mouseup="mouseUp" :style="{ height: height + 'px', width: width + 'px' }">
    <div class="overlay" :class="{ 'highlighting' : isCreating }" :style="{ borderWidth: borderWidth }"></div>
    <div class="crosshair" :class="{ 'hidden' : isCreating }" :style="{ left: crossHairLeft + 'px', top: crossHairTop + 'px' }"></div>
    <tag-selector :hidden="!isAddingTag" :posX="tagSelectorPosX" :posY="tagSelectorPosY" :width="tagSelectorWidth" :height="tagSelectorHeight"
      @add:tag="addTag" @cancel:tag="cancelTag"
    />
  </div>
</template>


<script>
  import TagSelector from './TagSelector';
  export default {
    name: 'FrameZoneCreator',
    components: {
      TagSelector
    },
    props: {
      height: Number,
      width: Number,
      disable: Boolean
    },
    data: () => ({
      crossHairLeft: 0,
      crossHairTop: 0,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      borderWidth: 0,
      isStarting: false,
      isMouseDown: false,
      isCreating: false,
      isAddingTag: false,
      tagSelectorWidth: 150,
      tagSelectorHeight: 100,
      tagSelectorPosX: 0,
      tagSelectorPosY: 0
    }),
    methods: {
      startProcess() {
        this.isStarting = true;
      },
      move(event) {
        var frameElement = document.getElementById('frame-zone-creator'),
            elementPos   = frameElement.getBoundingClientRect(),
            startY       = this.startY,
            startX       = this.startX,
            endX         = event.clientX - elementPos.left,
            endY         = event.clientY - elementPos.top;
        this.crossHairTop = event.clientY - elementPos.top;
        this.crossHairLeft = event.clientX - elementPos.left;
        if (this.isMouseDown) {
          this.isCreating = true;
          if (endX >= startX && endY >= startY) {
            this.borderWidth = startY + "px " + (frameElement.clientWidth - endX) + "px " + (frameElement.clientHeight - endY) + "px " + startX + "px";
          } else if (endX >= startX && startY >= endY) {
            this.borderWidth = endY + "px " + (frameElement.clientWidth - endX) + "px " + (frameElement.clientHeight - startY) + "px " + startX + "px";
          } else if (startX >= endX && endY >= startY) {
            this.borderWidth = startY + "px " + (frameElement.clientWidth - startX) + "px " + (frameElement.clientHeight - endY) + "px " + endX + "px";
          } else {
            this.borderWidth = endY + "px " + (frameElement.clientWidth - startX) + "px " + (frameElement.clientHeight - startY) + "px " + endX + "px";
          }
        }
      },
      mouseDown(event) {
        if (!this.isMouseDown && !this.isAddingTag) {
          var elementPos = document.getElementById('frame-zone-creator').getBoundingClientRect();
          this.startX = event.clientX - elementPos.left;
          this.startY = event.clientY - elementPos.top;
          this.isMouseDown = true;
        }
      },
      mouseUp(event) {
        if (this.isCreating && this.isMouseDown) {
          this.isAddingTag = true;
          var elementPos = document.getElementById('frame-zone-creator').getBoundingClientRect();
          this.endX = event.clientX - elementPos.left;
          this.endY = event.clientY - elementPos.top;

          //tag selector position
          var offset = 10;
          var distanceReq =  2*offset + this.tagSelectorWidth;
          var frameWidth = elementPos.right - elementPos.left;
          var frameHeight = elementPos.bottom - elementPos.top;
          var minX = this.endX > this.startX ? this.startX : this.endX;
          var maxX = this.endX > this.startX ? this.endX : this.startX;
          var minY = this.endY > this.startY ? this.startY : this.endY;
          var maxY = this.endY > this.startY ? this.endY : this.startY;
          if (minX > distanceReq || frameWidth - maxX > distanceReq ) {
            this.tagSelectorPosX = frameWidth - maxX > minX ? maxX + offset : minX - this.tagSelectorWidth - offset;
            this.tagSelectorPosY = minY;
          } else if (minY > distanceReq || frameHeight - maxY > distanceReq){
            this.tagSelectorPosX = (maxX + minX - this.tagSelectorWidth)/2 ;
            this.tagSelectorPosY = frameHeight - maxY > minY ? maxY + offset : minY - this.tagSelectorHeight - offset;
          } else { // no real space available
            this.tagSelectorPosX = frameWidth/2 - this.tagSelectorWidth/2;
            this.tagSelectorPosY = frameHeight/2 - this.tagSelectorHeight/2;
          }
        }
        this.isMouseDown = false;
      },
      addTag(tag) {
        this.isStarting = false;
        this.isAddingTag = false;
        this.isCreating = false;
        this.borderWidth = 0;
        this.$emit('add:frame-zone', {
          startX: this.startX < this.endX ? this.startX : this.endX,
          endX: this.startX < this.endX ? this.endX : this.startX,
          startY: this.startY < this.endY ? this.startY : this.endY,
          endY: this.startY < this.endY ? this.endY : this.startY,
          tag: tag
        });
      },
      cancelTag() {
        this.$emit('cancel:frame-zone');
        this.isStarting = false;
        this.isAddingTag = false;
        this.isCreating = false;
        this.borderWidth = 0;
      }
    },
  };
</script>

<style scoped>
  #frame-zone-creator {
    position: absolute;
    overflow: hidden;
    z-index: 1
  }

  #frame-zone-creator.hidden {
    display: none;
  }

  .overlay {
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .overlay.highlighting {
    background: none;
    border-color: rgba(0, 0, 0, 0.5);
    border-style: solid;
  }

  .crosshair {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
  }
  .crosshair.hidden {
    display: none;
  }
  .crosshair::before,
  .crosshair::after {
    content: "";
    height: 100%;
    width: 100%;
    position: absolute;
    border: none !important;
  }

  .crosshair::before {
    left: -100%;
    top: -100%;
    border-right: 1px solid rgba(255, 255, 255, 0.3) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important;
  }

  .crosshair::after {
    left: 0px;
    top: 0px;
    border-top: 1px solid rgba(255, 255, 255, 0.3) !important;
    border-left: 1px solid rgba(255, 255, 255, 0.3) !important;
  }

</style>
