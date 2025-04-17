import localFont from "next/font/local";
import { Inter } from "next/font/google";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "상품 리스트 | 심플 쇼핑 웹페이지",
  description: "다양한 상품을 한눈에 확인하고 편리하게 쇼핑할 수 있는 심플한 상품 리스트 웹페이지입니다.",
};

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
