alter table public.profiles
  add column if not exists role text;

alter table public.profiles
  add column if not exists name text;

alter table public.profiles
  add column if not exists avatar_url text;

update public.profiles
set name = coalesce(name, full_name)
where name is null
  and full_name is not null;

update public.profiles p
set role = coalesce(
  p.role,
  nullif(u.raw_user_meta_data ->> 'role', '')
)
from auth.users u
where u.id = p.id
  and p.role is null;

alter table public.profiles
  alter column role set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_role_check'
  ) then
    alter table public.profiles
      add constraint profiles_role_check
      check (role in ('student', 'teacher', 'parent', 'admin'));
  end if;
end $$;
