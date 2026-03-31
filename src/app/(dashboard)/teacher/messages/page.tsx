"use client";

import MessagingWorkspace, {
  teacherRoleConfig,
} from "@/components/dashboard/shared/MessagingWorkspace";

export default function TeacherMessagesPage() {
  return (
    <MessagingWorkspace
      title="Сообщения"
      subtitle="Связь с родителями, учениками и коллегами."
      accent="secondary"
      categories={[
        { id: "all", label: "Все" },
        { id: "parent", label: "Родители", roles: ["parent"] },
        { id: "student", label: "Ученики", roles: ["student"] },
        { id: "colleague", label: "Коллеги", roles: ["teacher", "admin"] },
      ]}
      roleConfig={teacherRoleConfig}
      composeRoles={["parent", "student", "teacher", "admin"]}
      composeTitle="Новый диалог"
      composeDescription="Найдите пользователя по имени и откройте чат."
    />
  );
}
