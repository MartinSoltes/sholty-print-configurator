import { Product } from "@/types";
import sk from "@/locales/sk.json";

export const getViews = (t: (key: keyof typeof sk) => string) => [
  { label: t("frontSide"), value: "front" as const },
  { label: t("backSide"), value: "back" as const }
];

export const getProducts = (t: (key: keyof typeof sk) => string): Product[] => [
  { label: t("tshirt"), value: "tshirt" },
  { label: t("polo"), value: "polo" },
  { label: t("hoodie"), value: "hoodie" },
];

export const backgrounds = [
    {
        type: 'tshirt',
        view: 'front',
        image: './assets/backgrounds/tshirt/white/front.jpg'
    },
    {
        type: 'tshirt',
        view: 'back',
        image: './assets/backgrounds/tshirt/white/back.jpg'
    },
    {
        type: 'polo',
        view: 'front',
        image: './assets/bg-polo-front.jpg'
    },
    {
        type: 'polo',
        view: 'back',
        image: './assets/bg-polo-back.jpg'
    },
    {
        type: 'hoodie',
        view: 'front',
        image: './assets/backgrounds/hoodie/white/front.jpg'
    },
    {
        type: 'hoodie',
        view: 'back',
        image: './assets/backgrounds/hoodie/white/back.jpg'
    }
]