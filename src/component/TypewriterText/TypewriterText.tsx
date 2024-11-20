import React, { useEffect, useRef, useState } from "react";
import './TypewriterText.css';

interface TypewriterTextProps {
    text: string;
    speed?: number; // Speed of the typing effect (ms per character)
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 100 }) => {
    const [visibleText, setVisibleText] = useState("");
    const typingTimeoutRef = useRef<number | null>(null);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    resetAnimation(); // Reset animation when entering viewport

                    typeText(0); // Start typing effect
                } else {
                    clearAnimation(); // Stop animation when exiting viewport
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5, // Trigger when 50% of the component is visible
        });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) observer.unobserve(elementRef.current);
            clearAnimation(); // Cleanup to avoid memory leaks
        };
    }, []);

    const typeText = (index: number) => {
        if (index < text.length) {
            typingTimeoutRef.current = window.setTimeout(() => {
                setVisibleText((prev) => prev + text[index]); // Append one character
                typeText(index + 1); // Recursively type the next character
            }, speed);
        }
    };

    const resetAnimation = () => {
        setVisibleText(""); // Clear the text
        clearAnimation(); // Clear any ongoing timeouts
    };

    const clearAnimation = () => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = null;
        }
    };

    return (
        <div
            ref={elementRef}
            className="font-bold px-2"
        >
            <span>{visibleText}</span>
            <span className="animate-blink">|</span>
        </div>
    );
};

export default TypewriterText;
