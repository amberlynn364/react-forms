import { VALID_FILE_EXTENSION } from '../constants/constants';

export default function validateImageExtension(
  fileName: string | undefined,
  fileType: string
): boolean {
  return (
    fileName !== undefined &&
    VALID_FILE_EXTENSION[fileType]?.includes(
      fileName.split('.').pop()?.toLowerCase() || ''
    )
  );
}
