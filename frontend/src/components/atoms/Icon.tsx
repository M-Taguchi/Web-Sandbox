import {
  Icon as ChakraIcon,
  IconProps as ChakraIconProps,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

interface IconProps extends ChakraIconProps {
  icon: IconType;
}

const Icon: React.FC<IconProps> = ({ icon, ...props }) => {
  return (
    <>
      <ChakraIcon {...props} w={6} h={6} as={icon} />
    </>
  );
};

export default Icon;
