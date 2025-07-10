import React from 'react';
import ChatBot from '../../components/chatbot/ChatBot';

const Home: React.FC = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(to bottom, #265DFF, #173899)',
        minHeight: '100vh',
      }}
    >
      <ChatBot />
    </div>
  );
};

export default Home;
