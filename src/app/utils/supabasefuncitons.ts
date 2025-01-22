
import { Message } from "./interfaces";
import { supabase } from "./supabase";

export const getAllMessages = async (): Promise<Message[] | null> => {
    const messages = await supabase.from("board").select("*").order("id",{ascending:false});
    
        return messages.data;
    
  };

export const addMessage = async(name:string,text:string )=>{
  const { data, error } = await supabase
  .from('board')
  .insert([
    { name: name, text: text },
  ])
  .select();
  console.log(data);
  if(data) return data;
  else if(error) return null;
}

export const deleteMessage = async (id: number) => {
    const { error } = await supabase.from("board").delete().eq("id", id);
    if (error) return null;
  }

export const editMessage = async (id:number,name:string,text:string) =>{
    
    const { data, error } = await supabase
        .from('board')
        .update({id: id, name: name, text:text })
        .eq("id", id)
        .select();
    return (!error)? data : null;
}