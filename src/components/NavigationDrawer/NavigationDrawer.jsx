import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NavigationItems from './NavigationItems';

const DrawerWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $isOpen }) => 
    $isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ $isOpen }) => 
    $isOpen ? '4px 0 16px rgba(0, 0, 0, 0.1)' : 'none'};
  width: 280px;
`;

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem 0;
`;

const DrawerHeader = styled.div`
  padding: 0 1.5rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease;
`;

const NavigationDrawer = ({ 
  isOpen,
  onClose,
  headerContent,
  items,
  activePath 
}) => {
  const [internalOpen, setInternalOpen] = useState(isOpen);

  useEffect(() => {
    setInternalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setInternalOpen(false);
    onClose?.();
  };

  return (
    <>
      <Backdrop 
        $isOpen={internalOpen} 
        onClick={handleClose} 
        aria-hidden={!internalOpen}
      />
      <DrawerWrapper $isOpen={internalOpen} aria-label="Main navigation">
        <DrawerContent>
          {headerContent && (
            <DrawerHeader>
              {headerContent}
            </DrawerHeader>
          )}
          <DrawerBody>
            <NavigationItems 
              items={items} 
              activePath={activePath}
              onItemClick={handleClose}
            />
          </DrawerBody>
        </DrawerContent>
      </DrawerWrapper>
    </>
  );
};

NavigationDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  headerContent: PropTypes.node,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
    })
  ).isRequired,
  activePath: PropTypes.string,
};

export default NavigationDrawer;