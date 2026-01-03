"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, Lock, Eye, EyeOff, Save, Check } from "lucide-react";

interface UserData {
  id: string;
  username: string;
  email: string;
}

export default function AccountDetailsSection() {
  const [userData, setUserData] = useState<UserData>({
    id: "",
    username: "",
    email: "",
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user) {
          setUserData({
            id: user.id || "",
            username: user.username || "",
            email: user.email || "",
          });
        }
      } catch {}
    }
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (typeof window !== "undefined") {
      const updatedUser = { ...userData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }

    setIsSaving(false);
    setSaveSuccess(true);
    setIsEditing(false);
    
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("رمز عبور جدید و تکرار آن مطابقت ندارند");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }

    setIsSaving(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setIsSaving(false);
    setIsChangingPassword(false);
    setSaveSuccess(true);
    
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">جزئیات حساب</h3>
        <p className="text-gray-500 text-sm">
          اطلاعات شخصی و تنظیمات حساب کاربری خود را مدیریت کنید.
        </p>
      </div>

      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-green-700 text-sm font-medium">
            تغییرات با موفقیت ذخیره شد.
          </p>
        </div>
      )}

      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ff5538]/10 flex items-center justify-center">
              <User className="w-5 h-5 text-[#ff5538]" />
            </div>
            <h4 className="text-base font-semibold text-gray-900">اطلاعات شخصی</h4>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm font-medium text-[#ff5538] hover:bg-[#ff5538]/10 rounded-lg transition-colors"
            >
              ویرایش
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div>
              <label className="block text-right text-gray-700 text-sm mb-1.5 font-medium">
                نام کاربری
              </label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={userData.username}
                  onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg py-2.5 pr-10 pl-4 focus:outline-none focus:border-[#ff5538] focus:ring-1 focus:ring-[#ff5538] transition-colors"
                  placeholder="نام کاربری"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-right text-gray-700 text-sm mb-1.5 font-medium">
                آدرس ایمیل
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg py-2.5 pr-10 pl-4 focus:outline-none focus:border-[#ff5538] focus:ring-1 focus:ring-[#ff5538] transition-colors"
                  placeholder="ایمیل"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 bg-[#ff5538] hover:bg-[#e6452e] text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    در حال ذخیره...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    ذخیره تغییرات
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  const user = JSON.parse(localStorage.getItem("user") || "{}");
                  setUserData({
                    id: user.id || "",
                    username: user.username || "",
                    email: user.email || "",
                  });
                }}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors text-sm font-medium"
              >
                انصراف
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 mb-1">نام کاربری</p>
                <p className="text-sm font-medium text-gray-900">{userData.username || "-"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 mb-1">آدرس ایمیل</p>
                <p className="text-sm font-medium text-gray-900">{userData.email || "-"}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ff5538]/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#ff5538]" />
            </div>
            <h4 className="text-base font-semibold text-gray-900">تغییر رمز عبور</h4>
          </div>
          {!isChangingPassword && (
            <button
              onClick={() => setIsChangingPassword(true)}
              className="px-4 py-2 text-sm font-medium text-[#ff5538] hover:bg-[#ff5538]/10 rounded-lg transition-colors"
            >
              تغییر رمز عبور
            </button>
          )}
        </div>

        {isChangingPassword ? (
          <form onSubmit={handleChangePassword} className="space-y-5">
            <div>
              <label className="block text-right text-gray-700 text-sm mb-1.5 font-medium">
                رمز عبور فعلی
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg py-2.5 pr-10 pl-10 focus:outline-none focus:border-[#ff5538] focus:ring-1 focus:ring-[#ff5538] transition-colors"
                  placeholder="رمز عبور فعلی را وارد کنید"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-right text-gray-700 text-sm mb-1.5 font-medium">
                رمز عبور جدید
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg py-2.5 pr-10 pl-10 focus:outline-none focus:border-[#ff5538] focus:ring-1 focus:ring-[#ff5538] transition-colors"
                  placeholder="رمز عبور جدید را وارد کنید"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">حداقل ۶ کاراکتر</p>
            </div>

            <div>
              <label className="block text-right text-gray-700 text-sm mb-1.5 font-medium">
                تکرار رمز عبور جدید
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg py-2.5 pr-10 pl-10 focus:outline-none focus:border-[#ff5538] focus:ring-1 focus:ring-[#ff5538] transition-colors"
                  placeholder="رمز عبور جدید را تکرار کنید"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 bg-[#ff5538] hover:bg-[#e6452e] text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    در حال تغییر...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    تغییر رمز عبور
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors text-sm font-medium"
              >
                انصراف
              </button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-gray-500">
            برای امنیت بیشتر حساب کاربری خود، رمز عبور خود را به صورت دوره‌ای تغییر دهید.
          </p>
        )}
      </div>
    </div>
  );
}

