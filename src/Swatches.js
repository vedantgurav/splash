import React, { useEffect } from "react";
import './index.css';
import gsap from 'gsap';

function Card(props) {
  const {index, copy, colors, color, name} = props

  function copyAnimation(index, color) {
    copy(color);
    const svg = document.getElementById("swatch"+index);
    var svgCopy = svg.querySelector("#copyIcon");
    var svgDone = svg.querySelector("#doneIcon");
    var tl = gsap.timeline();
    tl.to(svgCopy, 0.3, {opacity: 0});
    tl.fromTo(svgDone, 0.3, {opacity: 0}, {opacity: 1});
    var tl2 = gsap.timeline();
    tl2.to(svgDone, 0.3, {opacity: 0}).delay(1.1);
    tl2.to(svgCopy, 0.3, {opacity: 1});
  }

  return (
    <div className="row justify-content-between align-items-center swatch-card" id="swatch-card" onClick={() => {copyAnimation(index, color)}} style={{backgroundColor: colors.card}}>
      <div className="col-xs-1 justify-self-start" id="color-card" style={{backgroundColor: color, borderColor: colors.background}}></div>
      <div className="col" id="colorText">
        <p id="colorName" style={{color: colors.primary}}>{name}</p>
        <p id="colorHex" style={{color: colors.secondary}}>{color}</p>
      </div>
      <div className="col-xs-1" id="colorCopy">
        <svg className="" id={"swatch"+index} style={{color: colors.primary}} width="1.6em" height="1.6em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <svg id="copyIcon">
          <path className="copyIcon" fillRule="evenodd" d="M3 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3z"/>
          <path className="copyIcon" d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z"/>
        </svg>
        <svg id="doneIcon" className="poof">
          <path className="doneIcon" fillRule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
          <path className="doneIcon" fillRule="evenodd" d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z"/>
        </svg>
        </svg>
      </div>
    </div>
  )
}

export default function Swatches(props) {
  const {colors, copy} = props

  return (
    <div className="row justify-content-center" id="swatch-container">
      <Card index={0} copy={copy} colors={colors} color={colors.primary} name={"Primary"}/>
      <Card index={1} copy={copy} colors={colors} color={colors.secondary} name={"Secondary"}/>
      <Card index={2} copy={copy} colors={colors} color={colors.background} name={"Background"}/>
      <Card index={3} copy={copy} colors={colors} color={colors.card} name={"Card"}/>
    </div>
  )
}
