import { Avatar } from "../base/avatar";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
} from "../base/sidebar";

type Props = {
  picture: string;
};

export function Navbar({ picture }: Props) {
  return (
    <Sidebar>
      <SidebarHeader>CardCrafter</SidebarHeader>
      <SidebarBody>
        <SidebarItem href="/">Home</SidebarItem>
        <SidebarItem href="/notecards">Your Notecards</SidebarItem>
        <SidebarItem href="/classes">Your Classes</SidebarItem>
      </SidebarBody>
      <SidebarFooter>
        <SidebarItem href="profile">
          <Avatar src={picture} />
          Profile
        </SidebarItem>
      </SidebarFooter>
    </Sidebar>
  );
}
