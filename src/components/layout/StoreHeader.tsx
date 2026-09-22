import { AnnouncementBar } from './AnnouncementBar';
import { Navbar } from './Navbar';

const announcements = [
      'จัดส่งฟรี เมื่อสั่งซื้อครบ ฿2,500',
          'พบกับ Heritage Collection ใหม่',
          'รับเปลี่ยนสินค้าภายใน 14 วัน',
];

export function StoreHeader() {
  return (
    <header>
      <AnnouncementBar
        messages={announcements}
        interval={4500}
      />
      <Navbar />
    </header>
  );
}