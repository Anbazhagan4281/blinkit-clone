import { useRef, useState } from "react";
import { ItemCard } from "./ItemCard";

interface Item {
  id: string;
  name: string;
  weight: string;
  price: string;
  image: string;
}

export const Carousel: React.FC<{ items: Item[] }> = ({ items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false); // State to control left button visibility

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Amount to scroll
      const currentScroll = scrollRef.current.scrollLeft;
      
      if (direction === "left") {
        scrollRef.current.scrollLeft = currentScroll - scrollAmount;
        // Show left button when scrolled right
        if (scrollRef.current.scrollLeft > 0) {
          setShowLeftButton(true);
        } else {
          setShowLeftButton(false); // Hide left button when back at the start
        }
      } else {
        scrollRef.current.scrollLeft = currentScroll + scrollAmount;
        // Show left button when scrolled away from start
        if (scrollRef.current.scrollLeft > 0) {
          setShowLeftButton(true);
        }
      }
    }
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        style={{
          scrollBehavior: "smooth",
          overscrollBehavior: "contain",
          scrollbarWidth: "none", // Hide scrollbar for Firefox
        }}
        className="flex overflow-x-auto scrollbar-hide py-2"
      >
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      
      {/* Left Button - Hidden initially */}
      {showLeftButton && (
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-[-30px] top-1/2 transform -translate-y-1/2  p-2 w-10 shadow-lg rounded-full z-10"
        >
          &#8592;
        </button>
      )}
      
      {/* Right Button */}
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-[-30px] top-1/2 transform -translate-y-1/2  shadow-lg p-2 w-10 rounded-full z-10"
      >
        &#8594;
      </button>
    </div>
  );
};
