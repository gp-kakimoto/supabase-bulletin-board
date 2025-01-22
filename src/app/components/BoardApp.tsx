"use client";
import { useRouter } from "next/navigation";
import { Message } from "../utils/interfaces";
import { addMessage, deleteMessage } from "../utils/supabasefuncitons";
//import { Message } from "./utils/interfaces";
//import { useRouter } from "next/navigation";
import { useState } from "react";
import EdtingForm from "./EdtingForm";
type Props = {
  messages: Message[] | null;
};

const BoardApp = (props: Props) => {
  const { messages } = props;
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name && text) {
      await addMessage(name, text);
      setName("");
      setText("");
      router.refresh();
    }
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleDelete = async (id: number) => {
    await deleteMessage(id);
    router.refresh();
  };

  const handleEditing = (message: Message | null) => {
    setIsEditing(true);
    setEditingMessage(message);
  };

  return (
    <div className="flex justify-center font-[family-name:var(--font-geist-sans)] w-50">
      <main className="w-[500]px ml-auto mr-auto">
        <h1 className="ml-auto text-center mr-auto">一言掲示板</h1>
        {!isEditing ? (
          <div>
            <form
              className="flex w-[500px] mx-auto  p-0"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="flex mx-auto justify-center">
                <div className="w-[420px]">
                  <div className="flex justify-center bg-red-300">
                    <label
                      htmlFor="name"
                      className="my-auto mx-auto text-right w-[80px]"
                    >
                      名前
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={handleName}
                      className="m-2 mx-auto shadow-lg p-1 outline-none w-[300px] text-black"
                    />
                  </div>

                  <div className="flex justify-center bg-red-400">
                    <label
                      htmlFor="message"
                      className="my-auto mx-auto text-right w-[80px]"
                    >
                      メッセージ
                    </label>
                    <input
                      id="message"
                      name="message"
                      type="textarea"
                      value={text}
                      onChange={handleText}
                      className="m-2 mx-auto shadow-lg p-1 outline-none w-[300px] text-black"
                    />
                  </div>
                </div>
                <button className="shadow-md border-2 px-1 py-1 rounded-lg bg-blue-200 max-w-[80px]">
                  追加
                </button>
              </div>
            </form>

            <div className="mx-auto w-[460px]">
              <ul className="mx-auto">
                {messages
                  ? messages.map((message) => (
                      <div
                        key={message.id}
                        className="flex bg-red-500 mt-3 p-2 justify-between"
                      >
                        <li className="font-medium ">
                          <div className="flex">
                            <h3 className="text-white mr-2">名前</h3>
                            <h3 className="text-black">{message.name}</h3>
                          </div>
                          <div className="text-black">{message.text}</div>
                        </li>
                        <div className="flex">
                          <div
                            className="coursor-pointer mr-1"
                            onClick={() => handleEditing(message)}
                          >
                            編集
                          </div>
                          <div
                            className="coursor-pointer ml-0"
                            onClick={() => handleDelete(message.id)}
                          >
                            ✖
                          </div>
                        </div>
                      </div>
                    ))
                  : ""}
              </ul>
            </div>
          </div>
        ) : (
          <EdtingForm
            id={editingMessage ? editingMessage.id : null}
            name={editingMessage ? editingMessage.name : null}
            text={editingMessage ? editingMessage.text : null}
            setIsEditing={setIsEditing}
          />
        )}
      </main>

      <footer></footer>
    </div>
  );
};
export default BoardApp;
