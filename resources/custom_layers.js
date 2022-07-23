var wms_layers = [];
// The OSM_Base_URL must be https and not http. See documentation.
const OSM_Base_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const Goog_Sat_URL = 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
const Old_Img_URL = "./layers/capitol_square_1877_modified_2.png";
const Old_Img_Extent = [-8621165.854594, 4513886.416617, -8619473.220587, 4515477.020504,];
const OSM_title = "OSM";
const SAT_title = "SAT";
const Old_Img_Title = "Rich";
const base_type = 'base'
const imageLayerProjection = 'ESPG:3857'
const imageAlwaysInRange = true;
const attributions = ' ';

var lyr_OpenStreetMap_0 = getBaseTileLayer(OSM_title, base_type, 1.0, attributions, OSM_Base_URL);
var lyr_GoogleSatellite_1 = getBaseTileLayer(SAT_title, base_type, 1.0, attributions, Goog_Sat_URL);
var lyr_Old = getImageLayer(Old_Img_Title, 1.0, attributions, Old_Img_URL, imageLayerProjection, imageAlwaysInRange, Old_Img_Extent)

function getBaseTileLayer(title, type, opacity, attributions, url){
  var lyr = new ol.layer.Tile ({
    title: title,
    type: type,
    opacity: opacity,
  
    source: new ol.source.XYZ ({
      attributions: attributions,
      url: url,
    }),
  });
  return lyr;
}

function getImageLayer(title, opacity, attributions, url, projection, alwaysInRange, imageExtent){
  var lyr = new ol.layer.Image ({
    title: title,
    opacity: opacity,
  
    source: new ol.source.ImageStatic ({
      attributions: attributions,
      url: url,
      projection: projection,
      alwaysInRange: alwaysInRange,
      imageExtent: imageExtent,
    }),
  });
  return lyr;
}

// Order of loading maps is determined by the order in which the layers are inserted into the layersList;
// This order will open satellite first, and place it as the bottom layer, so it won't be visible at load time, the osm second so it will be visible at load because it is on top of the satellite layer, and richmond on top so it will be the uppermost layer.
var layersList = [
  lyr_GoogleSatellite_1,
	lyr_OpenStreetMap_0,
	lyr_Old,
];

var baseLayersList = [
	lyr_OpenStreetMap_0,
	lyr_GoogleSatellite_1,
];

var imageLayersList = [
	lyr_Old,
];

lyr_OpenStreetMap_0.setVisible (true);
lyr_GoogleSatellite_1.setVisible (false);
lyr_Old.setVisible (true);

const baseLayerControlsArr = Array.from(document.querySelectorAll('input[type=radio]'));
const imageLayerControlsArr = Array.from(document.querySelectorAll('input[type=checkbox]'));

baseLayerControlsArr.forEach(setBaseLayerVisiblity);
function setBaseLayerVisiblity(item){
  item.addEventListener('change', function(){
    let baseLayerElementValue = this.value;
    baseLayersList.forEach(function(element, index, array){
    if (element.get('title') == baseLayerElementValue)
      { 
        element.setVisible(true)
      } 
      else {
        element.setVisible(false)
      }
    })
})

}

imageLayerControlsArr.forEach(setImageLayerVisiblity);
function setImageLayerVisiblity(item){
  item.addEventListener('change', function(){
    let imageLayerElementValue = this.value;
    let imageChecked = this.checked;
    imageLayersList.forEach(function(element, index, array){
      if (element.get('title') == imageLayerElementValue && imageChecked)
      {  
        element.setVisible(true)
      } 
      else {
        element.setVisible(false)
      }
    })
})
}

if(window.performance){
  initLayerControls();
};

function initLayerControls(){
  document.querySelector("input[value = Rich]").checked = true;
  document.querySelector("input[value = OSM]").checked = true;
  document.querySelector("input[value = SAT]").checked = false;
}
