"use client";
import { useRouter } from "next/navigation";
//import { Message } from "../utils/interfaces";
import {
  //addMessage,
  //deleteMessage,
  editMessage,
} from "../utils/supabasefuncitons";
//import { Message } from "./utils/interfaces";
//import { useRouter } from "next/navigation";
import { useState } from "react";
type Props = {
  id: number | null;
  name: string | null;
  text: string | null;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const EdtingForm = (props: Props) => {
  const router = useRouter();
  const { id, name, text, setIsEditing } = props;
  const [newName, setNewName] = useState<string>(name ? name : "");

  const [newText, setNewText] = useState<string>(text ? text : "");

  //const [editingMessage, setEditingMessage] = useState<Message>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Todoの追加
    //if (name && text) await addMessage(name, text);
    //router.refresh();
    if (id && newName && newText) {
      await editMessage(id, newName, newText);
      router.refresh();
      setIsEditing(false);
    }
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value);
  };

  return (
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
              value={newName}
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
              value={newText}
              onChange={handleText}
              className="m-2 mx-auto shadow-lg p-1 outline-none w-[300px] text-black"
            />
          </div>
        </div>
        <button className="shadow-md border-2 px-1 py-1 rounded-lg bg-blue-200 max-w-[80px]">
          編集
        </button>
      </div>
    </form>
  );
};
export default EdtingForm;
