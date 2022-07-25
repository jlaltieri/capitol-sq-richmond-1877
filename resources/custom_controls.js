// Get a reference to the sidepanel controls
const sidepanel = document.querySelector(".sidepanel");

var zoom_control = getControl(".map .ol-zoom", 'zoom_control')
var zoom_label_div = getLabelDiv("Zoom In & Out", "class",  "zoomLabel  sidepanelLabel")
sidepanel.appendChild(zoom_label_div);
sidepanel.appendChild(zoom_control);

var zoom_to_extent_control = getControl(".map .ol-zoom-extent", 'zoom_to_extent_control')
var zoom_to_extent_label_div = getLabelDiv("Center Map", "class",  "zoomToExtentLabel  sidepanelLabel");
sidepanel.appendChild(zoom_to_extent_label_div);
sidepanel.appendChild(zoom_to_extent_control);

var measure_control = getControl(".map .measure-control", 'measure_control');
var measure_label_div = getLabelDiv("Measure Distances", "class",  "measureLabel  sidepanelLabel")
sidepanel.appendChild(measure_label_div);
sidepanel.appendChild(measure_control);

// Set title for measure button (title goes to tooltip)
var measure_buttons = document.getElementsByClassName(" fas fa-ruler ");
if (measure_buttons.length > 0) {
  measure_buttons[0].setAttribute("title", "Click to measure distances");
}

var rotate_control = getControl(".map .ol-rotate", 'rotate_control');
var rotate_label_div = getLabelDiv( "Rotate: Shift + Alt + Drag <br> Reset: Click Arrow", "class",  "rotateLabel sidepanelLabel")
sidepanel.appendChild(rotate_label_div);
sidepanel.appendChild(rotate_control);

function getControl(qselector, attr_id){
  const theControl = document.querySelector(qselector);
  theControl.setAttribute('id', attr_id);
  return theControl;
}

function getLabelDiv(lbl_caption, attr_type, attr_val){
  var label_div = document.createElement("div");
  label_div.innerHTML = lbl_caption;
  label_div.setAttribute(attr_type, attr_val);
  return label_div;
}
// Shows the slider as having white background for area moved
const rangeInputs = document.querySelectorAll('input[type="range"]')
const numberInput = document.querySelector('input[type="number"]')

function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  } 
  const min = target.min
  const max = target.max
  const val = target.value
  
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange)
})
