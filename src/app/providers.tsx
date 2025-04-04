import { App, ConfigProvider, ThemeConfig } from "antd";
import * as React from "react";

interface IProvidersProps {
  children: React.ReactNode;
}

const theme: ThemeConfig = {
  components: {
    Modal: {
      contentBg: "#fcf6ea",
      headerBg: "#fcf6ea",
      titleColor: "#d3a649",
      titleFontSize: 24,
      padding: 20,
      borderRadius: 10,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      footerBg: "#1e1e1e",
    },
  },
};

const Providers: React.FunctionComponent<IProvidersProps> = (props) => {
  const {} = props;
  return (
    <ConfigProvider theme={theme}>
      <App>{props.children}</App>
    </ConfigProvider>
  );
};

export default Providers;
