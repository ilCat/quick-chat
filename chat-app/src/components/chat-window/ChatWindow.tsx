import './styles.css'
import React, { useState } from "react";
import { Input} from "antd";
import ChatMessage, { ChatMessageProps } from "../messages/GenericMessage";
import {FilePdfOutlined } from '@ant-design/icons';
import { IButtonProps, ButtonPanel } from '../button-panel/ButtonPanel';
import { SendMessage } from '../../services/Utils';
const { TextArea } = Input;

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [input, setInput] = useState("");




  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages: ChatMessageProps[] = [
      ...messages ,
      { sender: "user", message: input },
      { sender: "bot", message: "🤖 " , loading: true}]

    setMessages(newMessages)
    setInput("")

    SendMessage({user: "Nessuno", message: input }).then( resp =>    
          { const newMessages: ChatMessageProps[] = [
          ...messages ,

          {...messages[messages.length - 1] ,message: "🤖 Simulated response. -> "+ JSON.stringify(resp), loading: false },
        ]
        setMessages(newMessages)
        setInput("");}
      )
    // const newMessages: ChatMessageProps[] = [
    //   ...messages,
    //   { sender: "user", message: input },
    //   { sender: "bot", message: "🤖 Simulated response." },
    // ];

    // setMessages(newMessages);
    // setInput("");
  };

  const buttons: IButtonProps[] = [{
    title: "Send",
    onClick: handleSend,
    className: "send-button"
  },
  {
    title: "Click to Upload",
    onClick:()=>{console.log('import')},
    className: "send-button",
    icon: <FilePdfOutlined />,
    isUpload:true
  }]


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
        <ButtonPanel buttons={buttons}/>
        
      </div>
    </div>
  );
};

export default ChatWindow;
