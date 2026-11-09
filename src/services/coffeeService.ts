import type { Coffee } from "../types/coffee";

const API_URL = "https://api.sampleapis.com/coffee/iced";

export async function getIcedCoffee(): Promise<Coffee[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Gagal mengambil data kopi");
  }

  const data: Coffee[] = await response.json();

  return data;
}
