export type Requested = {
    id: number;
    users: string;
    requestedPlan: string;
  };
  
  export const requests: Requested[] = [
    {
      id: 1,
      users: "User A",
      requestedPlan: "Plan 1"
    },
    {
      id: 2,
      users: "User B",
      requestedPlan: "Plan 2"
    },
    {
      id: 3,
      users: "User C",
      requestedPlan: "Plan 3"
    },
    {
      id: 4,
      users: "User D",
      requestedPlan: "Plan 4"
    },
    {
      id: 5,
      users: "User E",
      requestedPlan: "Plan 5"
    }
  ];