/**
 *
 * @param product - The product object containing title, description, price, and imageURL.
 * @returns errors - An object containing validation error messages for each field.
 */
export const productValidation = (product: { title: string; description: string; price: string; imageURL: string }) => {
  const errors: { title: string; description: string; price: string; imageURL: string } = {
    title: "",
    description: "",
    price: "",
    imageURL: "",
  };

  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

  if (product.title.length < 10 || product.title.length > 80 || !product.title.trim()) {
    errors.title = "Title must be between 10 and 80 characters long and not empty";
  }
  if (product.description.length < 10 || product.description.length > 900 || !product.description.trim()) {
    errors.description = "description must be between 10 and 900 characters long and not empty";
  }
  if (!validUrl || !product.imageURL.trim()) {
    errors.imageURL = "Valid Image URL is required";
  }
  if (isNaN(Number(product.price)) || !product.price.trim()) {
    errors.price = "Valid price is required";
  }

  return errors;
};
