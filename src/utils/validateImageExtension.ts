import { VALID_FILE_EXTENSION } from '../constants/constants';

export default function validateImageExtension(
  fileName: string,
  fileType: string
): boolean {
  return VALID_FILE_EXTENSION[fileType]?.includes(
    fileName.split('.').pop()?.toLowerCase() || ''
  );
}
