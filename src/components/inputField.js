import * as React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export default function InputField({
    control,
    errors,
    name,
    defaultValue,
    variant,
    label,
    register,
    type,
    disabled,
}) {
    return (
        <>
            <Controller
                control={control}
                errors={errors}
                name={name}
                defaultValue={defaultValue}
                render={(field) => {
                    return (
                        <TextField
                            variant={variant ? variant : "standard"}
                            defaultValue={defaultValue}
                            fullWidth
                            margin="dense"
                            {...register(name)}
                            {...field}
                            type={type ? type : ""}
                            name={name}
                            label={label}
                            helperText={errors.name?.message}
                            disabled={disabled ? true : false}
                        />
                    );
                }}
            />
        </>
    );
}
