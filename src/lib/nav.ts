export type NavItem = {
  label: string;
  href: string;
};

// Primary navigation, mirrors the six Figma pages. Labels match the design.
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/service" },
  { label: "Why ScaleOut", href: "/why" },
  { label: "About Us", href: "/about" },
  { label: "Role Availability", href: "/role" },
];

export const CONTACT_HREF = "/contact";
