# HackHive

## Project Structure
```
src/
├── components/
│   ├── TranscriptionPanel/
│   │   ├── TranscriptionPanel.jsx
│   │   ├── TranscriptionPanel.styles.js
│   │   └── TranscriptionPanel.test.js
│   ├── QASection/
│   │   ├── QASection.jsx
│   │   └── QASection.test.js
│   ├── DocumentUploader/
│   │   ├── DocumentUploader.jsx
│   │   └── DocumentUploader.test.js
│   ├── AssessmentDisplay/
│   │   ├── QuizCard.jsx
│   │   ├── Flashcard.jsx
│   │   └── ConfidenceMeter.jsx
│   ├── NavigationDrawer/
│   │   ├── NavigationDrawer.jsx
│   │   └── NavigationItems.jsx
│   └── DashboardLayout/
│       ├── DashboardLayout.jsx
│       └── DashboardGrid.jsx
├── redux/
│   ├── store.js
│   ├── transcriptSlice.js
│   ├── qaSlice.js
│   └── assessmentSlice.js
├── services/
│   ├── api.js                   # Updated with Azure endpoints
│   └── socket.js                # Updated for Azure Web PubSub
├── utils/
│   ├── documentParser.js        # Updated for Azure Blob Storage
│   ├── azureAuth.js             # New AAD integration
│   ├── audioUtils.js
│   └── documentParser.js        # (Consolidated)
├── App.jsx
└── main.jsx
```


## Installation

To set up the project, run the following commands:

```bash
npm install

npm install @mui/icons-material react-dropzone styled-components

npm install styled-components react react-dom

npm install styled-components prop-types @testing-library/react

npm install --save-dev jest babel-jest @babel/preset-env @babel/preset-react

npm install --save-dev jest-environment-jsdom

npm install styled-components react-router-dom @react-icons/all-files


**Notes:**

- The directory structure is enclosed within triple backticks (\`\`\`) with the language identifier omitted to render it as a plain code block.
- Each command is also enclosed within triple backticks with `bash` specified to indicate shell commands.
- Ensure that the directory structure and commands are correctly indented to maintain readability.

For more information on representing directory structures in Markdown, you can refer to this discussion: :contentReference[oaicite:0]{index=0}
::contentReference[oaicite:1]{index=1}