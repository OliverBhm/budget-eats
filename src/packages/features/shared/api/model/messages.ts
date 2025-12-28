type NotificationType =
  | "shopping_list"
  | "receipt_upload"
  | "price_alert"
  | "comment"
  | "weekly_summary"
  | "budget_alert"
  | "recipe_suggestion"
  | "collaboration"
  | "system";

type NotificationActor = {
  id: string;
  firstname: string;
  lastname: string;
  imgUrl: string | null;
};

type NotificationMessage = {
  id: string;
  user_id: string; // Supabase auth.users.id (uuid)
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  created_at: string; // ISO timestamp
  actor: NotificationActor;
};

type NotificationsResponse = {
  unread: number;
  data: NotificationMessage[];
  error: null;
};

export type {
  NotificationMessage,
  NotificationsResponse,
  NotificationActor,
  NotificationType,
};
