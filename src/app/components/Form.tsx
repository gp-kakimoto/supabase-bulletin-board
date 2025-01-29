"use client";
import { useRouter } from "next/navigation";
import { Message } from "../utils/interfaces";
import { addMessage, editMessage } from "../utils/supabasefuncitons";
import { useState } from "react";
import Input from "./Input";

type Props = {
  message: Message | null;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const Form = (props: Props) => {
  const { message, isEditing, setIsEditing } = props;

  const [name, setName] = useState(isEditing ? message?.name : "");
  const [text, setText] = useState(isEditing ? message?.text : "");
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEditing && name && text) {
      const tmpMessages = await addMessage(name, text);
      if (tmpMessages) {
        setName("");
        setText("");
        setError(false);
        router.refresh();
      } else {
        setError(true);
      }
    }

    if (isEditing && message?.id && name && text) {
      const tmpMessages = await editMessage(message.id, name, text);
      if (tmpMessages) {
        router.refresh();
        setError(false);
        setIsEditing(false);
      } else {
        setError(true);
      }
    }
  };

  return (
    <div>
      <form
        className="flex w-[500px] mx-auto  p-0"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex mx-auto justify-center">
          <div className="w-[420px]">
            <Input
              data={name ? name : null}
              isEditing={isEditing}
              isName={true}
              setName={setName}
              setText={setText}
            />
            <Input
              data={text ? text : null}
              isEditing={isEditing}
              isName={false}
              setName={setName}
              setText={setText}
            />
          </div>
          <button className="shadow-md border-2 px-1 py-1 rounded-lg bg-blue-200 max-w-[80px]">
            {isEditing ? "編集" : "追加"}
          </button>
        </div>
      </form>
      {error ? <h2 className="text-red-500 text-center">Error</h2> : ""}
    </div>
  );
};
export default Form;
