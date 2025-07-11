import React from "react";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";

export const HeroSection = (): JSX.Element => {
  // Navigation links data
  const navLinks = [
    { text: "Home", className: "whitespace-nowrap" },
    { text: "About us" },
    { text: "Services" },
    { text: "Contact" },
  ];

  return (
    <header className="w-full h-[170px] bg-white">
      <div className="max-w-[1920px] h-full mx-auto relative flex items-center justify-between px-[108px]">
        {/* Logo */}
        <div className="[font-family:'Horizon-Regular',Helvetica] font-normal text-black text-[40px]">
          Dream X<br />
          Store
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {navLinks.map((link, index) => (
            <Button
              key={index}
              variant="link"
              className={`[font-family:'Azeret_Mono',Helvetica] font-normal text-black text-2xl p-0 h-auto ${link.className || ""}`}
            >
              {link.text}
            </Button>
          ))}

          {/* CTA Button */}
          <Button className="w-[223px] h-[86px] bg-[#f0ff7f] rounded-none hover:bg-[#e5f570]">
            <span className="[font-family:'Azeret_Mono',Helvetica] font-normal text-[#004d84] text-2xl">
              Get Stared
            </span>
          </Button>

          {/* User Avatar */}
          <Avatar className="w-[72px] h-[73px]">
            <AvatarImage
              src="/ellipse-1.png"
              alt="User profile"
              className="object-cover"
            />
          </Avatar>
        </nav>
      </div>
    </header>
  );
};
