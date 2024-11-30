import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/presentation/components/ui/navigation-menu';

export function NavigationBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
            <NavigationMenuLink >
              Documentation
            </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}