import { footerItems } from '@/config';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="md:h-20 h-30 w-full p-3 border-t border-t-purple-2 flex md:flex-row flex-col items-center md:justify-between justify-around md:px-14 mt-4">
      <ul className="flex items-center text-sm text-[#64748B] font-medium">
        {footerItems.map((item, i) => (
          <li key={i} className="px-2">
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center">
        <p className="text-[#94A3B8]">© 2024 book_my_space. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
