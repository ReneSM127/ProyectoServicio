import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Descripción</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-descriptionbox">
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus quos at provident fugiat odit consectetur vitae nihil amet, nesciunt aperiam quo. Maxime eaque dolores reprehenderit eligendi labore dolorum et magnam?
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi nihil consectetur asperiores deserunt natus eius, ab velit fugit officiis harum reiciendis ducimus obcaecati laborum ut optio dolores architecto commodi cupiditate!
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox