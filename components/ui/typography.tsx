import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      display: "text-5xl md:text-6xl leading-tight font-semibold font-display",
      h1: "text-4xl md:text-5xl font-semibold font-display",
      h2: "text-3xl md:text-4xl font-semibold font-display",
      h3: "text-2xl md:text-3xl font-semibold font-display",
      h4: "text-xl md:text-2xl font-semibold font-display",
      lead: "text-lg md:text-xl text-neutral-700 font-sans",
      body: "text-base text-neutral-800 font-sans",
      small: "text-sm text-neutral-600 font-sans",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  withDivider?: boolean;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, asChild = false, withDivider = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(
          typographyVariants({ variant, className }),
          withDivider && "relative pb-3 after:absolute after:inset-x-0 after:mx-auto after:bottom-0 after:h-[2px] after:w-16 after:bg-[var(--kk-brand)]/70"
        )}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        {...props}
      />
    );
  }
);
Typography.displayName = "Typography";

// Specific typography components
export const Display = React.forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(
  (props, ref) => <Typography ref={ref} variant="display" {...props} />
);
Display.displayName = "Display";

export const H1 = React.forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(
  (props, ref) => <Typography ref={ref} variant="h1" {...props} />
);
H1.displayName = "H1";

export const H2 = React.forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(
  (props, ref) => <Typography ref={ref} variant="h2" {...props} />
);
H2.displayName = "H2";

export const H3 = React.forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(
  (props, ref) => <Typography ref={ref} variant="h3" {...props} />
);
H3.displayName = "H3";

export const H4 = React.forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(
  (props, ref) => <Typography ref={ref} variant="h4" {...props} />
);
H4.displayName = "H4";

export const Lead = React.forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(
  (props, ref) => <Typography ref={ref} variant="lead" {...props} />
);
Lead.displayName = "Lead";

export const Body = React.forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(
  (props, ref) => <Typography ref={ref} variant="body" {...props} />
);
Body.displayName = "Body";

export const Small = React.forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(
  (props, ref) => <Typography ref={ref} variant="small" {...props} />
);
Small.displayName = "Small";

export { Typography, typographyVariants };
