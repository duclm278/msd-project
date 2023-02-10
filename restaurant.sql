--
-- PostgreSQL database dump
--

-- Dumped from database version 13.7
-- Dumped by pg_dump version 15.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: calculate_total_order_price(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.calculate_total_order_price() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE "Order" 
        SET total_cost = 
			(SELECT SUM(price * DIO.quantity)
             FROM Disk D
			 inner join DiskInOrder DIO
				 on D.disk_id = DIO.disk_id
			 WHERE DIO.order_id = NEW.order_id)
			 +
			(SELECT SUM(combo_price * CIO.quantity)
			 FROM Combo C
			 inner join ComboInOrder CIO
				 on C.combo_id = CIO.combo_id
			 WHERE CIO.order_id = NEW.order_id)
         WHERE order_id = NEW.order_id;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.calculate_total_order_price() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    order_id integer NOT NULL,
    customer_id integer,
    table_id integer,
    reserved_time timestamp with time zone,
    total_cost double precision,
    phone character varying(11) DEFAULT NULL::character varying,
    customer_name character varying(50)
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- Name: Order_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Order_order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Order_order_id_seq" OWNER TO postgres;

--
-- Name: Order_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Order_order_id_seq" OWNED BY public."Order".order_id;


--
-- Name: Table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Table" (
    table_id integer NOT NULL,
    number_of_seats integer,
    table_status character varying(20)
);


ALTER TABLE public."Table" OWNER TO postgres;

--
-- Name: Table_table_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Table_table_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Table_table_id_seq" OWNER TO postgres;

--
-- Name: Table_table_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Table_table_id_seq" OWNED BY public."Table".table_id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    category_id integer NOT NULL,
    category_name character varying(100)
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_category_id_seq OWNER TO postgres;

--
-- Name: category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_category_id_seq OWNED BY public.category.category_id;


--
-- Name: combo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.combo (
    combo_id integer NOT NULL,
    combo_name character varying(40),
    combo_price double precision,
    description character varying(50),
    image character varying(255),
    image_id character varying(255)
);


ALTER TABLE public.combo OWNER TO postgres;

--
-- Name: combo_combo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.combo_combo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.combo_combo_id_seq OWNER TO postgres;

--
-- Name: combo_combo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.combo_combo_id_seq OWNED BY public.combo.combo_id;


--
-- Name: comboinorder; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comboinorder (
    order_id integer NOT NULL,
    combo_id integer NOT NULL,
    quantity integer
);


ALTER TABLE public.comboinorder OWNER TO postgres;

--
-- Name: customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer (
    customer_id integer NOT NULL,
    name character varying(50),
    email character varying(60),
    phone character varying(11),
    point integer DEFAULT 1,
    rank_id integer DEFAULT 1,
    CONSTRAINT customer_email_check CHECK (((email)::text ~~ '%_@__%.__%'::text))
);


ALTER TABLE public.customer OWNER TO postgres;

--
-- Name: customer_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customer_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customer_customer_id_seq OWNER TO postgres;

--
-- Name: customer_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customer_customer_id_seq OWNED BY public.customer.customer_id;


--
-- Name: disk; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.disk (
    disk_id integer NOT NULL,
    disk_name character varying(30),
    description character varying(200),
    price double precision,
    image character varying(255),
    category_id integer,
    image_id character varying(255)
);


ALTER TABLE public.disk OWNER TO postgres;

--
-- Name: disk_disk_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.disk_disk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.disk_disk_id_seq OWNER TO postgres;

--
-- Name: disk_disk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.disk_disk_id_seq OWNED BY public.disk.disk_id;


--
-- Name: diskincombo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.diskincombo (
    combo_id integer NOT NULL,
    disk_id integer NOT NULL,
    quantity integer
);


ALTER TABLE public.diskincombo OWNER TO postgres;

--
-- Name: diskinorder; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.diskinorder (
    order_id integer NOT NULL,
    disk_id integer NOT NULL,
    quantity integer
);


ALTER TABLE public.diskinorder OWNER TO postgres;

--
-- Name: employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee (
    employee_id integer NOT NULL,
    name character varying(50),
    email character varying(50),
    phone character varying(11),
    address character varying(100),
    password character varying(50),
    CONSTRAINT employee_email_check CHECK (((email)::text ~~ '%_@__%.__%'::text))
);


ALTER TABLE public.employee OWNER TO postgres;

--
-- Name: employee_employee_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employee_employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_employee_id_seq OWNER TO postgres;

--
-- Name: employee_employee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employee_employee_id_seq OWNED BY public.employee.employee_id;


--
-- Name: event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event (
    event_id integer NOT NULL,
    event_name character varying(50),
    description character varying(100),
    event_status character varying(20),
    poster character varying(200),
    begin_time timestamp with time zone,
    end_time timestamp with time zone,
    poster_id character varying(200),
    discount integer,
    min_cost integer
);


ALTER TABLE public.event OWNER TO postgres;

--
-- Name: event_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.event_event_id_seq OWNER TO postgres;

--
-- Name: event_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_event_id_seq OWNED BY public.event.event_id;


--
-- Name: rank; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rank (
    rank_id integer NOT NULL,
    rank character varying(30),
    lower_bound integer,
    higher_bound integer
);


ALTER TABLE public.rank OWNER TO postgres;

--
-- Name: rank_rank_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rank_rank_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rank_rank_id_seq OWNER TO postgres;

--
-- Name: rank_rank_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rank_rank_id_seq OWNED BY public.rank.rank_id;


--
-- Name: Order order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order" ALTER COLUMN order_id SET DEFAULT nextval('public."Order_order_id_seq"'::regclass);


--
-- Name: category category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN category_id SET DEFAULT nextval('public.category_category_id_seq'::regclass);


--
-- Name: combo combo_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.combo ALTER COLUMN combo_id SET DEFAULT nextval('public.combo_combo_id_seq'::regclass);


--
-- Name: customer customer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer ALTER COLUMN customer_id SET DEFAULT nextval('public.customer_customer_id_seq'::regclass);


--
-- Name: disk disk_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disk ALTER COLUMN disk_id SET DEFAULT nextval('public.disk_disk_id_seq'::regclass);


--
-- Name: employee employee_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee ALTER COLUMN employee_id SET DEFAULT nextval('public.employee_employee_id_seq'::regclass);


--
-- Name: event event_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event ALTER COLUMN event_id SET DEFAULT nextval('public.event_event_id_seq'::regclass);


--
-- Name: rank rank_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rank ALTER COLUMN rank_id SET DEFAULT nextval('public.rank_rank_id_seq'::regclass);


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" (order_id, customer_id, table_id, reserved_time, total_cost, phone, customer_name) FROM stdin;
\.


--
-- Data for Name: Table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Table" (table_id, number_of_seats, table_status) FROM stdin;
3	2	Reserved
5	5	Occupied
1	4	Available
7	4	Available
2	4	Available
8	3	Available
6	2	Available
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (category_id, category_name) FROM stdin;
1	Appetizers/Starters
2	Breakfast
3	Main Menu (Lunch/Dinner)
4	Dessert
5	Beverage
\.


--
-- Data for Name: combo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.combo (combo_id, combo_name, combo_price, description, image, image_id) FROM stdin;
12	Test combo	13	nooo	https://res.cloudinary.com/dejdoneih/image/upload/v1675922604/restaurant/Combos/Test-combo/n7k0iwnvcb2jujl2z0yv.png	restaurant/Combos/Test-combo/n7k0iwnvcb2jujl2z0yv
13	Opening ceremony	500000	Hello	https://res.cloudinary.com/dejdoneih/image/upload/v1675952675/restaurant/Combos/Opening-ceremony/eiigctjclnphvuxglaal.png	restaurant/Combos/Opening-ceremony/eiigctjclnphvuxglaal
10	Summer Combo	520030	Chào đón mùa hè bất tận	https://res.cloudinary.com/dejdoneih/image/upload/v1675870825/restaurant/Combos/Summer-Combo/anep3bg6dst3bpaguvxx.png	restaurant/Combos/Summer-Combo/anep3bg6dst3bpaguvxx
9	Winter combo	130000	Combo for a winter with love	https://res.cloudinary.com/dejdoneih/image/upload/v1675877083/restaurant/Combos/Winter-combo/wj7dcypzriu3tedk7s5g.png	restaurant/Combos/Winter-combo/wj7dcypzriu3tedk7s5g
\.


--
-- Data for Name: comboinorder; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comboinorder (order_id, combo_id, quantity) FROM stdin;
\.


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customer (customer_id, name, email, phone, point, rank_id) FROM stdin;
1	Nguyen Phuong Quang	quang29112002@gmail.com	0329715851	1000	1
5	Tạ Hương Giang	\N	0982255660	100	4
6	Duc Le	duc.lm200164@sis.hust.edu.vn	9999999999	124	1
\.


--
-- Data for Name: disk; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.disk (disk_id, disk_name, description, price, image, category_id, image_id) FROM stdin;
8	Coca Cola	Gas drink	15	https://res.cloudinary.com/dejdoneih/image/upload/v1673448694/restaurant/Disks/Coca-Cola/ivtzonhtxn0i5augilkh.png	5	restaurant/Disks/Coca-Cola/ivtzonhtxn0i5augilkh
9	Pepsi	Gas drink	15	https://res.cloudinary.com/dejdoneih/image/upload/v1673449735/restaurant/Disks/Pepsi/jrcoznwqjiykwedbpeoe.png	5	restaurant/Disks/Pepsi/jrcoznwqjiykwedbpeoe
6	Sashimi	raw salmon	12	https://res.cloudinary.com/dejdoneih/image/upload/v1673453604/restaurant/Disks/Sashimi/lcysgnylebeycitfywyv.png	3	restaurant/Disks/Sashimi/lcysgnylebeycitfywyv
11	Tiramisu cake	Dessert cake	450000	https://res.cloudinary.com/dejdoneih/image/upload/v1675785133/restaurant/Disks/Tiramisu-cake/scmdsr3urce3wj9heok2.png	4	restaurant/Disks/Tiramisu-cake/scmdsr3urce3wj9heok2
7	Sushi	raw salmon	150000	https://res.cloudinary.com/dejdoneih/image/upload/v1673448568/restaurant/Disks/Sushi/lj0rx6kabff8p7xe9adt.png	3	restaurant/Disks/Sushi/lj0rx6kabff8p7xe9adt
12	Pho Bo	National food	36000	https://res.cloudinary.com/dejdoneih/image/upload/v1675785200/restaurant/Disks/Pho-Bo/uh9osqj5tbynw3fmkga4.png	2	restaurant/Disks/Pho-Bo/uh9osqj5tbynw3fmkga4
13	final version	dasd	120000	https://res.cloudinary.com/dejdoneih/image/upload/v1675925714/restaurant/Disks/final-version/wevozefr46dddjihxpao.png	1	restaurant/Disks/final-version/wevozefr46dddjihxpao
\.


--
-- Data for Name: diskincombo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.diskincombo (combo_id, disk_id, quantity) FROM stdin;
12	8	1
12	9	1
13	8	1
13	9	1
13	6	1
13	11	1
13	13	1
10	8	2
10	12	2
10	11	1
9	8	2
9	6	1
9	7	1
\.


--
-- Data for Name: diskinorder; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.diskinorder (order_id, disk_id, quantity) FROM stdin;
\.


--
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee (employee_id, name, email, phone, address, password) FROM stdin;
1	Nguyen Phuong Quang	quang29112002@gmail.com	0329715851	So 1, Dai Co Viet, Hai Ba Trung, Ha Noi	Quang251209
3	ADMIN	admin@gmail.com	\N	\N	admin
\.


--
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event (event_id, event_name, description, event_status, poster, begin_time, end_time, poster_id, discount, min_cost) FROM stdin;
11	Summer Combo	Testttt	Available	https://res.cloudinary.com/dejdoneih/image/upload/v1675917451/restaurant/Events/Summer-Combo/a8se3e0vpnxd4dsdqeux.png	2023-02-09 00:00:00+00	2023-02-24 00:00:00+00	restaurant/Events/Summer-Combo/a8se3e0vpnxd4dsdqeux	20000	50000
12	Buzz	.	Available	https://res.cloudinary.com/dejdoneih/image/upload/v1675952598/restaurant/Events/Buzz/lhgce86oeojt3veors8r.png	2023-02-09 00:00:00+00	2023-02-09 00:00:00+00	restaurant/Events/Buzz/lhgce86oeojt3veors8r	123	123
\.


--
-- Data for Name: rank; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rank (rank_id, rank, lower_bound, higher_bound) FROM stdin;
1	Bronze	1	20
2	Silver	21	50
3	Gold	50	200
4	Platinum	200	500
5	Diamond	500	1000
\.


--
-- Name: Order_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Order_order_id_seq"', 2, true);


--
-- Name: Table_table_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Table_table_id_seq"', 1, false);


--
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_category_id_seq', 5, true);


--
-- Name: combo_combo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.combo_combo_id_seq', 13, true);


--
-- Name: customer_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customer_customer_id_seq', 6, true);


--
-- Name: disk_disk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.disk_disk_id_seq', 13, true);


--
-- Name: employee_employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_employee_id_seq', 3, true);


--
-- Name: event_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_event_id_seq', 12, true);


--
-- Name: rank_rank_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rank_rank_id_seq', 5, true);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (order_id);


--
-- Name: Table Table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Table"
    ADD CONSTRAINT "Table_pkey" PRIMARY KEY (table_id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- Name: combo combo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.combo
    ADD CONSTRAINT combo_pkey PRIMARY KEY (combo_id);


--
-- Name: comboinorder comboinorder_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comboinorder
    ADD CONSTRAINT comboinorder_pkey PRIMARY KEY (order_id, combo_id);


--
-- Name: customer customer_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_email_key UNIQUE (email);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customer_id);


--
-- Name: disk disk_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disk
    ADD CONSTRAINT disk_pkey PRIMARY KEY (disk_id);


--
-- Name: diskincombo diskincombo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diskincombo
    ADD CONSTRAINT diskincombo_pkey PRIMARY KEY (combo_id, disk_id);


--
-- Name: diskinorder diskinorder_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diskinorder
    ADD CONSTRAINT diskinorder_pkey PRIMARY KEY (order_id, disk_id);


--
-- Name: employee employee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (employee_id);


--
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (event_id);


--
-- Name: rank rank_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rank
    ADD CONSTRAINT rank_pkey PRIMARY KEY (rank_id);


--
-- Name: idex_disk_name_disk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idex_disk_name_disk ON public.disk USING btree (disk_name);


--
-- Name: idex_name_customer; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idex_name_customer ON public.customer USING btree (name);


--
-- Name: idx_name_combo; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_name_combo ON public.combo USING btree (combo_name);


--
-- Name: comboinorder points_added; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER points_added AFTER INSERT ON public.comboinorder FOR EACH ROW EXECUTE FUNCTION public.calculate_total_order_price();


--
-- Name: diskinorder points_added; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER points_added AFTER INSERT ON public.diskinorder FOR EACH ROW EXECUTE FUNCTION public.calculate_total_order_price();


--
-- Name: Order Order_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id);


--
-- Name: Order Order_table_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_table_id_fkey" FOREIGN KEY (table_id) REFERENCES public."Table"(table_id);


--
-- Name: comboinorder comboinorder_combo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comboinorder
    ADD CONSTRAINT comboinorder_combo_id_fkey FOREIGN KEY (combo_id) REFERENCES public.combo(combo_id);


--
-- Name: comboinorder comboinorder_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comboinorder
    ADD CONSTRAINT comboinorder_order_id_fkey FOREIGN KEY (order_id) REFERENCES public."Order"(order_id);


--
-- Name: customer customer_rank_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_rank_id_fkey FOREIGN KEY (rank_id) REFERENCES public.rank(rank_id);


--
-- Name: disk disk_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disk
    ADD CONSTRAINT disk_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(category_id);


--
-- Name: diskincombo diskincombo_combo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diskincombo
    ADD CONSTRAINT diskincombo_combo_id_fkey FOREIGN KEY (combo_id) REFERENCES public.combo(combo_id);


--
-- Name: diskincombo diskincombo_disk_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diskincombo
    ADD CONSTRAINT diskincombo_disk_id_fkey FOREIGN KEY (disk_id) REFERENCES public.disk(disk_id);


--
-- Name: diskinorder diskinorder_disk_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diskinorder
    ADD CONSTRAINT diskinorder_disk_id_fkey FOREIGN KEY (disk_id) REFERENCES public.disk(disk_id);


--
-- Name: diskinorder diskinorder_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diskinorder
    ADD CONSTRAINT diskinorder_order_id_fkey FOREIGN KEY (order_id) REFERENCES public."Order"(order_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

