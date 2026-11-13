import React, { useState, useEffect } from 'react';
import { TraceabilityService, AuthService } from '../services/traceabilityService';
import { QRGenerator } from '../utils/qrGenerator';
import { 
  LayoutDashboard,
  Layers, 
  QrCode, 
  FileCheck, 
  LogOut, 
  Plus, 
  Search, 
  Download, 
  Archive, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Eye, 
  Edit3, 
  Trash2, 
  FileText,
  Upload,
  ArrowLeft,
  X,
  FileSpreadsheet
} from 'lucide-react';

export default function AdminPortal({ onBackToPublic, onViewPassport, onLogout }) {
  const [activeModule, setActiveModule] = useState('dashboard'); // 'dashboard', 'batches', 'products', 'qr_manager'
  const [batches, setBatches] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ totalBatches: 0, totalProducts: 0, publishedProducts: 0, draftProducts: 0 });
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // Modal sửa / tạo Lô
  const [batchModalOpen, setBatchModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const [batchFormData, setBatchFormData] = useState({
    batch_code: '',
    production_date: '',
    expiry_date: '',
    status: 'draft',
    qc_status: 'PASSED',
    qc_notes: '',
    ingredients: [],
    process_steps: [],
    quality_records: []
  });

  // Modal QR Preview
  const [qrModalItem, setQrModalItem] = useState(null);
  const [qrDataUrl, setQrDataUrl] = useState('');

  // Sinh mã tự động
  const [genQuantity, setGenQuantity] = useState(5);
  const [genStatus, setGenStatus] = useState('draft'); // Cho phép sinh dạng draft hoặc published
  const [isProcessingZip, setIsProcessingZip] = useState(false);

  useEffect(() => {
    refreshAllData();
  }, []);

  const refreshAllData = () => {
    const bList = TraceabilityService.getBatches(true);
    const pList = TraceabilityService.getProducts(true);
    const s = TraceabilityService.getDashboardStats();
    setBatches(bList);
    setProducts(pList);
    setStats(s);
    if (bList.length > 0 && !selectedBatchId) {
      setSelectedBatchId(bList[0].id);
    }
  };

  // Mở modal tạo Lô mới
  const handleOpenCreateBatch = () => {
    setEditingBatch(null);
    setBatchFormData({
      batch_code: `HF-LOT-${String(Math.floor(Math.random() * 900) + 100)}`,
      production_date: new Date().toISOString().split('T')[0],
      expiry_date: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'draft', // Mặc định là bản nháp trước khi duyệt
      qc_status: 'PASSED',
      qc_notes: 'Lô sản xuất thử nghiệm phòng Lab đạt tiêu chuẩn.',
      ingredients: [
        { name: "Chiết xuất Gừng sẻ tự nhiên", supplier_origin: "Hòa Bình", standard: "VietGAP", notes: "" },
        { name: "Dịch chiết vỏ Quế nhục Trà Bồng", supplier_origin: "Quảng Ngãi", standard: "Chuẩn hóa", notes: "" }
      ],
      process_steps: [
        { step_number: "01", phase_name: "Chiết xuất dược liệu", description: "Bảo toàn hoạt chất", quality_checkpoint: "Đạt chuẩn cảm quan" },
        { step_number: "02", phase_name: "Tẩm lõi xơ sinh học", description: "Định lượng đồng đều", quality_checkpoint: "Đạt khối lượng" },
        { step_number: "03", phase_name: "Phủ màng Chitosan", description: "Tạo màng vi kẽ nano", quality_checkpoint: "Đạt độ dày chuẩn" }
      ],
      quality_records: [
        { test_category: "Kiểm nghiệm vi sinh vật", testing_unit: "Phòng Lab R&D", result_status: "ĐẠT TIÊU CHUẨN", certificate_code: "COA-DEMO" }
      ]
    });
    setBatchModalOpen(true);
  };

  // Mở modal sửa Lô
  const handleOpenEditBatch = (batch) => {
    setEditingBatch(batch);
    setBatchFormData({
      batch_code: batch.batch_code,
      production_date: batch.production_date,
      expiry_date: batch.expiry_date,
      status: batch.status || 'draft',
      qc_status: batch.qc_status || 'PASSED',
      qc_notes: batch.qc_notes || '',
      ingredients: batch.ingredients || [],
      process_steps: batch.process_steps || [],
      quality_records: batch.quality_records || []
    });
    setBatchModalOpen(true);
  };

  // Lưu Lô (Tạo mới hoặc Cập nhật)
  const handleSaveBatch = (e) => {
    e.preventDefault();
    if (!batchFormData.batch_code.trim()) return;

    if (editingBatch) {
      TraceabilityService.updateBatch(editingBatch.id, {
        batch_code: batchFormData.batch_code.trim().toUpperCase(),
        production_date: batchFormData.production_date,
        expiry_date: batchFormData.expiry_date,
        status: batchFormData.status,
        qc_status: batchFormData.qc_status,
        qc_notes: batchFormData.qc_notes,
        ingredients: batchFormData.ingredients,
        process_steps: batchFormData.process_steps,
        quality_records: batchFormData.quality_records
      });
      alert(`Đã cập nhật thành công lô ${batchFormData.batch_code}!`);
    } else {
      const created = TraceabilityService.createBatch({
        batch_code: batchFormData.batch_code.trim().toUpperCase(),
        production_date: batchFormData.production_date,
        expiry_date: batchFormData.expiry_date,
        status: batchFormData.status,
        qc_status: batchFormData.qc_status,
        qc_notes: batchFormData.qc_notes,
        ingredients: batchFormData.ingredients,
        process_steps: batchFormData.process_steps,
        quality_records: batchFormData.quality_records
      });
      setSelectedBatchId(created.id);
      alert(`Đã tạo thành công lô mới ${created.batch_code}!`);
    }

    setBatchModalOpen(false);
    refreshAllData();
  };

  // Thao tác duyệt công bố nhanh Lô
  const handleToggleBatchStatus = (batch) => {
    const nextStatus = batch.status === 'published' ? 'draft' : 'published';
    TraceabilityService.updateBatch(batch.id, { status: nextStatus });
    refreshAllData();
  };

  // Thay đổi trạng thái công bố sản phẩm (Publication Control)
  const handleToggleProductStatus = (product) => {
    const nextStatus = product.status === 'published' ? 'draft' : 'published';
    TraceabilityService.updateProductStatus(product.id, nextStatus);
    refreshAllData();
  };

  // Sinh sản phẩm tự động
  const handleGenerateProducts = () => {
    if (!selectedBatchId) {
      alert("Vui lòng chọn một Lô sản xuất!");
      return;
    }
    const qty = parseInt(genQuantity, 10) || 1;
    try {
      TraceabilityService.generateProductsForBatch(selectedBatchId, qty, genStatus);
      refreshAllData();
      alert(`Đã tạo thành công ${qty} mã sản phẩm với serial duy nhất (Trạng thái: ${genStatus})!`);
    } catch (err) {
      alert("Lỗi khi sinh mã: " + err.message);
    }
  };

  // Xem mã QR đơn lẻ
  const handleOpenQRModal = async (product) => {
    setQrModalItem(product);
    const dataUrl = await QRGenerator.generateQRDataURL(product.serial_number);
    setQrDataUrl(dataUrl);
  };

  // Tải trọn gói ZIP mã QR của Lô
  const handleDownloadBatchZip = async () => {
    const targetBatch = batches.find(b => b.id === selectedBatchId);
    if (!targetBatch) return;

    const batchProducts = products.filter(p => p.batch_id === selectedBatchId);
    if (batchProducts.length === 0) {
      alert("Lô này chưa có sản phẩm nào. Hãy sinh mã trước khi tải!");
      return;
    }

    try {
      setIsProcessingZip(true);
      await QRGenerator.downloadBatchZip(targetBatch.batch_code, batchProducts);
    } catch (err) {
      alert("Có lỗi khi tạo gói ZIP: " + err.message);
    } finally {
      setIsProcessingZip(false);
    }
  };

  // Xuất file CSV danh sách mã sản phẩm độc lập
  const handleExportCSVOnly = () => {
    const targetBatch = batches.find(b => b.id === selectedBatchId);
    if (!targetBatch) return;

    const batchProducts = products.filter(p => p.batch_id === selectedBatchId);
    if (batchProducts.length === 0) {
      alert("Không có sản phẩm nào để xuất CSV!");
      return;
    }

    let csvContent = "STT,Mã sản phẩm (Serial),Mã Lô (Batch ID),Trạng thái công bố,Lượt quét,Đường dẫn truy xuất (URL)\n";
    batchProducts.forEach((p, idx) => {
      const url = `${window.location.origin}/product/${p.serial_number}`;
      csvContent += `${idx + 1},${p.serial_number},${targetBatch.batch_code},${p.status},${p.scan_count || 0},${url}\n`;
    });

    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Danh_sach_san_pham_${targetBatch.batch_code}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredProducts = products.filter(p => {
    const matchBatch = selectedBatchId ? p.batch_id === selectedBatchId : true;
    const matchSearch = searchKeyword
      ? p.serial_number.toLowerCase().includes(searchKeyword.toLowerCase())
      : true;
    return matchBatch && matchSearch;
  });

  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="min-h-screen bg-[#F6F3ED] text-[#243324] flex flex-col">
      
      {/* Top Header */}
      <header className="bg-[#1C2C24] text-white px-6 py-3.5 border-b border-[#2C4135] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPublic}
            className="flex items-center gap-1.5 text-xs text-[#A8C5AC] hover:text-white transition-colors mr-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Về website chính</span>
          </button>
          <div className="h-4 w-px bg-[#354F41]"></div>
          <h1 className="font-serif text-lg font-bold tracking-wide">
            HERBFOOT ADMIN CONSOLE
          </h1>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-[#2D4A3E] text-[#BEE0BC] font-semibold">
            {currentUser?.email || 'admin@herbfoot.vn'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#E1BABA] hover:text-white hover:bg-[#8B2626] rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </header>

      {/* Main Workspace with Sidebar */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Left Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-[#DDD2BE] p-4 space-y-2 shrink-0">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#798C7B] px-3 py-2">
            Phân hệ Quản trị
          </div>

          <button
            onClick={() => setActiveModule('dashboard')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeModule === 'dashboard'
                ? 'bg-[#2D4A3E] text-white shadow-xs'
                : 'text-[#485D4B] hover:bg-[#FAF8F3]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>1. Dashboard Tổng quan</span>
          </button>

          <button
            onClick={() => setActiveModule('batches')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeModule === 'batches'
                ? 'bg-[#2D4A3E] text-white shadow-xs'
                : 'text-[#485D4B] hover:bg-[#FAF8F3]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>2. Quản lý Lô Sản Xuất</span>
          </button>

          <button
            onClick={() => setActiveModule('products')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeModule === 'products'
                ? 'bg-[#2D4A3E] text-white shadow-xs'
                : 'text-[#485D4B] hover:bg-[#FAF8F3]'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>3. Quản lý Mã Sản Phẩm</span>
          </button>

          <button
            onClick={() => setActiveModule('qr_manager')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeModule === 'qr_manager'
                ? 'bg-[#2D4A3E] text-white shadow-xs'
                : 'text-[#485D4B] hover:bg-[#FAF8F3]'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>4. Trung tâm Sinh & Xuất QR</span>
          </button>

          <div className="pt-6 mt-6 border-t border-[#EDE4D5] px-3 space-y-2 text-[11px] text-[#718473]">
            <p className="font-semibold text-[#1E3125]">Publication Control:</p>
            <p>Dữ liệu chỉ hiển thị ra ngoài khi chuyển từ trạng thái <code>draft</code> sang <code>published</code>.</p>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          
          {/* 1. MODULE: DASHBOARD */}
          {activeModule === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1E3125]">
                  Dashboard Tổng Quan Hệ Thống
                </h2>
                <p className="text-xs text-[#5C6E5E]">
                  Theo dõi trạng thái xuất bản và số liệu truy xuất nguồn gốc theo thời gian thực
                </p>
              </div>

              {/* 4 Key Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#DDD2BE] shadow-xs space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#637766] block">
                    Tổng số lô sản xuất
                  </span>
                  <div className="font-serif text-3xl font-bold text-[#1E3125]">
                    {stats.totalBatches}
                  </div>
                  <span className="text-[11px] text-[#788B7B]">Lô hàng trong hệ thống</span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#DDD2BE] shadow-xs space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#637766] block">
                    Tổng sản phẩm đã tạo mã
                  </span>
                  <div className="font-serif text-3xl font-bold text-[#1E3125]">
                    {stats.totalProducts}
                  </div>
                  <span className="text-[11px] text-[#788B7B]">Serial numbers độc nhất</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#E4EFE2] border border-[#C5DDBF] shadow-xs space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B572C] block">
                    Số sản phẩm ĐÃ CÔNG BỐ
                  </span>
                  <div className="font-serif text-3xl font-bold text-[#155428]">
                    {stats.publishedProducts}
                  </div>
                  <span className="text-[11px] text-[#2D6C3E]">Khách quét QR xem được</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#FFF6E5] border border-[#ECD9B8] shadow-xs space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A5B20] block">
                    Số sản phẩm CHƯA CÔNG BỐ
                  </span>
                  <div className="font-serif text-3xl font-bold text-[#71541D]">
                    {stats.draftProducts}
                  </div>
                  <span className="text-[11px] text-[#7B612E]">Bản nháp lưu hành nội bộ</span>
                </div>
              </div>

              {/* Quick Jump & Recent Batches Overview */}
              <div className="p-6 rounded-3xl bg-white border border-[#DDD2BE] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#EDE4D5] pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#1E3125]">
                    Danh sách Lô sản xuất gần nhất
                  </h3>
                  <button
                    onClick={() => setActiveModule('batches')}
                    className="text-xs font-semibold text-[#2D4A3E] hover:underline"
                  >
                    Xem tất cả &rarr;
                  </button>
                </div>

                <div className="space-y-3">
                  {batches.slice(0, 3).map(b => (
                    <div key={b.id} className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E0D7C4] flex items-center justify-between text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#1E3125]">{b.batch_code}</span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                            b.status === 'published' ? 'bg-[#E2EDE0] text-[#1E5C32]' : 'bg-[#FFF3D6] text-[#7B5B1E]'
                          }`}>
                            {b.status === 'published' ? 'Đã công bố' : 'Bản nháp (Draft)'}
                          </span>
                        </div>
                        <p className="text-[#566858]">NSX: {b.production_date} | HSD: {b.expiry_date} | Nguyên liệu: {b.ingredients?.length || 0}</p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedBatchId(b.id);
                          setActiveModule('products');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#2D4A3E] text-white font-medium hover:bg-[#1E332B] transition-colors"
                      >
                        Quản lý mã
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* 2. MODULE: BATCH MANAGEMENT */}
          {activeModule === 'batches' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1E3125]">
                    Quản Lý Lô Sản Xuất (Batch Management)
                  </h2>
                  <p className="text-xs text-[#5C6E5E]">
                    Tạo mới, biên tập nguyên liệu thực tế, quy trình sản xuất và kiểm soát duyệt công bố
                  </p>
                </div>

                <button
                  onClick={handleOpenCreateBatch}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2D4A3E] hover:bg-[#1E332B] text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tạo Lô Sản Xuất Mới</span>
                </button>
              </div>

              {/* Batches Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {batches.map(b => (
                  <div key={b.id} className="p-6 rounded-3xl bg-white border border-[#DDD2BE] shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-[#EFE7D8] pb-3">
                      <div>
                        <span className="font-mono text-lg font-bold text-[#1E3125] block">{b.batch_code}</span>
                        <span className="text-[11px] text-[#6E8070]">Tạo lúc: {new Date(b.created_at || Date.now()).toLocaleDateString('vi-VN')}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleBatchStatus(b)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                            b.status === 'published'
                              ? 'bg-[#E2EDE0] text-[#1E5C32] hover:bg-[#D4E4D2]'
                              : 'bg-[#FFF3D6] text-[#7B5B1E] hover:bg-[#FCE6B6]'
                          }`}
                        >
                          {b.status === 'published' ? '✓ Đã duyệt công bố' : '○ Đang lưu nháp'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs text-[#4F6252]">
                      <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#EBE2D3]">
                        <span className="text-[10px] font-bold uppercase text-[#768978] block">Ngày sản xuất:</span>
                        <strong className="text-[#1E3125]">{b.production_date}</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#EBE2D3]">
                        <span className="text-[10px] font-bold uppercase text-[#768978] block">Hạn sử dụng:</span>
                        <strong className="text-[#1E3125]">{b.expiry_date}</strong>
                      </div>
                    </div>

                    {/* Ingredients summary */}
                    <div className="space-y-1.5 text-xs">
                      <span className="font-bold text-[#1E3125] block">Nguyên liệu thực tế ({b.ingredients?.length || 0}):</span>
                      <div className="flex flex-wrap gap-1.5">
                        {b.ingredients?.map((ing, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-[#FAF8F3] border border-[#DDD3C0] text-[11px] text-[#364D3B]">
                            {ing.name} ({ing.supplier_origin})
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* QC status */}
                    <div className="text-xs text-[#526554] space-y-1">
                      <p><strong>QC Status:</strong> <span className="text-[#185A2F] font-bold">{b.qc_status}</span></p>
                      <p className="text-[11px] italic text-[#6F8271]">"{b.qc_notes}"</p>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-[#EFE7D8] flex items-center justify-between">
                      <button
                        onClick={() => handleOpenEditBatch(b)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D4A3E] hover:underline"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Sửa thông tin & nguyên liệu
                      </button>

                      <button
                        onClick={() => {
                          setSelectedBatchId(b.id);
                          setActiveModule('products');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#2D4A3E] text-white text-xs font-medium hover:bg-[#1E332B] transition-colors"
                      >
                        Quản lý mã ({products.filter(p => p.batch_id === b.id).length})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. MODULE: PRODUCT MANAGEMENT */}
          {activeModule === 'products' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1E3125]">
                  Quản Lý Sản Phẩm & Kiểm Soát Công Bố
                </h2>
                <p className="text-xs text-[#5C6E5E]">
                  Tạo mã serial tự động không trùng lặp, duyệt trạng thái công bố từng sản phẩm
                </p>
              </div>

              {/* Generator Toolset Bar */}
              <div className="p-6 rounded-3xl bg-white border border-[#DDD2BE] shadow-xs space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Batch Selector */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#637766]">
                      Lô sản xuất đang chọn:
                    </label>
                    <select
                      value={selectedBatchId}
                      onChange={(e) => setSelectedBatchId(e.target.value)}
                      className="w-full sm:w-72 px-3.5 py-2 text-xs font-mono font-bold bg-[#FAF8F3] border border-[#CFBF9F] rounded-xl focus:ring-2 focus:ring-[#2D4A3E]"
                    >
                      {batches.map(b => (
                        <option key={b.id} value={b.id}>
                          {b.batch_code} ({b.status === 'published' ? 'Đã duyệt' : 'Bản nháp'})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Batch generator settings */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-[#FAF8F3] border border-[#CFBF9F] px-3 py-1.5 rounded-xl">
                      <span className="text-xs text-[#526355]">Số lượng sinh:</span>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={genQuantity}
                        onChange={(e) => setGenQuantity(e.target.value)}
                        className="w-16 px-2 py-1 text-xs font-bold text-center bg-white border border-[#DDD2BE] rounded-lg"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 bg-[#FAF8F3] border border-[#CFBF9F] px-3 py-1.5 rounded-xl">
                      <span className="text-xs text-[#526355]">Trạng thái ban đầu:</span>
                      <select
                        value={genStatus}
                        onChange={(e) => setGenStatus(e.target.value)}
                        className="text-xs font-bold bg-transparent border-0 focus:ring-0"
                      >
                        <option value="draft">Bản nháp (Draft)</option>
                        <option value="published">Công bố ngay (Published)</option>
                      </select>
                    </div>

                    <button
                      onClick={handleGenerateProducts}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold bg-[#2D4A3E] hover:bg-[#1E332B] text-white rounded-xl transition-all shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Sinh mã tự động</span>
                    </button>
                  </div>

                </div>
              </div>

              {/* Products Table */}
              <div className="p-6 rounded-3xl bg-white border border-[#DDD2BE] shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-[#2D4A3E]" />
                    <h3 className="font-serif text-lg font-bold text-[#1E3125]">
                      Danh sách mã sản phẩm ({filteredProducts.length})
                    </h3>
                  </div>

                  {/* Search box */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-[#7A8B7C] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Tìm theo Serial (VD: HF-000001)..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F3] border border-[#DDD2BE] rounded-xl focus:ring-2 focus:ring-[#2D4A3E]"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F3] text-[#556957] uppercase text-[10px] font-bold tracking-wider border-b border-[#EAE0D0]">
                      <tr>
                        <th className="py-3 px-4">STT</th>
                        <th className="py-3 px-4">Serial Number</th>
                        <th className="py-3 px-4">Thuộc Lô</th>
                        <th className="py-3 px-4">Kiểm soát công bố</th>
                        <th className="py-3 px-4">Lượt quét</th>
                        <th className="py-3 px-4">Đường dẫn QR</th>
                        <th className="py-3 px-4 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFE7D8]">
                      {filteredProducts.map((p, idx) => (
                        <tr key={p.id} className="hover:bg-[#FAF8F3] transition-colors">
                          <td className="py-3 px-4 text-[#768778]">{idx + 1}</td>
                          <td className="py-3 px-4 font-mono font-bold text-[#1E3125] text-sm">
                            {p.serial_number}
                          </td>
                          <td className="py-3 px-4 font-mono text-[#546857]">
                            {batches.find(b => b.id === p.batch_id)?.batch_code || 'N/A'}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleToggleProductStatus(p)}
                              className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase transition-colors ${
                                p.status === 'published'
                                  ? 'bg-[#E2EDE0] text-[#1E5C32] hover:bg-[#D2E4CE]'
                                  : 'bg-[#FFF3D6] text-[#7B5B1E] hover:bg-[#FCE3AC]'
                              }`}
                            >
                              {p.status === 'published' ? '✓ Đã công bố' : '○ Bản nháp'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-[#526355]">
                            {p.scan_count || 0} lần
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-[#2D4A3E]">
                            /product/{p.serial_number}
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => handleOpenQRModal(p)}
                              className="px-2.5 py-1 rounded-lg bg-[#FAF8F3] border border-[#D5C7B1] text-[#2D4A3E] font-medium hover:bg-[#EAE2D2] transition-colors"
                            >
                              Xem QR
                            </button>
                            <button
                              onClick={() => onViewPassport(p.serial_number)}
                              className="px-2.5 py-1 rounded-lg bg-[#2D4A3E] text-white font-medium hover:bg-[#1E332B] transition-colors"
                            >
                              Passport
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredProducts.length === 0 && (
                        <tr>
                          <td colSpan="7" className="py-8 text-center text-xs text-[#7B8C7E] italic">
                            Chưa tìm thấy sản phẩm nào. Hãy nhấn nút "Sinh mã tự động" để tạo mới!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* 4. MODULE: QR MANAGEMENT & EXPORT */}
          {activeModule === 'qr_manager' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1E3125]">
                  Trung Tâm Quản Lý & Xuất File QR Code In Ấn
                </h2>
                <p className="text-xs text-[#5C6E5E]">
                  Xuất file mã QR độ phân giải cao sẵn sàng in ấn lên bao bì và file CSV đối chiếu dây chuyền
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#DDD2BE] shadow-xs space-y-6">
                <div className="max-w-md space-y-2">
                  <label className="text-xs font-bold text-[#1E3125] block">
                    Chọn Lô sản xuất cần kết xuất gói in:
                  </label>
                  <select
                    value={selectedBatchId}
                    onChange={(e) => setSelectedBatchId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-mono font-bold bg-[#FAF8F3] border border-[#CFBF9F] rounded-xl focus:ring-2 focus:ring-[#2D4A3E]"
                  >
                    {batches.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.batch_code} (Số mã: {products.filter(p => p.batch_id === b.id).length})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  
                  {/* Export ZIP Package Card */}
                  <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#DFD6C3] space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#2D4A3E] text-white flex items-center justify-center">
                      <Archive className="w-5 h-5 text-[#BBD6B4]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#1E3125]">
                      Tải trọn gói ZIP QR cho nhà in
                    </h3>
                    <p className="text-xs text-[#516453] leading-relaxed">
                      Bao gồm toàn bộ file ảnh QR dạng PNG sắc nét cho từng sản phẩm của lô và file CSV danh sách đối chiếu.
                    </p>
                    <button
                      onClick={handleDownloadBatchZip}
                      disabled={isProcessingZip}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#2D4A3E] hover:bg-[#1E332B] text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
                    >
                      {isProcessingZip ? 'Đang đóng gói file ZIP...' : 'Tải gói QR Lô (.ZIP)'}
                    </button>
                  </div>

                  {/* Export CSV Only Card */}
                  <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#DFD6C3] space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E6EFE2] text-[#245034] flex items-center justify-center">
                      <FileSpreadsheet className="w-5 h-5 text-[#245034]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#1E3125]">
                      Xuất danh sách mã sản phẩm (CSV)
                    </h3>
                    <p className="text-xs text-[#516453] leading-relaxed">
                      Xuất bảng tính chứa toàn bộ danh sách Serial, Lô, URL truy xuất để đối soát thủ công hoặc nhập vào hệ thống ERP máy in.
                    </p>
                    <button
                      onClick={handleExportCSVOnly}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#E4DDD0] hover:bg-[#D5C9B7] text-[#233F30] font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      Xuất file đối chiếu (.CSV)
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL: SỬA HOẶC TẠO LÔ MỚI */}
      {batchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#DFD5C2] shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#EDE4D5] pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#355B46] bg-[#E5EDE2] px-2.5 py-0.5 rounded-md">
                  {editingBatch ? 'Chỉnh sửa' : 'Thêm mới'}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1E3125] mt-1">
                  {editingBatch ? `Biên tập Lô ${editingBatch.batch_code}` : 'Tạo Lô Sản Xuất Mới'}
                </h3>
              </div>
              <button onClick={() => setBatchModalOpen(false)} className="text-[#7A8C7E] hover:text-[#1E3125]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBatch} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-[#1E3125]">Mã Lô (Batch Code):</label>
                  <input
                    type="text"
                    required
                    value={batchFormData.batch_code}
                    onChange={(e) => setBatchFormData({...batchFormData, batch_code: e.target.value})}
                    className="w-full px-3 py-2 font-mono font-bold bg-[#FAF8F3] border border-[#CFBF9F] rounded-xl focus:ring-2 focus:ring-[#2D4A3E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1E3125]">Ngày sản xuất:</label>
                  <input
                    type="date"
                    required
                    value={batchFormData.production_date}
                    onChange={(e) => setBatchFormData({...batchFormData, production_date: e.target.value})}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#CFBF9F] rounded-xl focus:ring-2 focus:ring-[#2D4A3E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1E3125]">Hạn sử dụng:</label>
                  <input
                    type="date"
                    required
                    value={batchFormData.expiry_date}
                    onChange={(e) => setBatchFormData({...batchFormData, expiry_date: e.target.value})}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#CFBF9F] rounded-xl focus:ring-2 focus:ring-[#2D4A3E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1E3125]">Trạng thái xuất bản (Publication):</label>
                  <select
                    value={batchFormData.status}
                    onChange={(e) => setBatchFormData({...batchFormData, status: e.target.value})}
                    className="w-full px-3 py-2 font-bold bg-[#FAF8F3] border border-[#CFBF9F] rounded-xl focus:ring-2 focus:ring-[#2D4A3E]"
                  >
                    <option value="draft">Bản nháp nội bộ (Draft)</option>
                    <option value="published">Đã duyệt công bố (Published)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1E3125]">Đánh giá QC:</label>
                  <select
                    value={batchFormData.qc_status}
                    onChange={(e) => setBatchFormData({...batchFormData, qc_status: e.target.value})}
                    className="w-full px-3 py-2 font-bold bg-[#FAF8F3] border border-[#CFBF9F] rounded-xl focus:ring-2 focus:ring-[#2D4A3E]"
                  >
                    <option value="PASSED">ĐẠT CHUẨN (PASSED)</option>
                    <option value="PENDING">ĐANG KIỂM ĐỊNH (PENDING)</option>
                    <option value="FAILED">KHÔNG ĐẠT (FAILED)</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-[#1E3125]">Ghi chú kiểm tra chất lượng (QC Notes):</label>
                  <textarea
                    rows="2"
                    value={batchFormData.qc_notes}
                    onChange={(e) => setBatchFormData({...batchFormData, qc_notes: e.target.value})}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#CFBF9F] rounded-xl focus:ring-2 focus:ring-[#2D4A3E]"
                  ></textarea>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EDE4D5] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBatchModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#576B5A] hover:bg-[#FAF8F3] rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold bg-[#2D4A3E] text-white rounded-xl hover:bg-[#1E332B] transition-colors"
                >
                  Lưu thông tin Lô
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: XEM VÀ TẢI MÃ QR ĐƠN LẺ */}
      {qrModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-sm bg-white rounded-3xl border border-[#DFD5C2] shadow-2xl p-6 text-center space-y-4">
            <button
              onClick={() => setQrModalItem(null)}
              className="absolute top-4 right-4 text-[#7A8C7E] hover:text-[#1E3125]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase font-mono tracking-widest text-[#5A735E] bg-[#E5EDE2] px-2.5 py-1 rounded-md">
              Tem QR In Ấn
            </span>

            <h3 className="font-mono text-xl font-bold text-[#1E3125]">
              {qrModalItem.serial_number}
            </h3>

            {qrDataUrl && (
              <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#DDD3BF] inline-block shadow-inner">
                <img src={qrDataUrl} alt={qrModalItem.serial_number} className="w-48 h-48 mx-auto" />
              </div>
            )}

            <p className="text-[11px] text-[#637765]">
              Đường dẫn tra cứu:<br />
              <code className="text-[#2D4A3E] font-bold">
                {window.location.origin}/product/{qrModalItem.serial_number}
              </code>
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => QRGenerator.downloadSinglePNG(qrModalItem.serial_number)}
                className="py-2.5 px-3 rounded-xl bg-[#2D4A3E] text-white text-xs font-semibold hover:bg-[#1E332B] transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Tải PNG
              </button>
              <button
                onClick={() => QRGenerator.downloadSingleSVG(qrModalItem.serial_number)}
                className="py-2.5 px-3 rounded-xl bg-[#EAE2D2] text-[#243F30] text-xs font-semibold hover:bg-[#DFD5C2] transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Tải SVG
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
