import { ImageData } from '../api/types';
import { formatDate } from './formatDate';
import { trimImageName } from './trimImageName';

export function extractImageData(imageData: ImageData) {
  return {
    imageUrl: imageData.links ? imageData.links[0].href : '',
    imageTitle: trimImageName(imageData.data[0].title),
    nasaId: imageData.data[0].nasa_id,
    center: imageData.data[0].center,
    dateCreated: formatDate(new Date(imageData.data[0].date_created)),
    location: imageData.data[0].location,
    photographer: imageData.data[0].photographer,
  };
}
