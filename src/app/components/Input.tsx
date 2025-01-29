"use client";

import { useState } from "react";

type Props = {
  data: string | null;
  isEditing: boolean;
  isName: boolean;
  setName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setText: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const Input = (props: Props) => {
  const { data, isEditing, isName, setName, setText } = props;
  const [tmpData, setTmpData] = useState(isEditing ? data : "");

  const handleTmpData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isName) {
      setName(e.target.value);
      setTmpData(e.target.value);
    } else {
      setText(e.target.value);
      setTmpData(e.target.value);
    }
  };

  return (
    <div className="flex justify-center bg-red-300">
      <label htmlFor="name" className="my-auto mx-auto text-right w-[80px]">
        {isName ? "名前" : "メッセージ"}
      </label>

      <input
        id={isName ? "name" : "message"}
        name={isName ? "name" : "message"}
        type={isName ? "text" : "textarea"}
        value={tmpData ? tmpData : ""}
        onChange={handleTmpData}
        className="m-2 mx-auto shadow-lg p-1 outline-none w-[300px] text-black"
      />
    </div>
  );
};
export default Input;
