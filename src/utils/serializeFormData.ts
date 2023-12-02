import { FormEntries } from '../validation/validationSchema';
import { fileToBase64 } from './fileToBase64';

export const serializeFormData = async (formData: FormData | FormEntries) => {
  if (formData instanceof FormData) {
    const rawFormEntries = Object.fromEntries(formData.entries()) as Record<string, string>;
    const pictureFile = formData.get('picture') as File;
    const basedFile = await fileToBase64(pictureFile);
    formData.append('picture', basedFile);
    const termsAndConditionsRaw = formData.get('terms-and-conditions') as string;
    const termsAndConditionsTransformed = termsAndConditionsRaw === 'on' ? 'true' : 'false';
    formData.append('terms-and-conditions', termsAndConditionsTransformed);
    const serializedFormEntries = Object.fromEntries(formData.entries()) as unknown as FormEntries;
    return { serializedFormEntries, rawFormEntries };
  } else {
    const fileList = formData.picture as FileList;
    const file = fileList[0] as File;
    const basedFile = await fileToBase64(file);
    const serializedFormEntries = { ...formData, picture: basedFile };
    return { serializedFormEntries };
  }
};
