import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChevronRight, Mic, Volume2, X } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * واجهة تشغيل المساعد الصوتي
 * موجات صوت متحركة، زر مايك، نص "تحدث الآن"، فقاعة سؤال وفقاعة جواب لمحاكاة الذكاء.
 */
export default function WethaqVoiceAssistantPage() {
  const [, setLocation] = useLocation();
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState<
    Array<{ type: "question" | "answer"; text: string }>
  >([
    {
      type: "answer",
      text: "مرحباً! أنا المساعد الصوتي لخدمة وِثاق. كيف يمكنني مساعدتك؟",
    },
  ]);

  const handleMicClick = () => {
    setIsListening(true);
    // Simulate listening
    setTimeout(() => {
      setIsListening(false);
      // Add user question
      setConversation((prev) => [
        ...prev,
        { type: "question", text: "ما هي خطوات التوقيع؟" },
      ]);
      // Add assistant answer
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            type: "answer",
            text: "خطوات التوقيع بسيطة: أولاً، تحميل المستند. ثانياً، مراجعة محتوى المستند. ثالثاً، التحقق عبر نفاذ. رابعاً، توقيع المستند.",
          },
        ]);
      }, 1500);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with back button */}
      <div className="bg-gradient-to-r from-[#1B5E20] to-[#0D3B2C] text-white p-6 flex items-center gap-4">
        <button
          onClick={() => setLocation("/wethaq-preview")}
          className="hover:bg-white/20 p-2 rounded-lg transition-colors"
        >
          <ChevronRight size={24} />
        </button>
        <h1 className="text-xl font-bold">المساعد الصوتي</h1>
      </div>

      {/* Conversation Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === "question" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl ${
                msg.type === "question"
                  ? "bg-[#1B5E20] text-white rounded-br-none"
                  : "bg-[#F5F5F5] text-[#1A1A1A] rounded-bl-none border border-[#E0E0E0]"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}

        {isListening && (
          <div className="flex justify-center">
            <div className="flex items-center gap-2 bg-blue-50 px-6 py-3 rounded-full border border-[#0288D1]">
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-1 bg-[#0288D1] rounded-full animate-pulse"
                    style={{
                      height: `${20 + i * 8}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  ></div>
                ))}
              </div>
              <span className="text-sm text-[#0288D1] font-medium">
                جاري الاستماع...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Voice Input Area */}
      <div className="border-t border-[#E0E0E0] p-6 bg-white">
        <div className="flex flex-col items-center gap-6">
          {/* Microphone Button with Wave Animation */}
          <div className="relative flex items-center justify-center">
            {/* Wave circles */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`absolute border-2 border-[#0288D1] rounded-full ${
                  isListening ? "animate-ping" : ""
                }`}
                style={{
                  width: `${80 + i * 40}px`,
                  height: `${80 + i * 40}px`,
                  opacity: 0.3 - i * 0.1,
                  animationDuration: `${2 - i * 0.5}s`,
                }}
              ></div>
            ))}

            {/* Main button */}
            <button
              onClick={handleMicClick}
              disabled={isListening}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${
                isListening
                  ? "bg-[#0288D1] shadow-lg"
                  : "bg-gradient-to-br from-[#1B5E20] to-[#0D3B2C] hover:shadow-lg"
              }`}
            >
              <Mic size={32} />
            </button>
          </div>

          {/* Text prompt */}
          <div className="text-center">
            <p className="text-lg font-bold text-[#1A1A1A]">
              {isListening ? "جاري الاستماع..." : "تحدث الآن"}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {isListening ? "اضغط الزر للتوقف" : "اضغط الزر للبدء"}
            </p>
          </div>

          {/* Close Button */}
          <Button
            onClick={() => setLocation("/wethaq-preview")}
            className="w-full py-3 bg-white border-2 border-[#E0E0E0] text-[#1A1A1A] font-bold rounded-lg hover:bg-[#F5F5F5] transition-all duration-300"
          >
            إغلاق المساعد الصوتي
          </Button>
        </div>
      </div>
    </div>
  );
}
