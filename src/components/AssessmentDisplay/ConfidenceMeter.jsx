import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MeterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const ConfidenceLevel = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: ${({ theme, $active, $level }) =>
    $active ? (
      $level === 'low' ? theme.colors.error :
      $level === 'medium' ? theme.colors.warning :
      theme.colors.success
    ) : theme.colors.lightBackground};
  color: ${({ $active }) => $active ? 'white' : 'inherit'};
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ConfidenceMeter = ({ currentLevel, onSelect }) => {
  const levels = ['low', 'medium', 'high'];

  return (
    <MeterContainer>
      {levels.map(level => (
        <ConfidenceLevel
          key={level}
          $level={level}
          $active={currentLevel === level}
          onClick={() => onSelect(level)}
          aria-label={`${level} confidence`}
        >
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </ConfidenceLevel>
      ))}
    </MeterContainer>
  );
};

ConfidenceMeter.propTypes = {
  currentLevel: PropTypes.oneOf(['low', 'medium', 'high', null]),
  onSelect: PropTypes.func.isRequired,
};

export default ConfidenceMeter;