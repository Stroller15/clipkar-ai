"use client"
import React, { useState } from "react";
import {
  Video,
  Wand2,
  Clock,
  Layout,
  ChevronRight,
  Sparkles,
  Play,
} from "lucide-react";
import Link from "next/link";

function App() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-[#eef3fe] text-[#01040c] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2147ee] rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#f04cf1] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#d486f6] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          {/* Hero Section */}
          <div className="text-center relative z-10">
            <div className="inline-block">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-[#2147ee]/10 to-[#f04cf1]/10 text-[#2147ee] mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Video Creation
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#2147ee] via-[#d486f6] to-[#f04cf1] leading-tight">
              Transform Your Ideas
              <br />
              Into Stunning Videos
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Create professional videos in minutes with our advanced AI
              technology. No editing experience needed.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/dashboard">
                <button className="bg-[#2147ee] text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-[#2147ee]/25">
                  Start Creating
                  <ChevronRight className="w-5 h-5" />
                </button>
              </Link>

              <button className="bg-white text-[#2147ee] px-8 py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition-all flex items-center gap-2 shadow-lg">
                Watch Demo
                <Play className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Video Preview */}
          <div className="mt-20 relative">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="aspect-video bg-gradient-to-br from-[#2147ee] to-[#f04cf1] p-1">
                <div className="bg-black rounded-2xl h-full flex items-center justify-center relative">
                  <Video className="w-20 h-20 text-white/50" />
                  {isHovered && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4">
                      <button className="bg-white/20 hover:bg-white/30 p-4 rounded-full backdrop-blur-sm transition-all">
                        <Play className="w-8 h-8 text-white" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-24 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Layout,
                title: "Smart Templates",
                description:
                  "Choose from AI-curated templates tailored to your content type and goals.",
              },
              {
                icon: Wand2,
                title: "Magic Editor",
                description:
                  "Our AI automatically enhances your video with perfect transitions and effects.",
              },
              {
                icon: Clock,
                title: "Instant Creation",
                description:
                  "Generate professional videos in minutes, not hours. Save time and resources.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-lg p-8 rounded-3xl hover:bg-gradient-to-br from-[#2147ee] to-[#f04cf1] transition-all duration-500 hover:scale-105"
              >
                <div className="bg-[#2147ee]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20">
                  <feature.icon className="w-8 h-8 text-[#2147ee] group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-white/90">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-24 text-center">
            <div className="bg-gradient-to-br from-[#2147ee] to-[#f04cf1] p-12 rounded-3xl">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Create Your First AI Video?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of creators who are already using our platform to
                create stunning videos effortlessly.
              </p>
              <button className="bg-white text-[#2147ee] px-8 py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition-all flex items-center gap-2 mx-auto">
                Get Started Free
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
