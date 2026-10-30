/** Static placeholders for admin UI only — replace with your API later. */

export const mockStats = [
  { label: "Page views", value: "24.8k", change: "+12%", tone: "up" as const },
  { label: "Messages", value: "38", change: "+5", tone: "up" as const },
  { label: "Blog posts", value: "16", change: "2 drafts", tone: "neutral" as const },
  { label: "Projects", value: "12", change: "3 live", tone: "neutral" as const },
];

export const mockActivity = [
  {
    id: "1",
    title: "New contact message",
    detail: "Alex Rivera · AI integration",
    time: "12 min ago",
  },
  {
    id: "2",
    title: "Blog draft updated",
    detail: "Shipping AI features faster",
    time: "1 hr ago",
  },
  {
    id: "3",
    title: "Portfolio item published",
    detail: "Fintech dashboard redesign",
    time: "Yesterday",
  },
  {
    id: "4",
    title: "Service page edited",
    detail: "Mobile app development",
    time: "2 days ago",
  },
];

export const mockBlogs = [
  {
    id: "1",
    title: "Shipping AI features faster",
    status: "Published",
    date: "Mar 12, 2026",
    author: "Admin",
  },
  {
    id: "2",
    title: "Modernizing legacy product stacks",
    status: "Draft",
    date: "Mar 8, 2026",
    author: "Admin",
  },
  {
    id: "3",
    title: "Design systems that scale",
    status: "Published",
    date: "Feb 28, 2026",
    author: "Admin",
  },
  {
    id: "4",
    title: "Choosing the right mobile stack",
    status: "Scheduled",
    date: "Mar 20, 2026",
    author: "Admin",
  },
];

export const mockPortfolio = [
  {
    id: "1",
    title: "Fintech dashboard",
    category: "Web app",
    status: "Live",
    year: "2026",
  },
  {
    id: "2",
    title: "Healthcare booking",
    category: "Mobile",
    status: "Live",
    year: "2025",
  },
  {
    id: "3",
    title: "Retail AI assistant",
    category: "AI",
    status: "Draft",
    year: "2026",
  },
  {
    id: "4",
    title: "Logistics portal",
    category: "Web app",
    status: "Live",
    year: "2025",
  },
];

export const mockMessages = [
  {
    id: "1",
    name: "Alex Rivera",
    email: "alex@company.com",
    interest: "AI integration",
    status: "New",
    date: "Today",
  },
  {
    id: "2",
    name: "Priya Shah",
    email: "priya@startup.io",
    interest: "New product build",
    status: "Read",
    date: "Yesterday",
  },
  {
    id: "3",
    name: "Jordan Lee",
    email: "jordan@brand.co",
    interest: "Mobile app",
    status: "Replied",
    date: "Mar 10",
  },
  {
    id: "4",
    name: "Sam Okonkwo",
    email: "sam@ops.studio",
    interest: "Rebuild / modernization",
    status: "New",
    date: "Mar 9",
  },
];

export const mockServices = [
  { id: "1", title: "Product engineering", slug: "product-engineering", status: "Active" },
  { id: "2", title: "AI solutions", slug: "ai-solutions", status: "Active" },
  { id: "3", title: "Mobile apps", slug: "mobile-apps", status: "Active" },
  { id: "4", title: "UI / UX design", slug: "ui-ux", status: "Active" },
];

export const mockMedia = [
  { id: "1", name: "hero-home.jpg", type: "Image", size: "1.8 MB" },
  { id: "2", name: "portfolio-fintech.webp", type: "Image", size: "940 KB" },
  { id: "3", name: "team-cover.jpg", type: "Image", size: "2.1 MB" },
  { id: "4", name: "brand-deck.pdf", type: "Document", size: "4.4 MB" },
  { id: "5", name: "case-study-loop.mp4", type: "Video", size: "18 MB" },
  { id: "6", name: "logo-mark.svg", type: "Image", size: "12 KB" },
];
