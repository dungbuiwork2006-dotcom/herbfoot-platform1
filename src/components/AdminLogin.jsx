import React, { useState } from 'react';
import { AuthService } from '../services/traceabilityService';
import { Lock, Mail, Key, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onBackToPublic }) {
  const [email, setEmail] = useState('admin@herbfoot.vn');
  const [password, setPassword] = useState('HerbFoot@2026');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await AuthService.login(email.trim(), password);
      if (res.success) {
        onLoginSuccess(res.user);
      } else {
        setErrorMsg(res.error || 'Đăng nhập không thành công.');
      }
    } catch (err) {
      setErrorMsg('Lỗi kết nối xác thực: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F3ED] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#DDD2BE] shadow-xl p-8 space-y-6">
        
        {/* Top Back Link */}
        <button
          onClick={onBackToPublic}
          className="flex items-center gap-1.5 text-xs text-[#5D7060] hover:text-[#1E3125] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ HERBFOOT</span>
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#2D4A3E] text-white flex items-center justify-center shadow-md">
            <Lock className="w-6 h-6 text-[#B7D6B0]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1E3125]">
            HERBFOOT Admin Portal
          </h2>
          <p className="text-xs text-[#6A7C6D]">
            Khu vực quản trị cấp cao dành riêng cho người quản trị hệ thống
          </p>
        </div>

        {/* Security Alert Badge */}
        <div className="p-3.5 rounded-2xl bg-[#FBF9F4] border border-[#E3D9C7] text-xs text-[#635332] space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-[#4D3F22]">
            <ShieldCheck className="w-4 h-4 text-[#355B46]" />
            <span>Xác thực an toàn (Supabase Auth & RLS)</span>
          </div>
          <p className="text-[11px] text-[#716140]">
            Tài khoản mẫu thử nghiệm: <code className="font-bold text-[#1F3327]">admin@herbfoot.vn</code> | Pass: <code className="font-bold text-[#1F3327]">HerbFoot@2026</code>
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-[#FDF2F2] border border-[#F8B4B4] text-xs text-[#9B1C1C] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#203426] block">Email Quản trị:</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#7A8C7E] absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@herbfoot.vn"
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F3] border border-[#CFBF9F] rounded-xl focus:ring-2 focus:ring-[#2D4A3E] text-[#1E3125] font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#203426] block">Mật khẩu:</label>
            <div className="relative">
              <Key className="w-4 h-4 text-[#7A8C7E] absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F3] border border-[#CFBF9F] rounded-xl focus:ring-2 focus:ring-[#2D4A3E] text-[#1E3125] font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-[#2D4A3E] hover:bg-[#1E332B] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md disabled:opacity-50"
          >
            {isSubmitting ? 'Đang xác thực bảo mật...' : 'Đăng nhập Quản trị viên'}
          </button>
        </form>

      </div>
    </div>
  );
}
