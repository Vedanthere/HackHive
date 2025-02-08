// Function to record audio using the Web Audio API
export const recordAudio = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];
  
        mediaRecorder.addEventListener('dataavailable', (event) => {
          audioChunks.push(event.data);
        });
  
        mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          resolve({ audioBlob, audioUrl });
        });
  
        mediaRecorder.start();
  
        // Stop recording after 10 seconds (for example)
        setTimeout(() => {
          mediaRecorder.stop();
        }, 10000);
      } catch (error) {
        console.error('Error recording audio:', error);
        reject(error);
      }
    });
  };
  
  // Function to play audio
  export const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };
  
  // Function to convert audio Blob to Base64
  export const audioBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.split(',')[1]); // Extract Base64 data
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };