import { getAllMessages } from "./utils/supabasefuncitons";
import { Message } from "./utils/interfaces";

import BoardApp from "./components/BoardApp";

export default async function Home() {
  const messages: Message[] | null = await getAllMessages();

  return <BoardApp messages={messages} />;
}
