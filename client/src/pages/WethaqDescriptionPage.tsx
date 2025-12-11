import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChevronRight } from "lucide-react";

/**
 * واجهة خدمة وِثاق (صفحة وصف الخدمة)
 * شعار وِثاق + نص مختصر يعرّف الخدمة + زر "ابدأ الخدمة".
 */
export default function WethaqDescriptionPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <div className="bg-gradient-to-r from-[#1B5E20] to-[#0D3B2C] text-white p-6 flex items-center gap-4">
        <button
          onClick={() => setLocation("/services")}
          className="hover:bg-white/20 p-2 rounded-lg transition-colors"
        >
          <ChevronRight size={24} />
        </button>
        <h1 className="text-xl font-bold">وِثاق</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-6">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-[#1B5E20] to-[#0D3B2C] rounded-3xl flex items-center justify-center shadow-lg">
            <span className="text-white text-5xl font-bold">و</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4 text-center">
          وِثاق
        </h2>
        <p className="text-lg text-[#0288D1] font-semibold mb-8 text-center">
          التوقيع الرقمي والتوثيق الإلكتروني
        </p>

        {/* Description */}
        <div className="max-w-md text-center mb-12 space-y-4">
          <p className="text-gray-700 leading-relaxed">
            خدمة وِثاق توفر لك إمكانية توقيع المستندات رقمياً بشكل آمن وقانوني، مع ضمان سلامة المستند وعدم تعديله.
          </p>
          <p className="text-gray-700 leading-relaxed">
            يمكنك رفع مستنداتك وتوقيعها باستخدام بيانات هويتك الوطنية عبر نفاذ، مع دعم المساعد الصوتي والقراءة للمكفوفين.
          </p>
        </div>

        {/* Features */}
        <div className="w-full max-w-md mb-12 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#F5F5F5] rounded-lg">
            <span className="text-[#1B5E20] font-bold text-lg mt-1">✓</span>
            <div>
              <h4 className="font-semibold text-[#1A1A1A]">توقيع آمن</h4>
              <p className="text-sm text-gray-600">توقيع رقمي معترف به قانونياً</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#F5F5F5] rounded-lg">
            <span className="text-[#1B5E20] font-bold text-lg mt-1">✓</span>
            <div>
              <h4 className="font-semibold text-[#1A1A1A]">سهولة الاستخدام</h4>
              <p className="text-sm text-gray-600">واجهة بسيطة وسهلة الفهم</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#F5F5F5] rounded-lg">
            <span className="text-[#1B5E20] font-bold text-lg mt-1">✓</span>
            <div>
              <h4 className="font-semibold text-[#1A1A1A]">إمكانية وصول</h4>
              <p className="text-sm text-gray-600">دعم كامل للمكفوفين والمساعد الصوتي</p>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <Button
          onClick={() => setLocation("/wethaq-choice")}
          className="w-full max-w-md py-4 bg-[#1B5E20] hover:bg-[#0D3B2C] text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          ابدأ الخدمة
        </Button>
      </div>
    </div>
  );
}
