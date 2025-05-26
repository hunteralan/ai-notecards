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
import {
  faMoneyCheck,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

type Props = {
  picture: string;
  name: string;
};

export function Navbar({ picture, name }: Props) {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/" className="flex items-center flex-1 justify-center">
          <img src="/logo.png" className="h-16 object-contain" />
        </Link>
      </SidebarHeader>
      <SidebarBody>
        {/* <SidebarItem href="/">Home</SidebarItem> */}
        <SidebarItem href="/classes">My Classes</SidebarItem>
      </SidebarBody>
      <SidebarFooter>
        <SidebarItem>
          <Avatar src={picture} />
          <Text>{name}</Text>
        </SidebarItem>
        <SidebarItem href="/billing">
          <FontAwesomeIcon icon={faMoneyCheck} />
          <Text>Billing</Text>
        </SidebarItem>
        <SidebarItem href="/auth/logout">
          <FontAwesomeIcon icon={faRightToBracket} />
          <Text className="text-red-400!">Logout</Text>
        </SidebarItem>
      </SidebarFooter>
    </Sidebar>
  );
}
