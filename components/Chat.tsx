"use client";
import { Button } from "./ui/button";

import { useChat } from "ai/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="h-12 w-12 p-2  bg-gray-300 text-blue-500 rounded-3xl hover:bg-blue-600 hover:text-white">
          <Image src="/robot.svg" width={50} height={50} alt="robot" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>AI Chat</SheetTitle>
          <SheetDescription>
            Chat with our AI-Powered assistant
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className=" w-full h-[75vh] rounded-md border">
          {messages.length > 0
            ? messages.map((m) => (
                <div key={m.id} className="whitespace-pre-wrap my-2">
                  {m.role === "user" ? (
                    <div className="clear-both">
                      <div className="bg-green-300 float-right max-w-[75%] mx-4 my-2 p-2 rounded-lg break-all">
                        {m.content}
                      </div>
                      {/* user: {m.content} */}
                    </div>
                  ) : (
                    <div className="clear-both">
                      <p className="bg-blue-400  w-3/4 mx-4 my-2 p-2 rounded-lg ">
                        {m.content}
                      </p>
                      {/* ai: {m.content} */}
                    </div>
                  )}
                </div>
              ))
            : null}
        </ScrollArea>
        <div className="pt-2">
          <form onSubmit={handleSubmit}>
            <input
              className="w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl break-all"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Chat;
