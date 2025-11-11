import {
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  Clock,
  Eye,
  ImageIcon,
  Layers,
  PauseCircle,
  Play,
  Search,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const sliderTexts = [
  "Identify objects & scenes in any image",
  "Extract text from photos & documents",
  "Recognize logos, landmarks & products",
  "Generate detailed image descriptions",
  "Analyze colors, faces & visual context",
];

const carouselImgs = [
  "/carousel1.png",
  "/carousel2.png",
  "/carousel3.png",
  "/carousel4.png",
];

const features = [
  {
    title: "Object Recognition",
    description:
      "Identify multiple objects in a single image with precise bounding boxes and confidence scores.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    ),
  },
  {
    title: "Text Extraction",
    description:
      "Extract and read text from images, including handwriting, printed text, and signs in multiple languages.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" x2="8" y1="13" y2="13" />
        <line x1="16" x2="8" y1="17" y2="17" />
        <line x1="10" x2="8" y1="9" y2="9" />
      </svg>
    ),
  },
  {
    title: "Scene Analysis",
    description:
      "Understand the context and setting of images, identifying locations, environments, and activities.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 22v-5l5-5 5 5-5 5z" />
        <path d="M9.5 14.5 16 8" />
        <path d="m17 2 5 5-5 5-5-5z" />
      </svg>
    ),
  },
  {
    title: "Logo Detection",
    description:
      "Identify brand logos and trademarks in images with high accuracy, even with partial visibility.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" x2="2" y1="8" y2="22" />
        <line x1="17.5" x2="9" y1="15" y2="15" />
      </svg>
    ),
  },
  {
    title: "Color Analysis",
    description:
      "Extract dominant colors and palettes from images, perfect for design and creative applications.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="13.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="10.5" r="2.5" />
        <circle cx="8.5" cy="7.5" r="2.5" />
        <circle cx="6.5" cy="12.5" r="2.5" />
        <path d="M12 22v-6" />
        <path d="M8 22h8" />
        <path d="M17.5 13a4.5 4.5 0 0 1-9 0v-1h9z" />
      </svg>
    ),
  },
  {
    title: "Face Detection",
    description:
      "Detect faces in images, including facial landmarks, expressions, and demographic attributes.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="8" cy="10" r="1" />
        <circle cx="16" cy="10" r="1" />
        <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    quote:
      "DeepSnap has revolutionized how we catalog our product images. The AI accurately identifies and tags thousands of items daily.",
    author: "Sarah Johnson",
    role: "E-commerce Manager",
    company: "RetailTech",
  },
  {
    quote:
      "As a photographer, I use DeepSnap to automatically organize my portfolio by scene type, dominant colors, and subject matter.",
    author: "Michael Chen",
    role: "Professional Photographer",
    company: "VisualStudio",
  },
  {
    quote:
      "The text extraction feature has saved our team countless hours of manual data entry from scanned documents.",
    author: "Priya Patel",
    role: "Operations Director",
    company: "DataFlow Solutions",
  },
];

export default function Homepage() {
  const [headlineIdx, setHIdx] = useState(0);
  const [slideIdx, setSlideIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("business");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const id = setInterval(
      () => setHIdx((i) => (i + 1) % sliderTexts.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setSlideIdx((i) => (i + 1) % carouselImgs.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      <section className="relative pt-16 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 -z-10"></div>

        <div className="absolute inset-0 overflow-hidden -z-10">
          <div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-violet-400/10 animate-pulse"
            style={{ animationDuration: "7s" }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-indigo-400/10 animate-pulse"
            style={{ animationDuration: "10s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-violet-300/5 animate-pulse"
            style={{ animationDuration: "15s" }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-6">
                <Sparkles size={16} />
                <span>AI-Powered Image Analysis</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Understand Any Image
                </span>
                <br />
                <span>With AI Vision</span>
              </h1>

              <div className="h-16 mb-8">
                <p
                  key={headlineIdx}
                  className="text-lg md:text-xl text-gray-600 animate-fade-in"
                >
                  {sliderTexts[headlineIdx]}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/dashboard"
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium text-lg shadow-lg shadow-violet-600/20 hover:shadow-xl hover:shadow-violet-600/30 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Try It Free</span>
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="#how-it-works"
                  className="px-8 py-3 rounded-full border border-gray-300 text-gray-700 font-medium text-lg hover:border-violet-400 hover:text-violet-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Learn More</span>
                  <ChevronDown size={18} />
                </a>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-8 mt-8">
                <div className="flex -space-x-2">
                  {[Camera, ImageIcon, Eye, Search].map((Icon, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-violet-100 flex items-center justify-center"
                    >
                      <Icon size={14} className="text-violet-600" />
                    </div>
                  ))}
                </div>

                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">2,500+</span>{" "}
                  users analyzing images daily
                </p>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-violet-600/20 border-4 border-white relative">
                {carouselImgs.map((src, i) => (
                  <img
                    key={src}
                    src={src || "/placeholder.svg"}
                    alt={`AI vision analysis example ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      i === slideIdx ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className="absolute top-[20%] left-[30%] w-16 h-16 rounded-full border-2 border-violet-500 opacity-80 animate-ping"
                    style={{ animationDuration: "3s" }}
                  ></div>
                  <div
                    className="absolute top-[60%] left-[70%] w-12 h-12 rounded-full border-2 border-indigo-500 opacity-80 animate-ping"
                    style={{ animationDuration: "2.5s" }}
                  ></div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm text-white p-3 rounded-lg text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                      <span>AI Analysis Active</span>
                    </div>
                    <div className="text-xs text-white/70">
                      Confidence: 98.7%
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {carouselImgs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIdx(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === slideIdx
                        ? "bg-violet-600 w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={toggleVideo}
                className="absolute -bottom-5 right-5 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg text-violet-600 hover:bg-violet-50 transition-colors"
              >
                {isVideoPlaying ? (
                  <PauseCircle size={18} />
                ) : (
                  <Play size={18} />
                )}
                <span className="font-medium">Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden">
            <button
              onClick={toggleVideo}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X size={20} />
            </button>
            <video
              ref={videoRef}
              controls
              autoPlay
              className="w-full aspect-video"
            >
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-gray-500 mb-8">
            Trusted by innovative companies worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[
              "Company 1",
              "Company 2",
              "Company 3",
              "Company 4",
              "Company 5",
            ].map((company, i) => (
              <div key={i} className="h-8 w-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                value: "99.8%",
                label: "Recognition Accuracy",
                icon: <Zap size={24} />,
              },
              {
                value: "300ms",
                label: "Average Response Time",
                icon: <Clock size={24} />,
              },
              {
                value: "50+",
                label: "Supported Languages",
                icon: <Layers size={24} />,
              },
              {
                value: "10M+",
                label: "Images Analyzed Daily",
                icon: <ImageIcon size={24} />,
              },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 mb-3">
                  {stat.icon}
                </div>
                <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-gray-600 mt-2">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4">
              <Sparkles size={16} />
              <span>Advanced Capabilities</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful AI Vision Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              DeepSnap combines multiple computer vision technologies to provide
              comprehensive image analysis capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100 group"
              >
                <div className="w-12 h-12 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 bg-gradient-to-br from-violet-600 to-indigo-600 text-white"
        id="how-it-works"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4 backdrop-blur-sm">
              <Sparkles size={16} />
              <span>Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How DeepSnap Works
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Our advanced AI vision system processes images in three simple
              steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Upload Your Image",
                description:
                  "Upload any image from your device or paste a URL. We support JPG, PNG, WebP and more.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                    <path d="m9 15 3-3 3 3" />
                    <path d="M14 5v6" />
                  </svg>
                ),
              },
              {
                step: "2",
                title: "AI Analysis",
                description:
                  "Our neural networks analyze every pixel, identifying objects, text, colors, and context.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2H2v10h10V2Z" />
                    <path d="M22 12h-4v4h-4v4H2v2h12v-4h4v-4h4v-2Z" />
                    <path d="M18 2h4v4" />
                    <path d="M18 6 9 15" />
                  </svg>
                ),
              },
              {
                step: "3",
                title: "Get Results",
                description:
                  "Receive a detailed analysis with object labels, text extraction, and contextual information.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="m9 11 3 3L22 4" />
                  </svg>
                ),
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center relative group hover:bg-white/15 transition-colors"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-white text-violet-600 flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <div className="w-16 h-16 rounded-full bg-white text-violet-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/dashboard"
              className="px-8 py-3 rounded-full bg-white text-violet-600 font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
            >
              <span>Try DeepSnap Now</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4">
              <Sparkles size={16} />
              <span>Versatile Applications</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Use Cases</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              DeepSnap powers image understanding across industries and
              applications
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full bg-gray-100 p-1">
              {[
                { id: "business", label: "Business" },
                { id: "developers", label: "Developers" },
                { id: "personal", label: "Personal Use" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-white shadow-md text-violet-600"
                      : "text-gray-600 hover:text-violet-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === "business" &&
              [
                "E-commerce product categorization",
                "Content moderation for social platforms",
                "Automated document processing",
                "Visual search for retail",
                "Brand logo monitoring",
                "Real estate image analysis",
              ].map((useCase, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center mr-3">
                      <Check size={16} />
                    </div>
                    <span className="text-gray-800">{useCase}</span>
                  </div>
                </div>
              ))}

            {activeTab === "developers" &&
              [
                "Computer vision API integration",
                "Automated image tagging",
                "Accessibility improvements",
                "Content recommendation engines",
                "Image metadata enrichment",
                "Visual search implementation",
              ].map((useCase, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3">
                      <Check size={16} />
                    </div>
                    <span className="text-gray-800">{useCase}</span>
                  </div>
                </div>
              ))}

            {activeTab === "personal" &&
              [
                "Photo organization and search",
                "Text extraction from receipts",
                "Identifying plants and objects",
                "Nutritional information from food photos",
                "Fashion and style recommendations",
                "Travel landmark identification",
              ].map((useCase, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                      <Check size={16} />
                    </div>
                    <span className="text-gray-800">{useCase}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4">
              <Sparkles size={16} />
              <span>Success Stories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Thousands of businesses and developers trust DeepSnap for their
              image analysis needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 text-violet-500">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block w-5 h-5 mr-1"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles size={16} />
            <span>Get Started Today</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Unlock the Power of AI Vision?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are transforming how they work with
            images using DeepSnap.
          </p>
          <Link
            to="/dashboard"
            className="px-8 py-4 rounded-full bg-white text-violet-600 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
          >
            <span>Get Started for Free</span>
            <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-white/70">No credit card required</p>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 overflow-hidden">
                  <img
                    src="/logo.png"
                    alt="DeepSnap logo"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <span className="text-xl font-bold">DeepSnap</span>
              </div>
              <p className="text-gray-400 mb-4">
                Advanced AI image recognition for everyone. Analyze, understand,
                and extract insights from any image.
              </p>
              <div className="flex gap-4">
                {[
                  {
                    href: "https://x.com/Nitesh75411",
                    icon: "/twitter.png",
                    label: "Twitter",
                  },
                  {
                    href: "https://www.linkedin.com/in/nitesh-bhagat-420425182",
                    icon: "/linkedin.png",
                    label: "LinkedIn",
                  },
                  {
                    href: "https://github.com/Nitesh20-ab",
                    icon: "/github.png",
                    label: "GitHub",
                  },
                ].map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <img
                      src={social.icon || "/placeholder.svg"}
                      alt=""
                      className="w-6 h-6"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                {[
                  "Features",
                  "Pricing",
                  "API",
                  "Documentation",
                  "Examples",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {["About Us", "Blog", "Careers", "Press", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for the latest updates and features.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-r-lg bg-violet-600 hover:bg-violet-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} DeepSnap AI. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
