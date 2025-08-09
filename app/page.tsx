import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🌟 Hologram Sticker
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            A React library for creating stunning holographic sticker effects
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">📦 NPM Package</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Complete hologram-sticker library ready for production
            </p>
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
              npm install hologram-sticker
            </code>
          </div>

          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">⚡ Light Sticker</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Original lightning holographic effect implementation
            </p>
            <Link 
              href="/light-sticker"
              className="text-purple-500 hover:text-purple-600 font-medium"
            >
              View Original →
            </Link>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white gap-2 hover:from-purple-600 hover:to-pink-600 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 sm:w-auto"
            href="/demo"
          >
            🎨 Interactive Demo
          </Link>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="https://github.com/lawtedwu/hologram-sticker"
            target="_blank"
            rel="noopener noreferrer"
          >
            📚 Documentation
          </a>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg w-full max-w-2xl">
          <h3 className="text-lg font-semibold mb-3">Quick Start Example:</h3>
          <pre className="text-sm bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded overflow-x-auto">
{`import { HologramSticker } from 'hologram-sticker';

<HologramSticker.Root>
  <HologramSticker.Card>
    <HologramSticker.Background 
      src="/image.png" 
      alt="Hologram" 
    />
    <HologramSticker.Pattern>
      <HologramSticker.Refraction />
    </HologramSticker.Pattern>
    <HologramSticker.Overlay 
      src="/image.png" 
      alt="Hologram" 
    />
  </HologramSticker.Card>
</HologramSticker.Root>`}
          </pre>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
