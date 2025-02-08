import styled from 'styled-components';

export const StyledTranscriptionPanel = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 20px;
`;

export const Content = styled.div`
  max-height: 500px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

export const TranscriptionText = styled.div`
  white-space: pre-wrap;
  font-family: 'Courier New', Courier, monospace;
  line-height: 1.6;
  padding: 15px;
  background: ${({ theme }) => theme.colors.lightBackground};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ theme, $primary }) => 
    $primary ? theme.colors.primary : theme.colors.secondary};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

export const StatusMessage = styled.div`
  padding: 10px;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9em;
`;