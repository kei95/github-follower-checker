import { User } from "@/constants/type";
import { ExpoRequest, ExpoResponse } from "expo-router/server";

export async function GET(request: ExpoRequest) {
  const queryParam = request.expoUrl.searchParams.get("name");
  const response = await fetch(`https://api.github.com/users/${queryParam}`);

  if (response.status < 200 || response.status > 299) {
    return ExpoResponse.json({ status: "failure", message: "NOT FOUND" });
  }
  const responseBody = (await response.json()) as User;

  return ExpoResponse.json({ status: "success", res: responseBody });
}
