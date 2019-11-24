import React, { PureComponent, Fragment } from "react";
import classNames from "classnames";
import { ARCHER_ATTACK } from "../../constants/mass-attack-types";
import { register } from "../../../animation/collection";
import getElementBoundsWithinContainer from "../../helpers/get-element-bounds-within-container";
import { get } from "../../../config/character-nodes-reference";

const getCharacterNodeRef = get;
const ARROW_WIDTH = 45;
const ARROW_HEIGHT = 15;

export default class ArcherAttack extends PureComponent {
  constructor(props) {
	super(props);
	this.state = {
	  isPlaying: false
	};

	this.play = this.play.bind(this);
  }

  componentDidMount() {
	register(ARCHER_ATTACK, this);
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
			  }, 300);
			}
		  );
	  })
  }

  getArrowStyles(characterBounds) {
	const {width, height, left, top } = characterBounds;

	return {
		left: left + (width / 2) - (ARROW_WIDTH / 2),
		top: top + height / 2 - (ARROW_HEIGHT / 2),
		width: `${ARROW_WIDTH}px`,
		height: `${ARROW_HEIGHT}px`,
		zIndex: '99'
	};
  }

  getArrowTargetStyles(characterBounds, targetBounds) {
	const initialStyles = this.getArrowStyles(characterBounds);

	const { left: targetLeft, width: targetWidth, height: targetHeight, top: targetTop } = targetBounds;
	const targetLeftCenter = targetLeft + (targetWidth / 2) - (ARROW_WIDTH / 2);
	const targetTopCenter = targetTop + (targetHeight / 2) - (ARROW_HEIGHT / 2);

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

	const arrowClasses = classNames("arrow", {
		active: isPlaying
	  });

	const characterNode = getCharacterNodeRef(activePlayerId);
	const targetNode = getCharacterNodeRef(selectedPlayerId);
	const characterBounds = getElementBoundsWithinContainer(characterNode, massAnimationContainerNode);
	const targetBounds = getElementBoundsWithinContainer(targetNode, massAnimationContainerNode);

	if (!characterBounds.left || !targetBounds.left) return null;

	return (
		<div className={arrowClasses} style={isPlaying ? this.getArrowTargetStyles(characterBounds, targetBounds) : this.getArrowStyles(characterBounds)}></div>
		// <div className={arrowClasses}></div>
	);
  }
}
