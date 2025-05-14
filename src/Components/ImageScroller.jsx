import React from 'react';
import chick from '../assets/chick.png';
import chick65 from '../assets/chick65.png';
import chickfryrice from '../assets/chickfryrice.png';
import chicklp from '../assets/chicklp.png';
import chickss from '../assets/chickss.png';
import eggfryrice from '../assets/eggfryrice.png';
import fishfry from '../assets/fishfry.png';
import mutt from '../assets/mutt.png';
import muttss from '../assets/muttss.png';




const images = [chick,chick65,chickfryrice,chicklp,chickss,eggfryrice,fishfry,mutt,muttss]; 

function ImageScroller() {
  return (
    <div className="scroller-container">
      <div className="scroller-track">
        {images.map((img, index) => (
         <img key={index} src={img} alt={`img-${index}`} className="scroller-img" />
        ))}
        {/* Duplicate images for seamless looping */}
        {images.map((img, index) => (
          <img key={`dup-${index}`} src={img} alt={`img-dup-${index}`} className="scroller-img" />
        ))}
      </div>
    </div>
  );
}

export default ImageScroller;
