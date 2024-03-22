export function babel(api) {
  const BABEL_ENV = api.env();
  const presets = ["@babel/preset-env", "@babel/preset-react"];
  const plugins = ["react-hot-loader/babel"];
  if (BABEL_ENV === "development") {
    plugins.push("react-refresh/babel");
  }
  return {
    presets,
    plugins,
  };
}
