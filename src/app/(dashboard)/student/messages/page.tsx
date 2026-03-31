"use client";

import MessagingWorkspace, {
  studentRoleConfig,
} from "@/components/dashboard/shared/MessagingWorkspace";

export default function StudentMessagesPage() {
  return (
    <MessagingWorkspace
      title="Сообщения"
      subtitle="Общение с учителями и другими учениками."
      accent="primary"
      categories={[
        { id: "all", label: "Все" },
        { id: "teacher", label: "Учителя", roles: ["teacher"] },
        { id: "student", label: "Ученики", roles: ["student"] },
      ]}
      roleConfig={studentRoleConfig}
      composeRoles={["teacher", "student"]}
      composeTitle="Новый чат"
      composeDescription="Ищите учителей и учеников по имени, затем открывайте диалог."
    />
  );
}
