import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DropzoneContainer = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  background-color: ${({ theme, $isDragging }) => 
    $isDragging ? theme.colors.lightBackground : 'transparent'};
  cursor: pointer;
  margin: 1rem 0;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Input = styled.input`
  display: none;
`;

const PreviewContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
`;

const StatusMessage = styled.div`
  color: ${({ theme, $status }) => 
    $status === 'error' ? theme.colors.error : 
    $status === 'success' ? theme.colors.success : 
    theme.colors.textMuted};
  margin-top: 1rem;
  font-size: 0.9rem;
`;

const FilePreview = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;

  img {
    max-width: 100px;
    max-height: 100px;
    border-radius: 4px;
  }
`;

const DocumentUploader = ({ 
  onUploadStart,
  onUploadSuccess,
  onError,
  allowedTypes = ['image/*', 'application/pdf'],
  maxSize = 5 * 1024 * 1024 // 5MB
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [preview, setPreview] = useState(null);

  const validateFile = (file) => {
    if (!allowedTypes.some(type => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.split('/')[0]);
      }
      return file.type === type;
    })) {
      throw new Error('Invalid file type');
    }

    if (file.size > maxSize) {
      throw new Error('File size exceeds limit');
    }
  };

  const handleFile = async (file) => {
    try {
      validateFile(file);
      setStatus({ type: 'loading', message: 'Uploading file...' });
      onUploadStart?.();

      // Simulate upload process
      const result = await mockUpload(file);
      
      setPreview(URL.createObjectURL(file));
      setStatus({ type: 'success', message: 'Upload successful!' });
      onUploadSuccess?.(result);
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
      onError?.(error);
    }
  };

  const mockUpload = (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now(),
          name: file.name,
          size: file.size,
          type: file.type
        });
      }, 1500);
    });
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === 'dragover');
  }, []);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <div>
      <DropzoneContainer
        $isDragging={isDragging}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
        role="button"
        aria-label="File upload dropzone"
      >
        <div>Drag files here or click to upload</div>
        <div>Supported formats: {allowedTypes.join(', ')}</div>
        
        <Input
          id="file-input"
          type="file"
          onChange={handleFileInput}
          accept={allowedTypes.join(',')}
        />
      </DropzoneContainer>

      {status.message && (
        <StatusMessage $status={status.type}>
          {status.message}
        </StatusMessage>
      )}

      {preview && (
        <PreviewContainer>
          <h4>Uploaded File:</h4>
          <FilePreview>
            {preview.startsWith('data:image') ? (
              <img src={preview} alt="Upload preview" />
            ) : (
              <span>{preview}</span>
            )}
            <div>
              <div>File name: {preview.split('/').pop()}</div>
              <div>Type: {preview.split(':')[1].split(';')[0]}</div>
            </div>
          </FilePreview>
        </PreviewContainer>
      )}
    </div>
  );
};

DocumentUploader.propTypes = {
  onUploadStart: PropTypes.func,
  onUploadSuccess: PropTypes.func,
  onError: PropTypes.func,
  allowedTypes: PropTypes.arrayOf(PropTypes.string),
  maxSize: PropTypes.number,
};

export default DocumentUploader;