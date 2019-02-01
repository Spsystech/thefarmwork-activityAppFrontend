import React from "react";
import "./style.sass";
import Wave from "./components/Wave";
import RotatingPlane from "./components/RotatingPlane";
import DoubleBounce from "./components/DoubleBounce";
import { randomInt } from "../../../utils/helpers";
import PropTypes from 'prop-types';
import loaderImg from '../../../assets/imgs/loader2.gif';

class LoadingSpinner extends React.Component {
    static defaultProps = {
        random: true
    }

    spinners = {
        "wave": Wave,
        "bounce": DoubleBounce,
        "plane": RotatingPlane,
    }

    render() {
        // if (this.props.spinner) {
        //     const Spinner = this.spinners[this.props.spinner];
        //     return <div className='loader_style'><Spinner className='spinner_style' /></div>;     
        // }
        // const randomIdx = randomInt(1, Object.keys(this.spinners).length);
        // const Spinner = this.spinners[Object.keys(this.spinners)[randomIdx - 1]];
        // return <div className='loader_style'><Spinner className='spinner_style' /></div>;        
        return <div className='loader_style text-center'><img height="100px" src={loaderImg}/></div>;        
    }
}

LoadingSpinner.propTypes = {
    spinner: PropTypes.object,
};

export default LoadingSpinner;
