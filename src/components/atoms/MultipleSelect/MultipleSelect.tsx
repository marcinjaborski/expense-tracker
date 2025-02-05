import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { ComponentProps, ReactNode } from "react";

type Props = ComponentProps<typeof Select<number[]>> & {
  label: string;
  values: { id: number; name: ReactNode }[];
};

function MultipleSelect({ label, value, values, ...other }: Props) {
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((id) => (
              <Chip key={id} label={values.find((v) => v.id === id)?.name} />
            ))}
          </Box>
        )}
        input={<OutlinedInput label={label} />}
        multiple
        value={value}
        {...other}
      >
        {values.map(({ id, name }) => (
          <MenuItem value={id} key={id}>
            <Checkbox checked={!!value && value.includes(id)} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MultipleSelect;
