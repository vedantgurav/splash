const getImageColors = require('get-image-colors');
const chroma = require('chroma-js');

exports.handler = async (event) => {
  let data = event.data.split(',');
  let imageType = data[0].split(';')[0].split(':')[1];
  let imageData = data[1];
  console.log(imageType);
  console.log(imageData);
  let response = {
    statusCode: 200
  };
  let buffer = new Buffer.from(imageData, 'base64');
  let kn = 2;
  if(event.count) {
    kn = event.count;
  }
  const options = {
    count: kn,
    type: imageType
  }
  getImageColors(buffer, options).then(colors => {
    if(colors[1] && chroma.contrast(colors[0],colors[1])<3) {
      response.body = produceSingle(colors);
    } else {
      response.body = produceDouble(colors);
    }
  })
  return response;

  function produceSingle(colors) {
    let primary;
    let secondary;
    let backgroundOther;
    let backgroundMain;

    if(colors.length > 1) {
      if(colors[0].luminance < colors[1].luminance) {
        primary = colors[0];
      }  else {
        primary = colors[1];
      }
    } else {
      primary = colors[0];
    }

    if(primary.get('hsl.s')<0.6) {
      primary = primary.set('hsl.s',0.66);
    }
    if(primary.get('hsl.l')>0.6) {
      primary = primary.set('hsl.l',0.66);
    }

    secondary = primary.set('hsl.l', '*1.4');
    backgroundOther = primary.set('hsl.l', '*2');
    backgroundMain = primary.set('hsl.l', '*2.2');

    if(backgroundMain.hex() == backgroundOther.hex()) {
      backgroundMain = backgroundMain.set('hsl.l',0.99);
      backgroundOther = backgroundOther.set('hsl.l',0.9);
    }


    return JSON.stringify({
      "type": "single",
      "primary": primary.hex(),
      "secondary": secondary.hex(),
      "backgroundMain": backgroundMain.hex(),
      "backgroundOther": backgroundOther.hex(),
      "original": JSON.stringify(colors.map(color => color.hex()))
    });
  }

  function produceDouble(colors) {
    let lighter;
    let darker;
    let primary;
    let secondary;
    let backgroundOther;
    let backgroundMain;

    if(colors[0].luminance < colors[1].luminance) {
      lighter = colors[1];
      darker = colors[0];
    }  else {
      lighter = colors[0];
      darker = colors[1];
    }

    if(lighter.get('hsl.l')<0.4) {
      lighter = lighter.set('hsl.l',0.4);
    }
    if(darker.get('hsl.l')>0.2) {
      darker = darker.set('hsl.l',0.2);
    }

    primary = lighter;
    secondary = lighter.set('hsl.s', '*0.85').set('hsl.l','*0.75');
    backgroundOther = darker.set('hsl.s', '*0.47').set('hsl.l','*2.2');
    backgroundMain = darker;

    return JSON.stringify({
      "type": "double",
      "primary": primary.hex(),
      "secondary": secondary.hex(),
      "backgroundMain": backgroundMain.hex(),
      "backgroundOther": backgroundOther.hex(),
      "original": JSON.stringify(colors.map(color => color.hex()))
    });
  }

};
