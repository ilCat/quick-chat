import './styles.css'
import React, { useState } from "react";
import { Input, Button } from "antd";
import ChatMessage, { ChatMessageProps } from "../messages/GenericMessage";

const { TextArea } = Input;

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages: ChatMessageProps[] = [
      ...messages,
      { sender: "user", message: input },
      { sender: "bot", message: "🤖 Simulated response." },
    ];

    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="chat-component"
    >
      <div className="chat-message">
        {messages.map((msg, index) => (
          <ChatMessage key={index} {...msg} />
        ))}
      </div>

      <div className="chat-prompt">
        <TextArea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <div className='chat-buttons'>	
        <Button style={{justifySelf:'end'}} type="primary" onClick={handleSend}>
          Send
        </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
