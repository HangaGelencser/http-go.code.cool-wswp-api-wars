CREATE TABLE public.star_wars_users (
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    user_name character varying(255) NOT NULL,
    password character varying(255) NOT NULL
   );

ALTER TABLE public.star_wars_users
  OWNER TO hanga;
