import { Table, TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Json } from "@src/utils/database.types.ts";
import InfoIcon from "@mui/icons-material/Info";
import { isValidCompound } from "@src/utils/functions.ts";
import { useState } from "react";
import Amount from "@src/components/atoms/Amount";

type CompoundTooltipProps = {
  compound: Json;
};

function CompoundTooltip({ compound }: CompoundTooltipProps) {
  const [open, setOpen] = useState(false);
  if (!isValidCompound(compound)) return null;

  return (
    <Tooltip
      open={open}
      onClick={() => setOpen((prevState) => !prevState)}
      title={
        <Table size="small">
          <TableBody>
            {compound.map(({ amount, description }) => (
              <TableRow key={`${amount}-${description}`}>
                <TableCell>
                  <Amount number={amount} />
                </TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    >
      <InfoIcon />
    </Tooltip>
  );
}

export default CompoundTooltip;
