import { listingCreateSchema } from './schemes';
import { ListingCreateInputType } from './types/types';

/**
 * @description - Validator used for create a listing in actions
 * NOTE: this only work for create listing.
 * @param data - The data required for create a listing see more in CreateListingDataValidator type.
 */
export const createListingValidator = async (
  data: ListingCreateInputType,
): Promise<void> => {
  await listingCreateSchema.validate(data, { abortEarly: false });
};
