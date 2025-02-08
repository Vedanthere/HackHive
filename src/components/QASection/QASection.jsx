import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 2rem auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
`;

const QuestionList = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
`;

const QuestionItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  padding: 0.5rem;
`;

const Answer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.lightBackground};
  border-radius: 4px;
  transition: max-height 0.3s ease-in-out;
  max-height: ${({ $expanded }) => ($expanded ? '1000px' : '0')};
  overflow: hidden;
`;

const StatusMessage = styled.div`
  text-align: center;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const QASection = ({ qaPairs = [], onSearch, status }) => {
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const toggleQuestion = (id) => {
    const newExpanded = new Set(expandedQuestions);
    newExpanded.has(id) ? newExpanded.delete(id) : newExpanded.add(id);
    setExpandedQuestions(newExpanded);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const filteredQA = qaPairs.filter(qa =>
    qa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    qa.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const expandAll = () => {
    setExpandedQuestions(new Set(qaPairs.map(qa => qa.id)));
  };

  const collapseAll = () => {
    setExpandedQuestions(new Set());
  };

  return (
    <Container>
      <Header>
        <div>
          <ToggleButton onClick={expandAll}>Expand All</ToggleButton>
          <ToggleButton onClick={collapseAll}>Collapse All</ToggleButton>
        </div>
        <SearchInput
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </Header>

      {filteredQA.length > 0 ? (
        <QuestionList>
          {filteredQA.map((qa) => (
            <QuestionItem key={qa.id}>
              <QuestionHeader onClick={() => toggleQuestion(qa.id)}>
                <h3>{qa.question}</h3>
                <ToggleButton
                  aria-expanded={expandedQuestions.has(qa.id)}
                  aria-controls={`answer-${qa.id}`}
                >
                  {expandedQuestions.has(qa.id) ? '−' : '+'}
                </ToggleButton>
              </QuestionHeader>
              <Answer
                $expanded={expandedQuestions.has(qa.id)}
                id={`answer-${qa.id}`}
                role="region"
              >
                {qa.answer}
              </Answer>
            </QuestionItem>
          ))}
        </QuestionList>
      ) : (
        <StatusMessage>{status || 'No questions found'}</StatusMessage>
      )}
    </Container>
  );
};

QASection.propTypes = {
  qaPairs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ),
  onSearch: PropTypes.func,
  status: PropTypes.string,
};

export default QASection;