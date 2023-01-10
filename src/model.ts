export enum LAF {
  Sedentario = "Sedentario (no attività fisica)",
  Lieve = "Lieve attività (1-2 gg esercizio fisico)",
  Moderata = "Moderata attività (fino 3-5 gg esercizio fisico)",
  Intensa = "Intensa attività (fino 6-7 gg esercizio fisico)",
  MoltoIntensa = "Molto intensa (7 gg, 2 vv al gg)",
}

export enum WP {
  Wp25 = "25° percentile",
  WpMediana = "mediana",
  Wp75 = "75° percentile",
}

export enum Gender {
  M = "M",
  F = "F",
}

export enum TagliaCorporea {
  EsileBrevilineo = "esile-brevilineo",
  MedioNormolineo = "medio-normolineo",
  RobustoLongilineo = "robusto-longilineo",
}

export enum StatoCorporeo {
  Sottopeso = "Sottopeso",
  Normopeso = "Normopeso",
  Sovrappeso = "Sovrappeso",
  Obesità1Grado = "Obesità di 1 grado",
  Obesità2Grado = "Obesità di 2 grado",
  Obesità3Grado = "Obesità di 3 grado",
}

export enum RischioCardiovascolare {
  Normale = "Normale",
  Aumentato = "Aumentato",
  Alto = "Alto",
  MoltoAlto = "Molto Alto",
  EstremamenteAlto = "Estremamente Alto",
}

export enum BodyType {
  Ginoide = "Ginoide",
  Intermedio = "Intermedio",
  Androide = "Androide",
}

export type Patient = {
  name: string;
  surname: string;
  birthDate: Date;
  cf: string;
  gender: Gender;
  phoneNumber: string;
  email: string;
  address: string;
  height: number;
  maxWeight: number;
  activity: string;
  laf?: LAF;
  weightPercentile?: WP;
  job: string;
  firstVisitDate: Date;
};

export type Input = {
  weight: number;
  height: number;
  waist: number;
  hip: number;
  wrist: number;
  gender: Gender;
  birthDate: Date;
} & (
  | {
      children: true;
      weightPercentile: WP;
    }
  | {
      children: false;
      laf: LAF;
    }
);

// export type Reading = {
//   circumferences: {
//     date: Date;
//     weight: number;
//     wrist: number;
//     relaxedArm: number;
//     outstretchedArm: number;
//     waist: number;
//     abdomen: number;
//     hip: number; //fianchi
//     neck: number;
//     thigh: number; //coscia
//     calf: number; //polpaccio
//   };
//   plicometry: {
//     bicipital: number;
//     triceps: number;
//     subscapularis: number;
//     middleAxillary: number;
//     pectoral: number;
//     medianSuprailiac: number;
//     anteriorSuprailiacJoint: number;
//     abdominal: number;
//     medianThigh: number;
//     calf: number;
//   };
// };
