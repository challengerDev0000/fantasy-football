import Image from "next/image";

const Header = () => {
  return (
    <header>
      <div className="flex flex-row items-center bg-black h-24 px-8 gap-4">
        <Image
          src="/images/logo.png"
          alt="Logo"
          className="w-12 h-auto"
          width={50}
          height={48}
        />
        <h1 className="text-white/90 text-[24px] font-normal ml-4">
          Fantasy Football
        </h1>
      </div>
    </header>
  );
};

export default Header;
