import React from 'react'
import classNames from 'classnames';

export default function Character({handleClick, health, currentHealth, id, team}) {
    const characterClasses = classNames('character', {
        "enemy" : team === 'defenders'
    });
    return (
        <div
          className={characterClasses}
          onClick={() => {
            handleClick(id, 5, team);
          }}
          data-health={`${currentHealth} / ${health} ♥`}
        ></div>
    )
}
