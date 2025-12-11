import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChevronRight, Upload, FileText } from "lucide-react";

/**
 * واجهة الاختيار (رفع مستند / مستنداتي)
 * زرين: رفع مستند جديد – عرض المستندات السابقة.
 */
export default function WethaqChoicePage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <div className="bg-gradient-to-r from-[#1B5E20] to-[#0D3B2C] text-white p-6 flex items-center gap-4">
        <button
          onClick={() => setLocation("/wethaq-description")}
          className="hover:bg-white/20 p-2 rounded-lg transition-colors"
        >
          <ChevronRight size={24} />
        </button>
        <h1 className="text-xl font-bold">اختر الخيار</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-6">
        {/* Progress indicator */}
        <div className="w-full max-w-md mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 h-1 bg-[#1B5E20] rounded-full"></div>
            <div className="flex-1 h-1 bg-[#E0E0E0] rounded-full mx-2"></div>
            <div className="flex-1 h-1 bg-[#E0E0E0] rounded-full"></div>
          </div>
          <p className="text-center text-sm text-gray-600">الخطوة 1 من 3</p>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 text-center">
          ماذا تريد أن تفعل؟
        </h2>
        <p className="text-gray-600 text-center mb-12">
          اختر بين رفع مستند جديد أو عرض مستنداتك السابقة
        </p>

        {/* Options */}
        <div className="w-full max-w-md space-y-4">
          {/* Upload New Document */}
          <button
            onClick={() => setLocation("/wethaq-upload")}
            className="w-full group"
          >
            <div className="bg-white border-2 border-[#1B5E20] rounded-2xl p-8 text-center transition-all duration-300 group-hover:bg-[#F5F5F5] group-hover:shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1B5E20] to-[#0D3B2C] rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Upload size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
                رفع مستند جديد
              </h3>
              <p className="text-gray-600 text-sm">
                اختر ملف PDF أو صورة لتوقيعها
              </p>
            </div>
          </button>

          {/* View Previous Documents */}
          <button
            onClick={() => {}}
            className="w-full group"
          >
            <div className="bg-white border-2 border-[#0288D1] rounded-2xl p-8 text-center transition-all duration-300 group-hover:bg-blue-50 group-hover:shadow-lg opacity-50 cursor-not-allowed">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0288D1] to-[#01579B] rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FileText size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
                مستنداتي السابقة
              </h3>
              <p className="text-gray-600 text-sm">
                عرض المستندات التي وقعتها سابقاً
              </p>
              <p className="text-xs text-gray-400 mt-2">(لم تقم بتوقيع أي مستندات بعد)</p>
            </div>
          </button>
        </div>

        {/* Info Box */}
        <div className="w-full max-w-md mt-12 p-4 bg-blue-50 border border-[#0288D1] rounded-lg">
          <p className="text-sm text-[#0288D1] text-center">
            <span className="font-semibold">ملاحظة:</span> يمكنك رفع ملفات PDF أو صور بصيغة JPG و PNG
          </p>
        </div>
      </div>
    </div>
  );
}
