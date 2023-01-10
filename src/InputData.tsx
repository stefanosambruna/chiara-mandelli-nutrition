import React from "react";
import {
  Button,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Stack } from "./design-system";
import MenuItem from "@mui/material/MenuItem";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Gender, Input, LAF, WP } from "./model";
import { isAChild } from "./utils";

type InputDataRaw = {
  weight: number;
  height: number;
  waist: number;
  hip: number;
  wrist: number;
  gender: Gender;
  birthDate: Date | null;
  laf: LAF;
  weightPercentile: WP;
};
type Props = {
  input: InputDataRaw;
  setState: (newState: Input) => void;
};

export function InputDate(props: Props) {
  const [state, setState] = React.useState<InputDataRaw>(props.input);

  const lafOptions = [
    { value: LAF.Sedentario, label: "Sedentario (no attività fisica)" },
    { value: LAF.Lieve, label: "Lieve attività (1-2 gg esercizio fisico)" },
    {
      value: LAF.Moderata,
      label: "Moderata attività (fino 3-5 gg esercizio fisico)",
    },
    {
      value: LAF.Intensa,
      label: "Intensa attività (fino 6-7 gg esercizio fisico)",
    },
    { value: LAF.MoltoIntensa, label: "Molto intensa (7 gg, 2 vv al gg)" },
  ];
  const weightPercentile = [
    { value: WP.Wp25, label: "25° percentile" },
    { value: WP.WpMediana, label: "mediana" },
    { value: WP.Wp75, label: "75° percentile" },
  ];

  return (
    <Stack spacing="16px">
      <TextField
        label="Altezza (cm)"
        type="number"
        variant="outlined"
        value={state.height}
        onChange={(e) =>
          setState({
            ...state,
            height: parseFloat(e.target.value),
          })
        }
      />
      <TextField
        label="Peso (kg)"
        type="number"
        variant="outlined"
        value={state.weight}
        onChange={(e) =>
          setState({
            ...state,
            weight: parseFloat(e.target.value),
          })
        }
      />
      <TextField
        label="Vita (cm)"
        type="number"
        variant="outlined"
        value={state.waist}
        onChange={(e) =>
          setState({
            ...state,
            waist: parseFloat(e.target.value),
          })
        }
      />
      <TextField
        label="Fianchi (cm)"
        type="number"
        variant="outlined"
        value={state.hip}
        onChange={(e) =>
          setState({
            ...state,
            hip: parseFloat(e.target.value),
          })
        }
      />
      <TextField
        label="Polso (cm)"
        type="number"
        variant="outlined"
        value={state.wrist}
        inputProps={{
          step: "0.1",
        }}
        onChange={(e) =>
          setState({
            ...state,
            wrist: parseFloat(e.target.value),
          })
        }
      />
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={state.gender}
          onChange={(e) =>
            setState({
              ...state,
              gender: parseGender(e.target.value),
            })
          }
        >
          <FormControlLabel
            value={Gender.F}
            control={<Radio />}
            label="Femmina"
          />
          <FormControlLabel
            value={Gender.M}
            control={<Radio />}
            label="Maschio"
          />
        </RadioGroup>
      </FormControl>
      <DesktopDatePicker
        label="Data di nascita"
        inputFormat="DD/MM/YYYY"
        renderInput={(params) => <TextField {...params} />}
        value={state.birthDate}
        onChange={(newValue) =>
          setState({
            ...state,
            birthDate: newValue,
          })
        }
      />
      {state.birthDate && !isAChild(state.birthDate) && (
        <TextField
          select
          label="LAF"
          variant="outlined"
          value={state.laf}
          onChange={(e) =>
            setState({
              ...state,
              laf: parseLaf(e.target.value),
            })
          }
        >
          {lafOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
      {state.birthDate && isAChild(state.birthDate) && (
        <TextField
          select
          label="Peso percentile"
          variant="outlined"
          value={state.weightPercentile}
          onChange={(e) =>
            setState({
              ...state,
              weightPercentile: parseWp(e.target.value),
            })
          }
        >
          {weightPercentile.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
      <Button
        variant="contained"
        onClick={() => {
          if (
            !!state.weight &&
            !!state.height &&
            !!state.waist &&
            !!state.hip &&
            !!state.wrist &&
            !!state.gender &&
            !!state.birthDate &&
            ((!isAChild(state.birthDate) && !!state.laf) ||
              (isAChild(state.birthDate) && !!state.weightPercentile))
          ) {
            const children = isAChild(state.birthDate);
            const params = children
              ? {
                  children: children,
                  weightPercentile: state.weightPercentile,
                  laf: undefined,
                }
              : {
                  children: children,
                  weightPercentile: undefined,
                  laf: state.laf,
                };

            props.setState({
              weight: state.weight,
              height: state.height,
              waist: state.waist,
              hip: state.hip,
              wrist: state.wrist,
              gender: state.gender,
              birthDate: state.birthDate,
              ...params,
            });
          } else {
            console.log("fill out all the fields");
          }
        }}
      >
        Calcola
      </Button>
    </Stack>
  );
}

function parseLaf(laf: string) {
  switch (laf) {
    case "Sedentario (no attività fisica)":
      return LAF.Sedentario;
    case "Lieve attività (1-2 gg esercizio fisico)":
      return LAF.Lieve;
    case "Moderata attività (fino 3-5 gg esercizio fisico)":
      return LAF.Moderata;
    case "Intensa attività (fino 6-7 gg esercizio fisico)":
      return LAF.Intensa;
    case "Molto intensa (7 gg, 2 vv al gg)":
      return LAF.MoltoIntensa;
    default:
      return LAF.Sedentario;
  }
}

function parseWp(wp: string) {
  switch (wp) {
    case "25° percentile":
      return WP.Wp25;
    case "mediana":
      return WP.WpMediana;
    case "75° percentile":
      return WP.Wp75;
    default:
      return WP.Wp25;
  }
}
function parseGender(gender: string) {
  switch (gender) {
    case "M":
      return Gender.M;
    case "F":
      return Gender.F;
    default:
      return Gender.M;
  }
}
