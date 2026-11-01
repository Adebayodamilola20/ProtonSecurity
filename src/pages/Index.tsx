import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Award, Users, Globe, MessageCircle, Send, Trash2 } from "lucide-react";
import { directors } from "@/data/directors";
import { services } from "@/data/services";
import DirectorCard from "@/components/DirectorCard";
import AnimatedSection from "@/components/AnimatedSection";
import CountUp from "@/components/CountUp";
import Testimonials from "@/components/Testimonials";
import heroImage from "@/assets/IMG_2209.jpg";
import heroImage2 from "@/assets/parttern.jpg";
import heroImage3 from "@/assets/pop.jpg";
import heroImage4 from "@/assets/IMG_2232.jpg";
import trainingImage from "@/assets/training-facility.jpg";
import gemini12344 from "@/assets/pop2.jpg";
import model21 from "@/assets/models2222.png";

// Pixazo.ai chat key — set VITE_PIXAZO_API_KEY in a .env file (see .env.example).
// Without it the chat shows a friendly fallback pointing visitors to the contact page.
const CHAT_API_KEY = import.meta.env.VITE_PIXAZO_API_KEY as string | undefined;
const CHAT_API_URL = "https://gateway.pixazo.ai/llama-2/v1/getData";

const WELCOME_MESSAGE = {
  id: 1,
  text: "Hello! I'm the Proton Security AI assistant. How can I help you with our services or training today?",
  sender: "ai",
};

const CHAT_FALLBACK_MESSAGE =
  "I'm currently offline, but our team is ready to help! Please call 08032023600 or email info@protonsecurity.com, or visit our Contact page and we'll get back to you quickly.";

// Define the bounce animation keyframes for the chat button
const BOUNCE_ANIMATION_STYLE = `
@keyframes pulse-bounce {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.6), 0 0 5px rgba(255, 255, 255, 0.4);
  }
}
.intermittent-bounce {
    animation: pulse-bounce 0.5s ease-in-out infinite alternate; 
}
`;

const Index = () => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const heroImages = [heroImage, heroImage2, heroImage3, heroImage4];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(slideInterval);
  }, [heroImages.length]);


  const featuredDirectors = directors
    .filter(d => d.images && d.images.length > 0)
    .slice(0, 3);

  const chatMessagesRef = useRef(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isThrottled, setIsThrottled] = useState(false);

  // Function to handle automatic scroll
  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isChatOpen]);

  useEffect(() => {
    setIsBouncing(true);

    const initialStopTimer = setTimeout(() => {
      setIsBouncing(false);
    }, 5000);

    const intervalId = setInterval(() => {
      setIsBouncing(true);

      const innerStopTimer = setTimeout(() => {
        setIsBouncing(false);
      }, 5000);

      return () => clearTimeout(innerStopTimer);
    }, 9000);

    return () => {
      clearTimeout(initialStopTimer);
      clearInterval(intervalId);
    };
  }, []);

  // Function to clear the messages
  const clearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setInputValue("");
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || isThrottled) return;

    const userMessage = { id: Date.now(), text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    const userInput = inputValue;
    setInputValue("");
    setIsLoading(true);
    setIsThrottled(true);

    setTimeout(() => {
      setIsThrottled(false);
    }, 3000);

    // No API key configured — reply with contact details instead of failing silently
    if (!CHAT_API_KEY) {
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: CHAT_FALLBACK_MESSAGE, sender: "ai" }]);
      setIsLoading(false);
      return;
    }

    try {
      let conversationContext = "";

      messages.slice(1).forEach((msg) => {
        if (msg.sender === "user") {
          conversationContext += `User: ${msg.text}\n`;
        } else if (msg.sender === "ai") {
          conversationContext += `Assistant: ${msg.text}\n`;
        }
      });

      conversationContext += `User: ${userInput}\nAssistant:`;

      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": CHAT_API_KEY,
        },
        body: JSON.stringify({
          system: `You are a helpful AI assistant for Proton Security Services Nigeria Limited, a premier provider of security solutions. Respond professionally, focusing on security services, training, and expertise. Keep responses concise and helpful.

IF ASKED FOR CONTACT INFORMATION, USE THE FOLLOWING EXACT DETAILS:
Head Office: 10 Jibowu Street, Yaba, Lagos State, Nigeria
Email: info@protonsecurity.com
Phone: +234 803 202 3600 / +234 703 202 7481
Website contact page: /contact
`,
          prompt: conversationContext,
          max_tokens: 500,
          seed: 8,
          temperature: 0.6,
          top_p: 1,
          top_k: 1
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "No error details provided." }));
        console.error("API Error Status:", response.status, "Details:", errorData);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const aiText = data.choices?.[0]?.text ||
        data.generated_text ||
        data.response ||
        data.content ||
        "I couldn't generate a response. The API returned a success status but no text. Please try again.";

      const aiResponse = {
        id: Date.now() + 1,
        text: aiText.trim(),
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error calling Pixazo.ai Llama-2 API:", error);

      let errorMessage = "Sorry, there was an error processing your request. Please try again.";

      if (error.message.includes("API error: 429")) {
        errorMessage = "🚨 **Rate Limit Exceeded (Error 429)**: You've sent too many requests too quickly. Please wait a moment and try again, or **click the trash icon to clear the chat** and try a shorter query.";
      } else if (error.message.includes("API error: 401") || error.message.includes("API error: 403")) {
        errorMessage = "🚨 Error: API Key is unauthorized or invalid. Please check your Pixazo.ai subscription key and billing.";
      } else if (error.message.includes("API error: 400")) {
        errorMessage = "⚠️ Error: Bad Request. The request or conversation history is likely too long. **Click the trash icon to clear the chat** and try a shorter message.";
      } else if (error.message.includes("API error: 5")) {
        errorMessage = `💥 Server Error: The Pixazo.ai server is experiencing an issue. Please try again shortly.`;
      } else if (error.message.includes("Failed to fetch")) {
        errorMessage = "🔌 Connection Error: Failed to connect to the Pixazo.ai server. Check your network.";
      } else {
        errorMessage = `❌ Unexpected Error: ${error.message}. Please check the browser console for details.`;
      }

      const errorResponse = {
        id: Date.now() + 1,
        text: errorMessage,
        sender: "ai",
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Stacking scroll: each section pins once its bottom reaches the viewport,
  // so the next section slides up over it. Tall sections scroll fully first.
  const stackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = stackRef.current;
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>(":scope > section"));
    const update = () => {
      sections.forEach((s) => {
        s.style.setProperty("--stack-top", `${Math.min(0, window.innerHeight - s.offsetHeight)}px`);
      });
    };
    update();
    const ro = new ResizeObserver(update);
    sections.forEach((s) => ro.observe(s));
    window.addEventListener("resize", update);

    // As the next section slides over, gently shrink and dim the one underneath.
    const desktop = window.matchMedia("(min-width: 769px)");
    const applyDepth = () => {
      sections.forEach((s, i) => {
        const next = sections[i + 1];
        if (!next || !desktop.matches) {
          s.style.transform = "";
          s.style.removeProperty("--stack-dim");
          return;
        }
        const nextTop = next.getBoundingClientRect().top;
        const progress = Math.min(1, Math.max(0, 1 - nextTop / window.innerHeight));
        // Skip sections that are fully covered or not yet reached, to avoid needless style writes.
        if (progress <= 0 || progress >= 1) {
          if (s.dataset.stackP === String(progress)) return;
        }
        s.dataset.stackP = String(progress);
        s.style.setProperty("--stack-dim", (0.35 * progress).toFixed(3));
      });
    };

    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on("scroll", applyDepth);
    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });
    applyDepth();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      sections.forEach((s) => {
        s.style.transform = "";
        s.style.removeProperty("--stack-dim");
      });
    };
  }, []);

  return (
    <div ref={stackRef} className="min-h-screen stack-page">

      <style>{BOUNCE_ANIMATION_STYLE}</style>

      <section className="relative min-h-[90vh] flex items-center justify-start overflow-hidden py-20 md:py-0">
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentHeroIndex ? "opacity-100" : "opacity-0"
                }`}
            >
              <img
                src={img}
                alt={`Proton Security Hero ${index + 1}`}
                className={`w-full h-full object-cover ${index === currentHeroIndex ? "animate-zoom-out" : ""}`}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/40 z-10"></div>
        </div>

        <div className="relative z-10 container-custom px-4 text-white">
          <AnimatedSection>
            <div className="max-w-4xl text-left pl-4 md:pl-0">
              <div className="inline-block bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 text-yellow-500 px-4 py-1 rounded-full text-sm font-semibold mb-6">
                PROTON SECURITY SERVICES
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Committed to Your Safety, Today and Always.
              </h1>
              <p className="text-xl md:text-2xl mb-10 max-w-2xl text-gray-200">
                We go beyond protecting spaces to safeguarding futures, seamlessly integrating security expertise, advanced technology, and forward-thinking protection strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Link to="/contact">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg px-8 rounded-full">
                    Join Our Team
                  </Button>
                </Link>
                <Link to="/gallery">
                  <Button size="lg" variant="outline" className="border-white text-black hover:bg-black/10 text-lg px-8 rounded-full">
                    <span className="mr-2">▷</span> Gallery
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-primary text-white">
        <AnimatedSection>
          <div className="marquee-container stats-marquee">
            <div className="marquee-content marquee-reverse">
              {[0, 1, 2, 3].map((copy) =>
                [
                  { end: 21, label: "Years Experience" },
                  { end: 12000, label: "Trained Professionals" },
                  { end: 60, label: "Corporate Clients" },
                  { end: 7, label: "Countries Served" },
                ].map((stat) => (
                  <div
                    key={`${copy}-${stat.label}`}
                    className="flex-shrink-0 w-[280px] md:w-[340px] p-4 text-center border-r border-white/10"
                  >
                    <div className="text-5xl font-bold text-highlight mb-2">
                      <CountUp end={stat.end} suffix="+" />
                    </div>
                    <div className="text-lg text-white/80">{stat.label}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* NEW: Gallery Showcase Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container-custom px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <AnimatedSection>
              <div className="space-y-8">
                <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
                  📸 Gallery Showcase
                </div>
                <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                  Our Creative Gallery
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Discover the discipline and dedication that define our operations—driven by highly trained teams, rigorous standards, and a global commitment to excellence.
                </p>
                <Link to="/gallery">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 rounded-full text-lg h-14">
                    View Gallery <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            {/* Right Images */}
            <AnimatedSection delay={200}>
              <div className="flex gap-6 relative">
                {/* Image 1 */}
                <div className="w-1/2 mt-12">
                  <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px] relative group">
                    <img
                      src={model21}
                      alt="Security Team"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                      <h4 className="font-bold text-lg">Proton Team</h4>
                      <p className="text-sm text-gray-300">Field Operations</p>
                    </div>
                  </div>
                </div>

                {/* Image 2 */}
                <div className="w-1/2">
                  <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px] relative group">
                    <img
                      src={gemini12344}
                      alt="Training Session"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                      <h4 className="font-bold text-lg">Training</h4>
                      <p className="text-sm text-gray-300">Tactical Drills</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div>
                <div className="inline-block bg-highlight/10 text-highlight px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  WHO ARE WE ?
                </div>
                <h2 className="text-4xl font-bold text-primary mb-6">
                  The Standard in Security Excellence
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We're a premier provider of comprehensive security solutions, integrating advanced technology with decades of proven expertise to deliver exceptional protection for businesses and organizations worldwide.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Our team of certified professionals draws on extensive military, law enforcement, and corporate security backgrounds to design tailored solutions that effectively address your unique security challenges.
                </p>
                <Link to="/about">
                  <Button className="btn-highlight">
                    Learn More About Us <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white border border-gray-200 shadow-sm p-6 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all">
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-4">
                    <Shield size={24} className="text-highlight" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-primary">Secured Logistics</h3>
                  <p className="text-sm text-gray-600">Combines security and technology to move goods efficiently.</p>
                </Card>
                <Card className="bg-white border border-gray-200 shadow-sm p-6 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all">
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-4">
                    <Award size={24} className="text-highlight" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-primary">Award Winning</h3>
                  <p className="text-sm text-gray-600">Recognized for exceptional service delivery</p>
                </Card>
                <Card className="bg-white border border-gray-200 shadow-sm p-6 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all">
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-4">
                    <Users size={24} className="text-highlight" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-primary">Expert Team</h3>
                  <p className="text-sm text-gray-600">Highly trained security professionals</p>
                </Card>
                <Card className="bg-white border border-gray-200 shadow-sm p-6 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all">
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-4">
                    <Globe size={24} className="text-highlight" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-primary">Global Reach</h3>
                  <p className="text-sm text-gray-600">International security operations</p>
                </Card>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-block bg-highlight/10 text-highlight px-4 py-1 rounded-full text-sm font-semibold mb-4">
                WHAT WE OFFER
              </div>
              <h2 className="text-4xl font-bold text-primary mb-4">Comprehensive Security</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From corporate security to specialized training, we provide end-to-end solutions tailored to your needs
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-5xl mx-auto space-y-4 md:space-y-5">
            {services.map((service, index) => {
              const reversed = index % 2 === 1;
              return (
                <AnimatedSection key={service.id}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-center bg-white rounded-2xl p-3 md:p-4 shadow-sm border border-gray-200/70">
                    <div className={`md:col-span-5 overflow-hidden rounded-xl group ${reversed ? "md:order-2" : ""}`}>
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="w-full h-40 md:h-40 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className={`md:col-span-7 px-1 md:px-2 ${reversed ? "md:order-1" : ""}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-bold text-highlight tracking-widest">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px w-8 bg-highlight/60" />
                        <service.icon className="text-primary" size={20} />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-primary mb-1.5">{service.title}</h3>
                      <p className="text-gray-600 mb-3 leading-relaxed">{service.description}</p>
                      <Link
                        to={`/services#${service.id}`}
                        className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors"
                      >
                        Learn more <ArrowRight className="ml-1.5" size={16} />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection delay={300}>
            <div className="text-center mt-12">
              <Link to="/services">
                <Button size="lg" className="btn-highlight">
                  View All Services <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Training Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <img
                src={trainingImage}
                alt="Security Training"
                className="rounded-lg shadow-2xl"
                loading="lazy"
              />
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div>
                <div className="inline-block bg-highlight/20 text-highlight px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  TRAINING & DEVELOPMENT
                </div>
                <h2 className="text-4xl font-bold mb-6">
                  World-Class Security Training Programs
                </h2>
                <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                  Our comprehensive training programs are designed to develop highly skilled security professionals equipped to manage diverse situations with confidence and expertise.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Basic Security Training", "Advanced Tactical Operations", "Crisis Management", "Specialized Certifications"].map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-200">
                      <div className="w-2 h-2 bg-highlight rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/training">
                  <Button size="lg" className="btn-highlight">
                    Explore Training Programs <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Board Members Preview */}
  <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-block bg-highlight/10 text-highlight px-4 py-1 rounded-full text-sm font-semibold mb-4">
                LEADERSHIP TEAM
              </div>
              <h2 className="text-4xl font-bold text-primary mb-4">Meet Our Management</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Proven leaders shaping innovative, high-performance security solutions.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredDirectors.map((director, index) => (
              <AnimatedSection key={director.id} delay={index * 100}>
                <DirectorCard director={director} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={300}>
            <div className="text-center">
              <Link to="/board">
                <Button size="lg" className="btn-highlight">
                  See More <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary via-accent to-primary text-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">Ready to Secure Your Future?</h2>
              <p className="text-xl mb-8 text-gray-200">
                Partner with Proton Security for comprehensive protection and peace of mind
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="btn-highlight text-lg px-8">
                    Request Consultation
                  </Button>
                </Link>
                <Link to="/services">
                  <Button size="lg" variant="outline" className="btn-outline-highlight text-lg px-8">
                    View Services
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary to-accent text-white p-4 rounded-full shadow-lg transition-transform duration-200 ${isChatOpen
          ? "scale-100"
          : (isBouncing
            ? "intermittent-bounce"
            : "hover:scale-110")
          }`}
        aria-label="Open Chat"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Box */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-[calc(100vw-48px)] md:max-w-md h-[420px] md:h-[500px] bg-primary border border-primary/30 rounded-2xl shadow-2xl flex flex-col">
          {/* Chat Header */}
          <div className="bg-primary border-b border-white/10 p-4 rounded-t-2xl flex justify-between items-center">
            <h3 className="font-semibold text-white">Proton Security AI</h3>
            <div className="flex gap-2">
              <button
                onClick={clearChat}
                className="text-white/80 hover:text-red-400 transition-colors p-1"
                title="Clear Chat History"
              >
                <Trash2 size={20} />
              </button>
              <button
                onClick={toggleChat}
                className="text-white/80 hover:text-white transition-colors text-xl font-bold"
                title="Close Chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={chatMessagesRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-primary">
            {messages.length === 0 ? (
              <p className="text-white/70 text-center italic text-sm">Ask me anything about our security services, training, or solutions!</p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2 ${message.sender === "user"
                      ? "bg-accent text-white"
                      : "bg-white/90 text-primary"
                      }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))
            )}
            {/* Loading Spinner */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/90 rounded-2xl px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-primary border-t border-white/10 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isThrottled ? "Please wait..." : "Type your message..."}
                className="flex-1 px-4 py-2 bg-white/90 text-primary placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
                disabled={isLoading || isThrottled}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim() || isThrottled}
                className="bg-accent text-white p-3 rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center"
                title={isThrottled ? "Waiting for request cooldown" : "Send Message"}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;