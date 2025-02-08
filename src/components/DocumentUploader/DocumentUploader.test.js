import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import DocumentUploader from './DocumentUploader';

describe('DocumentUploader', () => {
  const createFile = (name, size, type) => {
    const file = new File([], name, { type });
    Object.defineProperty(file, 'size', { value: size });
    return file;
  };

  test('renders dropzone', () => {
    render(<DocumentUploader />);
    expect(screen.getByText('Drag files here or click to upload')).toBeInTheDocument();
  });

  test('handles file selection via click', async () => {
    const mockFile = createFile('test.png', 1024, 'image/png');
    const { container } = render(<DocumentUploader />);
    
    const input = container.querySelector('input[type="file"]');
    await act(async () => {
      fireEvent.change(input, { target: { files: [mockFile] } });
    });
    
    expect(await screen.findByText('Upload successful!')).toBeInTheDocument();
  });

  test('handles drag and drop', async () => {
    const mockFile = createFile('test.pdf', 2048, 'application/pdf');
    render(<DocumentUploader />);
    
    const dropzone = screen.getByLabelText('File upload dropzone');
    fireEvent.dragOver(dropzone);
    fireEvent.drop(dropzone, { dataTransfer: { files: [mockFile] } });
    
    expect(await screen.findByText('Upload successful!')).toBeInTheDocument();
  });

  test('shows error for invalid file type', async () => {
    const mockFile = createFile('test.txt', 1024, 'text/plain');
    const { container } = render(<DocumentUploader allowedTypes={['image/*']} />);
    
    const input = container.querySelector('input[type="file"]');
    await act(async () => {
      fireEvent.change(input, { target: { files: [mockFile] } });
    });
    
    expect(await screen.findByText('Invalid file type')).toBeInTheDocument();
  });

  test('shows error for large files', async () => {
    const mockFile = createFile('large.jpg', 6 * 1024 * 1024, 'image/jpeg');
    const { container } = render(<DocumentUploader maxSize={5 * 1024 * 1024} />);
    
    const input = container.querySelector('input[type="file"]');
    await act(async () => {
      fireEvent.change(input, { target: { files: [mockFile] } });
    });
    
    expect(await screen.findByText('File size exceeds limit')).toBeInTheDocument();
  });

  test('calls callback functions', async () => {
    const mockStart = jest.fn();
    const mockSuccess = jest.fn();
    const mockFile = createFile('test.png', 1024, 'image/png');
    const { container } = render(
      <DocumentUploader 
        onUploadStart={mockStart} 
        onUploadSuccess={mockSuccess} 
      />
    );
    
    const input = container.querySelector('input[type="file"]');
    await act(async () => {
      fireEvent.change(input, { target: { files: [mockFile] } });
    });
    
    expect(mockStart).toHaveBeenCalled();
    expect(mockSuccess).toHaveBeenCalled();
  });

  test('shows preview for images', async () => {
    const mockFile = createFile('test.png', 1024, 'image/png');
    const { container } = render(<DocumentUploader />);
    
    const input = container.querySelector('input[type="file"]');
    await act(async () => {
      fireEvent.change(input, { target: { files: [mockFile] } });
    });
    
    expect(await screen.findByAltText('Upload preview')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<DocumentUploader />);
    expect(asFragment()).toMatchSnapshot();
  });
});