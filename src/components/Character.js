import React from 'react'
import classNames from 'classnames';

export default function Character({handleClick, health, currentHealth, id, team, type}) {
    const characterClasses = classNames('character', {
        "archer" : type === 'archer',
        "knight" : type === 'knight',
        "doom-knight" : type === 'doom-knight',
        "king" : type === 'king',
        "mage" : type === 'mage',
        "boss" : type === 'boss',
        "skeleton-archer" : type === 'skeleton-archer',
    });
    return (
        <div
          className={characterClasses}
          onClick={() => {
            handleClick(id, team);
          }}
          data-health={`${currentHealth} / ${health} ♥`}
        ></div>
    )
}
