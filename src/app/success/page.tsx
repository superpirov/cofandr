import type { Metadata } from "next";
import { Suspense } from "react";
import { SuccessContent } from "./SuccessContent";

export const metadata: Metadata = {
  title: "Проверка оплаты",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
