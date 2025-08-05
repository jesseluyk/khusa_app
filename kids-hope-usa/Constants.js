import { Appearance } from "react-native";
import * as Device from "expo-device";

/* DEVICE SPECIFIC*/
export const brand = Device.brand;
export const shadow = "#000000";

/* STYLE CONSTANTS */

const colorScheme = Appearance.getColorScheme();

export const colors =
  colorScheme === "dark"
    ? [
        "#e75c5530",
        "#f0163a30",
        "#64e6e630",
        "#ffe68430",
        "#ffba0030",
        "#e75c5530",
        "#f0163a30",
        "#64e6e630",
        "#ffe68430",
        "#ffba0030",
        "#e75c5530",
        "#f0163a30",
        "#64e6e630",
        "#ffe68430",
        "#ffba0030",
      ]
    : [
        "#e75c5590",
        "#f0163a90",
        "#64e6e690",
        "#ffe68490",
        "#ffba0090",
        "#e75c5590",
        "#f0163a90",
        "#64e6e690",
        "#ffe68490",
        "#ffba0090",
        "#e75c5590",
        "#f0163a90",
        "#64e6e690",
        "#ffe68490",
        "#ffba0090",
      ];

/* COLORS */
export const khusaRed = colorScheme === "dark" ? "#e75c5540" : "#e75c5550";
export const khusaDarkRed = colorScheme === "dark" ? "#F0163A40" : "#F0163A50";
export const khusaText = colorScheme === "dark" ? "#f0e8e0" : "#000";
export const khusaBlue = colorScheme === "dark" ? "#64E6E640" : "#64E6E650";
export const khusaGreen = colorScheme === "dark" ? "#FFE68440" : "#FFE68450";
export const khusaYellow = colorScheme === "dark" ? "#FFBA0040" : "#FFBA0050";

/** Theme primary colors */
export const primary_a0 = colorScheme === "dark" ? "#b4e6e6" : "#b4e6e6";
export const primary_a10 = colorScheme === "dark" ? "#bde9e9" : "#bde9e9";
export const primary_a20 = colorScheme === "dark" ? "#c5ecec" : "#c5ecec";
export const primary_a30 = colorScheme === "dark" ? "#ceeeee" : "#ceeeee";
export const primary_a40 = colorScheme === "dark" ? "#d6f1f1" : "#d6f1f1";
export const primary_a50 = colorScheme === "dark" ? "#def4f4" : "#def4f4";

/** Theme secondary colors */
export const secondary_a0 = colorScheme === "dark" ? "#f0e8e0" : "#121212";
export const secondary_a10 = colorScheme === "dark" ? "#f9f9f9" : "#212121";
export const secondary_a20 = colorScheme === "dark" ? "#ffffff" : "#3f3f3f";

/** Theme surface colors */
export const surface_a0 = colorScheme === "dark" ? "#121212" : "#f9f9f9";
export const surface_a10 = colorScheme === "dark" ? "#212121" : "#ffffff";
export const surface_a20 = colorScheme === "dark" ? "#3f3f3f" : "#e6e6e6";
export const surface_a30 = colorScheme === "dark" ? "#575757" : "#dcdcdc";
export const surface_a40 = colorScheme === "dark" ? "#717171" : "#d3d3d3";
export const surface_a50 = colorScheme === "dark" ? "#8b8b8b" : "#121212";

/** Dark theme mixed surface colors */
export const surface_mixed_a0 = colorScheme === "dark" ? "#202424" : "#f9f9f9";
export const surface_mixed_a10 = colorScheme === "dark" ? "#353838" : "#f0e8e0";
export const surface_mixed_a20 = colorScheme === "dark" ? "#4b4e4e" : "#e6e6e6";
export const surface_mixed_a30 = colorScheme === "dark" ? "#626565" : "#dcdcdc";
export const surface_mixed_a40 = colorScheme === "dark" ? "#7a7d7d" : "#d3d3d3";
export const surface_mixed_a50 = colorScheme === "dark" ? "#939595" : "#c0c0c0";

/* FONTS */
export const font = brand === "Apple" ? "Avenir-Roman" : "sans-serif-light";
/*export const headingFont =
  brand === "Apple" ? "SFProDisplay-Bold" : "sans-serif";*/
export const headingFont =
  brand === "Apple" ? "Avenir-Roman" : "sans-serif-light";

export const smFont = 12;
export const mdFont = 16;
export const lgFont = 18;
export const xlFont = 24;

/* SPACING */
export const xsSpace = 4;
export const smSpace = 8;
export const mdSpace = 12;
export const lgSpace = 16;

/* BORDERS */
export const smRadius = 12;
export const lgRadius = 8;
export const smBorder = 0.5;
export const mdBorder = 1;
export const lgBorder = 2;

/* URL CONSTANTS */

export const khusaUrl = "https://login.kidshopeusa.org/wp-json/app/v1/";
export const wpUrl = "https://login.kidshopeusa.org/wp-json/";

// TESTING CONSTANTS
/*
export const khusaUrl = "https://loginstaging.wpengine.com/wp-json/app/v1/";
export const wpUrl = "https://loginstaging.wpengine.com/wp-json/";
*/
