import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @import url('https://fonts.googleapis.com/css2?family=Kodchasan:wght@300;400;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300;400;700&display=swap');
    }
      `}
  />
);

export default Fonts;
