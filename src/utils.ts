export function ageFromDateOfBirthday(dateOfBirth: Date): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

export function isAChild(birthDate: Date) {
  return ageFromDateOfBirthday(birthDate) <= 16;
}


export function cutDecimals(value: number){
    return (Math.round(value * 100) / 100).toFixed(2);
}