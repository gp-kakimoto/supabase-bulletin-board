type Props = {
  data: string | null;
  label: string;
  id: string;
  name: string;
  isTextarea: boolean;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const Input = (props: Props) => {
  const { data, label, id, name, isTextarea, setValue } = props;

  const handleValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex justify-center bg-red-300">
      <label htmlFor={id} className="my-auto mx-auto text-right w-[80px]">
        {label}
      </label>
      {!isTextarea ? (
        <input
          id={id}
          name={name}
          type={"text"}
          value={data ? data : ""}
          onChange={handleValue}
          className="m-2 mx-auto shadow-lg p-1 outline-none w-[300px] text-black"
        />
      ) : (
        <textarea
          id={id}
          name={name}
          rows={5}
          value={data ? data : ""}
          onChange={handleValue}
          className="m-2 mx-auto shadow-lg p-1 outline-none w-[300px] text-black resize-none"
        ></textarea>
      )}
    </div>
  );
};
export default Input;
