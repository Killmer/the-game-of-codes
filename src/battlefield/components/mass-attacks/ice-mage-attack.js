import React, { PureComponent, Fragment } from "react";
import classNames from "classnames";
import { ICE_MAGE_ATTACK } from "../../constants/mass-attack-types";
import { register } from "../../../animation/collection";
import getNumberInRange from "../../helpers/get-number-in-range";
import getElementBoundsWithinContainer from "../../helpers/get-element-bounds-within-container";
import { get } from "../../../config/character-nodes-reference";

const getCharacterNodeRef = get;
const BOLT_SIZE = 30;

export default class IceMageAttack extends PureComponent {
  constructor(props) {
	super(props);
	this.state = {
	  isPlaying: false
	};

	this.play = this.play.bind(this);
	this.attackTypes = {
	  1: "frost-circle-attack",
	  2: "snow-balls-attack",
	  3: "frost-bolt-attack"
	};
  }

  componentDidMount() {
	register(ICE_MAGE_ATTACK, this);
  }

  play() {
	  return new Promise((resolve) => {
		this.setState(
			{
			  isPlaying: true
			},
			() => {
			  setTimeout(() => {
				this.setState({
				  isPlaying: false
				});
				resolve();
			  }, 1000);
			}
		  );
	  })
  }

  getRandomAttackType() {
	const numberOfAttackTypes = Object.keys(this.attackTypes).length + 1;
	const attackType = this.attackTypes[
	  getNumberInRange(1, numberOfAttackTypes)
	];
	// return attackType;
	return "frost-bolt-attack";
  }

  getFrostBoltStyles(characterBounds) {
	const {width, height, left, top } = characterBounds;

	return {
		left: left + (width / 2) - (BOLT_SIZE / 2),
		top: top + height / 2 - (BOLT_SIZE / 2),
		width: `${BOLT_SIZE}px`,
		height: `${BOLT_SIZE}px`,
		zIndex: '99'
	};
  }

  getFrostBoltTargetStyles(characterBounds, targetBounds) {
	const initialStyles = this.getFrostBoltStyles(characterBounds);

	const { left: targetLeft, width: targetWidth, height: targetHeight, top: targetTop } = targetBounds;
	const targetLeftCenter = targetLeft + (targetWidth / 2) - (BOLT_SIZE / 2);
	const targetTopCenter = targetTop + (targetHeight / 2) - (BOLT_SIZE / 2);

	const {left, top } = initialStyles;

	const transformX = targetLeftCenter - left;
	const transformY = targetTopCenter - top;

	return {
		...initialStyles,
		transform:`translate(${transformX}px, ${transformY}px)`,
	}
  }

  render() {
	const { isPlaying } = this.state;
	const { massAnimationContainerNode, activePlayerId, selectedPlayerId } = this.props;
	const areaClasses = classNames("frost-area", this.getRandomAttackType(), {
	  active: isPlaying
	});

	const frostBoltClasses = classNames("frost-bolt", this.getRandomAttackType(), {
		active: isPlaying
	  });

	const characterNode = getCharacterNodeRef(activePlayerId);
	const targetNode = getCharacterNodeRef(selectedPlayerId);
	const characterBounds = getElementBoundsWithinContainer(characterNode, massAnimationContainerNode);
	const targetBounds = getElementBoundsWithinContainer(targetNode, massAnimationContainerNode);


	// console.log('this.getFrostBoltStyles(characterBounds)', this.getFrostBoltStyles(characterBounds));
	if (!characterBounds.left || !targetBounds.left) return null;

	return (
	  <Fragment>
		<div className={frostBoltClasses} style={isPlaying ? this.getFrostBoltTargetStyles(characterBounds, targetBounds) : this.getFrostBoltStyles(characterBounds)}></div>
		<div className={areaClasses}>
		  <div className="frost-circle"></div>
		  <div className="snow-ball one"></div>
		  <div className="snow-ball two"></div>
		  <div className="snow-ball three"></div>
		  <div className="snow-ball four"></div>
		  <div className="snow-ball five"></div>
		</div>
	  </Fragment>
	);
  }
}
