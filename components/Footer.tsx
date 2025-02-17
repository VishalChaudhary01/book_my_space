import Link from "next/link";
import { footerItems } from "@/config";

export const Footer = () => {
  return (
    <footer className="w-full md:h-20 h-16 p-3 border-t mt-12 border-t-purple-2 dark:border-t-dark-2 flex items-center bg-white dark:bg-dark-3">
      <div className="w-full md:container md:mx-auto flex md:flex-row flex-col items-center md:justify-between justify-around md:px-14">
        <ul className="flex items-center text-sm text-[#64748B] dark:text-dark-1/50 font-medium">
          {footerItems.map((item, i) => (
            <li key={i} className="px-2">
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center">
          <p className="text-[#94A3B8] dark:text-dark-1/50 text-sm">
            © 2024 book_my_space. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
