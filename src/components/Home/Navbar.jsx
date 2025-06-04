import { LinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  useBreakpointValue,
  Tooltip,
} from "@chakra-ui/react";
import { LuUserRound } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { Link as RouterLink, useLocation } from "react-router-dom";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const location = useLocation();
  const showText = useBreakpointValue({ base: false, md: true });

  const navItems = [
    {
      label: "Links",
      icon: <LinkIcon />,
      path: "/home",
    },
    {
      label: "Profile Details",
      icon: <LuUserRound />,
      path: "/profile",
    },
    {
      label: "Preview",
      icon: <FiEye />,
      path: "/preview",
    },
  ];

  return (
    <Box p={4} boxShadow="lg" bg="white" borderRadius="lg">
      <Flex justify="space-between" align="center">
        <Box>
          <Heading fontSize="md">Wanlinq</Heading>
        </Box>

        <Flex gap={4} align="center">
          {navItems.map(({ label, icon, path }) => {
            const isActive = location.pathname === path;

            const button = (
              <Button
                as={RouterLink}
                to={path}
                leftIcon={icon}
                variant="ghost"
                borderRadius="lg"
                p={2}
                size="sm"
                color={isActive ? "purple.700" : "gray.700"}
                backgroundColor={isActive ? "purple.200" : "transparent"}
                _hover={{
                  backgroundColor: "purple.100",
                  color: "purple.800",
                }}
              >
                {showText && label}
              </Button>
            );

            return showText ? button : (
              <Tooltip label={label} key={path} hasArrow placement="bottom">
                {button}
              </Tooltip>
            );
          })}
        </Flex>

        <Flex>
          <UserMenu />
        </Flex>
      </Flex>
    </Box>
  );
}
