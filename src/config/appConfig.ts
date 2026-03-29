import { AppConfig } from '../types/config';

export const appConfig: AppConfig = {
  appName: "RentEase",

  entity: {
    name: "Property",
    route: "properties",
  },

  ui: {
    showImage: true,
    showPrice: true,
  },

  fields: [
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "location", label: "Location", type: "text" },
    { name: "rentPerMonth", label: "Rent", type: "number" },
    { name: "propertyType", label: "Property Type (apartment, house, room, villa)", type: "text" },
    { name: "bedrooms", label: "Bedrooms", type: "number" },
    { name: "bathrooms", label: "Bathrooms", type: "number" },
    { name: "area", label: "Area (sq ft)", type: "number" },
    { name: "furnishing", label: "Furnishing (furnished, semi, unfurnished)", type: "text" },
    { name: "amenities", label: "Amenities", type: "text" },
    { name: "image", label: "Image URL", type: "text" },
  ],

  features: {
    auth: true,
    admin: true,
  },
};