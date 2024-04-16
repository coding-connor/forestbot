'use client';

import Chat from './components/Chat';
import { useChat } from 'ai/react';
import { FormEvent, useState } from 'react';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onFinish: async () => {
      // setGotMessages(true);
    }
  });

  const handleMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
    // setContext(null);
    // setGotMessages(false);
  };

  const [apiResponse, setApiResponse] = useState(null);

  const handleApiButtonClick = async () => {
    try {
      const res = await fetch('/api/test'); // Replace '/api/example' with your API endpoint
      const data = await res.json();
      setApiResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setApiResponse(null);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-10">Forestbot</h1>
      <Chat input={input} handleInputChange={handleInputChange} handleMessageSubmit={handleMessageSubmit} messages={messages} />
      <button onClick={handleApiButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Make API Request
      </button>
      {apiResponse && (
        <div className="mt-4">
          <h2 className="text-xl mb-2">API Response:</h2>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
      <h2 className="test-xl mb-4">Ask questions of the documents and backed by the documents</h2>
    </main>
  );
}
