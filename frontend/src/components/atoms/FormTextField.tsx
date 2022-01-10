import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Textarea,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { useFormContext, Validate, ValidationRule } from "react-hook-form";

type FormTextFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  multiple?: boolean;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  validate?: Validate<any>;
  pattern?: ValidationRule<RegExp>;
  inputLeftElement?: ReactElement;
  inputRightElement?: ReactElement;
  isValidate?: boolean;
};

const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  placeholder,
  multiple = false,
  defaultValue = "",
  minLength,
  maxLength,
  required,
  validate,
  pattern,
  inputLeftElement,
  inputRightElement,
  isValidate = true,
}) => {
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

          {multiple ? (
            <Textarea
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
              defaultValue={defaultValue}
            />
          ) : (
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
              defaultValue={defaultValue}
            />
          )}

          {inputRightElement && (
            <InputRightElement>{inputRightElement}</InputRightElement>
          )}
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
