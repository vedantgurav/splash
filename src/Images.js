import React from "react";
import './index.css';
import prem from './prem.jpg';
import barb from './barb.jpg';
import head from './head.jpg';
import blue from './blue.jpg';
import tree from './tree.jpg';
import curve from './curve.jpg';

export default function Images(props) {
  const {colors, processImage} = props;

  return (
    <div id="images-cont">
      <p id="try" style={{color: colors.primary}}>Or pick one</p>
      <div className="swatch-images" style={{backgroundColor: colors.card}}>
        <ImageSwatch pic={prem}/>
        <ImageSwatch pic={barb}/>
        <ImageSwatch pic={head}/>
        <ImageSwatch pic={blue}/>
        <ImageSwatch pic={tree}/>
        <ImageSwatch pic={curve}/>
      </div>
    </div>
  );

  function ImageSwatch(props) {
    const {pic} = props;
    return (
      <div className="" id="swatch-image" onClick={() => {processImage(pic)}}>
        <img src={pic}/>
      </div>
    );
  }
}
