'use client'

import Notepad from "./Notepad";

export default function Home() {
  const date: Date = new Date();

  return (<div className="flex flex-col items-center">
    <div className="flex justify-between items-center w-full max-w-[500px] p-1">
      <h1 className="font-bold text-xl">notepad, <span className="font-normal">{date.toDateString()}</span></h1>
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clipboard"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /></svg> */}
    </div>
    <Notepad />
  </div>);
}
