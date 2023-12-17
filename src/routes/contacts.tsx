import { Outlet } from "react-router-dom";
import { Text } from "../components/shared_components";

export function Layout() {
  return (
    <Text>
      <Text>Layout</Text>
      <Outlet />
    </Text>
  );
}

export function Index() {
  return <Text>Index</Text>;
}

export function ViewContact() {
  return <Text>ViewContact</Text>;
}

export function EditContact() {
  return <Text>EditContact</Text>;
}

export function DestroyContact() {
  return <Text>DestroyContact</Text>;
}
