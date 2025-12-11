import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import {
  FileText,
  DollarSign,
  Building2,
  Car,
  GraduationCap,
  Heart,
  PenTool,
  MoreHorizontal,
} from "lucide-react";

/**
 * واجهة الخدمات
 * شبكة أيقونات خدمات أبشر، وفيها أيقونة جديدة باسم "وِثاق – التوقيع الرقمي".
 */
export default function ServicesPage() {
  const [, setLocation] = useLocation();

  const services = [
    {
      id: 1,
      name: "وِثاق",
      description: "التوقيع الرقمي",
      icon: PenTool,
      color: "from-[#1B5E20] to-[#0D3B2C]",
      isNew: true,
      onClick: () => setLocation("/wethaq-description"),
    },
    {
      id: 2,
      name: "المستندات",
      description: "إدارة المستندات",
      icon: FileText,
      color: "from-[#2E7D32] to-[#1B5E20]",
      onClick: () => {},
    },
    {
      id: 3,
      name: "الرسوم",
      description: "دفع الرسوم",
      icon: DollarSign,
      color: "from-[#4CAF50] to-[#2E7D32]",
      onClick: () => {},
    },
    {
      id: 4,
      name: "العقارات",
      description: "خدمات عقارية",
      icon: Building2,
      color: "from-[#0288D1] to-[#01579B]",
      onClick: () => {},
    },
    {
      id: 5,
      name: "المركبات",
      description: "خدمات المركبات",
      icon: Car,
      color: "from-[#FF9800] to-[#E65100]",
      onClick: () => {},
    },
    {
      id: 6,
      name: "التعليم",
      description: "خدمات تعليمية",
      icon: GraduationCap,
      color: "from-[#9C27B0] to-[#6A1B9A]",
      onClick: () => {},
    },
    {
      id: 7,
      name: "الصحة",
      description: "خدمات صحية",
      icon: Heart,
      color: "from-[#E91E63] to-[#C2185B]",
      onClick: () => {},
    },
    {
      id: 8,
      name: "المزيد",
      description: "خدمات إضافية",
      icon: MoreHorizontal,
      color: "from-[#607D8B] to-[#455A64]",
      onClick: () => {},
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1B5E20] to-[#0D3B2C] text-white p-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">الخدمات</h1>
            <p className="text-green-100 text-sm mt-1">اختر الخدمة المطلوبة</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-lg">👤</span>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <button
                key={service.id}
                onClick={service.onClick}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div
                  className={`relative bg-gradient-to-br ${service.color} rounded-2xl p-6 text-white text-center transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1`}
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-white/20 p-4 rounded-xl">
                      <IconComponent size={32} />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{service.name}</h3>
                  <p className="text-white/80 text-xs">{service.description}</p>
                  {service.isNew && (
                    <div className="mt-3 inline-block bg-yellow-400 text-[#1B5E20] text-xs font-bold px-2 py-1 rounded-full">
                      جديد
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E0E0E0] flex justify-around items-center h-16">
        <button className="flex flex-col items-center justify-center text-[#1B5E20] font-medium text-xs">
          <span className="text-xl mb-1">🏠</span>
          الرئيسية
        </button>
        <button className="flex flex-col items-center justify-center text-gray-400 font-medium text-xs">
          <span className="text-xl mb-1">📄</span>
          المستندات
        </button>
        <button className="flex flex-col items-center justify-center text-gray-400 font-medium text-xs">
          <span className="text-xl mb-1">🔔</span>
          التنبيهات
        </button>
        <button className="flex flex-col items-center justify-center text-gray-400 font-medium text-xs">
          <span className="text-xl mb-1">👤</span>
          الملف الشخصي
        </button>
      </div>

      {/* Spacing for bottom nav */}
      <div className="h-16"></div>
    </div>
  );
}
