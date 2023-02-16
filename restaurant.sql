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
    total_cost_before_discount double precision,
    phone character varying(11) DEFAULT NULL::character varying,
    customer_name character varying(50),
    status character varying(20),
    event_id integer,
    total_cost_after_discount double precision
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
    rank_id integer DEFAULT 1
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

COPY public."Order" (order_id, customer_id, table_id, reserved_time, total_cost_before_discount, phone, customer_name, status, event_id, total_cost_after_discount) FROM stdin;
25	\N	7	2023-02-11 16:05:00+00	170000	0985832741	Phạm Vương Tú	Paid	24	155000
19	\N	11	2023-02-14 00:00:00+00	255000	0905673854	Nguyễn Phương Quang	Paid	22	180000
22	\N	5	2023-02-16 00:00:00+00	65000	0981212843	Phạm Thảo Nhi	Paid	\N	65000
28	19	12	2023-02-16 00:00:00+00	450000	0989893472	Nguyễn Minh Huyền	Unpaid	25	420000
21	\N	2	2023-02-16 00:00:00+00	38000	0937284723	Nguyễn Tuấn Hiệp	Paid	\N	38000
17	\N	3	2023-02-09 00:00:00+00	220000	0867658342	Lê Minh Đức	Paid	25	190000
18	\N	1	2023-02-17 00:00:00+00	300000	0937284723	Nguyễn Tuấn Hiệp	Paid	21	250000
27	\N	10	2023-02-06 17:03:00+00	470000	0909422556	Phạm Khánh Linh	Paid	24	455000
20	\N	3	2023-02-10 00:00:00+00	235000	0128473628	Nguyễn Hoàng Hải	Paid	\N	235000
26	16	8	2023-02-20 00:00:00+00	275000	0985832741	Phạm Vương Tú	Unpaid	21	225000
23	\N	10	2023-02-08 00:00:00+00	70000	0987654321	Đỗ Tuấn Minh	Paid	\N	70000
24	\N	12	2023-01-20 16:00:00+00	850000	0989878767	Nguyễn Trần Minh Ngọc	Paid	25	820000
\.


--
-- Data for Name: Table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Table" (table_id, number_of_seats, table_status) FROM stdin;
1	5	Available
2	8	Reserved
3	6	Occupied
4	2	Out of Order
5	2	Occupied
6	8	Out of Order
7	8	Reserved
8	10	Available
10	8	Available
9	2	Out of Order
11	6	Reserved
12	4	Available
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
33	Lễ tạ ơn	270000		https://res.cloudinary.com/dejdoneih/image/upload/v1676564268/restaurant/Combos/L%E1%BB%85-t%E1%BA%A1-%C6%A1n/ox8h0d7m77cagciaqxjm.png	restaurant/Combos/Lễ-tạ-ơn/ox8h0d7m77cagciaqxjm
35	Giáng sinh	180000		https://res.cloudinary.com/dejdoneih/image/upload/v1676564482/restaurant/Combos/Gi%C3%A1ng-sinh/sbrijog237fajaoxni4e.png	restaurant/Combos/Giáng-sinh/sbrijog237fajaoxni4e
34	Năm mới	180000		https://res.cloudinary.com/dejdoneih/image/upload/v1676567735/restaurant/Combos/N%C4%83m-m%E1%BB%9Bi/duatekt3cw4gcyxijwbq.png	restaurant/Combos/Năm-mới/duatekt3cw4gcyxijwbq
32	Halloween	100000		https://res.cloudinary.com/dejdoneih/image/upload/v1676567861/restaurant/Combos/Halloween/qx5qr7s1xjmwpyompoog.png	restaurant/Combos/Halloween/qx5qr7s1xjmwpyompoog
31	Lễ tình nhân	150000		https://res.cloudinary.com/dejdoneih/image/upload/v1676561496/restaurant/Combos/Valentine-Combo/iufltpf8kuuvctmiiksf.png	restaurant/Combos/Valentine-Combo/iufltpf8kuuvctmiiksf
\.


--
-- Data for Name: comboinorder; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comboinorder (order_id, combo_id, quantity) FROM stdin;
20	35	1
26	35	1
24	31	5
19	34	1
28	31	3
17	31	1
18	33	1
27	33	1
27	32	2
\.


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customer (customer_id, name, email, phone, point, rank_id) FROM stdin;
11	Lê Minh Đức	\N	0867658342	120	4
12	Nguyễn Tuấn Hiệp	\N	0937284723	180	3
10	Nguyễn Phương Quang	null	0905673854	100	5
13	Nguyễn Hoàng Hải	\N	0128473628	200	2
14	Nguyễn Minh Huy	\N	0847395677	150	3
15	Đỗ Tuấn Minh	\N	0987654321	100	3
16	Phạm Vương Tú	\N	0985832741	10	1
17	Lương Nam Khánh	\N	0348127342	500	4
18	Phạm Thảo Nhi	\N	0981212843	300	2
19	Nguyễn Minh Huyền	\N	0989893472	250	4
20	Phạm Khánh Linh	\N	0909422556	140	1
21	Nguyễn Trần Minh Ngọc	\N	0989878767	220	1
22	Nguyễn Thị Phương Thảo	\N	0901234141	120	2
\.


--
-- Data for Name: disk; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.disk (disk_id, disk_name, description, price, image, category_id, image_id) FROM stdin;
25	Salad		35000	https://res.cloudinary.com/dejdoneih/image/upload/v1676562011/restaurant/Disks/Salad/gg6f1sck2twnclsxn9sc.png	1	restaurant/Disks/Salad/gg6f1sck2twnclsxn9sc
26	Súp bí ngô		25000	https://res.cloudinary.com/dejdoneih/image/upload/v1676562078/restaurant/Disks/S%C3%BAp-b%C3%AD-ng%C3%B4/p2y6mpkmvkxqmg8m99mb.png	1	restaurant/Disks/Súp-bí-ngô/p2y6mpkmvkxqmg8m99mb
27	Súp ngũ cốc		20000	https://res.cloudinary.com/dejdoneih/image/upload/v1676562110/restaurant/Disks/S%C3%BAp-ng%C5%A9-c%E1%BB%91c/pxvfl2joogzkvqpwtdmd.png	1	restaurant/Disks/Súp-ngũ-cốc/pxvfl2joogzkvqpwtdmd
28	Coca		10000	https://res.cloudinary.com/dejdoneih/image/upload/v1676562135/restaurant/Disks/Coca/sgfkpzzqw56xjd5ktrtg.png	5	restaurant/Disks/Coca/sgfkpzzqw56xjd5ktrtg
18	Phở bò		60000	https://res.cloudinary.com/dejdoneih/image/upload/v1676560212/restaurant/Disks/Ph%E1%BB%9F-b%C3%B2/mkym0abt9h3lobcelqgb.png	3	restaurant/Disks/Phở-bò/mkym0abt9h3lobcelqgb
29	Bánh macaroon		25000	https://res.cloudinary.com/dejdoneih/image/upload/v1676562204/restaurant/Disks/B%C3%A1nh-macaroon/wcjavkpjcslmhfujaxfy.png	4	restaurant/Disks/Bánh-macaroon/wcjavkpjcslmhfujaxfy
30	Bún chả		35000	https://res.cloudinary.com/dejdoneih/image/upload/v1676562237/restaurant/Disks/B%C3%BAn-ch%E1%BA%A3/zerdlrvlygq6tu9ngbe7.png	2	restaurant/Disks/Bún-chả/zerdlrvlygq6tu9ngbe7
19	Bún riêu		40000	https://res.cloudinary.com/dejdoneih/image/upload/v1676562282/restaurant/Disks/B%C3%BAn-ri%C3%AAu/l9tp2wbaozckdzbmoyvi.png	3	restaurant/Disks/Bún-riêu/l9tp2wbaozckdzbmoyvi
31	Nước suối		8000	https://res.cloudinary.com/dejdoneih/image/upload/v1676562320/restaurant/Disks/N%C6%B0%E1%BB%9Bc-su%E1%BB%91i/cflvtkr5ybd2fzesdxl7.png	5	restaurant/Disks/Nước-suối/cflvtkr5ybd2fzesdxl7
32	Bánh pancake		35000	https://res.cloudinary.com/dejdoneih/image/upload/v1676562359/restaurant/Disks/B%C3%A1nh-pancake/pfeoo1fikuh5ipy0pm7h.png	4	restaurant/Disks/Bánh-pancake/pfeoo1fikuh5ipy0pm7h
20	Xôi thịt	Xôi thịt lợn	25000	https://res.cloudinary.com/dejdoneih/image/upload/v1676560357/restaurant/Disks/X%C3%B4i-th%E1%BB%8Bt/tr3jutu8tcealnnfg6mn.png	2	restaurant/Disks/Xôi-thịt/tr3jutu8tcealnnfg6mn
33	Nem		25000	https://res.cloudinary.com/dejdoneih/image/upload/v1676562393/restaurant/Disks/Nem/fz3tbsmjkalsvurg7vhg.png	3	restaurant/Disks/Nem/fz3tbsmjkalsvurg7vhg
21	Bánh mỳ		15000	https://res.cloudinary.com/dejdoneih/image/upload/v1676560414/restaurant/Disks/B%C3%A1nh-m%E1%BB%B3/ixnnjyxqvmczybql7kji.png	2	restaurant/Disks/Bánh-mỳ/ixnnjyxqvmczybql7kji
34	Soju		18000	https://res.cloudinary.com/dejdoneih/image/upload/v1676562426/restaurant/Disks/Soju/ddhtdeqimni6halegkzs.png	5	restaurant/Disks/Soju/ddhtdeqimni6halegkzs
35	Gà rán		50000	https://res.cloudinary.com/dejdoneih/image/upload/v1676562471/restaurant/Disks/G%C3%A0-r%C3%A1n/rcvwtrjers3mk6ovbocc.png	3	restaurant/Disks/Gà-rán/rcvwtrjers3mk6ovbocc
36	Mỳ vằn thắn		40000	https://res.cloudinary.com/dejdoneih/image/upload/v1676562510/restaurant/Disks/M%E1%BB%B3-v%E1%BA%B1n-th%E1%BA%AFn/imyt4plvnyor5gjelpie.png	2	restaurant/Disks/Mỳ-vằn-thắn/imyt4plvnyor5gjelpie
23	Bia		15000	https://res.cloudinary.com/dejdoneih/image/upload/v1676561205/restaurant/Disks/Bia/acanh8vwhwod7bo0dkx3.png	5	restaurant/Disks/Bia/acanh8vwhwod7bo0dkx3
37	Cơm rang		30000	https://res.cloudinary.com/dejdoneih/image/upload/v1676562577/restaurant/Disks/C%C6%A1m-rang/sbdrl9zdo72voqtcwiu2.png	3	restaurant/Disks/Cơm-rang/sbdrl9zdo72voqtcwiu2
38	Bánh cuốn		30000	https://res.cloudinary.com/dejdoneih/image/upload/v1676563106/restaurant/Disks/B%C3%A1nh-cu%E1%BB%91n/uz22alor2cwfcwnbmcuc.png	2	restaurant/Disks/Bánh-cuốn/uz22alor2cwfcwnbmcuc
40	Bánh truffle		20000	https://res.cloudinary.com/dejdoneih/image/upload/v1676563165/restaurant/Disks/B%C3%A1nh-truffle/tr1ofuvhuiuvlgshrzho.png	4	restaurant/Disks/Bánh-truffle/tr1ofuvhuiuvlgshrzho
41	Bánh pudding		25000	https://res.cloudinary.com/dejdoneih/image/upload/v1676563195/restaurant/Disks/B%C3%A1nh-pudding/bvp7tehtwde1bekbfr2t.png	4	restaurant/Disks/Bánh-pudding/bvp7tehtwde1bekbfr2t
42	Kem ốc quế		15000	https://res.cloudinary.com/dejdoneih/image/upload/v1676563220/restaurant/Disks/Kem-%E1%BB%91c-qu%E1%BA%BF/mfpxsavipmxe4f0jmypf.png	4	restaurant/Disks/Kem-ốc-quế/mfpxsavipmxe4f0jmypf
43	Trà sữa		35000	https://res.cloudinary.com/dejdoneih/image/upload/v1676563250/restaurant/Disks/Tr%C3%A0-s%E1%BB%AFa/vfgmrsvlm4no5udplax1.png	5	restaurant/Disks/Trà-sữa/vfgmrsvlm4no5udplax1
44	Hoa quả tươi		30000	https://res.cloudinary.com/dejdoneih/image/upload/v1676563288/restaurant/Disks/Hoa-qu%E1%BA%A3-t%C6%B0%C6%A1i/whirudhsijeic1gtr1a6.png	4	restaurant/Disks/Hoa-quả-tươi/whirudhsijeic1gtr1a6
45	Sashimi		30000	https://res.cloudinary.com/dejdoneih/image/upload/v1676563995/restaurant/Disks/Sashimi/zmbcaogfmaxlwgvonxre.png	1	restaurant/Disks/Sashimi/zmbcaogfmaxlwgvonxre
46	Salad hoa quả		25000	https://res.cloudinary.com/dejdoneih/image/upload/v1676564036/restaurant/Disks/Salad-hoa-qu%E1%BA%A3/dlr6hb5ex0trvpo89j3y.png	1	restaurant/Disks/Salad-hoa-quả/dlr6hb5ex0trvpo89j3y
39	Caramel		20000	https://res.cloudinary.com/dejdoneih/image/upload/v1676563134/restaurant/Disks/Caremel/x12yh1atxq3iyyf3ron9.png	4	restaurant/Disks/Caremel/x12yh1atxq3iyyf3ron9
47	Whisky		30000	https://res.cloudinary.com/dejdoneih/image/upload/v1676567793/restaurant/Disks/Whisky/cettcvsyxbigcvgmrm2d.png	5	restaurant/Disks/Whisky/cettcvsyxbigcvgmrm2d
\.


--
-- Data for Name: diskincombo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.diskincombo (combo_id, disk_id, quantity) FROM stdin;
32	26	2
32	33	1
32	40	1
32	41	1
31	29	1
31	21	1
31	23	1
31	41	1
31	46	1
31	47	2
33	35	4
33	45	1
33	29	1
33	34	1
33	28	2
35	25	2
35	42	1
35	41	2
35	27	1
35	45	1
35	40	1
34	27	3
34	29	1
34	31	1
34	33	1
34	23	2
34	44	2
\.


--
-- Data for Name: diskinorder; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.diskinorder (order_id, disk_id, quantity) FROM stdin;
21	31	1
21	38	1
17	40	1
17	44	1
17	39	1
18	38	1
20	40	1
20	42	1
20	39	1
26	21	1
26	37	1
26	35	1
23	33	1
23	40	1
23	41	1
24	27	5
25	25	2
25	26	3
25	46	1
19	26	1
19	25	1
19	21	1
22	36	1
22	41	1
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
21	Giáng sinh			https://res.cloudinary.com/dejdoneih/image/upload/v1676564604/restaurant/Events/Gi%C3%A1ng-sinh/zwzxa9svwlz86woxiajj.png	2023-12-16 00:00:00+00	2023-12-30 00:00:00+00	restaurant/Events/Giáng-sinh/zwzxa9svwlz86woxiajj	50000	200000
22	Năm mới			https://res.cloudinary.com/dejdoneih/image/upload/v1676564782/restaurant/Events/N%C4%83m-m%E1%BB%9Bi/m2i2sgimvmkyyxjdnlag.png	2022-12-30 00:00:00+00	2023-01-15 00:00:00+00	restaurant/Events/Năm-mới/m2i2sgimvmkyyxjdnlag	75000	400000
23	Halloween			https://res.cloudinary.com/dejdoneih/image/upload/v1676564853/restaurant/Events/Halloween/bo6kwprmbvmrr2cmoeoc.png	2023-10-01 00:00:00+00	2023-10-31 00:00:00+00	restaurant/Events/Halloween/bo6kwprmbvmrr2cmoeoc	20000	100000
25	Lễ tình nhân			https://res.cloudinary.com/dejdoneih/image/upload/v1676564985/restaurant/Events/L%E1%BB%85-t%C3%ACnh-nh%C3%A2n/otxt3pbbus3vvgodozjk.png	2023-02-13 00:00:00+00	2023-02-15 00:00:00+00	restaurant/Events/Lễ-tình-nhân/otxt3pbbus3vvgodozjk	30000	180000
24	Lễ phục sinh			https://res.cloudinary.com/dejdoneih/image/upload/v1676564933/restaurant/Events/L%E1%BB%85-Ph%E1%BB%A5c-sinh/ey5wtt8roxxtlnyqs2al.png	2023-03-22 00:00:00+00	2023-04-25 00:00:00+00	restaurant/Events/Lễ-Phục-sinh/ey5wtt8roxxtlnyqs2al	15000	80000
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

SELECT pg_catalog.setval('public."Order_order_id_seq"', 28, true);


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

SELECT pg_catalog.setval('public.combo_combo_id_seq', 35, true);


--
-- Name: customer_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customer_customer_id_seq', 22, true);


--
-- Name: disk_disk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.disk_disk_id_seq', 47, true);


--
-- Name: employee_employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_employee_id_seq', 3, true);


--
-- Name: event_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_event_id_seq', 25, true);


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
-- Name: Order Order_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id);


--
-- Name: Order Order_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_event_id_fkey" FOREIGN KEY (event_id) REFERENCES public.event(event_id);


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

