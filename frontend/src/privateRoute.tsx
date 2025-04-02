import { useNavigate } from "react-router-dom";

export default function PrivateRoutes(props: any) {
  const navigate = useNavigate();
  let token = localStorage.getItem("jwtToken");

  return token ? props.children : navigate("/");
}
