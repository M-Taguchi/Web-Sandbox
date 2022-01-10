import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { useFormContext, Validate, ValidationRule } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Icon from "./Icon";

type FormTextFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  validate?: Validate<any>;
  pattern?: ValidationRule<RegExp>;
  inputLeftElement?: ReactElement;
  isValidate?: boolean;
};

const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  placeholder,
  minLength,
  maxLength,
  required,
  validate,
  pattern,
  inputLeftElement,
  isValidate = true,
}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <FormControl isInvalid={errors[name]}>
        {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <InputGroup>
          {inputLeftElement && (
            <InputLeftElement>{inputLeftElement}</InputLeftElement>
          )}

          <Input
            {...register(name, {
              minLength: minLength && {
                value: minLength,
                message: `${minLength}文字以下で入力してください`,
              },
              maxLength: maxLength && {
                value: maxLength,
                message: `${maxLength}文字以上で入力してください`,
              },
              required: required && "必須項目です",
              pattern: pattern,
              validate: validate,
            })}
            placeholder={placeholder}
            type={show ? "text" : "password"}
          />

          <InputRightElement>
            <Button onClick={handleClick} variant={"ghost"}>
              {show ? (
                <Icon icon={MdVisibility} />
              ) : (
                <Icon icon={MdVisibilityOff} />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
        {isValidate &&
          (errors[name] ? (
            <FormErrorMessage mb={2}>{errors[name].message}</FormErrorMessage>
          ) : (
            <Box h={"21px"} mt={2} mb={2}></Box>
          ))}
      </FormControl>
    </>
  );
};

export default FormTextField;
