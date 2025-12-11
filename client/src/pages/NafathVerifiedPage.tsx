import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Check } from "lucide-react";
import { useEffect } from "react";

/**
 * واجهة نفاذ – تم التحقق
 * علامة صح + نص "تم التحقق عبر نفاذ بنجاح" + زر المتابعة.
 */
export default function NafathVerifiedPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      setLocation("/wethaq-signature");
    }, 3000);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-white">
      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-[#1B5E20] to-[#0D3B2C] rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Check size={48} className="text-white" />
            </div>
          </div>

          {/* Success Message */}
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
            تم التحقق بنجاح
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            تم التحقق من هويتك عبر نفاذ بنجاح
          </p>

          {/* Details */}
          <div className="bg-green-50 border border-[#1B5E20] rounded-lg p-6 mb-8 space-y-2">
            <p className="text-sm text-[#1A1A1A]">
              <span className="font-semibold">الاسم:</span> عبد العزيز محمد المقحاني
            </p>
            <p className="text-sm text-[#1A1A1A]">
              <span className="font-semibold">رقم الهوية:</span> 1234567890
            </p>
            <p className="text-sm text-[#1A1A1A]">
              <span className="font-semibold">وقت التحقق:</span> 2024-12-08 06:30
            </p>
          </div>

          {/* Continue Button */}
          <Button
            onClick={() => setLocation("/wethaq-signature")}
            className="w-full py-4 bg-[#1B5E20] hover:bg-[#0D3B2C] text-white font-bold text-lg rounded-lg transition-all duration-300"
          >
            متابعة للتوقيع
          </Button>

          {/* Auto-redirect message */}
          <p className="text-xs text-gray-500 mt-6">
            سيتم التوجيه تلقائياً خلال ثوان...
          </p>
        </div>
      </div>
    </div>
  );
}
