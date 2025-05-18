import React from 'react'
import ImageScroller from './ImageScroller'
import MenuDisplay from './MenuCard'
import deliverylocationMap from '../assets/locationMap.png'
import Footer from './Footer'

function MainDashboard() {
  return (
    <div>
       <ImageScroller/>
       
       <p style={{textAlign:'center',color: '#99060b',fontSize:'30px',paddingTop:'15px'}}><b>Craving something unforgettable? Taste today’s sizzling specials, enjoy the flavor ride, and come back hungry for more!</b></p>
       <MenuDisplay/>
       <div>
        
        <p style={{textAlign:'center',color: '#99060b',fontSize:'30px',paddingTop:'15px'}}><b>Bringing mouthwatering flavors straight to your neighborhood – check out our delivery zones!</b></p>
        <img className="img-fluid mx-auto d-block" style={{maxWidth: '100%', height: 'auto'}} src={deliverylocationMap}/>
       </div>
       <Footer/>
       
    </div>
  )
}

export default MainDashboard