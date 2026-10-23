// MUI theme that renders Material UI components with Graphite's tokens and component rules
// (see GUIDELINES.md and components/*/README.md at the design-system root).
import { Box } from "@mui/material";
import { createTheme, type Shadows } from "@mui/material/styles";
import { Check, ChevronDown } from "lucide-react";
import { fontMono, fontSans, type Mode, rgba, typeStyle, ui } from "./tokens";

const box16 = {
  width: 16,
  height: 16,
  display: "inline-grid",
  placeItems: "center",
  border: `1px solid ${ui("border-interactive")}`,
  boxSizing: "border-box",
} as const;

const checkboxIcon = <Box component="span" sx={{ ...box16, borderRadius: ui("radius-xs") }} />;
const checkboxCheckedIcon = (
  <Box
    component="span"
    sx={{
      ...box16,
      borderRadius: ui("radius-xs"),
      backgroundColor: ui("interactive-accent-default"),
      borderColor: ui("border-accent"),
      color: ui("text-accent-primary"),
    }}
  >
    <Check size={12} strokeWidth={3} />
  </Box>
);
const radioIcon = <Box component="span" sx={{ ...box16, borderRadius: "50%", backgroundColor: ui("foreground") }} />;
const radioCheckedIcon = (
  <Box
    component="span"
    sx={{
      ...box16,
      borderRadius: "50%",
      borderColor: ui("border-accent"),
      background: `radial-gradient(circle, ${ui("foreground")} 0 3px, ${ui("interactive-accent-default")} 3.5px)`,
    }}
  />
);

const menuSurface = {
  borderRadius: ui("radius-2xl"),
  backgroundColor: `color-mix(in oklch, ${ui("foreground")}, ${ui("text-white")} 6%)`,
  backgroundImage: "none",
  boxShadow: `0 0 0 1px color-mix(in oklch, ${ui("text-neutral-primary")} 6%, transparent), 0 4px 12px -2px oklch(0 0 0 / 0.05), 0 16px 32px -8px oklch(0 0 0 / 0.08)`,
};

const tones = [
  { color: "success", bg: "success-background", text: "text-success-primary", rule: "border-success-emphasis" },
  { color: "warning", bg: "alert-background", text: "text-alert-primary", rule: "border-alert-emphasis" },
  { color: "error", bg: "danger-background", text: "text-danger-primary", rule: "border-danger-emphasis" },
  { color: "info", bg: "info-background", text: "text-info-primary", rule: "border-info-emphasis" },
] as const;

export function createGraphiteTheme(mode: Mode) {
  const c = (name: string) => rgba(name, mode);
  const shadow = (n: string) => ui(`shadow-${n}`);

  return createTheme({
    palette: {
      mode,
      primary: { main: c("interactive-accent-default"), contrastText: c("text-accent-primary") },
      error: { main: c("interactive-destructive-accent-default"), contrastText: c("text-danger-inverted-primary") },
      success: { main: c("text-success-primary") },
      warning: { main: c("text-alert-primary") },
      info: { main: c("text-info-primary") },
      text: {
        primary: c("text-neutral-primary"),
        secondary: c("text-neutral-secondary"),
        disabled: c("text-neutral-tertiary"),
      },
      background: { default: c("background"), paper: c("foreground") },
      divider: c("border-default"),
      action: {
        hover: c("highlight"),
        selected: c("highlight-strong"),
        disabled: c("text-neutral-tertiary"),
        disabledBackground: c("sunk"),
      },
    },
    shape: { borderRadius: 8 },
    shadows: [
      "none",
      shadow("s"),
      shadow("m"),
      shadow("l"),
      ...Array(5).fill(shadow("xl")),
      ...Array(8).fill(shadow("2xl")),
      ...Array(8).fill(shadow("3xl")),
    ] as Shadows,
    typography: {
      fontFamily: fontSans,
      fontWeightLight: 300,
      fontWeightRegular: 440,
      fontWeightMedium: 560,
      fontWeightBold: 600,
      h1: typeStyle("heading-xl"),
      h2: typeStyle("heading-lg"),
      h3: typeStyle("heading-md"),
      h4: typeStyle("heading-sm"),
      h5: typeStyle("heading-xs"),
      h6: typeStyle("heading-xs"),
      subtitle1: typeStyle("body-default-heavy"),
      subtitle2: typeStyle("body-sm-heavy"),
      body1: typeStyle("body-default"),
      body2: typeStyle("body-sm"),
      caption: typeStyle("body-xs"),
      overline: { ...typeStyle("label-xs-heavy"), textTransform: "uppercase", letterSpacing: "0.04em" },
      button: { ...typeStyle("label-default"), textTransform: "none" },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: ui("background"),
            color: ui("text-neutral-primary"),
            letterSpacing: "-0.01em",
            WebkitFontSmoothing: "antialiased",
          },
          "code, kbd": { fontFamily: fontMono },
        },
      },
      MuiButtonBase: { defaultProps: { disableRipple: true } },

      // Button: OpenUI primary / secondary / tertiary / destructive, sizes small · medium · large.
      MuiButton: {
        defaultProps: { disableElevation: true, variant: "outlined" },
        styleOverrides: {
          root: {
            ...typeStyle("label-default"),
            textTransform: "none",
            minWidth: 0,
            gap: ui("space-xs"),
            padding: "7px 10px",
            borderRadius: ui("radius-m"),
            border: "1px solid transparent",
            boxShadow: "none",
            transition: "all 0.12s ease",
            whiteSpace: "nowrap",
            "& .MuiButton-startIcon, & .MuiButton-endIcon": { margin: 0 },
            "& svg": { width: 16, height: 16 },
          },
        },
        variants: [
          {
            props: { variant: "contained" },
            style: {
              backgroundColor: ui("interactive-accent-default"),
              color: ui("text-accent-primary"),
              borderColor: ui("border-accent"),
              boxShadow: ui("shadow-m"),
              "&:hover": { backgroundColor: ui("interactive-accent-hover"), boxShadow: "none" },
              "&:active": { backgroundColor: ui("interactive-accent-pressed") },
              "&.Mui-disabled": {
                backgroundColor: ui("interactive-accent-disabled"),
                color: ui("text-accent-primary"),
                boxShadow: "none",
              },
            },
          },
          {
            props: { variant: "outlined" },
            style: {
              backgroundColor: "transparent",
              color: ui("text-neutral-primary"),
              borderColor: ui("border-interactive"),
              boxShadow: ui("shadow-m"),
              "&:hover": { backgroundColor: ui("highlight"), borderColor: ui("border-interactive"), boxShadow: "none" },
              "&.Mui-disabled": { color: ui("text-neutral-tertiary"), borderColor: ui("border-default"), boxShadow: "none" },
            },
          },
          {
            props: { variant: "text" },
            style: {
              color: ui("text-neutral-primary"),
              "&:hover": { backgroundColor: ui("highlight") },
              "&.Mui-disabled": { color: ui("text-neutral-tertiary") },
            },
          },
          {
            props: { variant: "contained", color: "error" },
            style: {
              backgroundColor: ui("interactive-destructive-accent-default"),
              color: ui("text-danger-inverted-primary"),
              boxShadow: "none",
              "&:hover": { backgroundColor: ui("interactive-destructive-accent-hover") },
            },
          },
          {
            props: { variant: "outlined", color: "error" },
            style: {
              backgroundColor: ui("interactive-destructive-default"),
              color: ui("text-danger-primary"),
              borderColor: ui("border-danger"),
              boxShadow: "none",
              "&:hover": { backgroundColor: ui("interactive-destructive-hover"), borderColor: ui("border-danger") },
            },
          },
          {
            props: { variant: "text", color: "error" },
            style: {
              color: ui("text-danger-primary"),
              "&:hover": { backgroundColor: ui("interactive-destructive-hover") },
            },
          },
          {
            props: { size: "small" },
            style: { ...typeStyle("label-sm"), padding: "6.25px 10px", borderRadius: `calc(${ui("radius-s")} + 1px)` },
          },
          { props: { size: "large" }, style: { padding: "9px 12px", borderRadius: ui("radius-l") } },
        ],
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: ui("text-neutral-primary"),
            padding: 9,
            borderRadius: ui("radius-m"),
            border: "1px solid transparent",
            "&:hover": { backgroundColor: ui("highlight") },
            "& svg": { width: 16, height: 16 },
          },
        },
        variants: [{ props: { size: "small" }, style: { padding: 7, borderRadius: `calc(${ui("radius-s")} + 1px)` } }],
      },

      // Input: faint fill, interactive outline, 2.5px halo on focus.
      MuiOutlinedInput: {
        defaultProps: { notched: false },
        styleOverrides: {
          root: {
            ...typeStyle("body-default"),
            backgroundColor: ui("highlight-subtle"),
            borderRadius: ui("radius-m"),
            transition: "box-shadow 0.16s ease, background-color 0.16s ease",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: ui("border-interactive"),
              transition: "border-color 0.16s ease",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: ui("border-interactive") },
            "&.Mui-focused": { boxShadow: `0 0 0 2.5px ${ui("border-default")}` },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: ui("border-interactive-emphasis"),
              borderWidth: 1,
            },
            "&.Mui-error": { boxShadow: `0 0 0 2.5px ${ui("border-danger")}` },
            "&.Mui-error .MuiOutlinedInput-notchedOutline": { borderColor: ui("border-danger-emphasis") },
            "&.Mui-disabled": { backgroundColor: ui("sunk") },
            "&.Mui-disabled .MuiOutlinedInput-notchedOutline": { borderColor: ui("border-default") },
            "&.MuiInputBase-adornedStart": { paddingLeft: 12 },
          },
          input: {
            padding: "6px 12px",
            height: "1.5em",
            "&::placeholder": { color: ui("text-neutral-secondary"), opacity: 1 },
            "&.MuiInputBase-inputAdornedStart": { paddingLeft: 8 },
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: { root: { color: ui("text-neutral-secondary"), margin: 0, "& svg": { width: 16, height: 16 } } },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            ...typeStyle("body-default"),
            color: ui("text-neutral-primary"),
            "&.Mui-focused, &.Mui-error": { color: ui("text-neutral-primary") },
            "&.Mui-disabled": { color: ui("text-neutral-tertiary") },
          },
          asterisk: { marginLeft: ui("space-3xs") },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            ...typeStyle("body-sm"),
            color: ui("text-neutral-secondary"),
            margin: 0,
            "&.Mui-error": { color: ui("text-danger-primary") },
          },
        },
      },
      MuiSelect: {
        defaultProps: { IconComponent: ChevronDown },
        styleOverrides: {
          icon: {
            width: 16,
            height: 16,
            right: 12,
            top: "calc(50% - 8px)",
            color: ui("text-neutral-secondary"),
            transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          },
          select: { paddingRight: "36px !important" },
        },
      },
      MuiMenu: {
        styleOverrides: { paper: { ...menuSurface, marginTop: 4 }, list: { padding: `${ui("space-2xs")} 0` } },
      },
      MuiPopover: { styleOverrides: { paper: menuSurface } },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            ...typeStyle("body-default"),
            height: 32,
            minHeight: 32,
            padding: `0 ${ui("space-m-l")}`,
            "&:hover, &.Mui-focusVisible": { backgroundColor: ui("highlight") },
            "&.Mui-selected, &.Mui-selected:hover": { backgroundColor: ui("highlight-strong") },
          },
        },
      },

      // Checkbox, Radio, Switch: OpenUI's 16px controls.
      MuiCheckbox: {
        defaultProps: { icon: checkboxIcon, checkedIcon: checkboxCheckedIcon },
        styleOverrides: { root: { padding: 4, "&:hover": { backgroundColor: "transparent" } } },
      },
      MuiRadio: {
        defaultProps: { icon: radioIcon, checkedIcon: radioCheckedIcon },
        styleOverrides: { root: { padding: 4, "&:hover": { backgroundColor: "transparent" } } },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: { marginLeft: -4, gap: 4, alignItems: "flex-start" },
          label: { ...typeStyle("body-default"), paddingTop: 2 },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: { width: 24, height: 16, padding: 0, overflow: "visible", margin: "4px 4px 0 4px" },
          switchBase: {
            padding: 3,
            "&:hover": { backgroundColor: "transparent" },
            "&.Mui-checked": { transform: "translateX(8px)" },
            "&.Mui-checked + .MuiSwitch-track": {
              backgroundColor: ui("interactive-accent-default"),
              borderColor: ui("border-accent"),
              opacity: 1,
            },
            "&.Mui-disabled + .MuiSwitch-track": { opacity: 0.5 },
          },
          thumb: { width: 10, height: 10, backgroundColor: ui("foreground"), boxShadow: ui("shadow-s") },
          track: {
            borderRadius: 999,
            boxSizing: "border-box",
            backgroundColor: ui("sunk"),
            border: `1px solid ${ui("border-default")}`,
            opacity: 1,
          },
        },
      },

      // Tag: tinted tone ground, tone text, 24px tall.
      MuiChip: {
        styleOverrides: {
          root: {
            ...typeStyle("label-sm"),
            height: 24,
            borderRadius: ui("radius-s"),
            backgroundColor: ui("sunk"),
            color: ui("text-neutral-primary"),
            "& .MuiChip-label": { padding: `0 ${ui("space-xs")}` },
            "& .MuiChip-icon": { width: 14, height: 14, margin: `0 -2px 0 ${ui("space-xs")}`, color: "inherit" },
          },
        },
        variants: tones.map((t) => ({
          props: { color: t.color },
          style: { backgroundColor: ui(t.bg), color: ui(t.text) },
        })),
      },

      // Surfaces: panels on the foreground, hairline edges, no gradients.
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: "none" },
          outlined: { borderColor: ui("border-default") },
        },
      },
      MuiCard: {
        defaultProps: { variant: "outlined" },
        styleOverrides: {
          root: { borderRadius: ui("radius-3xl"), backgroundColor: ui("foreground"), borderColor: ui("border-default") },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0, color: "inherit", position: "sticky" },
        styleOverrides: {
          root: {
            backgroundColor: `color-mix(in oklch, ${ui("background")} 85%, transparent)`,
            backdropFilter: "blur(12px)",
            borderBottom: `1px solid ${ui("border-default")}`,
          },
        },
      },
      MuiDivider: { styleOverrides: { root: { borderColor: ui("border-default") } } },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: ui("popover-background"),
            borderColor: ui("border-default"),
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: ui("radius-5xl"),
            backgroundColor: ui("popover-background"),
            border: `1px solid ${ui("border-default")}`,
          },
        },
      },
      MuiBackdrop: {
        variants: [{ props: { invisible: false }, style: { backgroundColor: ui("overlay") } }],
      },

      // Tabs: sunk rail with a raised active pill.
      MuiTabs: {
        defaultProps: { variant: "scrollable", scrollButtons: false },
        styleOverrides: {
          root: {
            minHeight: 0,
            padding: ui("space-2xs"),
            borderRadius: ui("radius-l"),
            backgroundColor: ui("sunk"),
          },
          list: { gap: ui("space-3xs") },
          indicator: { display: "none" },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            ...typeStyle("label-default"),
            textTransform: "none",
            minHeight: 0,
            minWidth: "7.3rem",
            padding: `${ui("space-3xs")} ${ui("space-s")}`,
            borderRadius: ui("radius-s"),
            border: "1px solid transparent",
            color: ui("text-neutral-secondary"),
            opacity: 1,
            "&:hover": { backgroundColor: ui("sunk"), borderColor: ui("border-default"), boxShadow: ui("shadow-s") },
            "&.Mui-selected": {
              color: ui("text-neutral-primary"),
              backgroundColor: ui("elevated"),
              borderColor: ui("border-default"),
              boxShadow: ui("shadow-s"),
            },
          },
        },
      },

      // Feedback: Callout-style alerts, inverted snackbars and tooltips.
      MuiAlert: {
        styleOverrides: {
          root: {
            ...typeStyle("body-default"),
            backgroundColor: "transparent",
            color: ui("text-neutral-primary"),
            borderRadius: 0,
            padding: `0 calc(${ui("space-m")} + 2px)`,
            borderLeft: `2px solid ${ui("border-interactive-selected")}`,
          },
          icon: { display: "none" },
          message: { padding: 0 },
        },
        variants: tones.map((t) => ({
          props: { severity: t.color },
          style: { borderLeftColor: ui(t.rule), "& .MuiAlertTitle-root": { color: ui(t.text) } },
        })),
      },
      MuiAlertTitle: { styleOverrides: { root: { ...typeStyle("body-default-heavy"), margin: 0 } } },
      MuiSnackbarContent: {
        styleOverrides: {
          root: {
            ...typeStyle("body-sm"),
            backgroundColor: ui("inverted-background"),
            color: ui("background"),
            borderRadius: ui("radius-l"),
            boxShadow: ui("shadow-xl"),
            "& .MuiButton-root": { color: ui("background") },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            ...typeStyle("label-xs"),
            backgroundColor: ui("inverted-background"),
            color: ui("background"),
            borderRadius: ui("radius-s"),
            padding: `${ui("space-2xs")} ${ui("space-s")}`,
          },
        },
      },
      MuiBadge: {
        defaultProps: { color: "primary" },
        styleOverrides: {
          badge: {
            ...typeStyle("label-xs-heavy"),
            minWidth: 18,
            height: 18,
            padding: "0 5px",
            backgroundColor: ui("interactive-accent-default"),
            color: ui("text-accent-primary"),
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: { height: 4, padding: "13px 0" },
          rail: { backgroundColor: ui("elevated-strong"), opacity: 1 },
          track: { border: "none", backgroundColor: ui("interactive-accent-default") },
          thumb: {
            width: 14,
            height: 14,
            backgroundColor: ui("foreground"),
            border: `2px solid ${ui("interactive-accent-default")}`,
            boxShadow: ui("shadow-s"),
            "&::before": { boxShadow: "none" },
            "&:hover, &.Mui-focusVisible, &.Mui-active": { boxShadow: `0 0 0 4px ${ui("highlight-strong")}` },
          },
          valueLabel: {
            ...typeStyle("label-xs"),
            backgroundColor: ui("inverted-background"),
            color: ui("background"),
            borderRadius: ui("radius-s"),
          },
        },
      },
      MuiRating: {
        styleOverrides: {
          root: { color: ui("text-neutral-primary") },
          iconEmpty: { color: ui("elevated-strong") },
        },
      },
      MuiLink: {
        defaultProps: { underline: "always" },
        styleOverrides: {
          root: {
            color: ui("text-neutral-link"),
            textDecorationColor: ui("border-interactive-emphasis"),
            "&:hover": { textDecorationColor: "currentColor" },
          },
        },
      },
    },
  });
}
