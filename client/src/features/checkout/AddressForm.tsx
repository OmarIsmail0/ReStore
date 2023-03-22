import { Typography, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { AppTextInput } from "./../../app/components/AppTextInput";

import AppCheckbox from "../../app/components/AppCheckbox";

export default function AddressForm() {
  const { control, formState } = useFormContext();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <AppTextInput
            control={control}
            name="fullName"
            label="Full name"
            variant={"outlined"}
          />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput
            control={control}
            name="address1"
            label="address 1"
            variant={"outlined"}
          />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput
            control={control}
            name="address2"
            label="address 2"
            variant={"outlined"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            control={control}
            name="city"
            label="city"
            variant={"standard"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            control={control}
            name="state"
            label="state"
            variant={"standard"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            control={control}
            name="zip"
            label="Zip / Postal code"
            variant={"standard"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            control={control}
            name="country"
            label="country"
            variant={"standard"}
          />
        </Grid>
        <Grid item xs={12}>
          <AppCheckbox
            disabled={!formState.isDirty}
            name="saveAddress"
            label="Save this as the default address"
            control={control}
          />
        </Grid>
      </Grid>
    </>
  );
}
