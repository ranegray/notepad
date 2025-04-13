'use client'

import { useState, useRef, useEffect } from 'react';

export default function Notepad() {
    const [content, setContent] = useState('');
    const [cursorPosition, setCursorPosition] = useState(0);
    const editorRef = useRef<HTMLTextAreaElement>(null);

    // Generate storage key based on current date (format: notepad-YYYY-MM-DD)
    const getStorageKey = () => {
        const today = new Date();
        return `notepad-${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    };

    // Format current time as HH:MM:SS
    const getCurrentTimeString = () => {
        const currentTime = new Date();
        return `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}:${currentTime.getSeconds().toString().padStart(2, '0')}, `;
    };

    // Load content from localStorage or initialize with timestamp
    useEffect(() => {
        try {
            const savedContent = localStorage.getItem(getStorageKey());
            if (savedContent) {
                setContent(savedContent);
            } else {
                setContent(getCurrentTimeString());
            }
        } catch (error) {
            console.error('Error accessing localStorage:', error);
            setContent(getCurrentTimeString());
        }
    }, []);

    // Save content to localStorage whenever it changes
    useEffect(() => {
        if (content) {
            try {
                localStorage.setItem(getStorageKey(), content);
            } catch (error) {
                console.error('Error saving to localStorage:', error);
            }
        }
    }, [content]);

    // Update cursor position when it changes
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.selectionStart = cursorPosition;
            editorRef.current.selectionEnd = cursorPosition;
            editorRef.current.focus();
        }
    }, [cursorPosition]);

    // Adjust textarea height
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.style.height = 'auto';
            editorRef.current.style.height = `${editorRef.current.scrollHeight}px`;
        }
    }, [content]);

    // Handle keyboard events
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        if (event.key === 'Enter') {
            event.preventDefault();

            const timeString = getCurrentTimeString();
            const newContent = content + '\n' + timeString;
            setContent(newContent);

            // Calculate where cursor should be after update
            const newPosition = newContent.length;
            setCursorPosition(newPosition);
        }

        if (event.key === 'Tab') {
            event.preventDefault()
        }
    };

    return (
        <textarea
            ref={editorRef}
            value={content}
            spellCheck={true}
            onChange={(e) => {
                setContent(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            onKeyDown={handleKeyDown}
            className="min-h-[200px] border rounded-md px-2 w-1/2 resize-none outline-0"
            style={{ overflow: 'hidden' }}
        />
    );
}
