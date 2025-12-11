import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChevronRight, Download } from "lucide-react";

/**
 * واجهة المستند المختوم
 * عرض المستند مرة أخرى مع ختم وِثاق واضح، خاتم دائري مكتوب عليه "وِثاق – موثّق رقمياً"، وزر تحميل المستند.
 */
export default function WethaqSealedPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <div className="bg-gradient-to-r from-[#1B5E20] to-[#0D3B2C] text-white p-6 flex items-center gap-4">
        <button
          onClick={() => setLocation("/wethaq-signature")}
          className="hover:bg-white/20 p-2 rounded-lg transition-colors"
        >
          <ChevronRight size={24} />
        </button>
        <h1 className="text-xl font-bold">المستند المختوم</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-6">
        <div className="w-full max-w-2xl">
          {/* Document Container */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg shadow-lg p-8 mb-8 relative">
            {/* Document Content */}
            <div className="bg-[#F5F5F5] rounded-lg p-12 text-center min-h-96 flex flex-col items-center justify-center mb-8">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
                المستند الموثق
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                sample-document.pdf
              </p>
              <p className="text-gray-500 text-xs max-w-xs">
                هذا المستند تم توقيعه وتوثيقه رقمياً بنجاح
              </p>
            </div>

            {/* Wethaq Seal - Positioned absolutely */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
              <div className="w-48 h-48 rounded-full border-4 border-[#1B5E20] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#1B5E20] mb-2">و</div>
                  <p className="text-[#1B5E20] font-bold text-sm">وِثاق</p>
                  <p className="text-[#1B5E20] text-xs mt-1">موثّق رقمياً</p>
                </div>
              </div>
            </div>

            {/* Signature Details */}
            <div className="border-t border-[#E0E0E0] pt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">الموقع:</span>
                <span className="font-semibold text-[#1A1A1A]">عبد العزيز محمد المقحاني</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">رقم الهوية:</span>
                <span className="font-semibold text-[#1A1A1A]">1234567890</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">تاريخ التوقيع:</span>
                <span className="font-semibold text-[#1A1A1A]">2024-12-08 06:35</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">بصمة المستند:</span>
                <span className="font-semibold text-[#1A1A1A] text-xs font-mono">
                  A3F2B1C9...
                </span>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-green-50 border border-[#1B5E20] rounded-lg p-6 mb-8 text-center">
            <p className="text-lg font-bold text-[#1B5E20] mb-2">✓ تم التوقيع بنجاح</p>
            <p className="text-sm text-gray-700">
              تم توقيع المستند وتوثيقه رقمياً بنجاح. يمكنك الآن تحميل المستند أو الانتقال إلى الخطوة التالية.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Download Button */}
            <Button
              onClick={() => {
                /* Download logic */
              }}
              className="w-full py-4 bg-[#0288D1] hover:bg-[#01579B] text-white font-bold text-lg rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Download size={20} />
              تحميل المستند
            </Button>

            {/* Continue Button */}
            <Button
              onClick={() => setLocation("/wethaq-completion")}
              className="w-full py-4 bg-[#1B5E20] hover:bg-[#0D3B2C] text-white font-bold text-lg rounded-lg transition-all duration-300"
            >
              إتمام العملية
            </Button>
          </div>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border border-[#0288D1] rounded-lg">
            <p className="text-sm text-[#0288D1] text-center">
              <span className="font-semibold">ملاحظة:</span> يمكنك الوصول إلى هذا المستند في قسم "مستنداتي" في أي وقت
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
