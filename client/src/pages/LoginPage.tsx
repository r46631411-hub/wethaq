import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLocation } from "wouter";

/**
 * واجهة تسجيل الدخول (أبشر)
 * تسجيل دخول بسيط بخط أبشر، يحتوي حقل الهوية وكلمة المرور وزر دخول وخيار تسجيل الدخول عبر نفاذ.
 */
export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (identity && password) {
      setLocation("/services");
    }
  };

  const handleNafathLogin = () => {
    setLocation("/nafath-send-code");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1B5E20] to-[#0D3B2C] rounded-2xl mb-6">
            <span className="text-white text-2xl font-bold">أ</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">أبشر</h1>
          <p className="text-gray-600">منصة الخدمات الحكومية الموحدة</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Identity Field */}
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              رقم الهوية
            </label>
            <Input
              type="text"
              placeholder="أدخل رقم الهوية"
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
              className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1] text-right"
              dir="rtl"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              كلمة المرور
            </label>
            <Input
              type="password"
              placeholder="أدخل كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1] text-right"
              dir="rtl"
            />
          </div>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            className="w-full py-3 bg-[#1B5E20] hover:bg-[#0D3B2C] text-white font-bold rounded-lg transition-all duration-300"
          >
            دخول
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#E0E0E0]"></div>
            <span className="text-gray-500 text-sm">أو</span>
            <div className="flex-1 h-px bg-[#E0E0E0]"></div>
          </div>

          {/* Nafath Login */}
          <Button
            onClick={handleNafathLogin}
            className="w-full py-3 bg-white border-2 border-[#0288D1] text-[#0288D1] font-bold rounded-lg hover:bg-blue-50 transition-all duration-300"
          >
            تسجيل الدخول عبر نفاذ
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>هل تواجه مشكلة في الدخول؟</p>
          <button className="text-[#0288D1] font-medium hover:underline">
            استعادة كلمة المرور
          </button>
        </div>
      </div>
    </div>
  );
}
