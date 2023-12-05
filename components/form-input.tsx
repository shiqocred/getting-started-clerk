import React, { SetStateAction } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const FormInput = ({
  setA,
  name,
  label,
  autoComplete,
  placeholder,
  type,
}: {
  setA: SetStateAction<any>;
  autoComplete: "on" | "off";
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}) => {
  return (
    <div className="space-y-1 w-full">
      <Label htmlFor={name}>{label}</Label>
      <Input
        onChange={(e) => setA(e.target.value)}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default FormInput;
