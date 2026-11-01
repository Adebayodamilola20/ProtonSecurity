import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Facebook, Twitter, MessageCircle } from "lucide-react";
import { getBlogPost } from "@/data/blog";

const BlogPost = () => {
  const { id } = useParams();

  // Blog content lives in src/data/blog.ts (shared with the blog list page)
  const post = getBlogPost(id);

  if (!post) {
    return (
      <div className="section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-highlight hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Generate share URLs
  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(post.title);
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;
  const whatsappUrl = `https://wa.me/?text=${shareText}%20${shareUrl}`;

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom max-w-4xl">
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-highlight hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Article */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          <div className="w-full h-96 overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Date */}
            <div className="inline-block px-3 py-1 bg-highlight/10 text-highlight text-sm font-semibold rounded-full mb-6">
              {post.date}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">
              {post.title}
            </h1>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                lineHeight: '1.8',
              }}
            />

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-primary mb-4">Share this article</h3>
              <div className="flex gap-4">
                <a 
                  href={facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href={twitterUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                  aria-label="Share on WhatsApp"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;