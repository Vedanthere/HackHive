import React, { useState } from 'react';
import TranscriptionPanel from './components/TranscriptionPanel/TranscriptionPanel';
import QASection from './components/QASection/QASection';
import DocumentUploader from './components/DocumentUploader/DocumentUploader';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('transcription');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <DashboardLayout>
      <TranscriptionPanel selectedTab={selectedTab} onTabChange={handleTabChange} />
      <QASection selectedTab={selectedTab} onTabChange={handleTabChange} />
      <DocumentUploader selectedTab={selectedTab} onTabChange={handleTabChange} />
    </DashboardLayout>
  );
};

export default App;