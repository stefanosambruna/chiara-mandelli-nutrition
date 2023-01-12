import React from "react";
import CustomTheme from "./theme";
import { Container, Stack, Typography } from "./design-system";
import { InputDate } from "./InputData";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Gender, Input, LAF, WP } from "./model";
import { Results } from "./Results";
import { match } from "ts-pattern";

function App() {
  const [state, setState] = React.useState<{ input: Input; phase: 1 | 2 }>({
    input: {
      height: 173,
      weight: 65,
      waist: 70,
      hip: 90,
      wrist: 17,
      gender: Gender.M,
      birthDate: new Date(),
      children: true,
      weightPercentile: WP.Wp25,
    },
    phase: 1,
  });

  const doSetState = (input: Input) => {
    setState({ input: input, phase: 2 });
  };

  return (
    <CustomTheme>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="itIT">
        <Container
          maxWidth="sm"
          style={{
            backgroundColor: "white",
            padding: "32px 16px",
            borderRadius: "5px",
            marginTop: "24px",
            boxShadow: "3px 3px 5px 0px rgba(0,0,0,0.31)",
          }}
        >
          <Stack spacing="24px">
            <Typography variant="h5" component="h1" textAlign="center">
              Chiara Mandelli Nutrition
            </Typography>
            {match(state)
              .with({ phase: 1 }, (s) => {
                return (
                  <InputDate
                    input={{
                      height: s.input.height,
                      weight: s.input.weight,
                      waist: s.input.waist,
                      hip: s.input.hip,
                      wrist: s.input.wrist,
                      gender: s.input.gender,
                      birthDate: s.input.birthDate,
                      weightPercentile: s.input.children
                        ? s.input.weightPercentile
                        : WP.Wp25,
                      laf: !s.input.children ? s.input.laf : LAF.Lieve,
                    }}
                    setState={doSetState}
                  />
                );
              })
              .with({ phase: 2 }, (s) => (
                <Results
                  input={s.input}
                  goBack={() => setState({ input: s.input, phase: 1 })}
                />
              ))
              .exhaustive()}
          </Stack>
        </Container>
      </LocalizationProvider>
    </CustomTheme>
  );
}

export default App;
