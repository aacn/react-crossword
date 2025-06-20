import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { CrosswordContext } from './context';
import type { CluesData, Direction, EnhancedProps } from './types';

import Clue from './Clue';

// interface ClueInfo {
//   number: string;
//   clue: string;
//   correct?: boolean;
// }

const directionCluesPropTypes = {
  /** direction of this list of clues ("across" or "down") */
  direction: PropTypes.string.isRequired,

  /** a label to use instead of the (English) default */
  label: PropTypes.string,
};

export type DirectionCluesProps = EnhancedProps<
  typeof directionCluesPropTypes,
  { direction: Direction; clues?: CluesData }
>;

export default function DirectionClues({
  direction,
  label,
  clues,
}: DirectionCluesProps) {
  const { clues: contextClues } = useContext(CrosswordContext);

  return (
    <div className="direction">
      {/* use something other than h3? */}
      <h3 className="header">{label || direction.toUpperCase()}</h3>
      {(clues ?? contextClues)?.[direction].map(
        ({ number, clue, complete, correct }) => (
          <Clue
            key={number}
            direction={direction}
            number={number}
            complete={complete}
            correct={correct}
          >
            {clue}
          </Clue>
        )
      )}
    </div>
  );
}

DirectionClues.propTypes = directionCluesPropTypes;

DirectionClues.defaultProps = {
  label: undefined,
};
