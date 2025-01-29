"use client";
import { Message } from "../utils/interfaces";

import { useState } from "react";
import EdtingForm from "./EdtingForm";
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
    <div className="flex justify-center font-[family-name:var(--font-geist-sans)] w-50">
      <main className="w-[500]px ml-auto mr-auto">
        <h1 className="ml-auto text-center mr-auto">一言掲示板</h1>

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
            <EdtingForm
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
