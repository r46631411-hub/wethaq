import { useRef, useEffect, useState } from "react";
import { RotateCcw, Check } from "lucide-react";

interface SignaturePadProps {
  onSignatureChange?: (signatureData: string) => void;
  onConfirm?: () => void;
}

export default function SignaturePad({
  onSignatureChange,
  onConfirm,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (rect) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    // Set up canvas context
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#1B5E20";
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    if (!hasSignature) {
      setHasSignature(true);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas && hasSignature) {
      const signatureData = canvas.toDataURL();
      onSignatureChange?.(signatureData);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    setHasSignature(false);
    onSignatureChange?.("");
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    if (!hasSignature) {
      setHasSignature(true);
    }
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas && hasSignature) {
      const signatureData = canvas.toDataURL();
      onSignatureChange?.(signatureData);
    }
  };

  return (
    <div className="w-full">
      {/* Canvas */}
      <div className="border-2 border-dashed border-[#1B5E20] rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-full h-48 cursor-crosshair block"
          style={{ touchAction: "none" }}
        />
      </div>

      {/* Instructions */}
      <p className="text-sm text-gray-600 text-center mt-3">
        {hasSignature ? "✓ تم رسم التوقيع" : "اضغط هنا لرسم توقيعك"}
      </p>

      {/* Controls */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={clearSignature}
          className="flex-1 py-2 px-4 bg-white border-2 border-[#E0E0E0] text-[#1A1A1A] font-medium rounded-lg hover:bg-[#F5F5F5] transition-all duration-300 flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} />
          مسح
        </button>
        {hasSignature && (
          <button
            onClick={onConfirm}
            className="flex-1 py-2 px-4 bg-[#1B5E20] hover:bg-[#0D3B2C] text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Check size={18} />
            تأكيد
          </button>
        )}
      </div>
    </div>
  );
}
