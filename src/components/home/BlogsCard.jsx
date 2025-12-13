// src/components/home/BlogsCard.jsx
import React, { useRef } from "react";

// Dummy blog data
const blogs = [
  {
    title: "Top 10 Resume Tips for Freshers",
    author: "Jane Doe",
    date: "Nov 28, 2025",
    snippet: "Learn how to make your resume stand out and get noticed by recruiters.",
    image:"https://images.unsplash.com/photo-1698047681432-006d2449c631?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "How to Ace Your Next Interview",
    author: "John Smith",
    date: "Dec 1, 2025",
    snippet: "Interview preparation tips and common questions to expect.",
    image: "https://plus.unsplash.com/premium_photo-1661328289840-bd50cc6a62ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Top Skills in Demand in 2025",
    author: "Mary Johnson",
    date: "Dec 3, 2025",
    snippet: "Upgrade your skills to stay competitive in the job market.",
    image: "https://plus.unsplash.com/premium_photo-1661331715840-08c83f770da4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Networking Tips for Career Growth",
    author: "Michael Lee",
    date: "Dec 5, 2025",
    snippet: "Learn how to effectively grow your professional network.",
    image: "https://images.unsplash.com/photo-1488998527040-85054a85150e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Work-Life Balance Strategies",
    author: "Sara Wilson",
    date: "Dec 7, 2025",
    snippet: "Tips to maintain a healthy work-life balance in a busy world.",
    image: "https://plus.unsplash.com/premium_photo-1682436451483-43e45edc8abe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ0fHx8ZW58MHx8fHx8",
  },
];

export default function BlogsCard() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mt-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 max-w-4xl mx-auto px-2">
        <h3 className="text-lg font-semibold">Latest Blogs</h3>
        <button className="text-blue-600 text-sm hover:underline">View More</button>
      </div>

      {/* Carousel */}
      <div className="relative max-w-4xl mx-auto">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-blue-200 transition z-10"
        >
          &#8592;
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-blue-200 transition z-10"
        >
          &#8594;
        </button>

        {/* Blog Cards */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto px-6 py-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100"
          style={{ scrollbarWidth: "thin" }}
        >
          {blogs.map((blog, idx) => (
            <div
              key={idx}
              className="min-w-[220px] bg-white border border-blue-100 rounded-xl shadow-md hover:shadow-lg transition-all p-4 flex-shrink-0"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-28 object-cover rounded-lg mb-3"
              />
              <h4 className="font-semibold text-sm mb-1">{blog.title}</h4>
              <p className="text-[11px] text-blue-800 mb-2">{blog.snippet}</p>
              <div className="text-[9px] text-blue-600 flex justify-between">
                <span>{blog.author}</span>
                <span>{blog.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Reduce scrollbar width and make it subtle */
        .scrollbar-thin::-webkit-scrollbar {
          height: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #93c5fd;
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background-color: #eff6ff;
        }
      `}</style>
    </div>
  );
}
