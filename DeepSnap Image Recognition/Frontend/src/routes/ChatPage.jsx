import { useEffect, useState, useRef } from "react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";
import { dotSpinner } from "ldrs";
import {
  Share2,
  Download,
  Copy,
  Bookmark,
  MoreHorizontal,
  Zap,
  Clock,
  Layers,
  Sparkles,
  ChevronDown,
  X,
} from "lucide-react";
import NewPrompt from "./NewPrompt";

export default function ChatPage() {
  useEffect(() => dotSpinner.register(), []);
  const chatId = useLocation().pathname.split("/").pop();
  const [activeTab, setActiveTab] = useState("analysis");
  const [showInfo, setShowInfo] = useState(true);
  const chatContainerRef = useRef(null);

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((r) => r.json()),
  });

  useEffect(() => {
    if (data && chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [data]);

  const analysisMetadata = {
    created: new Date().toISOString(),
    processingTime: "1.2s",
    confidence: "98.7%",
    modelVersion: "DeepSnap Vision v2.4",
    imageSize: "1.2MB",
    resolution: "1920x1080",
    format: "JPEG",
  };

  return (
    <div className="min-h-full flex flex-col bg-gray-50 pb-10">
      <header className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
        <div className="p-6 pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              DeepSnap Image Analysis
            </h1>

            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
                <Share2 size={18} />
              </button>
              <button className="p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
                <Download size={18} />
              </button>
              <button className="p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
                <Bookmark size={18} />
              </button>
              <button className="p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center border-b border-gray-200">
            <button
              onClick={() => setActiveTab("analysis")}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === "analysis"
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Analysis Results
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === "history"
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Analysis History
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === "settings"
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Settings
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          {isPending ? (
            <div className="flex items-center justify-center bg-white rounded-xl shadow-sm p-20">
              <div className="text-center">
                <l-dot-spinner
                  size="60"
                  stroke="4"
                  stroke-length="0.15"
                  bg-opacity="0.1"
                  speed="1.3"
                  color="#7c3aed"
                ></l-dot-spinner>
                <p className="mt-4 text-gray-600">Loading analysis data...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center bg-white rounded-xl shadow-sm p-10">
              <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg shadow-sm max-w-md">
                <p className="font-medium">Something went wrong!</p>
                <p className="text-sm mt-1">
                  We couldn't load your analysis data. Please try refreshing the
                  page.
                </p>
                <button className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors">
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {showInfo && (
                <div className="bg-gradient-to-r from-violet-600/10 to-indigo-600/10 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                      <Sparkles size={16} />
                    </div>
                    <p className="text-sm text-gray-700">
                      DeepSnap uses advanced AI to analyze images with 99.8%
                      accuracy. Try uploading different types of images!
                    </p>
                  </div>
                  <button
                    onClick={() => setShowInfo(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              <div ref={chatContainerRef} className=" overflow-y-auto p-6">
                <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                  {data?.history?.map((m, i) => (
                    <React.Fragment key={i}>
                      {m.img && (
                        <div className="mx-auto max-w-lg w-full rounded-2xl overflow-hidden shadow-md relative group">
                          <IKImage
                            urlEndpoint={
                              import.meta.env.VITE_IMAGE_KIT_ENDPOINT
                            }
                            path={m.img}
                            width="100%"
                            transformation={[{ width: 600 }]}
                            loading="lazy"
                            lqip={{ active: true, quality: 20 }}
                            className="w-full h-auto"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                            <div className="flex gap-2">
                              <button className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white transition-colors">
                                <Download size={16} />
                              </button>
                              <button className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white transition-colors">
                                <Copy size={16} />
                              </button>
                              <button className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white transition-colors">
                                <Share2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {m.role !== "user" && (
                        <div
                          className={`max-w-[90%] rounded-2xl shadow-md p-5 text-base leading-relaxed ${
                            m.role === "user"
                              ? "self-end bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                              : "bg-white border border-gray-100 text-gray-800"
                          }`}
                        >
                          <Markdown className="prose prose-violet max-w-none">
                            {m.parts?.[0]?.text || ""}
                          </Markdown>
                        </div>
                      )}
                    </React.Fragment>
                  ))}

                  {data && <NewPrompt data={data} />}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Analysis Details</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                  <Zap size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Processing Time</p>
                  <p className="font-medium">
                    {analysisMetadata.processingTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                  <Layers size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Model Version</p>
                  <p className="font-medium">{analysisMetadata.modelVersion}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="font-medium">
                    {new Date(analysisMetadata.created).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-gray-100">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Confidence</span>
                  <span className="text-sm font-medium">
                    {analysisMetadata.confidence}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 h-2 rounded-full"
                    style={{ width: analysisMetadata.confidence }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-gray-100">
                <button className="flex items-center justify-between w-full text-left">
                  <span className="text-sm font-medium">Image Properties</span>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>
                <div className="mt-2 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Size</span>
                    <span>{analysisMetadata.imageSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Resolution</span>
                    <span>{analysisMetadata.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Format</span>
                    <span>{analysisMetadata.format}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium mb-3">Related Analyses</h4>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Link
                    key={i}
                    to="/dashboard"
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-10 h-10 bg-gray-200 rounded-lg shrink-0"></div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        Image Analysis #{i}
                      </p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
