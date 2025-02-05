"use client";
import { useRouter } from "next/navigation";
import { Message } from "../utils/interfaces";
import {
  deleteImage,
  deleteMessage,
  getImageUrl,
} from "../utils/supabasefuncitons";
import { Fragment } from "react";
import Image from "next/image";

type Props = {
  messages: Message[] | null;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingMessage: React.Dispatch<React.SetStateAction<Message | null>>;
};

const Lists = (props: Props) => {
  const { messages, setIsEditing, setEditingMessage } = props;
  const router = useRouter();
  const handleDelete = async (id: number, image_name: string) => {
    const imageDeleteSusscess = await deleteImage(image_name);
    const tmpError = await deleteMessage(id);
    if (!!image_name && !imageDeleteSusscess) return;
    if (!tmpError?.message) router.refresh();
  };

  const handleEditing = (message: Message | null) => {
    if (message) {
      setIsEditing(true);
      setEditingMessage(message);
    }
  };

  /************************************
   * 改行を<br/>に置き換えるための処理
   * Giminiに訊いた
   **********************************/
  const renderTextWithBreaks = (text: string) => {
    return text.split("\n").map((line, index) => (
      <Fragment key={index}>
        {line}
        <br />
      </Fragment>
    ));
  };

  return (
    <div className="mx-auto w-[460px]">
      <ul className="mx-auto">
        {messages
          ? messages.map((message) => (
              <li key={message.id} className="bg-red-500 mt-3 p-2 font-medium">
                <div className=" flex justify-between w-[450px]">
                  <div>
                    <div className="flex">
                      <h3 className="text-white mr-2">名前</h3>
                      <h3 className="text-black">{message.name}</h3>
                    </div>
                    <div className="text-black w-[350px] mx-2 break-all">
                      {renderTextWithBreaks(message.text)}
                    </div>
                  </div>

                  <div className="flex">
                    <div
                      className="coursor-pointer mr-1"
                      onClick={() => handleEditing(message)}
                    >
                      編集
                    </div>
                    <div
                      className="coursor-pointer ml-0"
                      onClick={() =>
                        handleDelete(message.id, message.image_name)
                      }
                    >
                      ✖
                    </div>
                  </div>
                </div>

                {!!getImageUrl(message.image_name) ? (
                  <div className="w-[380px] m-h-[300px] px-auto mx-auto flex justify-center justify-items-center">
                    <Image
                      alt={message.image_name}
                      width="280"
                      height="187"
                      style={{ objectFit: "contain" }}
                      src={getImageUrl(message.image_name)}
                    />
                  </div>
                ) : (
                  ""
                )}
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};
export default Lists;
