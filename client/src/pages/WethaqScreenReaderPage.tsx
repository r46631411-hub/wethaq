import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChevronRight, Volume2, Pause, Play, SkipForward } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * واجهة القراءة للمكفوفين
 * تشغيل تلقائي لقراءة نص المستند صوتياً، مع أزرار: إعادة – إيقاف – التالي، وتفعيل عن طريق زر الهوم (محاكاة Siri).
 */
export default function WethaqScreenReaderPage() {
  const [, setLocation] = useLocation();
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(35);

  const documentText = `هذا المستند يحتوي على شروط وأحكام الخدمة. 
يجب عليك قراءة هذا المستند بعناية قبل التوقيع عليه. 
جميع البيانات المدرجة في هذا المستند سرية وآمنة. 
التوقيع على هذا المستند يعني موافقتك على جميع الشروط والأحكام المذكورة.`;

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 1 : 100));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

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
        <h1 className="text-xl font-bold">قراءة المستند</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Speaker Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#1B5E20] to-[#0D3B2C] rounded-full flex items-center justify-center text-white shadow-lg">
              <Volume2 size={40} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 text-center">
            جاري قراءة المستند
          </h2>
          <p className="text-gray-600 text-center mb-8">
            استمع إلى محتوى المستند
          </p>

          {/* Document Preview */}
          <div className="bg-[#F5F5F5] rounded-lg p-6 mb-8 text-sm text-gray-700 leading-relaxed text-right">
            {documentText}
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-[#E0E0E0] rounded-full h-2 overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-[#1B5E20] to-[#0D3B2C] h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 text-center">{progress}%</p>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-3 mb-8">
            {/* Restart Button */}
            <Button
              onClick={() => setProgress(0)}
              className="flex-1 py-3 bg-white border-2 border-[#E0E0E0] text-[#1A1A1A] font-bold rounded-lg hover:bg-[#F5F5F5] transition-all duration-300"
            >
              إعادة
            </Button>

            {/* Play/Pause Button */}
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex-1 py-3 bg-[#0288D1] hover:bg-[#01579B] text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isPlaying ? (
                <>
                  <Pause size={20} />
                  إيقاف
                </>
              ) : (
                <>
                  <Play size={20} />
                  تشغيل
                </>
              )}
            </Button>

            {/* Next Button */}
            <Button
              onClick={() => setProgress(Math.min(progress + 10, 100))}
              className="flex-1 py-3 bg-white border-2 border-[#E0E0E0] text-[#1A1A1A] font-bold rounded-lg hover:bg-[#F5F5F5] transition-all duration-300"
            >
              التالي
            </Button>
          </div>

          {/* Status */}
          <div className="p-4 bg-green-50 border border-[#1B5E20] rounded-lg mb-8 text-center">
            <p className="text-sm text-[#1B5E20]">
              <span className="font-semibold">✓</span> يمكنك أيضاً استخدام أوامر صوتية
            </p>
          </div>

          {/* Close Button */}
          <Button
            onClick={() => setLocation("/wethaq-preview")}
            className="w-full py-3 bg-[#1B5E20] hover:bg-[#0D3B2C] text-white font-bold rounded-lg transition-all duration-300"
          >
            إغلاق القارئ
          </Button>
        </div>
      </div>

      {/* Accessibility Note */}
      <div className="bg-blue-50 border-t border-[#0288D1] p-4 text-center">
        <p className="text-xs text-[#0288D1]">
          <span className="font-semibold">ملاحظة:</span> اضغط على زر الهوم مرتين للتفاعل مع المساعد الصوتي
        </p>
      </div>
    </div>
  );
}
