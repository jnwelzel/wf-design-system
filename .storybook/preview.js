import React from "react";
import { Global, css } from "@emotion/react";

import { bodyStyles } from "../src/shared/global";

export const decorators = [
  (Story) => (
    <>
      <Global
        styles={css`
          body {
            ${bodyStyles}
          }
        `}
      />
      <Story />
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  // Storybook a11y addon configuration
  a11y: {
    // the target DOM element
    element: "#root",
    // sets the execution mode for the addon
    manual: false,
  },
};
