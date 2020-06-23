import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import $ from 'jquery'

var colors = {
  primary: "#161616",
  secondary: "#878686",
  backgroundMain: "#ffffff",
  backgroundOther: "#f3f3f3",
  colored: "#DF1748"
}
var loadAnims = [];
var animState=false;

// Swatch Card
function Card(props) {
  return (
    <div className="row justify-content-between align-items-center swatch-card" id="swatch-card">
      <div className="col-xs-1 justify-self-start" id="color-card" style={{backgroundColor: props.color}}></div>
      <div className="col" id="colorText">
        <p id="colorName">{props.name}</p>
        <p id="colorHex">{props.color}</p>
      </div>
      <div className="col-xs-1" id="colorCopy">
        <svg className="" width="1.6em" height="1.6em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path className="copyIcon" fillRule="evenodd" d="M3 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3z"/>
          <path className="copyIcon" d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z"/>
          <path className="doneIcon" fillRule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
          <path className="doneIcon" fillRule="evenodd" d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z"/>
        </svg>
      </div>
    </div>
  )
}

function Swatches(props) {
  return (
    <div className="row justify-content-center" id="swatch-container">
      <Card color={props.colors.primary} name={"Primary"}/>
      <Card color={props.colors.secondary} name={"Secondary"}/>
      <Card color={props.colors.backgroundMain} name={"Background"}/>
      <Card color={props.colors.backgroundOther} name={"Card"}/>
    </div>
  )
}

ReactDOM.render(<Swatches colors={colors}/>, document.getElementById('swatches-react'));

// Ready
$(document).ready(function() {
  $("#select").css("transition","ease 0.2s");
  $("#fullstop").css("transition","ease 0.4s");
  $("#subheading p").css("transition","ease 0.4s");
  $("#heading p").css("transition","ease 0.4s");
  $("#description p").css("transition","ease 0.4s");
  $("#select").css("transition","ease 0.4s");
  $(".doneIcon").addClass("poof");
  $(".copyIcon").css("transition","ease 0.2s");
  $(".doneIcon").css("transition","ease 0.2s");

  setTimeout(function() {
    $(".fullstop").removeClass("fullstop");
    setTimeout(function() {
      $("#fullstop").css("transition","");
    },400);
  },1000);
});

// Select Image
$("#content #select").click(function() {
  $("input").trigger("click");
});

// Selected Image
$("input").change(function() {
  setloadAnims();
  var file = document.querySelector("input").files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function () {
    var image = new Image();
    image.src = reader.result;
    let mainCanvas = document.createElement("canvas");
    mainCanvas.width = 256;
    mainCanvas.height = 256;
    var ctx = mainCanvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(0, 0, 256, 256);
    ctx.fillStyle = "white";
    ctx.fill();

    image.onload = function(event) {
      ctx.drawImage(image, 0, 0, 256, 256);
      colourise(mainCanvas.toDataURL("image/jpeg"));
    }

  };
  reader.onerror = function (error) {
    alert('Error: ', error);
  };
});

// Pick Image
$(".swatch-images div img").click(function() {
  setloadAnims();
  var image = $(this)[0];
  let mainCanvas = document.createElement("canvas");
  mainCanvas.width = 256;
  mainCanvas.height = 256;
  var ctx = mainCanvas.getContext("2d");
  ctx.drawImage(image, 0, 0, 256, 256);
  colourise(mainCanvas.toDataURL("image/jpeg"));
});

// Copy Color Hex
$(".swatch-card").click(function() {
  var el = document.createElement('textarea');
  el.value = $(this).find("#colorHex").html();
  el.setAttribute('readonly', '');
  el.style = {position: 'absolute', left: '-9999px'};
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  let $this = $(this)

  $this.find(".doneIcon").addClass("poof");
  $this.find(".copyIcon").removeClass("poof");
  $this.find(".copyIcon").addClass("poof");
  setTimeout(function() {
    $this.find(".doneIcon").removeClass("poof");
  },200);
  setTimeout(function() {
    $this.find(".doneIcon").addClass("poof");
    setTimeout(function() {
      $this.find(".copyIcon").removeClass("poof");
    },200);
  },1000);
});

$('img').on('dragstart', function(event) { event.preventDefault(); });
const slider = document.querySelector('.swatch-images');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX);
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);
});

// Clear
$("#clear").click(function() {
  $("input")[0].value = null;
  let root = document.documentElement;
  $(this).css("visibility","");
  $("#select").css("transition","ease 0.4s");
  colors = {
    primary: "#161616",
    secondary: "#878686",
    backgroundMain: "#ffffff",
    backgroundOther: "#f3f3f3",
    colored: "#DF1748"
  }
  root.style.setProperty('--primary', "#161616");
  root.style.setProperty('--secondary', "#878686");
  root.style.setProperty('--backgroundMain', "#ffffff");
  root.style.setProperty('--backgroundOther', "#f3f3f3");
  root.style.setProperty('--colored', "#DF1748");
  $("#images-cont").css("display","");
  ReactDOM.render(<Swatches colors={colors}/>, document.getElementById('swatches-react'));
  setTimeout(function(){
    $("#select").css("transition","");
  },1000);
});

// Fullstop Loading
function setloadAnims() {
  loadAnims.push( setInterval(function() {
    if(animState) {
      $("#fullstop").removeClass("fullstop");
      animState = false;
    } else {
      $("#fullstop").addClass("fullstop");
      animState = true;
    }
  },500) );
}

function unSetloadAnims() {
  loadAnims.forEach(loadAnim => clearTimeout(loadAnim));
  $("#fullstop").removeClass("fullstop");
  animState = false;
}

// AWS getColor Request
function colourise(imageData) {
  $.ajax({
    type: "POST",
    url: "https://iriva52n5a.execute-api.ap-south-1.amazonaws.com/colors/colors",
    crossDomain: true,
    data: JSON.stringify({"count":2,"data":imageData}),
    contentType: "application/json",
    dataType: "json",
    success: function(data,status) {
      console.log("Data: "+data.body+"\nStatus: "+status);
      let colors = JSON.parse(data.body);
      let root = document.documentElement;
      $("#select").css("transition","ease 0.4s");
      colors = {
        primary: colors.primary,
        secondary: colors.secondary,
        backgroundMain: colors.backgroundMain,
        backgroundOther: colors.backgroundOther,
        colored: colors.primary
      }
      root.style.setProperty('--primary', colors.primary);
      root.style.setProperty('--colored', colors.secondary);
      root.style.setProperty('--secondary', colors.secondary);
      root.style.setProperty('--backgroundMain', colors.backgroundMain);
      root.style.setProperty('--backgroundOther', colors.backgroundOther);
      // $("#images-cont").css("display","none");
      unSetloadAnims();
      ReactDOM.render(<Swatches colors={colors}/>, document.getElementById('swatches-react'));
      $("#clear").css("visibility","visible");
      setTimeout(function(){
        $("#select").css("transition","");
      },1000);
    }
  });
}
