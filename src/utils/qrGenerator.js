import QRCode from 'qrcode';
import JSZip from 'jszip';

export const QRGenerator = {
  /**
   * Tạo Data URL dạng PNG cho một mã serial
   */
  generateQRDataURL: async (serialNumber, domain = window.location.origin) => {
    const url = `${domain}/product/${serialNumber}`;
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 320,
        margin: 2,
        color: {
          dark: '#1F332A', // Herb dark green
          light: '#FBF9F5'  // Herbal off-white background
        },
        errorCorrectionLevel: 'H'
      });
      return dataUrl;
    } catch (err) {
      console.error('Error generating QR PNG:', err);
      throw err;
    }
  },

  /**
   * Tạo chuỗi SVG cho một mã serial
   */
  generateQRSVG: async (serialNumber, domain = window.location.origin) => {
    const url = `${domain}/product/${serialNumber}`;
    try {
      const svgString = await QRCode.toString(url, {
        type: 'svg',
        margin: 2,
        color: {
          dark: '#1F332A',
          light: '#FBF9F5'
        },
        errorCorrectionLevel: 'H'
      });
      return svgString;
    } catch (err) {
      console.error('Error generating QR SVG:', err);
      throw err;
    }
  },

  /**
   * Tải xuống 1 mã QR dạng PNG
   */
  downloadSinglePNG: async (serialNumber, domain) => {
    const dataUrl = await QRGenerator.generateQRDataURL(serialNumber, domain);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `QR_${serialNumber}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  /**
   * Tải xuống 1 mã QR dạng SVG
   */
  downloadSingleSVG: async (serialNumber, domain) => {
    const svgStr = await QRGenerator.generateQRSVG(serialNumber, domain);
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `QR_${serialNumber}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  /**
   * Đóng gói toàn bộ QR của một lô vào file ZIP (kèm file CSV đối chiếu in ấn)
   */
  downloadBatchZip: async (batchCode, productsList, domain = window.location.origin) => {
    const zip = new JSZip();
    const qrFolder = zip.folder(`QR_Codes_${batchCode}`);

    // 1. Tạo file CSV / TXT danh sách serial đối chiếu
    let manifestCsv = "STT,Mã sản phẩm (Serial),Mã Lô (Batch ID),Đường dẫn truy xuất (URL)\n";

    for (let i = 0; i < productsList.length; i++) {
      const p = productsList[i];
      const targetUrl = `${domain}/product/${p.serial_number}`;
      manifestCsv += `${i + 1},${p.serial_number},${batchCode},${targetUrl}\n`;

      // Tạo QR PNG dạng base64
      const dataUrl = await QRGenerator.generateQRDataURL(p.serial_number, domain);
      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
      qrFolder.file(`${p.serial_number}.png`, base64Data, { base64: true });
    }

    // Thêm file manifest vào ZIP
    zip.file(`Danh_sach_doi_chieu_in_${batchCode}.csv`, "\uFEFF" + manifestCsv); // Thêm BOM để Excel đọc đúng tiếng Việt

    const content = await zip.generateAsync({ type: "blob" });
    const downloadUrl = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `HERBFOOT_QR_PACKAGE_${batchCode}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  }
};
