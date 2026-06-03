// services/api.ts

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

export interface DetectionStatus {
  state: string;
  ear: number;
  mar: number;
  sleep_risk: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async detect(
    image: string
  ): Promise<ApiResponse<DetectionStatus>> {
    try {
      const response = await fetch(
        `${this.baseUrl}/detect`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image,
          }),
        }
      );

      const data = await response.json();

      return {
        success: response.ok,
        data,
      };
    } catch {
      return {
        success: false,
        error: "Detection failed",
      };
    }
  }

  async checkConnection(): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/`
      );

      return response.ok;
    } catch {
      return false;
    }
  }
}

const apiService = new ApiService();

export default apiService;
