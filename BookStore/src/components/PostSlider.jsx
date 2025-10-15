import React from 'react'
import {PostCard} from './index'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area" 

function PostSlider({books}) {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border ">
    <div className="flex w-max space-x-4 p-4 overflow-hidden"  >
        { books.map((book)=>(
        <PostCard key={book.id} book={book}/>
    ))}
    </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default PostSlider

