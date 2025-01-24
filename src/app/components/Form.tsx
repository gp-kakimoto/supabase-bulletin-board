"use client";
import { useRouter } from "next/navigation";
import { Message } from "../utils/interfaces";
import { addMessage, editMessage } from "../utils/supabasefuncitons";
import { useState } from "react";

type Props = {
  message: Message | null;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const Form = (props: Props) => {
  const { message, isEditing, setIsEditing } = props;

  const [name, setName] = useState(isEditing ? message?.name : "");
  const [text, setText] = useState(isEditing ? message?.text : "");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEditing) {
      if (name && text) {
        const tmpMessages = await addMessage(name, text);
        if (tmpMessages) {
          setName("");
          setText("");
          router.refresh();
        }
      }
    } else {
      if (message?.id && name && text) {
        const tmpMessages = await editMessage(message.id, name, text);
        if (tmpMessages) {
          router.refresh();
          setIsEditing(false);
        }
      }
    }
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
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
          {isEditing ? "編集" : "追加"}
        </button>
      </div>
    </form>
  );
};
export default Form;
