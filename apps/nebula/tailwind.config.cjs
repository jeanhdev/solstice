// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        "inter-variant": ["Inter var experimental", "sans-serif"],
        "suisse-intl": ["Suisse Intl", "sans-serif"],
        "suisse-mono": ["Suisse Intl Mono", "monospace"],
        body: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      borderWidth: {
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
      },
      padding: {
        0: "0px",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
        20: "80px",
      },
      gap: {
        0: "0px",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
        20: "80px",
        0.5: "2px",
        1.5: "6px",
        2.5: "10px",
      },
      colors: {
        gray: {
          50: "#f7fafc",
          100: "#edf2f7",
          200: "#e2e8f0",
          300: "#cbd5e0",
          400: "#a0aec0",
          500: "#718096",
          600: "#4a5568",
          700: "#2d3748",
          800: "#1a202c",
          900: "#171923",
        },
        red: {
          50: "#fff5f5",
          100: "#fed7d7",
          200: "#feb2b2",
          300: "#fc8181",
          400: "#f56565",
          500: "#e53e3e",
          600: "#c53030",
          700: "#9b2c2c",
          800: "#822727",
          900: "#63171b",
        },
        orange: {
          50: "#FFFAF0",
          100: "#FEEBC8",
          200: "#FBD38D",
          300: "#F6AD55",
          400: "#ED8936",
          500: "#DD6B20",
          600: "#C05621",
          700: "#9C4221",
          800: "#7B341E",
          900: "#652B19",
          crazy: "rgba(255,140,63,.98)",
        },
        yellow: {
          50: "#FFFFF0",
          100: "#FEFCBF",
          200: "#FAF089",
          300: "#F6E05E",
          400: "#ECC94B",
          500: "#D69E2E",
          600: "#B7791F",
          700: "#975A16",
          800: "#744210",
          900: "#5F370E",
        },
        green: {
          50: "#F0FFF4",
          100: "#C6F6D5",
          200: "#9AE6B4",
          300: "#68D391",
          400: "#48BB78",
          500: "#38A169",
          600: "#2F855A",
          700: "#276749",
          800: "#22543D",
          900: "#1C4532",
        },
        teal: {
          50: "#E6FFFA",
          100: "#B2F5EA",
          200: "#81E6D9",
          300: "#4FD1C5",
          400: "#38B2AC",
          500: "#319795",
          600: "#2C7A7B",
          700: "#285E61",
          800: "#234E52",
          900: "#1D4044",
        },
        blue: {
          50: "#ebf8ff",
          100: "#bee3f8",
          200: "#90cdf4",
          300: "#63b3ed",
          400: "#4299e1",
          500: "#3182ce",
          600: "#2b6cb0",
          700: "#2c5282",
          800: "#2a4365",
          900: "#1A365D",
        },
        cyan: {
          50: "#EDFDFD",
          100: "#C4F1F9",
          200: "#9DECF9",
          300: "#76E4F7",
          400: "#0BC5EA",
          500: "#00B5D8",
          600: "#00A3C4",
          700: "#0987A0",
          800: "#086F83",
          900: "#065666",
        },
        purple: {
          50: "#FAF5FF",
          100: "#E9D8FD",
          200: "#D6BCFA",
          300: "#B794F4",
          400: "#9F7AEA",
          500: "#805AD5",
          600: "#6B46C1",
          700: "#553C9A",
          800: "#44337A",
          900: "#322659",
        },
        pink: {
          50: "#FFF5F7",
          100: "#FED7E2",
          200: "#FBB6CE",
          300: "#F687B3",
          400: "#ED64A6",
          500: "#D53F8C",
          600: "#B83280",
          700: "#97266D",
          800: "#702459",
          900: "#521B41",
        },
        linkedin: {
          50: "#E8F4F9",
          100: "#CFEDFB",
          200: "#9BDAF3",
          300: "#68C7EC",
          400: "#34B3E4",
          500: "#00A0DC",
          600: "#008CC9",
          700: "#0077B5",
          800: "#005E93",
          900: "#004471",
        },
        facebook: {
          50: "#E8F4F9",
          100: "#D9DEE9",
          200: "#B7C2DA",
          300: "#6482C0",
          400: "#4267B2",
          500: "#385898",
          600: "#314E89",
          700: "#29487D",
          800: "#223B67",
          900: "#1E355B",
        },
        messenger: {
          50: "#D0E6FF",
          100: "#B9DAFF",
          200: "#A2CDFF",
          300: "#7AB8FF",
          400: "#2E90FF",
          500: "#0078FF",
          600: "#0063D1",
          700: "#0052AC",
          800: "#003C7E",
          900: "#002C5C",
        },
        whatsapp: {
          50: "#dffeec",
          100: "#b9f5d0",
          200: "#90edb3",
          300: "#65e495",
          400: "#3cdd78",
          500: "#22c35e",
          600: "#179848",
          700: "#0c6c33",
          800: "#01421c",
          900: "#001803",
        },
        twitter: {
          50: "#E5F4FD",
          100: "#C8E9FB",
          200: "#A8DCFA",
          300: "#83CDF7",
          400: "#57BBF5",
          500: "#1DA1F2",
          600: "#1A94DA",
          700: "#1681BF",
          800: "#136B9E",
          900: "#0D4D71",
        },
        telegram: {
          50: "#E3F2F9",
          100: "#C5E4F3",
          200: "#A2D4EC",
          300: "#7AC1E4",
          400: "#47A9DA",
          500: "#0088CC",
          600: "#007AB8",
          700: "#006BA1",
          800: "#005885",
          900: "#003F5E",
        },
        dark: "#0D0E12",
        "off-black": "#0f0f0f",
        "light-black": "#1c1d21",
        "dark-gray": "#181818",
        "blue-gray": "#2d2e31",
        subtitle: "#8a8f98",
        link: "#0a8de5",
        badge: "#868F98",
        "gradient-main":
          "linear-gradient(90deg, #6557FF 0%, #AA3FFF 29.43%, #AA3FFF 68.23%, #F8522E 100%)",
        "brand-indigo-gradient":
          "linear-gradient(261.83deg, rgba(25, 28, 34, 0.8) -115.2%, rgba(91, 33, 255, 0.8) -8.32%, rgba(47, 95, 247, 0.8) 105.47%)",
        "brand-cerise-gradient":
          "linear-gradient(88.32deg, rgba(229, 65, 144, 0.9) 33.07%, rgba(248, 82, 46, 0.9) 328.85%)",
        "brand-flame-gradient":
          "linear-gradient(257.92deg, #5B21FF -282.43%, #F8522E 101.94%)",
        "yield-gradient":
          "linear-gradient(165deg, #5B21FF 46.58%, #8A61FF 126.36%)",
        "light-blue-gradient":
          "linear-gradient(167.27deg, #5B21FF 8.55%, #5276EC 8.56%, #5A4BFF 117.4%)",
        "brand-indigo": "#3C5DC7",
        "brand-electric": "#5B21FF",
        "brand-orchid": "#AA3FFF",
        "brand-cerise": "#E54190",
        "brand-flame": "#E54190",
        "content-inverse-strong": "#15181E",
        "content-inverse-default": "#15181ef5",
        "content-inverse-moderate": "#15181ed6",
        "content-inverse-weak": "#15181ea3",
        "content-strong": "#ffffff",
        "content-default": "#d2d4d7",
        "content-moderate": "#e3e5e8b8",
        "content-weak": "#e3e5e885",
        "divider-weak": "#2B303B",
        "divider-default": "#3F4550",
        "divider-mid": "#464c57",
        "divider-strong": "#535965",
        "divider-inverse-weak": "#D3D5D9",
        "divider-inverse-default": "#BDC0C7",
        "divider-inverse-strong": "#A7ABB4",
        "static-content-sentiment-informative": "#809fff",
        "static-content-sentiment-neutral": "#afb5c0",
        "static-content-sentiment-positive": "#7bcc7e",
        "static-content-sentiment-caution": "#dba060",
        "static-content-sentiment-negative": "#e08787",
        "static-content-sentiment-inverse-informative": "#284185",
        "static-content-sentiment-inverse-neutral": "#212631",
        "static-content-sentiment-inverse-positive": "#1f4d22",
        "static-content-sentiment-inverse-caution": "#6c3b0b",
        "static-content-sentiment-inverse-negative": "#661919",
        "static-surface-nested": "#111318",
        "static-surface-default": "#15181e",
        "static-surface-raised": "#1a1d23",
        "static-surface-elevated": "#22262f",
        "static-surface-scrim": "#000000B8",
        "static-surface-inverse-nested": "#eeeff1",
        "static-surface-inverse-default": "#ffffff",
        "static-surface-inverse-raised": "#e3e5e8",
        "static-surface-inverse-elevated": "#d3d5d9",
        "static-surface-inverse-scrim": "#15181eB8",
        "static-surface-sentiment-informative": "#3c5dc752",
        "static-surface-sentiment-neutral": "#454d5f52",
        "static-surface-sentiment-positive": "#2e733252",
        "static-surface-sentiment-caution": "#a3580852",
        "static-surface-sentiment-negative": "#c4313152",
        "static-surface-sentiment-inverse-informative": "#b2c6ff",
        "static-surface-sentiment-inverse-neutral": "#dddfe4",
        "static-surface-sentiment-inverse-positive": "#93d995",
        "static-surface-sentiment-inverse-caution": "#e5ba85",
        "static-surface-sentiment-inverse-negative": "#e59c9c",
        "static-divider-sentiment-informative": "#456de552",
        "static-divider-sentiment-neutral": "#7d89a152",
        "static-divider-sentiment-positive": "#3d994252",
        "static-divider-sentiment-caution": "#c4751f52",
        "static-divider-sentiment-negative": "#d1494952",
        "interactive-fill-primary-enabled": "#3c5dc7",
        "interactive-fill-primary-hover": "#456de5",
        "interactive-fill-primary-pressed": "#5e81eb",
        "interactive-fill-primary-disabled": "#3c5dc73D",
        "interactive-fill-primary-on-enabled": "#f9f9fa",
        "interactive-fill-primary-on-disabled": "#f9f9fa52",
        "interactive-fill-primary-text": "#809fff",
        "interactive-fill-secondary-enabled": "#7d89a129",
        "interactive-fill-secondary-enabled-pure": "#21262f",
        "interactive-fill-secondary-hover": "#7d89a13d",
        "interactive-fill-secondary-pressed": "#7d89a152",
        "interactive-fill-secondary-disabled": "#7d89a10A",
        "interactive-fill-secondary-on-enabled": "#f9f9fa",
        "interactive-fill-secondary-on-disabled": "#f9f9fa52",
        "interactive-fill-secondary-text": "#afb5c0",
        "interactive-fill-inverse-enabled": "#2b303b",
        "interactive-fill-inverse-hover": "#22262f",
        "interactive-fill-inverse-pressed": "#1a1d23",
        "interactive-fill-inverse-disabled": "#2b303b3D",
        "interactive-fill-inverse-on-enabled": "#f9f9fa",
        "interactive-fill-inverse-on-disabled": "#2b303b70",
        "interactive-fill-inverse-text": "#3f4550",
        "interactive-fill-negative-enabled": "#c43131",
        "interactive-fill-negative-hover": "#d14949",
        "interactive-fill-negative-pressed": "#d95b5b",
        "interactive-fill-negative-disabled": "#c431313D",
        "interactive-fill-negative-on-enabled": "#f9f9fa",
        "interactive-fill-negative-on-disabled": "#f9f9fa52",
        "interactive-fill-negative-text": "#e08787",
        "interactive-fill-utility-selected": "#353b46",
        "interactive-fill-utility-on-selected": "#f9f9fa",
        "interactive-fill-utility-input": "#7d89a105",
        "interactive-fill-caution-enabled": "#a35808",
        "interactive-outline-primary-enabled": "#456de552",
        "interactive-outline-primary-hover": "#456de566",
        "interactive-outline-primary-pressed": "#456de57A",
        "interactive-outline-primary-disabled": "#456de529",
        "interactive-outline-primary-selected-enabled": "#456de57A",
        "interactive-outline-primary-selected-hover": "#456de58f",
        "interactive-outline-primary-selected-pressed": "#456de5A3",
        "interactive-outline-secondary-enabled": "#7d89a152",
        "interactive-outline-secondary-hover": "#7d89a166",
        "interactive-outline-secondary-pressed": "#7d89a17A",
        "interactive-outline-secondary-disabled": "#7d89a129",
        "interactive-outline-secondary-selected-enabled": "#7d89a17A",
        "interactive-outline-secondary-selected-hover": "#7d89a18f",
        "interactive-outline-secondary-selected-pressed": "#7d89a1A3",
        "interactive-outline-inverse-enabled": "#1a1d2347",
        "interactive-outline-inverse-pressed": "#1a1d238f",
        "interactive-outline-inverse-disabled": "#1a1d2329",
        "interactive-outline-inverse-selected-enabled": "#1a1d2399",
        "interactive-outline-inverse-selected-hover": "#1a1d23b8",
        "interactive-outline-inverse-selected-pressed": "#1a1d23c2",
        "interactive-outline-negative-enabled": "#d1494952",
        "interactive-outline-negative-hover": "#d1494966",
        "interactive-outline-negative-pressed": "#d149497a",
        "interactive-outline-negative-disabled": "#d1494929",
        "interactive-outline-negative-selected-enabled": "#d149497a",
        "interactive-outline-negative-selected-hover": "#d149498f",
        "interactive-outline-negative-selected-pressed": "#d14949a3",
        "interactive-overlay-primary-enabled": "#3c5dc700",
        "interactive-overlay-primary-hover": "#3c5dc714",
        "interactive-overlay-primary-pressed": "#3c5dc729",
        "interactive-overlay-primary-disabled": "#3c5dc700",
        "interactive-overlay-primary-selected-enabled": "#3c5dc71f",
        "interactive-overlay-primary-selected-hover": "#3c5dc73d",
        "interactive-overlay-primary-selected-pressed": "#3c5dc752",
        "interactive-overlay-secondary-enabled": "#7d89a100",
        "interactive-overlay-secondary-hover": "#7d89a114",
        "interactive-overlay-secondary-pressed": "#7d89a129",
        "interactive-overlay-secondary-disabled": "#7d89a100",
        "interactive-overlay-secondary-selected-enabled": "#7d89a11f",
        "interactive-overlay-secondary-selected-hover": "#7d89a13d",
        "interactive-overlay-secondary-selected-pressed": "#7d89a152",
        "interactive-overlay-negative-enabled": "#c4313100",
        "interactive-overlay-negative-hover": "#c4313114",
        "interactive-overlay-negative-pressed": "#c4313129",
        "interactive-overlay-negative-disabled": "#c4313100",
        "interactive-overlay-negative-selected-enabled": "#c431311f",
        "interactive-overlay-negative-selected-hover": "#c431313d",
        "interactive-overlay-negative-selected-pressed": "#c4313152",
        "interactive-overlay-inverse-enabled": "#1a1d2300",
        "interactive-overlay-inverse-hover": "#1a1d230a",
        "interactive-overlay-inverse-pressed": "#1a1d2314",
        "interactive-overlay-inverse-selected-enabled": "#1a1d230f",
        "interactive-overlay-inverse-selected-hover": "#1a1d2317",
        "interactive-overlay-inverse-selected-pressed": "#1a1d231f",
      },
      fontSize: {
        "title-huge": "44px",
        "title-large": "36px",
        "title-default": "32px",
        "title-medium": "28px",
        "title-small": "24px",
        "title-tiny": "20px",
        "paragraph-large-regular": "18px",
        "paragraph-large-strong": "18px",
        "paragraph-large-link": "18px",
        "paragraph-large-strikethrough": "18px",
        "paragraph-default-regular": "16px",
        "paragraph-default-strong": "16px",
        "paragraph-default-link": "16px",
        "paragraph-default-strikethrough": "16px",
        "paragraph-medium-regular": "14px",
        "paragraph-medium-strong": "14px",
        "paragraph-medium-link": "14px",
        "paragraph-medium-strikethrough": "14px",
        "paragraph-medium-code": "14px",
        "paragraph-small-regular": "12px",
        "paragraph-small-strong": "12px",
        "paragraph-small-link": "12px",
        "paragraph-small-strikethrough": "12px",
        "paragraph-small-code": "12px",
        "label-large-regular": "16px",
        "label-large-strong": "16px",
        "label-large-link": "16px",
        "label-large-strikethrough": "16px",
        "label-default-regular": "14px",
        "label-default-strong": "14px",
        "label-default-link": "14px",
        "label-default-strikethrough": "14px",
        "label-default-mono": "14px",
        "label-small-regular": "12px",
        "label-small-strong": "12px",
        "label-small-link": "12px",
        "label-small-strikethrough": "12px",
        "label-small-mono": "12px",
        "label-mini-regular": "11px",
        "label-mini-strong": "11px",
        "label-mini-link": "11px",
        "label-mini-strikethrough": "11px",
        "label-mini-mono": "11px",
      },
      fontWeight: {
        "title-huge": 500,
        "title-large": 500,
        "title-default": 500,
        "title-medium": 500,
        "title-small": 500,
        "title-tiny": 500,
        "paragraph-large-regular": 500,
        "paragraph-large-strong": 600,
        "paragraph-large-link": 500,
        "paragraph-large-strikethrough": 500,
        "paragraph-default-regular": 500,
        "paragraph-default-strong": 600,
        "paragraph-default-link": 500,
        "paragraph-default-strikethrough": 500,
        "paragraph-medium-regular": 500,
        "paragraph-medium-strong": 600,
        "paragraph-medium-link": 500,
        "paragraph-medium-strikethrough": 500,
        "paragraph-medium-code": 400,
        "paragraph-small-regular": 500,
        "paragraph-small-strong": 600,
        "paragraph-small-link": 500,
        "paragraph-small-strikethrough": 500,
        "paragraph-small-code": 400,
        "label-large-regular": 500,
        "label-large-strong": 600,
        "label-large-link": 500,
        "label-large-strikethrough": 500,
        "label-default-regular": 500,
        "label-default-strong": 600,
        "label-default-link": 500,
        "label-default-strikethrough": 500,
        "label-default-mono": 400,
        "label-small-regular": 500,
        "label-small-strong": 600,
        "label-small-link": 500,
        "label-small-strikethrough": 500,
        "label-small-mono": 400,
        "label-mini-regular": 500,
        "label-mini-strong": 600,
        "label-mini-link": 500,
        "label-mini-strikethrough": 500,
        "label-mini-mono": 400,
      },
      letterSpacing: {
        "title-huge": "0%",
        "title-large": "0%",
        "title-default": "0%",
        "title-medium": "0%",
        "title-small": "0%",
        "title-tiny": "-1%",
        "paragraph-large-regular": "-1%",
        "paragraph-large-strong": "-1%",
        "paragraph-large-link": "-1%",
        "paragraph-large-strikethrough": "-1%",
        "paragraph-default-regular": "-1%",
        "paragraph-default-strong": "-1%",
        "paragraph-default-link": "-1%",
        "paragraph-default-strikethrough": "-1%",
        "paragraph-medium-regular": "-1%",
        "paragraph-medium-strong": "-1%",
        "paragraph-medium-link": "-1%",
        "paragraph-medium-strikethrough": "-1%",
        "paragraph-medium-code": "0%",
        "paragraph-small-regular": "-1%",
        "paragraph-small-strong": "-1%",
        "paragraph-small-link": "-1%",
        "paragraph-small-strikethrough": "-1%",
        "paragraph-small-code": "0%",
        "label-large-regular": "-2%",
        "label-large-strong": "-2%",
        "label-large-link": "-2%",
        "label-large-strikethrough": "-2%",
        "label-default-regular": "-2%",
        "label-default-strong": "-2%",
        "label-default-link": "-2%",
        "label-default-strikethrough": "-2%",
        "label-default-mono": "4%",
        "label-small-regular": "-1%",
        "label-small-strong": "-1%",
        "label-small-link": "-1%",
        "label-small-strikethrough": "-1%",
        "label-small-mono": "4%",
        "label-mini-regular": "-1%",
        "label-mini-strong": "-1%",
        "label-mini-link": "-1%",
        "label-mini-strikethrough": "-1%",
        "label-mini-mono": "4%",
      },
      lineHeight: {
        "title-huge": "52px",
        "title-large": "44px",
        "title-default": "40px",
        "title-medium": "36px",
        "title-small": "32px",
        "title-tiny": "28px",
        "paragraph-large-regular": "28px",
        "paragraph-large-strong": "28px",
        "paragraph-large-link": "28px",
        "paragraph-large-strikethrough": "28px",
        "paragraph-default-regular": "24px",
        "paragraph-default-strong": "24px",
        "paragraph-default-link": "24px",
        "paragraph-default-strikethrough": "24px",
        "paragraph-medium-regular": "20px",
        "paragraph-medium-strong": "20px",
        "paragraph-medium-link": "20px",
        "paragraph-medium-strikethrough": "20px",
        "paragraph-medium-code": "20px",
        "paragraph-small-regular": "16px",
        "paragraph-small-strong": "16px",
        "paragraph-small-link": "16px",
        "paragraph-small-strikethrough": "16px",
        "paragraph-small-code": "16px",
        "label-large-regular": "20px",
        "label-large-strong": "20px",
        "label-large-link": "20px",
        "label-large-strikethrough": "20px",
        "label-default-regular": "20px",
        "label-default-strong": "20px",
        "label-default-link": "20px",
        "label-default-strikethrough": "20px",
        "label-default-mono": "20px",
        "label-small-regular": "16px",
        "label-small-strong": "16px",
        "label-small-link": "16px",
        "label-small-strikethrough": "16px",
        "label-small-mono": "16px",
        "label-mini-regular": "16px",
        "label-mini-strong": "16px",
        "label-mini-link": "16px",
        "label-mini-strikethrough": "16px",
        "label-mini-mono": "16px",
      },
      spacing: {
        0: "0px",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        11: "44px",
        12: "48px",
        14: "56px",
        16: "64px",
        18: "72px",
        20: "80px",
        22: "88px",
        24: "96px",
        28: "112px",
        32: "128px",
        36: "144px",
        40: "160px",
        44: "176px",
        48: "192px",
        52: "208px",
        56: "224px",
        60: "240px",
        64: "256px",
        72: "288px",
        80: "320px",
        88: "352px",
        96: "384px",
        104: "416px",
        112: "448px",
        120: "480px",
        136: "544px",
        152: "608px",
        168: "672px",
        186: "744px",
        202: "808px",
        234: "936px",
        360: "1440px",
        0.5: "2px",
        1.5: "6px",
        2.5: "10px",
      },
      maxWidth: ({ theme }) => ({
        ...theme("spacing"),
      }),
      width: ({ theme }) => ({
        ...theme("spacing"),
      }),
      minWidth: ({ theme }) => ({
        ...theme("spacing"),
      }),
      height: ({ theme }) => ({
        ...theme("spacing"),
        "minus-header": "calc(100vh - 61px)",
        "scrollable-table": "calc(100vh - 241px)",
      }),
      minHeight: ({ theme }) => ({
        ...theme("spacing"),
      }),
      maxHeight: ({ theme }) => ({
        ...theme("spacing"),
        "minus-header": "calc(100vh - 61px)",
        "scrollable-table": "calc(100vh - 241px)",
      }),
      borderRadius: {
        0: "0px",
        2: "2px",
        4: "4px",
        6: "6px",
        8: "8px",
        10: "10px",
        12: "12px",
        14: "14px",
        16: "16px",
        20: "20px",
        24: "24px",
        28: "28px",
        32: "32px",
      },
      transitionProperty: {
        button: "background 0.1s ease-in-out 0s, color 0.1s ease-in-out 0s",
      },
      gridTemplateColumns: {
        "tab-2": "minmax(200px, 5fr) minmax(50px, 1fr)",
        "tab-5":
          "minmax(200px, 2fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr)",
        "tab-6":
          "minmax(200px, 2fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr)",
        "tab-touchpoints": "150px 270px 150px auto",
        utm: "100px 100px 1fr 1fr 50px",
        notification: "auto 1fr",
        buttons: "auto auto 1fr",
        organicLayoutHeader: "1fr auto",
        twoFit: "auto auto",
        "date-picker-header": "auto 1fr auto",
        "self-reported-table": "auto 1fr auto 1fr auto",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};