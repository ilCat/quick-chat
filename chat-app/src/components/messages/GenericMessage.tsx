import './styles.css'
import React from "react";
import { Card, Typography } from "antd";
const { Text } = Typography;

export interface ChatMessageProps {
  sender: "user" | "bot"
  message: string
  loading?: boolean  
}

const GenericMessage: React.FC<ChatMessageProps> = ({ sender, message, loading }) => {
  const isUser = sender === "user";

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