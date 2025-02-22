import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const fetchEntries = async (contentType) => {
  try {
    const response = await client.getEntries({
      content_type: contentType,  // The content type you want to fetch
    });
    console.log("Contentful response:", response);  // Log the full response to check its structure
    return response.items;  // Assuming you're getting items inside the response
  } catch (error) {
    console.error("Error fetching from Contentful:", error);  // Log errors if any
    return [];  // Return an empty array in case of error
  }
};
