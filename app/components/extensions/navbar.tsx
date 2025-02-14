import { Avatar } from "../base/avatar";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
} from "../base/sidebar";
import { Text } from "../base/text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

type Props = {
  picture: string;
};

export function Navbar({ picture }: Props) {
  return (
    <Sidebar>
      <SidebarHeader>CardCrafter</SidebarHeader>
      <SidebarBody>
        <SidebarItem href="/">Home</SidebarItem>
        <SidebarItem href="/classes">Your Classes</SidebarItem>
      </SidebarBody>
      <SidebarFooter>
        <SidebarItem href="/profile">
          <Avatar src={picture} />
          Profile
        </SidebarItem>
        <SidebarItem href="/auth/logout">
          <FontAwesomeIcon icon={faRightToBracket} />
          <Text className="text-red-400!">Logout</Text>
        </SidebarItem>
      </SidebarFooter>
    </Sidebar>
  );
}
