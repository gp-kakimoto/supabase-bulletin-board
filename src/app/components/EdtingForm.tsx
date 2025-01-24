import { Message } from "../utils/interfaces";
import Form from "./Form";
type Props = {
  message: Message | null;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const EdtingForm = (props: Props) => {
  const { message, isEditing, setIsEditing } = props;

  return (
    <Form message={message} isEditing={isEditing} setIsEditing={setIsEditing} />
  );
};
export default EdtingForm;
