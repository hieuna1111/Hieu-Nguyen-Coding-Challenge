import { makeValidator } from "envalid";

class EnvalidCustom {
  public notEmptyString = makeValidator((value: string) => {
    if (!value.trim()) {
      throw new Error("Field is required and cannot be empty");
    }
    return value;
  });
}

export const envalidCustom: EnvalidCustom = new EnvalidCustom();
