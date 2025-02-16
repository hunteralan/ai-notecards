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
  name: string;
};

export function Navbar({ picture, name }: Props) {
  return (
    <Sidebar>
      <SidebarHeader>CardCrafter</SidebarHeader>
      <SidebarBody>
        {/* <SidebarItem href="/">Home</SidebarItem> */}
        <SidebarItem href="/classes">My Classes</SidebarItem>
      </SidebarBody>
      <SidebarFooter>
        <SidebarItem>
          <Avatar src={picture} />
          {name}
        </SidebarItem>
        <SidebarItem href="/auth/logout">
          <FontAwesomeIcon icon={faRightToBracket} />
          <Text className="text-red-400!">Logout</Text>
        </SidebarItem>
      </SidebarFooter>
    </Sidebar>
  );
}
