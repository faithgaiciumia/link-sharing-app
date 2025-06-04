/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { BiLink, BiMenu, BiEdit, BiDotsVerticalRounded, BiTrash } from "react-icons/bi";
import RemoveLinkButton from "../RemoveLinkButton";

const platformIcons = {
  instagram: <FaInstagram color="#E1306C" />,
  twitter: <FaTwitter color="#1DA1F2" />,
  facebook: <FaFacebook color="#4267B2" />,
  linkedin: <FaLinkedin color="#0077b5" />,
  youtube: <FaYoutube color="#FF0000" />,
  tiktok: <FaTiktok color="#000" />,
  default: <BiLink />,
};

export default function LinkCard({
  index,
  platform,
  link,
  onRemove,
  setUpdated,
}) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const platformKey = platform?.toLowerCase() || "default";
  const icon = platformIcons[platformKey] || platformIcons.default;

  const handleEdit = () => {
    // Placeholder - replace with your edit logic
    console.log("Edit clicked for index", index);
  };

  return (
    <Box
      my={4}
      p={4}
      borderRadius="lg"
      background="white"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ boxShadow: "lg" }}
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Button leftIcon={<BiMenu />} variant="ghost" size="sm">
          Link #{index}
        </Button>

        {!isMobile ? (
          <Flex gap={2}>
            <Button
              leftIcon={<BiEdit />}
              variant="outline"
              size="sm"
              colorScheme="blue"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <RemoveLinkButton onRemove={onRemove} setUpdated={setUpdated} />
          </Flex>
        ) : (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<BiDotsVerticalRounded />}
              variant="ghost"
              size="sm"
            />
            <MenuList>
              <MenuItem
                icon={<BiEdit />}
                onClick={handleEdit}
                color="blue.500"
                _hover={{ bg: "blue.50", color: "blue.600" }}
              >
                Edit
              </MenuItem>
              <MenuItem
                icon={<BiTrash />}
                onClick={() => {
                  onRemove();
                  setUpdated(true);
                }}
                color="red.500"
                _hover={{ bg: "red.50", color: "red.600" }}
              >
                Remove
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>

      <VStack align="start" spacing={3}>
        <Flex align="center" gap={2}>
          <Text fontSize="sm" color="gray.500" minW="80px">
            Platform:
          </Text>
          <Flex align="center" gap={2}>
            <Icon as={() => icon} boxSize={5} />
            <Text fontWeight="medium">{platform}</Text>
          </Flex>
        </Flex>

        <Flex align="center" gap={2} wordBreak="break-all">
          <Text fontSize="sm" color="gray.500" minW="80px">
            Link:
          </Text>
          <Text fontWeight="medium" color="blue.600">
            {link}
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
}
