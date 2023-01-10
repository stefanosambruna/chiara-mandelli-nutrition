import {
  Button,
  Stack,
  Table,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";
import { match } from "ts-pattern";
import {
  Gender,
  Input,
  LAF,
  BodyType,
  RischioCardiovascolare,
  StatoCorporeo,
  TagliaCorporea,
  WP,
} from "./model";
import { ageFromDateOfBirthday, cutDecimals } from "./utils";

type Props = {
  input: Input;
  goBack: () => void;
};

export function Results(props: Props) {
  const rapportoVitaFianchi = props.input.waist / props.input.hip;
  const tagliaCorporea: TagliaCorporea = calcolaTagliaCorporea(
    props.input.wrist,
    props.input.gender
  );
  const bmi = calcolaBMI(props.input.weight, props.input.height);
  const statoCorporeo = calcoloStatoCorporeo(bmi);
  const rischioCardiovascolare = calcolaRischioCardiovascolare(
    props.input.hip,
    statoCorporeo
  );

  const pesoDesiderabile = calcoloPesoDesiderabile(
    statoCorporeo,
    bmi,
    props.input.height
  );

  const age = ageFromDateOfBirthday(props.input.birthDate);

  const metabolismoBasaleHarrisBenedict = calcoloHarrisBenedict(
    props.input.children,
    props.input.gender,
    pesoDesiderabile,
    props.input.height,
    age
  );

  const metabolismoBasaleSchofild = calcoloSchofield(
    pesoDesiderabile,
    props.input.gender,
    age
  );

  const coefficienteLAF = !props.input.children
    ? calcoloCoefficenteLAFAdulti(props.input.laf, props.input.gender)
    : calcoloCoefficenteLAFBambini(age, props.input.weightPercentile);

  const bodyType = calculateBodyType(props.input.gender, rapportoVitaFianchi);

  const kcalDaTogliere = calcoloKcalDaTogliere(statoCorporeo);

  const de = coefficienteLAF * metabolismoBasaleSchofild;

  return (
    <Stack spacing="8px">
      <Button variant="outlined" onClick={props.goBack}>
        Cambia dati
      </Button>
      <Table aria-label="simple table">
        <TableRow>
          <TableCell variant="head">Peso (kg)</TableCell>
          <TableCell align="right">{props.input.weight}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Altezza (cm)</TableCell>
          <TableCell align="right">{props.input.height}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Vita (cm)</TableCell>
          <TableCell align="right">{props.input.waist}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Fianchi (cm)</TableCell>
          <TableCell align="right">{props.input.hip}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Polso (cm)</TableCell>
          <TableCell align="right">{props.input.wrist}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Gender</TableCell>
          <TableCell align="right">{props.input.gender}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Età</TableCell>
          <TableCell align="right">{age}</TableCell>
        </TableRow>
        {props.input.children && (
          <TableRow>
            <TableCell variant="head">Peso percentile</TableCell>
            <TableCell align="right">{props.input.weightPercentile}</TableCell>
          </TableRow>
        )}
        {!props.input.children && (
          <TableRow>
            <TableCell variant="head">LAF</TableCell>
            <TableCell align="right">{props.input.laf}</TableCell>
          </TableRow>
        )}
        <TableRow>
          <TableCell variant="head">Rapporto vita fianchi</TableCell>
          <TableCell align="right">{cutDecimals(rapportoVitaFianchi)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Taglia corporea</TableCell>
          <TableCell align="right">{tagliaCorporea}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">BMI</TableCell>
          <TableCell align="right">{cutDecimals(bmi)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Stato corporeo</TableCell>
          <TableCell align="right">{statoCorporeo}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Rischio cardiovascolare</TableCell>
          <TableCell align="right">{rischioCardiovascolare}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Peso desiderabile</TableCell>
          <TableCell align="right">{cutDecimals(pesoDesiderabile)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">
            Metabolismo basale (Harris-Benedict)
          </TableCell>
          <TableCell align="right">{cutDecimals(metabolismoBasaleHarrisBenedict)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Metabolismo basale (Schofield)</TableCell>
          <TableCell align="right">{cutDecimals(metabolismoBasaleSchofild)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Coefficiente LAF</TableCell>
          <TableCell align="right">{cutDecimals(coefficienteLAF)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Tipologia corporea</TableCell>
          <TableCell align="right">{bodyType}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Differenza (kg in più)</TableCell>
          <TableCell align="right">
            {props.input.weight - pesoDesiderabile}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Kcal da togliere</TableCell>
          <TableCell align="right">
            {kcalDaTogliere ? kcalDaTogliere : 0}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">DE</TableCell>
          <TableCell align="right">{cutDecimals(de)}</TableCell>
        </TableRow>
      </Table>
      <Button variant="outlined" onClick={props.goBack}>
        Cambia dati
      </Button>
    </Stack>
  );
}

function calcolaTagliaCorporea(wrist: number, gender: Gender) {
  if (gender === Gender.M) {
    if (wrist <= 16) return TagliaCorporea.EsileBrevilineo;
    else if (wrist > 16 && wrist <= 20) return TagliaCorporea.MedioNormolineo;
    else return TagliaCorporea.RobustoLongilineo;
  } else {
    if (wrist <= 14) return TagliaCorporea.EsileBrevilineo;
    else if (wrist > 14 && wrist <= 18) return TagliaCorporea.MedioNormolineo;
    else return TagliaCorporea.RobustoLongilineo;
  }
}

function calcolaBMI(weight: number, height: number) {
  return weight / Math.pow(height / 100, 2);
}

function calcoloStatoCorporeo(bmi: number) {
  if (bmi <= 18.5) return StatoCorporeo.Sottopeso;
  else if (bmi > 18.5 && bmi <= 25) return StatoCorporeo.Normopeso;
  else if (bmi > 25 && bmi <= 30) return StatoCorporeo.Sovrappeso;
  else if (bmi > 30 && bmi <= 35) return StatoCorporeo.Obesità1Grado;
  else if (bmi > 35 && bmi <= 40) return StatoCorporeo.Obesità2Grado;
  else return StatoCorporeo.Obesità3Grado;
}

function calcolaRischioCardiovascolare(
  hip: number,
  statoCorporeo: StatoCorporeo
) {
  const hipThreshold = 88;
  if (hip <= hipThreshold) {
    return match(statoCorporeo)
      .with(
        StatoCorporeo.Sottopeso,
        StatoCorporeo.Normopeso,
        () => RischioCardiovascolare.Normale
      )
      .with(StatoCorporeo.Sovrappeso, () => RischioCardiovascolare.Aumentato)
      .with(StatoCorporeo.Obesità1Grado, () => RischioCardiovascolare.Alto)
      .with(StatoCorporeo.Obesità2Grado, () => RischioCardiovascolare.MoltoAlto)
      .with(
        StatoCorporeo.Obesità3Grado,
        () => RischioCardiovascolare.EstremamenteAlto
      )
      .exhaustive();
  } else {
    return match(statoCorporeo)
      .with(
        StatoCorporeo.Sottopeso,
        StatoCorporeo.Normopeso,
        () => RischioCardiovascolare.Aumentato
      )
      .with(StatoCorporeo.Sovrappeso, () => RischioCardiovascolare.Alto)
      .with(
        StatoCorporeo.Obesità1Grado,
        StatoCorporeo.Obesità2Grado,
        () => RischioCardiovascolare.MoltoAlto
      )
      .with(
        StatoCorporeo.Obesità3Grado,
        () => RischioCardiovascolare.EstremamenteAlto
      )
      .exhaustive();
  }
}

function calcoloPesoDesiderabile(
  statoCorporeo: StatoCorporeo,
  bmi: number,
  height: number
) {
  const bmiDiRiferimento = match(statoCorporeo)
    .with(StatoCorporeo.Sottopeso, StatoCorporeo.Normopeso, () => bmi)
    .with(StatoCorporeo.Sovrappeso, () => 22.5)
    .with(
      StatoCorporeo.Obesità1Grado,
      StatoCorporeo.Obesità2Grado,
      StatoCorporeo.Obesità3Grado,
      () => 25
    )
    .exhaustive();
  return bmiDiRiferimento * Math.pow(height / 100, 2);
}

function calcoloHarrisBenedict(
  children: boolean,
  gender: Gender,
  pesoDesiderabile: number,
  height: number,
  age: number
): number {
  if (children) {
    return 22.1 + 31.05 * pesoDesiderabile + 1.16 * height;
  } else {
    return match(gender)
      .with(
        Gender.M,
        () => 66 + 13.7 * pesoDesiderabile + 5 * height - 6.8 * age
      )
      .with(
        Gender.F,
        () => 655 + 9.6 * pesoDesiderabile + 1.8 * height - 4.7 * age
      )
      .exhaustive();
  }
}

function calcoloSchofield(
  pesoDesiderabile: number,
  gender: Gender,
  age: number
) {
  if (age <= 3) {
    return match(gender)
      .with(Gender.M, () => 59.51 * pesoDesiderabile - 30.4)
      .with(Gender.F, () => 58.31 * pesoDesiderabile - 31.1)
      .exhaustive();
  } else if (3 < age && age <= 9) {
    return match(gender)
      .with(Gender.M, () => 22.71 * pesoDesiderabile + 504.3)
      .with(Gender.F, () => 20.32 * pesoDesiderabile + 485.9)
      .exhaustive();
  } else if (10 < age && age <= 17) {
    return match(gender)
      .with(Gender.M, () => 17.69 * pesoDesiderabile + 658.2)
      .with(Gender.F, () => 13.38 * pesoDesiderabile + 692.6)
      .exhaustive();
  } else if (18 < age && age <= 29) {
    return match(gender)
      .with(Gender.M, () => 15.06 * pesoDesiderabile + 692.2)
      .with(Gender.F, () => 14.82 * pesoDesiderabile + 486.6)
      .exhaustive();
  } else if (30 < age && age <= 59) {
    return match(gender)
      .with(Gender.M, () => 11.47 * pesoDesiderabile + 873.1)
      .with(Gender.F, () => 8.31 * pesoDesiderabile + 845.6)
      .exhaustive();
  } else {
    return match(gender)
      .with(Gender.M, () => 11.71 * pesoDesiderabile + 587.7)
      .with(Gender.F, () => 9.08 * pesoDesiderabile + 658.5)
      .exhaustive();
  }
}

function calcoloCoefficenteLAFAdulti(laf: LAF, gender: Gender) {
  return match({ laf, gender })
    .with({ laf: LAF.Sedentario, gender: Gender.M }, () => 1.3)
    .with({ laf: LAF.Sedentario, gender: Gender.F }, () => 1.3)
    .with({ laf: LAF.Lieve, gender: Gender.M }, () => 1.45)
    .with({ laf: LAF.Lieve, gender: Gender.F }, () => 1.45)
    .with({ laf: LAF.Moderata, gender: Gender.M }, () => 1.6)
    .with({ laf: LAF.Moderata, gender: Gender.F }, () => 1.6)
    .with({ laf: LAF.Intensa, gender: Gender.M }, () => 1.75)
    .with({ laf: LAF.Intensa, gender: Gender.F }, () => 1.75)
    .with({ laf: LAF.MoltoIntensa, gender: Gender.M }, () => 2.1)
    .with({ laf: LAF.MoltoIntensa, gender: Gender.F }, () => 2.1)
    .exhaustive();
}
function calcoloCoefficenteLAFBambini(age: number, weightPercentile: WP) {
  if (age < 3)
    return match(weightPercentile)
      .with(WP.Wp25, () => 1.35)
      .with(WP.Wp75, () => 1.39)
      .with(WP.WpMediana, () => 1.66)
      .exhaustive();
  else if (3 < age && age <= 9)
    return match(weightPercentile)
      .with(WP.Wp25, () => 1.42)
      .with(WP.Wp75, () => 1.57)
      .with(WP.WpMediana, () => 1.73)
      .exhaustive();
  else
    return match(weightPercentile)
      .with(WP.Wp25, () => 1.66)
      .with(WP.Wp75, () => 1.73)
      .with(WP.WpMediana, () => 1.85)
      .exhaustive();
}

function calculateBodyType(gender: Gender, vf: number): BodyType {
  return match(gender)
    .with(Gender.M, () => {
      if (vf <= 0.94) return BodyType.Ginoide;
      else if (vf <= 0.99) return BodyType.Intermedio;
      else return BodyType.Androide;
    })
    .with(Gender.F, () => {
      if (vf <= 0.78) return BodyType.Ginoide;
      else if (vf <= 0.84) return BodyType.Intermedio;
      else return BodyType.Androide;
    })
    .exhaustive();
}

function calcoloKcalDaTogliere(
  statoCorporeo: StatoCorporeo
): string | undefined {
  const x: string | undefined = match(statoCorporeo)
    .with(StatoCorporeo.Sottopeso, StatoCorporeo.Normopeso, () => undefined)
    .with(StatoCorporeo.Sovrappeso, () => "Max 500")
    .with(
      StatoCorporeo.Obesità1Grado,
      StatoCorporeo.Obesità2Grado,
      StatoCorporeo.Obesità3Grado,
      () => "500-1000"
    )
    .exhaustive();
  return x;
}
