import React, { useState, useEffect } from "react";
import './index.css';
import Content from "./Content"
import Swatches from "./Swatches"
import Images from "./Images"
import gsap from 'gsap';

export default function App() {

  const initColors = {
    primary: "#161616",
    secondary: "#878686",
    background: "#ffffff",
    card: "#f3f3f3",
    colored: "#DF1748"
  };

  const [colors, setColors] = useState(initColors);
  const [paint, setPaint] = useState(false);
  const [slowSelect, setSlowSelect] = useState(false);

  return (
    <div class="row" id="root">
      <Content colors={colors} colorise={colorise} paint={paint} clear={clear} slowSelect={slowSelect} pickImage={pickImage}/>
      <div className="offset-md-1 col-md-5" id="swatches">
        <Images colors={colors} colorise={colorise} copy={copy} processImage={processImage}/>
        <p id="try" style={{color: colors.primary}}>Colours</p>
        <Swatches colors={colors} copy={copy}/>
      </div>
    </div>
  );

  function pickImage() {
    const input = document.getElementById("input");
    input.click();
    input.onchange = function() {
      var file = input.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        processImage(reader.result);
      }
    };
  }

  function processImage(pic) {
    var image = new Image();
    image.src = pic;
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
      colorise(mainCanvas.toDataURL("image/jpeg"));
    }
  }

  function colorise(image) {
    setSlowSelect(true);
    var tl = gsap.timeline({repeat: -1});
    var fullstop = document.getElementById("fullstop");
    tl.to(fullstop, 0.5, {alpha: 0})
      .to(fullstop, 0.5, {alpha: 1});
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    var options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({"count":2,"data":image}),
      redirect: 'follow'
    };
    fetch("https://iriva52n5a.execute-api.ap-south-1.amazonaws.com/colors/colors", options)
      .then(response => response.text())
      .then(result => {painter(JSON.parse(JSON.parse(result).body));tl.pause(0).kill();})
      .catch(error => console.log('getColor Error:', error));
  }

  function painter(colors) {
    setPaint(true);
    setColors({
      primary: colors.primary,
      secondary: colors.secondary,
      background: colors.background,
      card: colors.card,
      colored: colors.primary
    });
    let cssVars = document.documentElement.style;
    cssVars.setProperty('--background', colors.background);
    cssVars.setProperty('--colored', colors.primary);
  }

  function clear() {
    setPaint(false);
    document.documentElement.style.setProperty('--background', "#ffffff");
    document.documentElement.style.setProperty('--colored', "#DF1748");
    setColors(initColors);
  }

  function copy(color) {
    var el = document.createElement('textarea');
    el.value = color;
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}
