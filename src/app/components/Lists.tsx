"use client";
import { useRouter } from "next/navigation";
import { Message } from "../utils/interfaces";
import { deleteMessage } from "../utils/supabasefuncitons";

type Props = {
  messages: Message[] | null;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingMessage: React.Dispatch<React.SetStateAction<Message | null>>;
};

const Lists = (props: Props) => {
  const { messages, setIsEditing, setEditingMessage } = props;
  const router = useRouter();
  const handleDelete = async (id: number) => {
    const tmpError = await deleteMessage(id);
    if (!tmpError?.message) router.refresh();
  };

  const handleEditing = (message: Message | null) => {
    if (message) {
      setIsEditing(true);
      setEditingMessage(message);
    }
  };

  return (
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
  );
};
export default Lists;
