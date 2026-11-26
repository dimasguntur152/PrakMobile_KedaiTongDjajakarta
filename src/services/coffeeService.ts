import type { Coffee } from "../types/coffee";

const API_URL = "https://funapi.dev/api/coffee/v1/drinks";

export async function getIcedCoffee(): Promise<Coffee[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Gagal mengambil data menu kopi");
  }

  const result: { total: number; data: Coffee[] } = await response.json();

  return result.data;
}
