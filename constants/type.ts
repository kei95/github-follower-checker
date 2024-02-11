export type User = Readonly<{
  login: string;
  avatar_url: string;
  id: number;
}>;

export type Response<T> =
  | {
      status: "success";
      res: T;
    }
  | {
      status: "failure";
      message: string;
    };
