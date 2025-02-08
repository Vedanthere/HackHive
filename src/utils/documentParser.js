import { BlobServiceClient } from '@azure/storage-blob';

// Initialize Azure Blob Storage client
const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.REACT_APP_AZURE_STORAGE_CONNECTION_STRING
);

// Function to upload a file to Azure Blob Storage
export const uploadFileToBlob = async (file, containerName) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists(); // Create container if it doesn't exist

    const blobClient = containerClient.getBlockBlobClient(file.name);
    const uploadResponse = await blobClient.uploadBrowserData(file, {
      blobHTTPHeaders: { blobContentType: file.type },
    });

    console.log('File uploaded successfully:', uploadResponse);
    return blobClient.url; // Return the URL of the uploaded file
  } catch (error) {
    console.error('Error uploading file to Azure Blob Storage:', error);
    throw error;
  }
};

// Function to parse a document (e.g., extract text from a PDF)
export const parseDocument = async (file) => {
  try {
    if (file.type === 'application/pdf') {
      // Use a library like pdf-parse to extract text from PDF
      const pdf = await import('pdf-parse');
      const data = await pdf(file);
      return data.text;
    } else if (file.type === 'text/plain') {
      // Read text directly from plain text files
      return await file.text();
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error('Error parsing document:', error);
    throw error;
  }
};