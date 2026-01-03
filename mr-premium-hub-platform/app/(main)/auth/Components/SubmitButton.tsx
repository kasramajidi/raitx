"use client";

import React from "react";

interface SubmitButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  [key: string]: unknown;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  disabled = false,
  ...rest
}) => (
  <button
    type="submit"
    className="w-full cursor-pointer bg-[#ff5538] text-white md:py-3 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md font-medium"
    disabled={disabled}
    {...rest}
  >
    {children}
  </button>
);

export default SubmitButton;
