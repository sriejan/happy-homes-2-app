import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ChevronRight,
  Star,
  Heart,
  User,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  Eye,
} from "lucide-react";

const ICON_REGISTRY = {
  "shopping-bag": ShoppingBag,
  search: Search,
  menu: Menu,
  x: X,
  "chevron-right": ChevronRight,
  star: Star,
  heart: Heart,
  user: User,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,
  "arrow-right": ArrowRight,
  sparkles: Sparkles,
  eye: Eye,
} as const;

export type IconName = keyof typeof ICON_REGISTRY;

export interface IconProps extends React.ComponentPropsWithoutRef<"svg"> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  "aria-label"?: string;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = 24, strokeWidth = 2, className, "aria-label": ariaLabel, ...props }, ref) => {
    const IconComponent = ICON_REGISTRY[name];
    
    if (!IconComponent) {
      console.warn(`Icon "${name}" not found in registry`);
      return null;
    }

    return (
      <IconComponent
        ref={ref}
        size={size}
        strokeWidth={strokeWidth}
        className={cn("inline-block", className)}
        aria-hidden={!ariaLabel}
        aria-label={ariaLabel}
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";

export { ICON_REGISTRY };
