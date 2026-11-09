import type { Coffee } from "../types/coffee";

// Memeriksa apakah data menu kopi tersedia
export function validateCoffeeData(data: Coffee[]): Promise<Coffee[]> {
  return new Promise((resolve, reject) => {
    if (data.length > 0) {
      resolve(data);
    } else {
      reject(new Error("Data menu kopi tidak ditemukan."));
    }
  });
}