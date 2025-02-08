import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const ItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  position: relative;
  margin: 0.25rem 0;
`;

const ItemLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    background: ${({ theme }) => theme.colors.lightBackground};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.lightPrimary};
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 3px;
      background: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ItemIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
`;

const NavigationItems = ({ items, activePath, onItemClick }) => {
  return (
    <ItemsList>
      {items.map((item) => (
        <Item key={item.path}>
          <ItemLink
            to={item.path}
            exact={item.exact}
            activeClassName="active"
            onClick={onItemClick}
            aria-current={activePath === item.path ? 'page' : undefined}
          >
            {item.icon && <ItemIcon as={item.icon} />}
            <span>{item.label}</span>
          </ItemLink>
        </Item>
      ))}
    </ItemsList>
  );
};

NavigationItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
      exact: PropTypes.bool,
    })
  ).isRequired,
  activePath: PropTypes.string,
  onItemClick: PropTypes.func,
};

export default NavigationItems;