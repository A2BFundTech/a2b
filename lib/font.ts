import localFont from "next/font/local";

export const didot = localFont({
    src: [
        {
            path: "../public/assets/font/Didot.otf",
            weight: "400",
            style: "normal",
        }
    ],
    variable: "--font-didot",
    display: "swap",
});
