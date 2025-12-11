import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChevronRight } from "lucide-react";
import SignaturePad from "@/components/SignaturePad";
import { useState } from "react";

/**
 * واجهة التوقيع الإلكتروني
 * زر "توقيع باستخدام الهوية الوطنية" مع نص يوضح أن التوقيع سيتم عبر نفاذ.
 * تم إضافة منطقة توقيع تفاعلية لرسم التوقيع.
 */
export default function WethaqSignaturePage() {
  const [, setLocation] = useLocation();
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <div className="bg-gradient-to-r from-[#1B5E20] to-[#0D3B2C] text-white p-6 flex items-center gap-4">
        <button
          onClick={() => setLocation("/nafath-verified")}
          className="hover:bg-white/20 p-2 rounded-lg transition-colors"
        >
          <ChevronRight size={24} />
        </button>
        <h1 className="text-xl font-bold">التوقيع الإلكتروني</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-6">
        <div className="w-full max-w-md">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-[#1B5E20] to-[#0D3B2C] rounded-3xl flex items-center justify-center shadow-lg">
              <span className="text-white text-4xl">✍️</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4 text-center">
            التوقيع الإلكتروني
          </h2>
          <p className="text-gray-600 text-center mb-8">
            أنت على وشك توقيع المستند رقمياً
          </p>

          {/* Info Box */}
          <div className="bg-blue-50 border border-[#0288D1] rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-[#0288D1] mb-4">معلومات التوقيع</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <span className="font-semibold">الاسم:</span> عبد العزيز محمد المقحاني
              </p>
              <p>
                <span className="font-semibold">رقم الهوية:</span> 1234567890
              </p>
              <p>
                <span className="font-semibold">المستند:</span> sample-document.pdf
              </p>
              <p>
                <span className="font-semibold">نوع التوقيع:</span> توقيع رقمي معترف به قانونياً
              </p>
            </div>
          </div>

          {/* Warning Box */}
          <div className="bg-yellow-50 border border-yellow-400 rounded-lg p-6 mb-8">
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">⚠️ تنبيه:</span> بمجرد التوقيع على هذا المستند، لن تتمكن من تعديله. تأكد من أن جميع البيانات صحيحة.
            </p>
          </div>

          {/* Signature Pad Section */}
          {!showSignaturePad ? (
            <Button
              onClick={() => setShowSignaturePad(true)}
              className="w-full py-4 bg-[#1B5E20] hover:bg-[#0D3B2C] text-white font-bold text-lg rounded-lg transition-all duration-300 mb-4"
            >
              توقيع باستخدام الهوية الوطنية
            </Button>
          ) : (
            <div className="mb-6 p-6 bg-[#F5F5F5] rounded-lg border border-[#E0E0E0]">
              <h3 className="font-bold text-[#1A1A1A] mb-4 text-center">
                منطقة التوقيع
              </h3>
              <SignaturePad
                onSignatureChange={setSignatureData}
                onConfirm={() => {
                  if (signatureData) {
                    setLocation("/wethaq-sealed");
                  }
                }}
              />
            </div>
          )}

          {/* Explanation */}
          <div className="bg-[#F5F5F5] rounded-lg p-6 text-sm text-gray-700 leading-relaxed">
            <p className="mb-3">
              <span className="font-semibold">كيف يعمل التوقيع الرقمي؟</span>
            </p>
            <p className="mb-2">
              التوقيع الرقمي يتم عبر نفاذ باستخدام بيانات هويتك الوطنية. هذا يضمن:
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>أن التوقيع صادر منك فقط</li>
              <li>عدم إمكانية تعديل المستند بعد التوقيع</li>
              <li>الاعتراف القانوني بالتوقيع</li>
              <li>حماية بيانات هويتك</li>
            </ul>
          </div>

          {/* Cancel Button */}
          <Button
            onClick={() => setLocation("/wethaq-preview")}
            className="w-full py-3 bg-white border-2 border-[#E0E0E0] text-[#1A1A1A] font-bold rounded-lg hover:bg-[#F5F5F5] transition-all duration-300 mt-4"
          >
            إلغاء
          </Button>
        </div>
      </div>
    </div>
  );
}
