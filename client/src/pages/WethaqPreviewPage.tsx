import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChevronRight, Volume2, ArrowRight } from "lucide-react";

/**
 * واجهة معاينة المستند
 * عرض المستند قبل التوقيع مع زرين: تشغيل المساعد الصوتي – متابعة للتحقق عبر نفاذ.
 */
export default function WethaqPreviewPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <div className="bg-gradient-to-r from-[#1B5E20] to-[#0D3B2C] text-white p-6 flex items-center gap-4">
        <button
          onClick={() => setLocation("/wethaq-upload")}
          className="hover:bg-white/20 p-2 rounded-lg transition-colors"
        >
          <ChevronRight size={24} />
        </button>
        <h1 className="text-xl font-bold">معاينة المستند</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col min-h-[calc(100vh-120px)]">
        {/* Progress indicator */}
        <div className="w-full max-w-4xl mx-auto px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 h-1 bg-[#1B5E20] rounded-full"></div>
            <div className="flex-1 h-1 bg-[#1B5E20] rounded-full mx-2"></div>
            <div className="flex-1 h-1 bg-[#E0E0E0] rounded-full"></div>
          </div>
          <p className="text-center text-sm text-gray-600">الخطوة 3 من 3</p>
        </div>

        {/* Document Preview */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
          <div className="w-full max-w-2xl">
            {/* Document Container */}
            <div className="bg-white border border-[#E0E0E0] rounded-lg shadow-lg p-8 mb-8">
              <div className="bg-[#F5F5F5] rounded-lg p-12 text-center min-h-96 flex flex-col items-center justify-center">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
                  معاينة المستند
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  sample-document.pdf
                </p>
                <p className="text-gray-500 text-xs max-w-xs">
                  هذا مثال على معاينة المستند. في التطبيق الفعلي، سيتم عرض محتوى PDF هنا.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Voice Assistant Button */}
              <Button
                onClick={() => setLocation("/wethaq-voice-assistant")}
                className="w-full py-4 bg-[#0288D1] hover:bg-[#01579B] text-white font-bold text-lg rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Volume2 size={20} />
                تشغيل المساعد الصوتي
              </Button>

              {/* Continue Button */}
              <Button
                onClick={() => setLocation("/nafath-send-code")}
                className="w-full py-4 bg-[#1B5E20] hover:bg-[#0D3B2C] text-white font-bold text-lg rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                متابعة للتحقق
                <ArrowRight size={20} />
              </Button>
            </div>

            {/* Info Box */}
            <div className="mt-8 p-4 bg-green-50 border border-[#1B5E20] rounded-lg">
              <p className="text-sm text-[#1B5E20] text-center">
                <span className="font-semibold">✓</span> تم تحميل المستند بنجاح وجاهز للتوقيع
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
