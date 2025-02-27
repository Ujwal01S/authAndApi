import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  //   NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserSessionType } from "@/types/session";
import UserCard from "../userCard/userCard";
import SignOutTag from "../userCard/signOut";

export default function UserContent({ image, name }: UserSessionType) {
  return (
    <div>
      <NavigationMenu viewPortClassName="-left-[200px]">
        <NavigationMenuList className="bg-none">
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Avatar>
                <AvatarImage src={image} />
                <AvatarFallback>{name}</AvatarFallback>
              </Avatar>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[400px] py-4 px-3">
              <NavigationMenuLink>
                <UserCard />
              </NavigationMenuLink>

              <SignOutTag />
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
