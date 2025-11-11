import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IKImage } from "imagekitio-react";
import { ping, tailChase } from "ldrs";
import {
  Camera,
  FileText,
  ImageIcon,
  Lightbulb,
  Plus,
  Scan,
  Send,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import model from "../lib/gemini";
import Upload from "./upload/Upload";

const IMG_PROMPT =
  "Look at this image carefully and analyze it well and do deep research, then give a detailed explanation about it, what is there in this image, tell its name and what else is it, what does it do, where does it belong to etc.";

export default function NewPrompt({ data }) {
  const [answer, setAnswer] = useState("");
  const [isSend, setSend] = useState(false);
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });
  const [activeMode, setActiveMode] = useState("general");

  useEffect(() => {
    tailChase.register();
    ping.register();
  }, []);

  const chat = model.startChat({
    history: data?.history
      ?.filter(({ role, parts }) => role && parts?.[0]?.text)
      .map(({ role, parts }) => ({ role, parts: [{ text: parts[0].text }] })),
  });

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [answer, img.dbData]);

  const lastPromptRef = useRef("");

  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: lastPromptRef.current,
          answer,
          img: img.dbData?.filePath,
        }),
      }).then((r) => r.json()),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["chat", data._id] }).then(() => {
        setAnswer("");
        setImg({ isLoading: false, error: "", dbData: {}, aiData: {} });
        setSend(false);
        lastPromptRef.current = "";
      }),
    onError: () => setSend(false),
  });

  const sendImage = async () => {
    setSend(true);
    try {
      let customPrompt = IMG_PROMPT;
      if (activeMode === "text") {
        customPrompt =
          "Focus on extracting and analyzing all text visible in this image. Identify fonts, languages, and provide a complete transcription. " +
          IMG_PROMPT;
      } else if (activeMode === "objects") {
        customPrompt =
          "Focus on identifying all objects in this image with high precision. List each object, its approximate position, and any relevant details. " +
          IMG_PROMPT;
      } else if (activeMode === "scene") {
        customPrompt =
          "Analyze the overall scene and context of this image. Describe the setting, environment, time of day, and the story this image tells. " +
          IMG_PROMPT;
      }

      lastPromptRef.current = customPrompt;

      const stream = await chat.sendMessageStream([img.aiData, customPrompt]);
      let acc = "";
      for await (const chunk of stream.stream) {
        acc += chunk.text();
        setAnswer(acc);
      }
      mutation.mutate();
    } catch (err) {
      console.error(err);
      setSend(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!img.dbData.filePath || isSend || img.isLoading) return;
    sendImage();
  };

  const analysisModes = [
    {
      id: "general",
      label: "General",
      icon: <Sparkles size={16} />,
      color: "violet",
    },
    { id: "text", label: "Text", icon: <FileText size={16} />, color: "blue" },
    {
      id: "objects",
      label: "Objects",
      icon: <Scan size={16} />,
      color: "green",
    },
    { id: "scene", label: "Scene", icon: <Camera size={16} />, color: "amber" },
  ];

  return (
    <>
      {!img.dbData.filePath && !answer && !isSend && (
        <div className="w-full max-w-2xl mx-auto mb-8 bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-4">
            <Lightbulb size={28} className="text-violet-600" />
          </div>
          <h3 className="text-xl font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            How to use DeepSnap
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Click the upload button below to select a photo, screenshot, or
            design mock‑up. Our AI will analyze objects, text, logos, colors
            &amp; scene context — then return a detailed narrative.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-lg mx-auto">
            {[
              {
                icon: <ImageIcon size={20} />,
                text: "Upload any image format",
              },
              { icon: <Zap size={20} />, text: "Get instant AI analysis" },
              { icon: <Scan size={20} />, text: "Identify objects & text" },
              { icon: <Camera size={20} />, text: "Understand visual context" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-3 rounded-lg bg-gray-50"
              >
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center mb-2 text-violet-600">
                  {item.icon}
                </div>
                <p className="text-xs text-gray-600 text-center">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {img.isLoading && (
        <div className="flex flex-col items-center justify-center py-10 bg-white rounded-2xl shadow-md p-8">
          <l-tail-chase
            size="60"
            stroke="4"
            stroke-length="0.15"
            bg-opacity="0.1"
            speed="1.3"
            color="#7c3aed"
          />
          <p className="mt-4 text-gray-600 animate-pulse">
            Uploading your image...
          </p>
        </div>
      )}

      {img.dbData.filePath && (
        <div className="w-full max-w-lg mx-auto mb-6 relative rounded-2xl overflow-hidden bg-white shadow-lg">
          <IKImage
            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
            path={img.dbData.filePath}
            width="100%"
            transformation={[{ width: 600 }]}
            alt="Selected upload"
            className="w-full h-auto"
          />
          <button
            onClick={() =>
              setImg({ isLoading: false, error: "", dbData: {}, aiData: {} })
            }
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-black/70 text-white backdrop-blur-sm hover:bg-black/90 transition-all"
            aria-label="Remove image"
          >
            <X size={16} />
          </button>

          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex justify-center gap-2">
              {analysisModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    activeMode === mode.id
                      ? `bg-${mode.color}-600 text-white`
                      : "bg-white/80 text-gray-800 hover:bg-white"
                  }`}
                >
                  {mode.icon}
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {answer && (
        <div className="bg-white shadow-md shadow-gray-200 rounded-2xl p-6 text-base leading-relaxed max-w-2xl mx-auto mb-6 prose prose-violet">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
              <Sparkles size={16} className="text-violet-600" />
            </div>
            <span className="font-medium text-violet-600">
              Analysis Results
            </span>
          </div>
          <Markdown>{answer}</Markdown>
        </div>
      )}

      <div ref={endRef} />

      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center gap-4 mt-6 mb-10"
      >
        <Link
          to="/dashboard"
          title="New image analysis"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white hover:shadow-lg hover:shadow-violet-200 transition-all duration-300"
        >
          <Plus size={24} />
        </Link>

        <Upload setImg={setImg} />

        <button
          type="submit"
          disabled={isSend || img.isLoading || !img.dbData.filePath}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-violet-200"
        >
          {isSend ? (
            <l-ping
              size="30"
              stroke="3"
              stroke-length="0.15"
              bg-opacity="0"
              speed="1.6"
              color="#fff"
            />
          ) : (
            <Send size={20} />
          )}
        </button>
      </form>
    </>
  );
}
