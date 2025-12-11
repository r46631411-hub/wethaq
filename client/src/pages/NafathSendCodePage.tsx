import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

/**
 * واجهة نفاذ – إرسال رمز التحقق
 * شعار نفاذ + نص "أرسلنا رمزاً لهاتفك" + زر إعادة إرسال.
 */
export default function NafathSendCodePage() {
  const [, setLocation] = useLocation();
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Simulate countdown timer
  const handleResendCode = () => {
    setCanResend(false);
    setCountdown(60);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <div className="bg-gradient-to-r from-[#1B5E20] to-[#0D3B2C] text-white p-6 flex items-center gap-4">
        <button
          onClick={() => setLocation("/wethaq-preview")}
          className="hover:bg-white/20 p-2 rounded-lg transition-colors"
        >
          <ChevronRight size={24} />
        </button>
        <h1 className="text-xl font-bold">التحقق عبر نفاذ</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-6">
        <div className="w-full max-w-md">
          {/* Nafath Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-[#0288D1] to-[#01579B] rounded-3xl flex items-center justify-center shadow-lg">
              <span className="text-white text-4xl font-bold">ن</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4 text-center">
            نفاذ
          </h2>
          <p className="text-lg text-gray-600 font-semibold mb-8 text-center">
            التحقق الآمن
          </p>

          {/* Message */}
          <div className="bg-green-50 border border-[#1B5E20] rounded-lg p-6 mb-8 text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">
              أرسلنا رمزاً لهاتفك
            </h3>
            <p className="text-gray-700 mb-4">
              تحقق من رسالة نصية على رقم هاتفك المسجل
            </p>
            <p className="text-sm text-gray-600">
              الرقم المسجل: ***-***-5432
            </p>
          </div>

          {/* Continue Button */}
          <Button
            onClick={() => setLocation("/nafath-enter-code")}
            className="w-full py-4 bg-[#1B5E20] hover:bg-[#0D3B2C] text-white font-bold text-lg rounded-lg transition-all duration-300 mb-4"
          >
            أدخل الرمز
          </Button>

          {/* Resend Button */}
          <div className="space-y-3">
            {!canResend ? (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  لم تستقبل الرمز؟
                </p>
                <button
                  disabled
                  className="text-[#0288D1] font-medium cursor-not-allowed opacity-50"
                >
                  إعادة إرسال بعد {countdown}s
                </button>
              </div>
            ) : (
              <button
                onClick={handleResendCode}
                className="w-full py-3 text-[#0288D1] font-bold border-2 border-[#0288D1] rounded-lg hover:bg-blue-50 transition-all duration-300"
              >
                إعادة إرسال الرمز
              </button>
            )}
          </div>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border border-[#0288D1] rounded-lg">
            <p className="text-sm text-[#0288D1] text-center">
              <span className="font-semibold">ملاحظة:</span> الرمز صالح لمدة 10 دقائق فقط
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
