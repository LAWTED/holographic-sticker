"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// 动态导入贴纸组件
const LightningSticker = dynamic(() => import("./lightning-sticker/page"), {
  ssr: false,
});
const OGSticker = dynamic(() => import("./OG-Sticker/page"), { ssr: false });
const LawtedSticker = dynamic(() => import("./lawted-sticker/page"), {
  ssr: false,
});

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    Record<string, "preview" | "code">
  >({
    "lightning-sticker": "preview",
    "og-sticker": "preview",
    "lawted-sticker": "preview",
  });

  const [sourceCode, setSourceCode] = useState<Record<string, string>>({});
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // 动态加载各个页面的源代码
    const loadSourceCode = async () => {
      try {
        const lightningStickerCode = await fetch(
          "/api/source/lightning-sticker"
        ).then((r) => r.text());
        const ogStickerCode = await fetch("/api/source/OG-Sticker").then((r) =>
          r.text()
        );
        const lawtedStickerCode = await fetch(
          "/api/source/lawted-sticker"
        ).then((r) => r.text());

        setSourceCode({
          "lightning-sticker": lightningStickerCode,
          "og-sticker": ogStickerCode,
          "lawted-sticker": lawtedStickerCode,
        });
      } catch (error) {
        console.error("Failed to load source code:", error);
        // Fallback to static code if API fails
        setSourceCode({
          "lightning-sticker": `"use client";
import HologramSticker from "hologram-sticker";

const LightningSticker = () => {
  return (
    <HologramSticker.Root>
      <HologramSticker.Controls />
      <HologramSticker.Minimap />
      <HologramSticker.Scene>
        <HologramSticker.Card className="border border-white rounded-2xl">
          <HologramSticker.ImageLayer
            src="/light.png"
            alt="Lightning"
            objectFit="contain"
          />
          <HologramSticker.Pattern
            maskUrl="/light.png"
            maskSize="contain"
            textureUrl="https://assets.codepen.io/605876/figma-texture.png"
            textureSize="6cqi"
            mixBlendMode="hard-light"
            opacity={0.7}
          >
            <HologramSticker.Refraction intensity={2} />
          </HologramSticker.Pattern>
          <HologramSticker.Content>
            <HologramSticker.ImageLayer
              src="/light.png"
              alt=""
              opacity={0.2}
              objectFit="contain"
            />
          </HologramSticker.Content>
        </HologramSticker.Card>
      </HologramSticker.Scene>
    </HologramSticker.Root>
  );
};

export default LightningSticker;`,
          "og-sticker": "",
          "lawted-sticker": "",
        });
      }
    };

    loadSourceCode();
  }, []);

  const toggleTab = (sticker: string, tab: "preview" | "code") => {
    setActiveTab((prev) => ({ ...prev, [sticker]: tab }));
  };

  const copyToClipboard = async (text: string, exampleId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [exampleId]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [exampleId]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const examples = [
    {
      id: "lightning-sticker",
      title: "Lightning Sticker",
      description:
        "Lightning holographic effect with mask patterns and refraction.",
      component: <LightningSticker />,
      href: "/lightning-sticker",
    },
    {
      id: "og-sticker",
      title: "OG Sticker",
      description:
        "Inspired by @jh3yy original holographic card design. All credits and inspiration go to the original creation.",
      component: <OGSticker />,
      href: "/OG-Sticker",
    },
    {
      id: "lawted-sticker",
      title: "Lawted Sticker",
      description:
        "This is me, @lawted",
      component: <LawtedSticker />,
      href: "/lawted-sticker",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-4">Hologram Sticker</h1>
          <p className="text-neutral-400 text-lg max-w-2xl">
            A React component library for creating stunning holographic sticker
            effects. Interactive, customizable, and performant.
          </p>
          <p className="text-neutral-500 text-sm max-w-3xl mt-4">
            Inspired by{" "}
            <a
              href="https://x.com/jh3yy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-white underline"
            >
              @jh3yy
            </a>
            &apos;s incredible{" "}
            <a
              href="https://codepen.io/jh3y/pen/EaVNNxa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-white underline"
            >
              holographic card design
            </a>
            . All inspiration and foundation code comes from this original work.
          </p>
        </div>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-neutral-900 px-4 py-2 rounded-lg font-mono text-sm">
            <span className="text-neutral-500">$</span>
            <span>npm install hologram-sticker</span>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-20">
          {examples.map((example) => (
            <div key={example.id}>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">{example.title}</h2>
                <p className="text-neutral-400">{example.description}</p>
              </div>

              {/* Tab Navigation */}
              <div className="flex items-center gap-0 mb-6">
                <button
                  onClick={() => toggleTab(example.id, "preview")}
                  className={`px-4 py-2 text-sm font-medium border-b transition-colors ${
                    activeTab[example.id] === "preview"
                      ? "border-white text-white"
                      : "border-transparent text-neutral-400 hover:text-white"
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => toggleTab(example.id, "code")}
                  className={`px-4 py-2 text-sm font-medium border-b transition-colors ${
                    activeTab[example.id] === "code"
                      ? "border-white text-white"
                      : "border-transparent text-neutral-400 hover:text-white"
                  }`}
                >
                  Code
                </button>
                <div className="ml-auto">
                  <Link
                    href={example.href}
                    target="_blank"
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    Open in new tab →
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="border bg-neutral-900 border-neutral-800 rounded-lg overflow-hidden">
                {activeTab[example.id] === "preview" ? (
                  <div
                    className="relative preview-container p-6"
                    style={{
                      width: "100%",
                      height: "30rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily:
                        "'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif, system-ui",
                    }}
                  >
                    {/* 嵌入的贴纸组件 */}
                    {example.component}
                  </div>
                ) : (
                  <div className="rounded-lg overflow-hidden bg-neutral-900 relative">
                    {/* Copy Button */}
                    <button
                      onClick={() =>
                        copyToClipboard(
                          sourceCode[example.id] || "",
                          example.id
                        )
                      }
                      className="absolute top-4 right-4 z-10 p-2 bg-neutral-800 hover:bg-neutral-700 rounded-md transition-colors text-neutral-400 hover:text-white"
                      title={copiedStates[example.id] ? "Copied!" : "Copy code"}
                    >
                      {copiedStates[example.id] ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect
                            x="9"
                            y="9"
                            width="13"
                            height="13"
                            rx="2"
                            ry="2"
                          />
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                        </svg>
                      )}
                    </button>

                    <SyntaxHighlighter
                      language="tsx"
                      style={oneDark}
                      customStyle={{
                        margin: 0,
                        padding: "1.5rem",
                        background: "transparent !important",
                        fontSize: "14px",
                      }}
                      showLineNumbers={false}
                    >
                      {sourceCode[example.id] || "Loading..."}
                    </SyntaxHighlighter>
                    <style jsx global>{`
                      .language-tsx {
                        background: transparent !important;
                      }
                      pre[class*="language-"] {
                        background: transparent !important;
                      }
                      code[class*="language-"] {
                        background: transparent !important;
                      }
                    `}</style>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 pt-12 border-t border-neutral-800">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div>
              <p className="text-neutral-400 text-sm">
                Built with React, TypeScript, and CSS animations.
              </p>
            </div>
            <div className="flex gap-6">
              <a
                href="https://github.com/lawtedwu/hologram-sticker"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/hologram-sticker"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                npm
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
