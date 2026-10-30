export type OfficeLocation = {
  id: string;
  country: "IN" | "AE" | "CA";
  title: string;
  /** Street address lines, or null when the office is not open yet */
  lines: readonly string[] | null;
  status?: "coming-soon";
};

export const officesHeader = {
  eyebrow: "Global Presence",
  headingBefore: "Offices Across ",
  headingAccent: "Continents",
  description:
    "From Noida to Toronto — and expanding into the UAE — we stay close to the teams we build with.",
} as const;

export const offices: readonly OfficeLocation[] = [
  {
    id: "india",
    country: "IN",
    title: "India Office",
    lines: [
      "Ithum Tower B, Office no 417, Sector 62",
      "Noida, Uttar Pradesh, 201301",
    ],
  },
  {
    id: "uae",
    country: "AE",
    title: "UAE Office",
    lines: null,
    status: "coming-soon",
  },
  {
    id: "canada",
    country: "CA",
    title: "Canada Office",
    lines: ["30 Dohme Ave, East York", "Toronto, ON M4B 1Y9, Canada"],
  },
];
