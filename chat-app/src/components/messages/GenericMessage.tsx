import './styles.css'
import React from "react";
import { Card, Typography } from "antd";
const { Text } = Typography;

export interface ChatMessageProps {
  sender: "human" | "system"
  message: string
  loading?: boolean  
}

const GenericMessage: React.FC<ChatMessageProps> = ({ sender, message, loading }) => {
  const isUser = sender === "human";

  return (
    <div className={isUser?"user-message":"ai-message" } >
      {loading ?
      <Card>
        <Text>{"🤖 loading..."}</Text>
      </Card> 
      :<Card  >
        <Text>{message}</Text>
      </Card>}
    </div>
  );
};

export default GenericMessage;