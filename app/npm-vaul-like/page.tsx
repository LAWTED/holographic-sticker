"use client";
import React from "react";
import HologramSticker from "hologram-sticker";

const NpmVaulLike = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        fontFamily:
          "'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif, system-ui",
      }}
    >
      <div
        style={{
          content: "",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          background: `
            radial-gradient(
              1px 1px at 20px 30px,
              #fff4,
              transparent
            ),
            radial-gradient(
              1px 1px at 40px 70px,
              #fff4,
              transparent
            ),
            radial-gradient(
              1px 1px at 90px 40px,
              #fff4,
              transparent
            ),
            radial-gradient(
              1px 1px at 130px 80px,
              #fff4,
              transparent
            ),
            radial-gradient(
              2px 2px at 160px 30px,
              #fff4,
              transparent
            )
          `,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 100px",
          top: 0,
          transformStyle: "flat",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <HologramSticker.Root theme="dark">
        <HologramSticker.Controls />
        <HologramSticker.Minimap />
        <HologramSticker.Scene>
          {/* First Card - Jhey Tompkins */}
          <HologramSticker.Card>
            {/* Front of card - Complete 8 layer structure */}
            <HologramSticker.Front>
              {/* Layer 1: Base image */}
              <HologramSticker.ImageLayer
                src="https://assets.codepen.io/605876/headshot--square.jpeg"
                alt="Person"
              />

              {/* Layer 2: Pattern holographic effect */}
              <HologramSticker.Pattern
                textureUrl="https://assets.codepen.io/605876/figma-texture.png"
                opacity={0.4}
                mixBlendMode="multiply"
              >
                <HologramSticker.Refraction intensity={1} />
              </HologramSticker.Pattern>

              {/* Layer 3: Watermark effect */}
              <HologramSticker.Watermark
                imageUrl="https://assets.codepen.io/605876/shopify-pattern.svg"
                opacity={1}
              >
                <HologramSticker.Refraction intensity={1} />
              </HologramSticker.Watermark>

              {/* Layer 4: Frame with content */}
              <HologramSticker.Frame emboss>
                <div
                  style={{
                    position: "absolute",
                    top: "var(--sticker-card-border-radius)",
                    right: "var(--sticker-card-border-radius)",
                    textAlign: "right",
                    letterSpacing: "-0.05em",
                    fontWeight: 1000,
                    lineHeight: 1,
                    zIndex: 100,
                    margin: 0,
                  }}
                >
                  <span
                    style={{
                      filter: "url(#sticker-filter)",
                      fontSize: "10cqi",
                      display: "block",
                    }}
                  >
                    Jhey Tompkins
                  </span>
                  <span
                    style={{
                      filter: "url(#sticker-filter)",
                      fontSize: "5cqi",
                      display: "block",
                    }}
                  >
                    Staff Design Engineer
                  </span>
                </div>

                {/* Signature */}
                <svg
                  style={{
                    color: "hsl(45 20% 60%)",
                    position: "absolute",
                    zIndex: 100,
                    width: "38cqi",
                    bottom: "calc(var(--sticker-card-border-radius) * 1.1)",
                    right: "calc(var(--sticker-card-border-radius) * 0.6)",
                    rotate: "20deg",
                  }}
                  viewBox="0 0 271 209"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M40.3725 26.8984C58.6558 41.1564 141.659 43.1867 128.248 5.48254C127.911 4.53766 127.085 2.2403 125.938 2.0095C124.714 1.76297 121.929 6.39448 121.627 6.82375C100.965 36.1863 95.2641 73.5992 74.5923 102.644C63.7045 117.942 14.7891 145.678 5.55986 113.481C-17.5939 32.705 78.7483 76.0672 105.741 67.4678C119.757 63.0021 125.297 50.6825 132.831 39.1622C135.218 35.5126 137.628 24.6153 140.043 28.2467C144.771 35.3581 119.642 69.8761 115.559 78.4692C110.959 88.1482 129.228 46.7461 136.796 54.3333C146.229 63.7897 128.236 82.7359 153.367 61.6804C157.634 58.1059 166.582 46.4029 161.033 46.8455C153.977 47.4085 141.565 67.0198 151.685 70.0327C161.531 72.9635 176.039 38.7196 174.012 48.7901C173.009 53.769 168.343 67.3695 175.978 68.9069C186.537 71.0328 191.574 35.8659 197.537 44.8359C240.356 109.24 81.7126 283.324 50.2184 167.261C25.2159 75.1229 240.563 89.2082 268.88 137.08"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="1"
                  />
                </svg>

                {/* Sticker */}
                <div
                  style={{
                    position: "absolute",
                    width: "calc(var(--sticker-card-border-radius) * 2.75)",
                    bottom: "calc(var(--sticker-card-border-radius) * 0.75)",
                    left: "calc(var(--sticker-card-border-radius) * 0.65)",
                    zIndex: 100,
                  }}
                >
                  <ShopifyLogo />
                </div>

                {/* Portrait image */}
                <HologramSticker.ImageLayer
                  src="https://assets.codepen.io/605876/headshot--square-transparent.png"
                  alt=""
                />
              </HologramSticker.Frame>

              {/* Layer 5: Spotlight */}
              <HologramSticker.Spotlight intensity={1} />

              {/* Layer 6: Glare effect */}
              <HologramSticker.Glare animate />
            </HologramSticker.Front>
          </HologramSticker.Card>
        </HologramSticker.Scene>
        <HologramSticker.Filters />
      </HologramSticker.Root>
      <HologramSticker.Root theme="dark">
        <HologramSticker.Controls />
        <HologramSticker.Minimap />
        <HologramSticker.Scene>
          {/* First Card - Jhey Tompkins */}
          <HologramSticker.Card>
            {/* Front of card - Complete 8 layer structure */}
            <HologramSticker.Front>
              {/* Layer 1: Base image */}
              <HologramSticker.ImageLayer
                src="https://assets.codepen.io/605876/headshot--square.jpeg"
                alt="Person"
              />

              {/* Layer 2: Pattern holographic effect */}
              <HologramSticker.Pattern
                textureUrl="https://assets.codepen.io/605876/figma-texture.png"
                opacity={0.4}
                mixBlendMode="multiply"
              >
                <HologramSticker.Refraction intensity={1} />
              </HologramSticker.Pattern>

              {/* Layer 3: Watermark effect */}
              <HologramSticker.Watermark
                imageUrl="https://assets.codepen.io/605876/shopify-pattern.svg"
                opacity={1}
              >
                <HologramSticker.Refraction intensity={1} />
              </HologramSticker.Watermark>

              {/* Layer 4: Frame with content */}
              <HologramSticker.Frame emboss>
                <div
                  style={{
                    position: "absolute",
                    top: "var(--sticker-card-border-radius)",
                    right: "var(--sticker-card-border-radius)",
                    textAlign: "right",
                    letterSpacing: "-0.05em",
                    fontWeight: 1000,
                    lineHeight: 1,
                    zIndex: 100,
                    margin: 0,
                  }}
                >
                  <span
                    style={{
                      filter: "url(#sticker-filter)",
                      fontSize: "10cqi",
                      display: "block",
                    }}
                  >
                    Jhey Tompkins
                  </span>
                  <span
                    style={{
                      filter: "url(#sticker-filter)",
                      fontSize: "5cqi",
                      display: "block",
                    }}
                  >
                    Staff Design Engineer
                  </span>
                </div>

                {/* Signature */}
                <svg
                  style={{
                    color: "hsl(45 20% 60%)",
                    position: "absolute",
                    zIndex: 100,
                    width: "38cqi",
                    bottom: "calc(var(--sticker-card-border-radius) * 1.1)",
                    right: "calc(var(--sticker-card-border-radius) * 0.6)",
                    rotate: "20deg",
                  }}
                  viewBox="0 0 271 209"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M40.3725 26.8984C58.6558 41.1564 141.659 43.1867 128.248 5.48254C127.911 4.53766 127.085 2.2403 125.938 2.0095C124.714 1.76297 121.929 6.39448 121.627 6.82375C100.965 36.1863 95.2641 73.5992 74.5923 102.644C63.7045 117.942 14.7891 145.678 5.55986 113.481C-17.5939 32.705 78.7483 76.0672 105.741 67.4678C119.757 63.0021 125.297 50.6825 132.831 39.1622C135.218 35.5126 137.628 24.6153 140.043 28.2467C144.771 35.3581 119.642 69.8761 115.559 78.4692C110.959 88.1482 129.228 46.7461 136.796 54.3333C146.229 63.7897 128.236 82.7359 153.367 61.6804C157.634 58.1059 166.582 46.4029 161.033 46.8455C153.977 47.4085 141.565 67.0198 151.685 70.0327C161.531 72.9635 176.039 38.7196 174.012 48.7901C173.009 53.769 168.343 67.3695 175.978 68.9069C186.537 71.0328 191.574 35.8659 197.537 44.8359C240.356 109.24 81.7126 283.324 50.2184 167.261C25.2159 75.1229 240.563 89.2082 268.88 137.08"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="1"
                  />
                </svg>

                {/* Sticker */}
                <div
                  style={{
                    position: "absolute",
                    width: "calc(var(--sticker-card-border-radius) * 2.75)",
                    bottom: "calc(var(--sticker-card-border-radius) * 0.75)",
                    left: "calc(var(--sticker-card-border-radius) * 0.65)",
                    zIndex: 100,
                  }}
                >
                  <ShopifyLogo />
                </div>

                {/* Portrait image */}
                <HologramSticker.ImageLayer
                  src="https://assets.codepen.io/605876/headshot--square-transparent.png"
                  alt=""
                />
              </HologramSticker.Frame>

              {/* Layer 5: Spotlight */}
              <HologramSticker.Spotlight intensity={1} />

              {/* Layer 6: Glare effect */}
              <HologramSticker.Glare animate />
            </HologramSticker.Front>
          </HologramSticker.Card>
        </HologramSticker.Scene>
        <HologramSticker.Filters />
      </HologramSticker.Root>
    </div>
  );
};

const ShopifyLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.4424 2C11.9459 2 12.4309 2.19736 12.834 2.54395C13.886 2.67641 14.5463 3.39492 14.9531 4.12695C14.9629 4.12666 14.973 4.12598 14.9834 4.12598C15.0672 4.12598 15.1497 4.13696 15.2295 4.15723C15.3369 4.15986 15.4444 4.17904 15.5479 4.2168C15.6375 4.24958 15.7129 4.28866 15.7754 4.32715L15.9277 4.43555L15.9336 4.44043C16.038 4.52674 16.3555 4.83697 16.5879 5.06445C16.6718 5.14653 16.7544 5.22729 16.8271 5.29883C16.9299 5.30628 17.0455 5.3149 17.1621 5.32324C17.3399 5.33596 17.5194 5.34896 17.6582 5.3584C17.8286 5.36999 17.8758 5.37207 17.8496 5.37207C18.416 5.37207 18.895 5.78432 18.9932 6.33789H18.9941C18.9944 6.33958 18.9944 6.34291 18.9951 6.34766C18.9958 6.35188 18.9964 6.35612 18.9971 6.36035C19.0447 6.66662 19.5269 9.88637 20 13.0498C20.2478 14.7065 20.4953 16.3608 20.6807 17.6006C20.7733 18.2202 20.8503 18.7364 20.9043 19.0977C20.9313 19.2783 20.9523 19.4208 20.9668 19.5176C20.974 19.5658 20.9797 19.603 20.9834 19.6279C20.9853 19.6404 20.9864 19.6499 20.9873 19.6562C20.9877 19.6592 20.988 19.6615 20.9883 19.6631L20.9893 19.665C21.0673 20.1873 20.7253 20.6805 20.209 20.791L14.7383 21.9619C14.6696 21.9766 14.5995 21.9844 14.5293 21.9844H14.5117C14.495 21.9844 14.4785 21.9823 14.4619 21.9814C14.3428 22.0034 14.2194 22.006 14.0977 21.9834L3.81738 20.0732C3.29502 19.9762 2.94007 19.4868 3.00879 18.96V18.959C3.00895 18.9578 3.00945 18.9555 3.00977 18.9531C3.01041 18.9482 3.01144 18.9403 3.0127 18.9307C3.01521 18.9114 3.0186 18.8828 3.02344 18.8457C3.03319 18.7709 3.0472 18.6612 3.06543 18.5215C3.10191 18.2419 3.15401 17.842 3.2168 17.3613C3.34242 16.3996 3.51079 15.1132 3.68066 13.8164C4.00323 11.3539 4.33802 8.80754 4.39453 8.41992L4.41992 8.2334C4.43049 8.16437 4.44351 8.09076 4.46094 8.02051C4.50083 7.85986 4.58002 7.63519 4.7666 7.42773C4.94521 7.22918 5.15029 7.12714 5.28516 7.07031C5.4127 7.01657 5.55986 6.97143 5.6748 6.93555V6.93652C5.8434 6.87969 6.26083 6.74923 6.79102 6.58789C7.01733 5.83529 7.38744 4.90112 7.94824 4.07617C8.65879 3.03094 9.79438 2.00001 11.4424 2ZM8.44141 12.6699C8.46512 12.8773 8.52598 13.0209 8.5957 13.1338C8.69653 13.297 8.84542 13.4455 9.07324 13.6338C9.25478 13.7838 9.61582 14.0528 9.86816 14.3301C10.167 14.6585 10.4423 15.1192 10.4424 15.7451C10.4424 16.2802 10.1291 16.9729 9.4668 17.2822C9.81294 17.2261 10.0876 17.0743 10.2891 16.8594C10.5485 16.5825 10.751 16.1354 10.751 15.4883C10.751 14.8598 10.4364 14.4804 9.90723 14.0674C9.7707 13.9608 9.63557 13.8637 9.4834 13.7529C9.34086 13.6492 9.17593 13.528 9.02637 13.3994C8.85891 13.2554 8.60201 13.0136 8.44141 12.6699ZM11.0898 10.1641C10.9756 10.1641 10.866 10.1687 10.7607 10.1768C10.905 10.1896 11.0421 10.2095 11.1699 10.2344L11.1934 10.167C11.1599 10.1661 11.1254 10.1641 11.0898 10.1641Z"
      fill="#fff"
      stroke="#fff"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M14.5027 20.9843L19.9147 19.8135C19.9147 19.8135 17.9617 6.60375 17.9459 6.516C17.9324 6.429 17.8604 6.372 17.7877 6.372C17.7149 6.372 16.3409 6.27 16.3409 6.27C16.3409 6.27 15.3847 5.3145 15.2617 5.21175C15.2279 5.184 15.2054 5.169 15.1709 5.15625L14.4854 20.9843H14.5027ZM11.7824 11.4788C11.7824 11.4788 11.1749 11.1607 10.4519 11.1607C9.36669 11.1607 9.32394 11.8403 9.32394 12.0165C9.32394 12.9405 11.7539 13.3027 11.7539 15.4882C11.7539 17.2095 10.6739 18.3082 9.19944 18.3082C7.43394 18.3082 6.54444 17.2095 6.54444 17.2095L7.02894 15.645C7.02894 15.645 7.96269 16.4445 8.73894 16.4445C9.24519 16.4445 9.47019 16.0357 9.47019 15.7455C9.47019 14.5312 7.47969 14.475 7.47969 12.4763C7.45419 10.7985 8.65794 9.16425 11.0999 9.16425C12.0427 9.16425 12.5062 9.435 12.5062 9.435L11.7974 11.4713L11.7824 11.4788ZM11.3774 3.6225C11.4794 3.6225 11.5807 3.651 11.6812 3.72375C10.9432 4.0725 10.1332 4.953 9.80019 6.71775C9.30819 6.8775 8.83044 7.0215 8.38344 7.15125C8.77269 5.8125 9.71319 3.63 11.3774 3.63V3.6225ZM12.3037 5.83425V5.9355C11.7382 6.1095 11.1164 6.2985 10.5082 6.4875C10.8577 5.15475 11.5079 4.50375 12.0719 4.25925C12.2167 4.635 12.3037 5.14125 12.3037 5.83425ZM12.7079 4.15875C13.2284 4.21425 13.5637 4.809 13.7797 5.475C13.5179 5.5605 13.2284 5.64825 12.9112 5.7495V5.5605C12.9112 4.9965 12.8392 4.53225 12.7079 4.15725V4.15875ZM14.9519 5.1255C14.9369 5.1255 14.9069 5.14125 14.8934 5.14125C14.8799 5.14125 14.6767 5.1975 14.3579 5.29875C14.0407 4.374 13.4759 3.52125 12.4769 3.52125H12.3907C12.1012 3.15675 11.7517 3 11.4487 3C9.11919 3 8.00619 5.90775 7.65744 7.3845C6.76194 7.65825 6.11019 7.8615 6.03744 7.89C5.53119 8.04975 5.51694 8.064 5.45844 8.5425C5.40219 8.889 4.08594 19.0897 4.08594 19.0897L14.2567 21L14.9519 5.1255Z"
      fill="black"
    />
  </svg>
);

export default NpmVaulLike;
