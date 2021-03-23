import * as yup from 'yup';

export const listingCreateSchema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email(),
  phone: yup.string(),
  propertyType: yup.string().required('Property type is a required field'),
  bathrooms: yup.number().min(1),
  bedrooms: yup.number().min(1),
  stories: yup.number().min(1),
  sqFootageMax: yup
    .number()
    .min(1, 'SQ Footage Max must be greater than or equal to 1'),
  sqFootageMin: yup
    .number()
    .min(0, 'SQ Footage Min must be greater than or equal to 0'),
  budgetMax: yup
    .number()
    .min(1, 'Budget Max must be greater than or equal to 1'),
  budgetMin: yup
    .number()
    .min(0, 'Budget Min must be greater than or equal to 0'),
  notes: yup.string(),
  zipcode: yup.array().of(yup.string()),
  agent: yup.object().shape({
    connect: yup.object().shape({
      id: yup.string().required('Agent id is required for create a listing'),
    }),
  }),
  listingAmenitieListingRelation: yup.object().shape({
    create: yup
      .array(
        yup.object().shape({
          amenitie: yup.object().shape({
            connect: yup.object().shape({
              id: yup.string().required(),
            }),
          }),
          niceToHave: yup.boolean(),
          mustToHave: yup.boolean(),
        }),
      )
      .min(1, 'Amenities must have at least 1 items'),
  }),
  listingZipCodeRelation: yup.object().shape({
    create: yup
      .array(
        yup.object().shape({
          zipcode: yup.string(),
        }),
      )
      .min(1, 'zipcode must have at least 1 items'),
  }),
});
