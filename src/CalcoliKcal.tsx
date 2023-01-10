import React from "react";
import { Stack, Typography } from "./design-system";

export function CalcoliKcal() {

  return (
    <Stack spacing={8}>
      <Typography variant="body1">Peso: </Typography>
      <Typography variant="body1">Vita: </Typography>
      <Typography variant="body1">Fianchi: </Typography>
      <Typography variant="body1">Circonferenza polso: </Typography>
      <Typography variant="body1">Rischio cadiovascolare: </Typography>
      <Typography variant="body1">Indice di massa corporea (BMI): </Typography>
      <Typography variant="body1">Rapporto vita/fianchi: </Typography>
      <Typography variant="body1">Taglia corporea (polso): </Typography>
      <Typography variant="body1">BMI di riferimento:</Typography>
      <Typography variant="body1">Peso desiderabile (kg):</Typography>
      <Typography variant="body1">Metabolismo basale (Harris-Benedict):</Typography>
      <Typography variant="body1">Metabolismo basale (Schofield):</Typography>
      <Typography variant="body1">Differenza (kg in più):</Typography>
      <Typography variant="body1">Tolgo kcal calcolo:</Typography>
      <Typography variant="body1">Coefficiente di LAF:</Typography>
      <Typography variant="body1">DE:</Typography>
      <Typography variant="body1">Kcal dieta:</Typography>
    </Stack>
  );
}
