import React, { useRef, useState, useEffect } from "react";
import { IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Product } from "../../utils/utils";
import ProductCard from "../ProductCard/ProductCard";

interface HorizontalScrollProps {
    products: Product[];
    heading?: string;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ products, heading = "Highlighted Products" }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false); // Track drag state
    const startX = useRef(0); // Starting mouse X position
    const scrollStart = useRef(0); // Starting scroll position
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
        updateScrollButtonState();
        const ref = scrollRef.current;
        if (ref) ref.addEventListener("scroll", updateScrollButtonState);
        return () => {
            if (ref) ref.removeEventListener("scroll", updateScrollButtonState);
        };
    }, []);

    const updateScrollButtonState = () => {
        if (!scrollRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (scrollRef.current) {
            isDragging.current = true;
            startX.current = e.clientX;
            scrollStart.current = scrollRef.current.scrollLeft;
            scrollRef.current.style.cursor = "grabbing";
            document.body.style.userSelect = "none";
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging.current || !scrollRef.current) return;
        const deltaX = e.clientX - startX.current;
        scrollRef.current.scrollLeft = scrollStart.current - deltaX;
    };

    const handleMouseUpOrLeave = () => {
        if (scrollRef.current) {
            isDragging.current = false;
            scrollRef.current.style.cursor = "grab";
            document.body.style.userSelect = "";
        }
    };

    const scrollLeftHandler = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRightHandler = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
        <div className="relative mt-12 mb-8 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 shadow-xl">
            {/* Heading */}
            <div>
                <div className="absolute mt-[-1.3rem] md:mt-[-1.8rem] lg:mt-[-2.3rem] left-1/2 md:left-[12rem] lg:left-[15rem] transform -translate-x-1/2 bg-white px-8 lg:px-16 py-3 text-center shadow-lg rounded-xl text-black font-semibold text-xl md:text-2xl border-t-4 border-blue-600">
                    <Typography className="text-sm md:text-lg lg:text-2xl w-full text-nowrap">{heading}</Typography>
                </div>
            </div>

            {/* Scroll Buttons */}
            <IconButton
                onClick={scrollLeftHandler}
                className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:bg-opacity-80 transition-all duration-200 shadow-lg rounded-full z-20 ${!canScrollLeft ? "opacity-50 pointer-events-none" : ""
                    }`}
                style={{ width: "3.5rem", height: "3.5rem" }}
            >
                <ChevronLeftIcon fontSize="large" />
            </IconButton>
            <IconButton
                onClick={scrollRightHandler}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:bg-opacity-80 transition-all duration-200 shadow-lg rounded-full z-20 ${!canScrollRight ? "opacity-50 pointer-events-none" : ""
                    }`}
                style={{ width: "3.5rem", height: "3.5rem" }}
            >
                <ChevronRightIcon fontSize="large" />
            </IconButton>

            {/* Scrollable Content */}
            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-scroll scroll-smooth no-scrollbar pb-8 pt-12 px-8"
                style={{ cursor: "grab" }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
            >
                {products.map((product) => (
                    <div key={product.id} className="min-w-[300px] max-w-[350px] flex flex-shrink-0">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HorizontalScroll;
