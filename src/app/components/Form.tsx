"use client";
import { useRouter } from "next/navigation";
import { Message } from "../utils/interfaces";
import { addMessage, editMessage, addImage } from "../utils/supabasefuncitons";
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
  const [hasError, setHasError] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  const router = useRouter();

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setImage(files && files.length > 0 ? files[0] : null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !text) return; //Early return if input is empty.

    const handleMessageUpdate = async (
      imagePath: string | undefined
    ): Promise<boolean> => {
      if (!isEditing) {
        const imagePath_tmp = imagePath ? imagePath : "";
        const newMessage = await addMessage(name, text, imagePath_tmp);
        return !!newMessage;
      } else {
        if (!message?.id) return false;
        const updatedMessage = await editMessage(message.id, name, text);
        return !!updatedMessage;
      }
    };

    const imageUploadSuccess = await addImage(image);

    if (image && imageUploadSuccess) setImage(null);
    else if (image && !imageUploadSuccess) {
      setHasError(true);
      return;
    }

    const success = await handleMessageUpdate(imageUploadSuccess?.path);

    if (!success) {
      setHasError(true);
      return;
    }

    if (!isEditing) {
      setName("");
      setText("");
    } else {
      setIsEditing(false);
    }
    //setImage(null);
    setHasError(false);

    /******************************************************
     * ファイルが選択された後、表示がリセットされないので、
     * 以下のコードで対処している
     *****************************************************/
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement | null;
    if (fileInput && fileInput.form) {
      fileInput.form.reset();
    }
    /************ここまで********************************* */

    router.refresh();
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
              label={"名前"}
              id={"name"}
              name={"name"}
              isTextarea={false}
              setValue={setName}
            />
            <Input
              data={text ? text : null}
              label={"メッセージ"}
              id={"message"}
              name={"message"}
              isTextarea={true}
              setValue={setText}
            />
            {!isEditing ? (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onChangeFile(e)}
                defaultValue={""}
              />
            ) : (
              ""
            )}
          </div>
          <button className="shadow-md border-2 px-1 py-1 rounded-lg bg-blue-200 max-w-[80px]">
            {isEditing ? "編集" : "追加"}
          </button>
        </div>
      </form>
      {hasError ? <h2 className="text-red-500 text-center">Error</h2> : ""}
    </div>
  );
};
export default Form;
