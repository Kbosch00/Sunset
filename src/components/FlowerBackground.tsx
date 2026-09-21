import Image from "next/image";

export function FlowerBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <Image
        src="tulip-1.svg"
        alt=""
        width={320}
        height={448}
        className="absolute -bottom-6 -right-8 w-40 sm:w-56 md:w-72 lg:w-80 h-auto opacity-20"
        priority
      />
      <Image
        src="lily-1.svg"
        alt=""
        width={288}
        height={340}
        className="absolute -bottom-10 -left-10 w-44 sm:w-60 md:w-72 h-auto opacity-20"
        priority
      />
      <Image
        src="tulip-2.svg"
        alt=""
        width={160}
        height={240}
        className="absolute top-1/3 -left-6 w-24 sm:w-32 md:w-40 h-auto opacity-20 rotate-15"
      />
      <Image
        src="tulip-2.svg"
        alt=""
        width={112}
        height={168}
        className="absolute top-24 -right-4 w-24 sm:w-32 md:w-40  h-auto opacity-20 -rotate-12"
      />
    </div>
  );
}
