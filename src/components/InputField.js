import * as React from "react";
import { Controller } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";

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
    select,
    helperText,
    error,
    items,
}) {
    const [item, setItem] = React.useState();

    const handleChange = (event) => {
        const value = event.target.value ? event.target.value : "";
        setItem(value);
        console.log(value);
    };
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
                            helperText={helperText}
                            error={error}
                            disabled={disabled ? true : false}
                            select={select ? true : false}
                            onChange={handleChange}
                            value={item?.value}
                        >
                            {select &&
                                items.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                        </TextField>
                    );
                }}
            />
        </>
    );
}
