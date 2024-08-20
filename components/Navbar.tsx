"use client"; // This marks the component as a Client Component

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navbarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 flex justify-center bg-gray-800 py-1 ">
      <ul className="flex space-x-8 text-white">
        {navbarLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 items-center p-4 rounded-lg justify-start hover:bg-blue-1",
                {
                  "bg-blue-1": isActive,
                }
              )}
            >
              <Image
                src={link.imgUrl}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </ul>
      {/* <div> */}
      {/* </div> */}
      {/* <MobileNav /> */}
    </nav>
  );
};

export default Navbar;

// // src/components/Navbar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { navbarLinks } from "@/constants";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import { useTheme } from "@/context/ThemeContext";
// import { useEffect } from "react";

// const Navbar = () => {
//   const pathname = usePathname();
//   const { isDarkTheme, toggleTheme } = useTheme();

//   useEffect(() => {
//     document.body.className = isDarkTheme ? "dark" : "";
//   }, [isDarkTheme]);

//   return (
//     <nav
//       className={cn(
//         "sticky flex justify-center py-1",
//         isDarkTheme ? "bg-black" : "bg-gray-800"
//       )}
//     >
//       <ul className="flex space-x-8">
//         {navbarLinks.map((link) => {
//           const isActive =
//             pathname === link.route || pathname.startsWith(`${link.route}/`);

//           return (
//             <Link
//               href={link.route}
//               key={link.label}
//               className={cn(
//                 "flex gap-4 items-center p-4 rounded-lg justify-start hover:bg-blue-1",
//                 {
//                   "bg-blue-1": isActive,
//                   "text-white": isDarkTheme,
//                   "text-black": !isDarkTheme,
//                 }
//               )}
//             >
//               <Image
//                 src={link.imgUrl}
//                 alt={link.label}
//                 width={24}
//                 height={24}
//               />
//               <p className="text-lg font-semibold max-lg:hidden">
//                 {link.label}
//               </p>
//             </Link>
//           );
//         })}
//       </ul>
//       <button
//         onClick={toggleTheme}
//         className={cn(
//           "ml-4 px-4 py-2 rounded-lg font-semibold",
//           isDarkTheme ? "bg-white text-black" : "bg-black text-white"
//         )}
//       >
//         {isDarkTheme ? "Light Mode" : "Dark Mode"}
//       </button>
//     </nav>
//   );
// };

// export default Navbar;
