"use server";

export async function addProduct(formData) {
  console.log("Mock addProduct called", formData.get("url"));
  return { message: "Mock product added successfully" };
}

export async function getPriceHistory(productId) {
  console.log("Mock getPriceHistory called for", productId);
  return [];
}

export async function deleteProduct(productId) {
  console.log("Mock deleteProduct called for", productId);
  return { success: true };
}

export async function signOut() {
  console.log("Mock signOut called");
  return { success: true };
}
