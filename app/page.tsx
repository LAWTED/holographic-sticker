"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Edit, Check, Copy, ExternalLink } from "lucide-react";

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
        const [lightningStickerCode, ogStickerCode, lawtedStickerCode] = await Promise.all([
          fetch("/api/source/lightning-sticker").then((r) => r.text()),
          fetch("/api/source/OG-Sticker").then((r) => r.text()),
          fetch("/api/source/lawted-sticker").then((r) => r.text())
        ]);

        setSourceCode({
          "lightning-sticker": lightningStickerCode,
          "og-sticker": ogStickerCode,
          "lawted-sticker": lawtedStickerCode,
        });
      } catch (error) {
        console.error("Failed to load source code:", error);
        setSourceCode({
          "lightning-sticker": "// Loading error - please refresh the page",
          "og-sticker": "// Loading error - please refresh the page",
          "lawted-sticker": "// Loading error - please refresh the page",
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
          <h1 className="text-4xl font-bold mb-4">Holographic Sticker</h1>
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

        <div className="mb-12 space-y-8">
          {/* Getting Started Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Developers */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Copy size={18} className="text-neutral-400" />
                <h3 className="text-lg font-semibold">For Developers</h3>
              </div>
              <p className="text-neutral-400 text-sm">
                Install the package and integrate holographic stickers into your React project with full customization control.
              </p>
              <div className="inline-flex items-center gap-2 bg-neutral-900 px-4 py-2 rounded-lg font-mono text-sm relative group">
                <span className="text-neutral-500">$</span>
                <span>npm install holographic-sticker</span>
                <button
                  onClick={() => copyToClipboard("npm install holographic-sticker", "npm-install")}
                  className="ml-2 p-1 opacity-0 group-hover:opacity-100 hover:bg-neutral-800 rounded transition-all"
                  title={copiedStates["npm-install"] ? "Copied!" : "Copy command"}
                >
                  {copiedStates["npm-install"] ? (
                    <Check size={14} className="text-green-400" />
                  ) : (
                    <Copy size={14} className="text-neutral-400" />
                  )}
                </button>
              </div>
              <p className="text-neutral-500 text-xs">
                → Check out the code examples below
              </p>
            </div>

            {/* For Designers */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Edit size={18} className="text-neutral-400" />
                <h3 className="text-lg font-semibold">For Designers</h3>
              </div>
              <p className="text-neutral-400 text-sm">
                Use our interactive editor to experiment with different effects, customize layers, and see changes in real-time.
              </p>
              <div className="inline-flex items-center bg-neutral-800 px-4 py-2 rounded-lg text-sm border border-neutral-700">
                <Link
                  href="/sticker-editor"
                  target="_blank"
                  className="text-white hover:text-neutral-300 transition-colors font-medium"
                >
                  Open Interactive Editor
                </Link>
              </div>
              <p className="text-neutral-500 text-xs">
                → No coding required, visual interface
              </p>
            </div>
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
                <div className="ml-auto flex items-center gap-4">
                  <div className="inline-flex items-center bg-neutral-800 px-3 py-1.5 rounded-md text-sm border border-neutral-700">
                    <Link
                      href={`/sticker-editor?sticker=${example.id}`}
                      className="text-white hover:text-neutral-300 transition-colors font-medium"
                    >
                      Open in Editor
                    </Link>
                  </div>
                  <Link
                    href={example.href}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    Open in new tab
                    <ExternalLink size={12} />
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
                        <Check size={16} />
                      ) : (
                        <Copy size={16} />
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
                href="https://github.com/LAWTED/holographic-sticker"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/holographic-sticker"
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
