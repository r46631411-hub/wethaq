import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChevronRight, Mic } from "lucide-react";
import { useState } from "react";

/**
 * واجهة أوامر صوتية جاهزة
 * قائمة فيها أوامر مثل: "اقرأ المستند"، "اختصر العقد"، "إيش المطلوب مني؟" والضغط يعطي رد جاهز.
 */
export default function WethaqVoiceCommandsPage() {
  const [, setLocation] = useLocation();
  const [selectedCommand, setSelectedCommand] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const commands = [
    {
      id: 1,
      command: "اقرأ المستند",
      icon: "📖",
      response:
        "جاري قراءة محتوى المستند لك. هذا المستند يحتوي على شروط وأحكام الخدمة.",
    },
    {
      id: 2,
      command: "اختصر العقد",
      icon: "📝",
      response:
        "ملخص العقد: هذا العقد يتضمن شروط الخدمة وحقوق والتزامات الطرفين. المدة: سنة واحدة.",
    },
    {
      id: 3,
      command: "إيش المطلوب مني؟",
      icon: "❓",
      response:
        "المطلوب منك: 1) قراءة المستند بعناية 2) التحقق من بيانات الهوية 3) التوقيع على المستند.",
    },
    {
      id: 4,
      command: "ما هي خطوات التوقيع؟",
      icon: "✍️",
      response:
        "خطوات التوقيع: أولاً، مراجعة المستند. ثانياً، التحقق عبر نفاذ. ثالثاً، توقيع المستند.",
    },
    {
      id: 5,
      command: "هل المستند آمن؟",
      icon: "🔒",
      response:
        "نعم، المستند محمي بتشفير عالي المستوى وتوقيع رقمي معترف به قانونياً.",
    },
    {
      id: 6,
      command: "ما هي المتطلبات؟",
      icon: "📋",
      response:
        "المتطلبات: هوية وطنية صحيحة، رقم هاتف نشط، بريد إلكتروني صحيح.",
    },
  ];

  const handleCommandClick = (cmd: any) => {
    setSelectedCommand(cmd.command);
    setResponse(cmd.response);
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
        <h1 className="text-xl font-bold">الأوامر الصوتية</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 text-center">
            اختر أمراً صوتياً
          </h2>
          <p className="text-gray-600 text-center mb-8">
            اضغط على الأمر لسماع الإجابة
          </p>

          {/* Response Area */}
          {response && (
            <div className="mb-8 p-6 bg-[#F5F5F5] border border-[#E0E0E0] rounded-lg">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1B5E20] to-[#0D3B2C] rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <span className="text-lg">🤖</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#1A1A1A] mb-2">
                    الإجابة:
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {response}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  /* Play audio response */
                }}
                className="flex items-center gap-2 text-[#0288D1] font-medium text-sm hover:underline"
              >
                <span>🔊</span>
                استمع للإجابة
              </button>
            </div>
          )}

          {/* Commands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={() => handleCommandClick(cmd)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 text-right ${
                  selectedCommand === cmd.command
                    ? "border-[#1B5E20] bg-green-50"
                    : "border-[#E0E0E0] bg-white hover:border-[#1B5E20] hover:bg-green-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{cmd.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-[#1A1A1A]">
                      {cmd.command}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#E0E0E0] p-6 bg-white">
        <Button
          onClick={() => setLocation("/wethaq-preview")}
          className="w-full py-3 bg-[#1B5E20] hover:bg-[#0D3B2C] text-white font-bold rounded-lg transition-all duration-300"
        >
          العودة
        </Button>
      </div>
    </div>
  );
}
