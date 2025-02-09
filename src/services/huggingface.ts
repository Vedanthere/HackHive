import { HfInference } from '@huggingface/inference';

const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

if (!API_KEY) {
  console.error('HuggingFace API key is not configured. Please set VITE_HUGGINGFACE_API_KEY in your .env file.');
  throw new Error('HuggingFace API key is not configured');
}

// HfInference to facilitate API calls with the various models.
const hf = new HfInference(API_KEY);


/*
Parameters:
  audioBlob - Sound item that will be processed.
*/

export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  if (!audioBlob || audioBlob.size === 0) {
    throw new Error('No audio data provided');
  }

  try {
    // Ensure the blob is valid
    const arrayBuffer = await audioBlob.arrayBuffer();
    if (arrayBuffer.byteLength === 0) {
      throw new Error('Empty audio data');
    }

    // Create a new blob with the verified data
    const verifiedBlob = new Blob([arrayBuffer], { type: audioBlob.type });

    // API call
    const response = await hf.automaticSpeechRecognition({
      model: 'openai/whisper-large-v3',
      data: verifiedBlob,
    });
    
    if (!response || !response.text) {
      throw new Error('Invalid response from transcription service');
    }
    
    return response.text;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Transcription error:', error.message);
      throw new Error(`Failed to transcribe audio: ${error.message}`);
    }
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio');
  }
};


/*
Function that given a context, find the answer to a given question.

Parameteters:
question: string - the question that is prompted.
context: string - the context given to the model from where it will search the answer.
*/
export const generateAnswer = async (question: string, context: string): Promise<string> => {
  if (!question.trim() || !context.trim()) {
    throw new Error('Question and context are required');
  }

  try {
    const response = await hf.questionAnswering({
      model: 'deepset/roberta-base-squad2',
      inputs: {
        question,
        context,
      },
    });

    if (!response || !response.answer) {
      throw new Error('Invalid response from question answering service');
    }

    return response.answer;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Question answering error:', error.message);
      throw new Error(`Failed to generate answer: ${error.message}`);
    }
    console.error('Question answering error:', error);
    throw new Error('Failed to generate answer');
  }
};

/*
Function that, given a text, generates a summary.
Parameter:
  text: strig - Text from which a summary will be generated.
*/
export const generateSummary = async (text: string): Promise<string> => {
  if (!text.trim()) {
    throw new Error('Text content is required for summarization');
  }

  try {
    const response = await hf.summarization({
      model: 'facebook/bart-large-cnn',
      inputs: text,
      parameters: {
        max_length: 130,
        min_length: 30,
      },
    });

    if (!response || !response.summary_text) {
      throw new Error('Invalid response from summarization service');
    }

    return response.summary_text;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Summarization error:', error.message);
      throw new Error("Failed to generate summary: ${error.message}");
    }
    console.error('Summarization error:', error);
    throw new Error('Failed to generate summary');
  }
}

/*
Given text, it parses it and analyzes it to then generate questions and their corresponding answers.
Parameters:
  text:string - Text from which the flashcards will be generated.
*/
export async function generateFlashcards(text: string) {
  try {
    // Chunk into pieces to ensure the model can digest the text.
    const chunkSize = 400; 
    const textChunks = splitIntoChunks(text, chunkSize);
    let allKeywords: string[] = [];

    for (const chunk of textChunks) {
      const nerResults = await hf.tokenClassification({
        model: "dslim/bert-base-NER", 
        inputs: chunk,
        parameters: { aggregation_strategy: "simple" }, 
      });

      //console.log("NER Results for chunk:", nerResults); // Debugging

      // Collect unique words from all chunks
      const chunkKeywords = [...new Set(nerResults.map((entity) => entity.word))];
      allKeywords = [...new Set([...allKeywords, ...chunkKeywords])];
    }

    //console.log("Extracted Keywords:", allKeywords);

    if (allKeywords.length === 0) {
      return [{ question: "No key concepts found", answer: "Try another text or a different model." }];
    }

    // Generate flashcards
    const flashcards = allKeywords.map((keyword) => ({
      question: `What is ${keyword}?`,
      answer: `${keyword} refers to ${getDefinitionFromText(keyword, text)}`,
    }));

    return flashcards;
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return [];
  }
}


// Helper function to split text into chunks
function splitIntoChunks(text: string, chunkSize: number): string[] {
  const words = text.split(" ");
  let chunks: string[] = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(" "));
  }
  return chunks;
}


// Helper function to extract a relevant definition from the text
function getDefinitionFromText(term: string, text: string): string {
  const sentences = text.split(/[.!?]/); // Split into sentences
  const relevantSentence = sentences.find((sentence) => sentence.includes(term));
  return relevantSentence || "No relevant definition found.";
}