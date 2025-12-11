import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChevronRight, Upload, X } from "lucide-react";
import { useState } from "react";

/**
 * واجهة رفع المستند
 * زر "اختر ملف PDF" مع دعم رفع صور تتحول PDF، وإظهار اسم الملف بعد الرفع.
 */
export default function WethaqUploadPage() {
  const [, setLocation] = useLocation();
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: number;
  } | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: file.size,
      });
    }
  };

  const handleContinue = () => {
    if (uploadedFile) {
      setLocation("/wethaq-preview");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <div className="bg-gradient-to-r from-[#1B5E20] to-[#0D3B2C] text-white p-6 flex items-center gap-4">
        <button
          onClick={() => setLocation("/wethaq-choice")}
          className="hover:bg-white/20 p-2 rounded-lg transition-colors"
        >
          <ChevronRight size={24} />
        </button>
        <h1 className="text-xl font-bold">رفع المستند</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-6">
        {/* Progress indicator */}
        <div className="w-full max-w-md mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 h-1 bg-[#1B5E20] rounded-full"></div>
            <div className="flex-1 h-1 bg-[#1B5E20] rounded-full mx-2"></div>
            <div className="flex-1 h-1 bg-[#E0E0E0] rounded-full"></div>
          </div>
          <p className="text-center text-sm text-gray-600">الخطوة 2 من 3</p>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 text-center">
          رفع المستند
        </h2>
        <p className="text-gray-600 text-center mb-12">
          اختر ملف PDF أو صورة لتوقيعها
        </p>

        {/* Upload Area */}
        <div className="w-full max-w-md">
          {!uploadedFile ? (
            <label className="block">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="border-2 border-dashed border-[#1B5E20] rounded-2xl p-12 text-center cursor-pointer hover:bg-[#F5F5F5] transition-colors">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1B5E20] to-[#0D3B2C] rounded-2xl flex items-center justify-center text-white">
                    <Upload size={32} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">
                  اختر ملف PDF
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  أو اسحب الملف هنا
                </p>
                <p className="text-xs text-gray-500">
                  الصيغ المدعومة: PDF, JPG, PNG (الحد الأقصى 10 MB)
                </p>
              </div>
            </label>
          ) : (
            <div className="bg-[#F5F5F5] border border-[#E0E0E0] rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1B5E20] to-[#0D3B2C] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <span className="text-lg font-bold">📄</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#1A1A1A] truncate">
                    {uploadedFile.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {formatFileSize(uploadedFile.size)}
                  </p>
                </div>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className="w-full max-w-md mt-12 space-y-3">
          <Button
            onClick={handleContinue}
            disabled={!uploadedFile}
            className="w-full py-4 bg-[#1B5E20] hover:bg-[#0D3B2C] disabled:bg-gray-300 text-white font-bold text-lg rounded-lg transition-all duration-300"
          >
            متابعة
          </Button>
          <Button
            onClick={() => setLocation("/wethaq-choice")}
            className="w-full py-4 bg-white border-2 border-[#E0E0E0] text-[#1A1A1A] font-bold text-lg rounded-lg hover:bg-[#F5F5F5] transition-all duration-300"
          >
            رجوع
          </Button>
        </div>

        {/* Info Box */}
        <div className="w-full max-w-md mt-8 p-4 bg-blue-50 border border-[#0288D1] rounded-lg">
          <p className="text-sm text-[#0288D1] text-center">
            <span className="font-semibold">ملاحظة:</span> سيتم تحويل الصور إلى PDF تلقائياً
          </p>
        </div>
      </div>
    </div>
  );
}
