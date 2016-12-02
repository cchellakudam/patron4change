import React, { PropTypes } from 'react';
import {Button} from 'react-toolbox/lib/button';
const Carousel = require('nuka-carousel');


let styles = {};
if (process.env.BROWSER) {
  styles = require('../../client/css/modules/changemaker-gallery.scss');
}
export default class ChangemakerGallery extends React.Component {


  static propTypes = {
    children: PropTypes.object
  }

  render() {
    return(
	<div>
	<div className={styles.changemakerCarousel}>
	<Button label='Changemaker finden, Patron werden' accent raised primary className={styles.becomeChangemakerButton}/>
	 <Carousel slideWidth={0.75} cellAlign="center">
        <img src="http://loremflickr.com/1000/300/environment"/>
        <img src="http://loremflickr.com/1000/300/girl,sport"/>
        <img src="http://loremflickr.com/1000/300/boy,aware"/>
        <img src="http://loremflickr.com/1000/300/people.together"/>
        <img src="http://loremflickr.com/1000/300/sea"/>
      </Carousel>
	</div>
	<div className={styles.changemakerGallery}>
	      {this.props.children}
	    </div>
	</div>);
  }
}
