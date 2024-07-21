import { BadRequestError } from "../errors/customErrors.js";

export const arabicNameRegex = (name, errorMsg) => {
  const Regex = /^[\u0600-\u06FF]+( [\u0600-\u06FF]+)*$/;
  if (!Regex.test(name.trim())) {
    throw new BadRequestError(
      `يجب أن يكون ${errorMsg} باللغة العربية ولا يمكن أن يحتوي على أكثر من مسافة واحدة متتالية.`
    );
  }
  return true;
};