import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blog";

const Ourblog = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const observerRef = useRef(null);
  const postsPerPage = 6;

  useEffect(() => {
    // Reset visible items when page changes
    setVisibleItems([]);
    
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('.blog-item');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [currentPage]);

  // Blog content lives in src/data/blog.ts (shared with the BlogPost page)
  // Calculate total pages
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Latest Posts</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, insights, and updates from Proton Security.
          </p>
        </div>
        
        {/* Blog Posts Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post, index) => (
            <div
              key={post.id}
              data-index={index}
              className={`blog-item bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-700 ${
                visibleItems.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
            >
              {/* Image */}
              <div className="h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {post.date}
                </p>
                <p className="text-gray-700 mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.id}`}>
                  <button className="inline-flex items-center text-highlight font-semibold hover:text-primary transition-colors group">
                    More 
                    <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-16">
          <button 
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-lg transition-colors ${
              currentPage === 1 
                ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
                : 'border-primary text-primary hover:bg-primary hover:text-white'
            }`}
          >
            Previous
          </button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-lg transition-colors ${
                  currentPage === index + 1
                    ? 'bg-primary text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-lg transition-colors ${
              currentPage === totalPages 
                ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
                : 'border-primary text-primary hover:bg-primary hover:text-white'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ourblog;