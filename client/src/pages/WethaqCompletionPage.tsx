import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { CheckCircle } from "lucide-react";

/**
 * واجهة إتمام العملية
 * علامة نجاح كبيرة + نص "تم توقيع المستند وتوثيقه بنجاح" + زر العودة للرئيسية
 */
export default function WethaqCompletionPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B5E20] to-[#0D3B2C] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center text-white">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle size={80} className="text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">
          تم بنجاح!
        </h1>

        {/* Success Message */}
        <p className="text-xl text-white/90 mb-8 leading-relaxed">
          تم توقيع المستند وتوثيقه بنجاح
        </p>

        {/* Details */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 space-y-3 text-sm text-white/80">
          <div className="flex justify-between items-center">
            <span>المستند:</span>
            <span className="font-semibold">sample-document.pdf</span>
          </div>
          <div className="flex justify-between items-center">
            <span>الموقع:</span>
            <span className="font-semibold">عبد العزيز محمد المقحاني</span>
          </div>
          <div className="flex justify-between items-center">
            <span>التاريخ والوقت:</span>
            <span className="font-semibold">2024-12-08 06:35</span>
          </div>
          <div className="border-t border-white/20 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span>الحالة:</span>
              <span className="font-semibold text-green-300">✓ موثق رقمياً</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 text-left">
          <h3 className="font-bold mb-3 text-white">الخطوات التالية:</h3>
          <ol className="space-y-2 text-sm text-white/80">
            <li className="flex gap-3">
              <span className="font-bold">1.</span>
              <span>تحقق من بريدك الإلكتروني للحصول على نسخة من المستند</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">2.</span>
              <span>يمكنك الوصول إلى المستند في قسم "مستنداتي"</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">3.</span>
              <span>شارك المستند مع الجهات المختصة إذا لزم الأمر</span>
            </li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Home Button */}
          <Button
            onClick={() => setLocation("/services")}
            className="w-full py-4 bg-white text-[#1B5E20] font-bold text-lg rounded-lg hover:bg-gray-100 transition-all duration-300"
          >
            العودة للرئيسية
          </Button>

          {/* View Documents Button */}
          <Button
            onClick={() => {}}
            className="w-full py-4 bg-white/20 border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white/30 transition-all duration-300"
          >
            عرض مستنداتي
          </Button>
        </div>

        {/* Footer Message */}
        <div className="mt-8 p-4 bg-white/10 rounded-lg">
          <p className="text-sm text-white/70">
            شكراً لاستخدام خدمة وِثاق. نتمنى لك تجربة ممتعة.
          </p>
        </div>
      </div>
    </div>
  );
}
