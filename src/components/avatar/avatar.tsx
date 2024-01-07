import classes from './avatar.module.scss';
import React from 'react';

export type AvatarProps = {
  name: string | null;
};

export const Avatar: React.FC<AvatarProps> = ({ name }) => {
  if (name) {
    const firstLetter = name[0];

    return (
      <div className={classes.avatar} title={name}>
        <label className={classes.letter}>{firstLetter}</label>
      </div>
    );
  }
};
