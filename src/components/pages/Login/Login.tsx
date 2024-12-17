import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import routes from "@src/utils/routes.ts";
import supabase from "@src/utils/supabase.ts";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

function Login() {
  const { t } = useTranslation("Login");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) {
      setErrorMessage(error.message);
      return;
    }
    navigate(routes.dashboard);
  };

  return (
    <Box sx={{ display: "grid", placeItems: "center", height: "100%" }}>
      <Paper sx={{ p: 3, width: "80vw" }} elevation={3} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <TextField
            fullWidth
            type="email"
            label={t("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email", {
              required: t("emailRequired"),
            })}
          />
          <TextField
            fullWidth
            type="password"
            label={t("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password", {
              required: t("passwordRequired"),
              minLength: {
                value: 8,
                message: t("passwordMinLength"),
              },
            })}
          />
          {errorMessage ? (
            <Alert variant="filled" severity="error">
              {errorMessage}
            </Alert>
          ) : null}
          <Button type="submit" variant="contained">
            {t("login")}
          </Button>
          <Typography>
            {t("registerText")} <Link to={routes.register}>{t("registerLink")}</Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Login;
