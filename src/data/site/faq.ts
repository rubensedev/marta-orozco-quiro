/** Inline FAQ answer piece: plain text or an actionable link. */
export type FaqAnswerPart =
  | string
  | { label: string; action: "booking" | "maps" | "contact" | "packages" | "whatsapp" };

export type FaqItem = {
  question: string;
  answer: FaqAnswerPart[];
};

/** Flatten FAQ answer segments to plain text (JSON-LD, a11y). */
export function faqAnswerText(answer: FaqAnswerPart[]): string {
  return answer.map((part) => (typeof part === "string" ? part : part.label)).join("");
}
