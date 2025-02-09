# **HackHive - Study Engine**

## Project Overview

**Study Engine** is a platform designed to address the challenge of **enhancing learning through AI-driven transcription and assessment tools**. The platform leverages APIs to provide **real-time transcription, automated question generation, and confidence-based assessment tools**. AI is the right tool for this problem as it enables **real-time processing of audio and text data, automates repetitive tasks, and allows for automated assessments**.

---

## AI Integration & Customization with Study Engine

APIs like Hugging Face, and OpenAI help power **Study Engine**, providing advanced capabilities in the following areas:

### 1. **Real-Time Transcription**
  - **Study Engine** integrates **Speech-to-Text** to provide real-time transcription of audio content
  - Handles **domain-specific vocabulary** (e.g., medical, legal, or educational terminology)
  - Improves accuracy in **noisy environments** through already developed LLMs

### 2. **Question Answering Section**
  - The **QASection** component uses "dslim/bert-base-NER" API to answer questions for the transcription
  - Generates **contextually relevant answers** based on the input text

### 3. **Assessment and Summary**
  - Allows user to upload files and generate a summary of important topics
  - Prepares flash cards for users based on uploaded file

---

## Installation

To set up the project, run the following commands (plus their respective types (npm install @types/<library name>)):


npm install

npm install @huggingface/inference  

npm install @microsoft/fetch-event-source  

npm install groq-sdk  

npm install jspdf  

npm install react-markdown  

npm install react-pdftotext  

npm install react-router-dom

npm install react-speech-recognition

npm install zustand  


npm install -D @eslint/js  

npm install -D eslint-plugin-react-hooks 
 
npm install -D eslint-plugin-react-refresh 
 
npm install -D globals  

npm install -D typescript-eslint  

npm install -D autoprefixer  

npm install -D postcss  

npm install -D tailwindcss  


npm run dev
