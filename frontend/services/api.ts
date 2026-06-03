// services/api.ts

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

export interface DetectionStatus {
  state: string;
  ear: number;
  mar: number;
  sleep_risk: boolean;
  alarm: boolean;
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

  getVideoFeedUrl(): string {
    return `${this.baseUrl}/video_feed`;
  }

  async startDetection(): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/start`, {
        method: "POST",
      });

      const data = await response.json();

      return {
        success: response.ok,
        data,
      };
    } catch {
      return {
        success: false,
        error: "Failed to start detection",
      };
    }
  }

  async stopDetection(): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/stop`, {
        method: "POST",
      });

      const data = await response.json();

      return {
        success: response.ok,
        data,
      };
    } catch {
      return {
        success: false,
        error: "Failed to stop detection",
      };
    }
  }

  async getStatus(): Promise<ApiResponse<DetectionStatus>> {
    try {
      const response = await fetch(`${this.baseUrl}/status`);

      const data = await response.json();

      return {
        success: response.ok,
        data,
      };
    } catch {
      return {
        success: false,
        error: "Failed to fetch status",
      };
    }
  }

  async checkConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

const apiService = new ApiService();

export default apiService;
