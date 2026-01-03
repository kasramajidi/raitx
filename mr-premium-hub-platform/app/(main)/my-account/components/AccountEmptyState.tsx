"use client";

import React from "react";
import { Clock, Package, Download, ArrowLeft } from "lucide-react";

interface AccountEmptyStateProps {
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
  icon?: React.ReactNode;
  isComingSoon?: boolean;
}

export default function AccountEmptyState({ 
  message, 
  buttonText, 
  onButtonClick, 
  icon,
  isComingSoon = false
}: AccountEmptyStateProps) {
  if (isComingSoon) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 px-4">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ff5538]/10 to-[#ff5538]/5 flex items-center justify-center">
            <Clock className="w-12 h-12 text-[#ff5538]" strokeWidth={1.5} />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#ff5538] rounded-full flex items-center justify-center">
            <span className="text-white text-xs">+</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">به زودی</h3>
        <p className="text-gray-500 text-center mb-8 max-w-md leading-relaxed">
          {message}
        </p>
        {buttonText && onButtonClick && (
          <button
            onClick={onButtonClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#ff5538] text-[#ff5538] rounded-xl hover:bg-[#ff5538] hover:text-white transition-all duration-200 font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {buttonText}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        {icon || <Package className="w-10 h-10 text-gray-400" strokeWidth={1.5} />}
      </div>
      <p className="text-gray-600 text-center mb-6 text-base leading-relaxed max-w-sm">
        {message}
      </p>
      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="px-6 py-2.5 bg-[#ff5538] hover:bg-[#e6452e] text-white rounded-lg transition-colors duration-200 font-medium text-sm"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

