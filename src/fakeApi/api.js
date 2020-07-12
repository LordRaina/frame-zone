import img1 from '../assets/people.jpg';
import img2 from '../assets/people2.jpg';
import _ from 'lodash';

var frames = [
  {id: 1, source: img1,
    frameZones: [
      {"startX":223,"endX":349,"startY":217,"endY":353,"tag":{"id":1,"label":"Woman"},"id":1},
      {"startX":81,"endX":196,"startY":40,"endY":185,"tag":{"id":2,"label":"Man"},"id":2}
    ]
  },
  {id: 2, source: img2,
    frameZones: []
  }
]

var tagsList = [
  {id: 1, label: 'Woman'},
  {id: 2, label: 'Man'}
]


export function getFramesFromApi() {
  return _.cloneDeep(frames);
}

export function addFrameZoneFromApi(frameId, frameZone) {
  var frameIndex = frames.findIndex(elem => elem.id == frameId);
  var id = frames[frameIndex].frameZones.length + 1;
  frameZone['id'] = id;
  frames[frameIndex].frameZones.push(frameZone);
  return frameZone;
}

export function getTagsFromApi() {
  return _.cloneDeep(tagsList);
}

export function addTagFromApi(label) {
  var found = tagsList.find(elem => elem.label == label);
  if (found) {
    return null;
  } else {
    var id = tagsList.length + 1;
    var newTag = {id: id, label: label};
    tagsList.push(newTag);
    return newTag;
  }
}
