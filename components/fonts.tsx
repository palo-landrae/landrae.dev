import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      /* work-sans-latin */
      @font-face {
        font-family: "Work Sans";
        src: url("/fonts/work-sans-v16-latin-regular.woff2") format('woff2'), url("/fonts/work-sans-v16-latin-regular.woff") format('woff'), url("/fonts/work-sans-v16-latin-regular.ttf") format('ttf');
      }
    `}
  />
);

export default Fonts;
