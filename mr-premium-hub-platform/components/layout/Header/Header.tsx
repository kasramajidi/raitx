"use client";

import LoginButton from "./LoginButton";
import CartIcon from "./CartIcon";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

interface HeaderProps {
  cartCount?: number;
  isAuthenticated?: boolean;
}

export default function Header({
  cartCount = 0,
  isAuthenticated = false,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="w-full px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20 xl:h-20 max-w-7xl mx-auto gap-2 sm:gap-3 md:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 order-1 shrink-0">
            <MobileMenu cartCount={cartCount} isAuthenticated={isAuthenticated} />
            <div className="hidden min-[500px]:flex items-center gap-2 sm:gap-3 md:gap-4">
              <CartIcon cartCount={cartCount} />
              <LoginButton isAuthenticated={isAuthenticated} />
            </div>
          </div>

          <div className="hidden min-[500px]:flex items-center flex-1 justify-center px-2 md:px-4 lg:px-6 xl:px-8 order-2 overflow-visible">
            <NavLinks />
          </div>

          <div className="shrink-0 order-3">
            <Logo />
          </div>
        </div>
      </div>
    </header>
  );
}

