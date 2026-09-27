import { getConnectedDevice } from "@/src/app/actions/lovense";
import { LoveControls } from "@/src/components/together/LoveControls";

export default async function TogetherPage() {
  const device = await getConnectedDevice();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center px-4 pb-28 pt-14">
      <p className="mb-3 text-sm tracking-[0.2em] text-stone-400 uppercase">
        Juntos
      </p>
      <h1 className="font-display mb-10 text-3xl font-medium text-stone-800 sm:text-4xl">
        Aunque estemos lejos
      </h1>
      <LoveControls connected={!!device} />
    </main>
  );
}
