"use client";
import { Message } from "../utils/interfaces";
import { useState } from "react";
import Form from "./Form";
import Lists from "./Lists";

type Props = {
  messages: Message[] | null;
};

const BoardApp = (props: Props) => {
  const { messages } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-[500px] ml-auto mr-auto mb-2">
        <h1 className="text-center mb-4 mx-auto max-w-[490px]">一言掲示板</h1>

        {messages ? (
          !isEditing ? (
            <div>
              <Form
                message={null}
                isEditing={false}
                setIsEditing={setIsEditing}
              />

              <Lists
                messages={messages}
                setIsEditing={setIsEditing}
                setEditingMessage={setEditingMessage}
              />
            </div>
          ) : (
            <Form
              message={editingMessage}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          )
        ) : (
          <h2>network error</h2>
        )}
      </main>

      <footer></footer>
    </div>
  );
};
export default BoardApp;
