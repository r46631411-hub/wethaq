import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

/**
 * واجهة نفاذ – إدخال الرمز
 * ست خانات OTP + زر "تأكيد التحقق".
 */
export default function NafathEnterCodePage() {
  const [, setLocation] = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  const handleVerify = () => {
    if (isComplete) {
      setLocation("/nafath-verified");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <div className="bg-gradient-to-r from-[#1B5E20] to-[#0D3B2C] text-white p-6 flex items-center gap-4">
        <button
          onClick={() => setLocation("/nafath-send-code")}
          className="hover:bg-white/20 p-2 rounded-lg transition-colors"
        >
          <ChevronRight size={24} />
        </button>
        <h1 className="text-xl font-bold">إدخال الرمز</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-6">
        <div className="w-full max-w-md">
          {/* Nafath Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#0288D1] to-[#01579B] rounded-3xl flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl font-bold">ن</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 text-center">
            أدخل رمز التحقق
          </h2>
          <p className="text-gray-600 text-center mb-8">
            أدخل الرمز المكون من 6 أرقام الذي أرسلناه لك
          </p>

          {/* OTP Input Fields */}
          <div className="flex gap-3 justify-center mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold border-2 border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 transition-all"
              />
            ))}
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            disabled={!isComplete}
            className="w-full py-4 bg-[#1B5E20] hover:bg-[#0D3B2C] disabled:bg-gray-300 text-white font-bold text-lg rounded-lg transition-all duration-300 mb-4"
          >
            تأكيد التحقق
          </Button>

          {/* Resend Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">لم تستقبل الرمز؟</p>
            <button
              onClick={() => setLocation("/nafath-send-code")}
              className="text-[#0288D1] font-medium hover:underline"
            >
              إعادة إرسال الرمز
            </button>
          </div>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border border-[#0288D1] rounded-lg">
            <p className="text-sm text-[#0288D1] text-center">
              <span className="font-semibold">ملاحظة:</span> تأكد من إدخال الرمز بشكل صحيح
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
