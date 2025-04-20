import './styles.css'
import React from "react";
import { Card, Typography } from "antd";

const { Text } = Typography;

export interface ChatMessageProps {
  sender: "user" | "bot";
  message: string;
}

const GenericMessage: React.FC<ChatMessageProps> = ({ sender, message }) => {
  const isUser = sender === "user";

  return (
    <div className={isUser?"user-message":"ai-message" }
    // style={{ textAlign: isUser ? "right" : "left", marginBottom: 5 }}
    >
      <Card  >
        <Text>{message}</Text>
      </Card>
    </div>
  );
};

export default GenericMessage;