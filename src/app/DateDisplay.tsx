'use client'

export default function Home() {
    const date: Date = new Date();

    return <span className="font-normal">{date.toDateString()}</span>;
}
