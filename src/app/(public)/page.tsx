import UserTable from "@/components/userTable/userTable";
import { baseUrl } from "@/lib/api";
import { userApi } from "@/services/api";
import { ISessionService, SessionService } from "@/services/baseApi";

import { fetchWrapper } from "@/services/requestHandler";
import { UserType } from "@/types/user";
import { revalidatePath, revalidateTag } from "next/cache";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface HandleServerActionOptions<ResponseType, RequestType> {
  endpoint: string;
  method: "POST" | "PATCH" | "DELETE" | "PUT" | "GET";
  successMessage?: string;
  revalidateUrl?: string;
  data?: RequestType;
  revalidateTagName?: string;
  isProtected?: boolean;
}

export default async function Home() {
  // const userData = await userApi.getUser();
  // console.log(userData);
  let users: UserType[] = [];

  // const sessionService: ISessionService = new SessionService();
  // console.log("from Page:", await sessionService.getUserSession());
  try {
    const response = await fetch(`${baseUrl}/api/login`, {
      method: "GET",
      next: {
        tags: ["users"],
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const data = await response.json();
    users = data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-semibold text-red-500">
          Error loading users
        </h1>
      </div>
    );
  }

  // try {
  //   const res = await fetchWrapper<ResponseType, RequestType>("/api/login", {
  //     method: "GET",
  //     // body: data,
  //     validateStatus: (status: number) => status >= 200 && status < 300,
  //     cache: "no-store",
  //     tags: ["users"],
  //     type: "client",
  //   });
  //   console.log(res.data?.users);
  //   users.push(res.data?.users);
  //   console.log({ users });
  // } catch (err: any) {
  //   console.error("ClientAction Error: ", err);
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">User List</h1>
      {users.length > 0 ? (
        <UserTable users={users} />
      ) : (
        <p className="text-gray-500 text-center">No users found</p>
      )}
    </div>
  );
}
