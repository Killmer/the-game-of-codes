import React, { Component } from 'react'
import classNames from "classnames";
import { ICE_MAGE_ATTACK } from "../../constants/mass-attack-types";
import { register } from '../../../animation/collection';

export default class IceMageAttack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
        }
        
        this.play = this.play.bind(this);
    }

    componentDidMount() {
        register(ICE_MAGE_ATTACK, this);
    }
    
    play() {
        this.setState({
            isPlaying: true,
        }, () => {
            setTimeout( () => {
                this.setState({
                    isPlaying: false,
                });
            }, 1000);
        });
    }
    render() {
        const { isPlaying } = this.state;
        const areaClasses = classNames('frost-area', {
            'active': isPlaying,
        });

        return (
            <div className={areaClasses}>
                <div className="snow-ball one"></div>
                <div className="snow-ball two"></div>
                <div className="snow-ball three"></div>
                <div className="snow-ball four"></div>
                <div className="snow-ball five"></div>
            </div>
        )
    }
}
