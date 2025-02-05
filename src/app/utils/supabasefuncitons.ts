

import { Message } from "./interfaces";
import { supabase } from "./supabase";
import { v4 as uuidv4 } from 'uuid';

export const getAllMessages = async (): Promise<Message[] | null> => {
    const messages = await supabase.from("board").select("*").order("id",{ascending:false});
    
        return messages.data;
    
  }

export const addMessage = async(name:string,text:string,image_name:string )=>{
  const { data, error } = await supabase
  .from('board')
  .insert([
    { name: name, text: text, image_name: image_name },
  ])
  .select();
  console.log(data);
  if(data) return data;
  else if(error) return null;
}

export const deleteImage = async(image_name:string):Promise<boolean>=>{
    const{error} = await supabase.storage.from('images').remove([image_name])
    return !!error? false:true;
}

export const deleteMessage = async (id: number) => {
    const { error } = await supabase.from("board").delete().eq("id", id);
    console.log(error);
    //if (error) return null;
    return error;
  }

export const editMessage = async (id:number,name:string,text:string) =>{
    
    const { data, error } = await supabase
        .from('board')
        .update({id: id, name: name, text:text })
        .eq("id", id)
        .select();
    return (!error)? data : null;
}

export const addImage = async (image:File|null|undefined)=>{
    if(!image) return null;
    const uniqueFileName = `${uuidv4()}`; // UUIDを生成
    const { data: imageFile, error: imageError } = await supabase.storage
      .from('images')
      //.upload(`${Date.now()}`, image,{
        .upload(uniqueFileName, image,{
        cacheControl: '3600',
        upsert: false
      });
    if(!imageError){return imageFile;}
    else{return null}
}

export const getImageUrl = (image_name: string): string => {
    if (!image_name) return "";
    return `${supabase.storage.url}/object/public/images/${image_name}`;
  };