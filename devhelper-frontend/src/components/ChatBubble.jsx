import React from "react";

const ChatBubble = ({ sender, text }) => {
  const isUser = sender === "user";
  return (
    <div
      className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] px-4 py-2 rounded-xl shadow-md text-sm whitespace-pre-wrap
          ${isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-black dark:bg-zinc-700 dark:text-white rounded-bl-none"
          }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatBubble;
