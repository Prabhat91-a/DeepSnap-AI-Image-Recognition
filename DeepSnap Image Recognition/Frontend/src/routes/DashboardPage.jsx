import { tailChase } from "ldrs";
import {
  BarChart3,
  Camera,
  ChevronRight,
  Clock,
  FileText,
  Image,
  ImageIcon,
  Plus,
  Scan,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_PROMPT =
  "Hello AI, I will send you some images about which you will have to research and then give detailed information about it.";

export default function DashboardPage() {
  const nav = useNavigate();
  const once = useRef(false);
  const [isCreating, setIsCreating] = useState(false);
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [stats, setStats] = useState({
    totalAnalyses: 0,
    thisWeek: 0,
    avgConfidence: "0%",
  });

  useEffect(() => tailChase.register(), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRecentAnalyses([
        {
          id: 1,
          title: "Product Image Analysis",
          date: "2 hours ago",
          type: "product",
          confidence: 98.2,
        },
        {
          id: 2,
          title: "Document Text Extraction",
          date: "Yesterday",
          type: "document",
          confidence: 95.7,
        },
        {
          id: 3,
          title: "Landscape Scene Analysis",
          date: "3 days ago",
          type: "scene",
          confidence: 99.1,
        },
        {
          id: 4,
          title: "Logo Recognition",
          date: "1 week ago",
          type: "logo",
          confidence: 97.4,
        },
      ]);

      setStats({
        totalAnalyses: 27,
        thisWeek: 8,
        avgConfidence: "97.6%",
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (once.current) return;
    once.current = true;
    (async () => {
      try {
        setIsCreating(true);
        const id = await fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: INITIAL_PROMPT }),
        }).then((r) => r.json());

        nav(`/dashboard/chats/${id}`);
      } catch (err) {
        console.error(err);
        setIsCreating(false);
      }
    })();
  }, [nav]);

  if (isCreating) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800 px-4">
        <div className="text-center space-y-6 max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="font-bold text-2xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Preparing Your Workspace
          </h2>

          <div className="flex justify-center">
            <l-tail-chase
              size="60"
              stroke="4"
              stroke-length="0.15"
              bg-opacity="0.1"
              speed="1.3"
              color="#7c3aed"
            ></l-tail-chase>
          </div>

          <p className="text-gray-600">
            DeepSnap is creating a new analysis session for you. You'll be able
            to upload images for AI analysis in just a moment.
          </p>

          <div className="pt-4 flex justify-center">
            <div className="w-full max-w-xs bg-violet-50 rounded-lg p-3 border border-violet-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                  <Sparkles size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-violet-800">
                    AI Model Loading
                  </p>
                  <p className="text-xs text-violet-600">
                    Initializing DeepSnap Vision v2.4
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <header className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              DeepSnap Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Analyze images with AI and get detailed insights
            </p>
          </div>

          <button
            onClick={() => nav("/dashboard/chats/new")}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg hover:shadow-md transition-shadow"
          >
            <Plus size={18} />
            <span>New Analysis</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Analyses"
          value={stats.totalAnalyses}
          icon={<BarChart3 size={20} />}
          color="violet"
        />
        <StatCard
          title="This Week"
          value={stats.thisWeek}
          icon={<Clock size={20} />}
          color="indigo"
        />
        <StatCard
          title="Avg. Confidence"
          value={stats.avgConfidence}
          icon={<Zap size={20} />}
          color="purple"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Analysis Types</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AnalysisTypeCard
            title="Object Detection"
            description="Identify objects in images"
            icon={<Scan size={24} />}
            color="violet"
          />
          <AnalysisTypeCard
            title="Text Extraction"
            description="Extract text from images"
            icon={<FileText size={24} />}
            color="indigo"
          />
          <AnalysisTypeCard
            title="Scene Analysis"
            description="Understand visual context"
            icon={<Camera size={24} />}
            color="purple"
          />
          <AnalysisTypeCard
            title="Image Classification"
            description="Categorize image content"
            icon={<Image size={24} />}
            color="fuchsia"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Analyses</h2>
          <button className="text-sm text-violet-600 hover:text-violet-700 flex items-center gap-1">
            <span>View all</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {recentAnalyses.length === 0 ? (
          <div className="flex items-center justify-center py-10 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-3">
                <ImageIcon size={24} className="text-violet-600" />
              </div>
              <p className="text-gray-600">No analyses yet</p>
              <button
                onClick={() => nav("/dashboard/chats/new")}
                className="mt-3 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 transition-colors"
              >
                Start your first analysis
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {recentAnalyses.map((analysis) => (
              <div
                key={analysis.id}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                onClick={() => nav(`/dashboard/chats/${analysis.id}`)}
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-${getAnalysisColor(
                    analysis.type
                  )}-100 flex items-center justify-center text-${getAnalysisColor(
                    analysis.type
                  )}-600`}
                >
                  {getAnalysisIcon(analysis.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{analysis.title}</p>
                  <p className="text-sm text-gray-500">{analysis.date}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {analysis.confidence.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500">Confidence</div>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl shadow-sm p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
            <Sparkles size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">AI Analysis Tips</h3>
            <p className="text-white/80 mb-4">
              Get the most accurate results with these tips:
            </p>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">
                  1
                </div>
                <span>
                  Use high-resolution images for better object detection
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">
                  2
                </div>
                <span>Ensure good lighting for text extraction</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">
                  3
                </div>
                <span>
                  Try different analysis modes for comprehensive results
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-full bg-${color}-100 flex items-center justify-center text-${color}-600`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function AnalysisTypeCard({ title, description, icon, color }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div
        className={`w-12 h-12 rounded-full bg-${color}-100 flex items-center justify-center text-${color}-600 mb-3`}
      >
        {icon}
      </div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}

function getAnalysisIcon(type) {
  switch (type) {
    case "product":
      return <ImageIcon size={24} />;
    case "document":
      return <FileText size={24} />;
    case "scene":
      return <Camera size={24} />;
    case "logo":
      return <Scan size={24} />;
    default:
      return <ImageIcon size={24} />;
  }
}

function getAnalysisColor(type) {
  switch (type) {
    case "product":
      return "violet";
    case "document":
      return "indigo";
    case "scene":
      return "purple";
    case "logo":
      return "fuchsia";
    default:
      return "violet";
  }
}
