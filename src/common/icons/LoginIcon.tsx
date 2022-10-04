import SvgIcon from "@material-ui/core/SvgIcon"

type LoginIconProperties = {
  fontSize?: "small" | "inherit" | "default" | "large" | "medium"
}
const defaultProperties: LoginIconProperties = { fontSize: "medium" }

const LoginIcon = (properties: LoginIconProperties = defaultProperties) => (
  <SvgIcon fontSize={properties.fontSize}>
    <path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" />
  </SvgIcon>
)

export default LoginIcon
