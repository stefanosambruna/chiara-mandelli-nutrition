import { Gender, LAF, Patient, WP } from "./model";

export const patients: Patient[] = [
    {
        name: "Stefano",
        surname: "Sambruna",
        birthDate: new Date("23/12/1993"),
        cf: "SMBSFN93T23F133A",
        gender: Gender.M,
        phoneNumber: "3911699510",
        email: "stesambruna@gmail.com",
        address: "Via Grandi 15, Barzanò, 23891",
        height: 170,
        maxWeight: 74,
        activity: "Arrampicata",
        laf: LAF.Moderata,
        weightPercentile: undefined,
        job: "ufficio",
        firstVisitDate: new Date(),
    }
]