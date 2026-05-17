--
-- PostgreSQL database dump
--

\restrict rkGEEtZCPCYhiUwkHJcauiCQ4rds4SbhOINVpdfzceKE5eVvWN6fuQsyUc2fwSD

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-05-17 12:51:49

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16408)
-- Name: brands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brands (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    logo_url character varying(255),
    is_active boolean DEFAULT true,
    created_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.brands OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16407)
-- Name: brands_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.brands_id_seq OWNER TO postgres;

--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 221
-- Name: brands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;


--
-- TOC entry 226 (class 1259 OID 16441)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    is_active boolean DEFAULT true,
    created_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    parent_id integer
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16440)
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO postgres;

--
-- TOC entry 5079 (class 0 OID 0)
-- Dependencies: 225
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- TOC entry 224 (class 1259 OID 16421)
-- Name: models; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.models (
    id integer NOT NULL,
    brand_id integer NOT NULL,
    name character varying(100) NOT NULL,
    year_start integer,
    year_end integer,
    engine_type character varying(50),
    is_active boolean DEFAULT true,
    created_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.models OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16420)
-- Name: models_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.models_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.models_id_seq OWNER TO postgres;

--
-- TOC entry 5080 (class 0 OID 0)
-- Dependencies: 223
-- Name: models_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.models_id_seq OWNED BY public.models.id;


--
-- TOC entry 228 (class 1259 OID 16467)
-- Name: sparepart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sparepart (
    id integer NOT NULL,
    category_id integer NOT NULL,
    model_id integer NOT NULL,
    name character varying(200) NOT NULL,
    sku character varying(50) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    stock_quantity integer DEFAULT 0,
    image_url character varying(255),
    is_active boolean DEFAULT true,
    created_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.sparepart OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16466)
-- Name: sparepart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sparepart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sparepart_id_seq OWNER TO postgres;

--
-- TOC entry 5081 (class 0 OID 0)
-- Dependencies: 227
-- Name: sparepart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sparepart_id_seq OWNED BY public.sparepart.id;


--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    full_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'admin'::character varying,
    created_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5082 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4881 (class 2604 OID 16411)
-- Name: brands id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);


--
-- TOC entry 4887 (class 2604 OID 16444)
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- TOC entry 4884 (class 2604 OID 16424)
-- Name: models id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.models ALTER COLUMN id SET DEFAULT nextval('public.models_id_seq'::regclass);


--
-- TOC entry 4890 (class 2604 OID 16470)
-- Name: sparepart id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sparepart ALTER COLUMN id SET DEFAULT nextval('public.sparepart_id_seq'::regclass);


--
-- TOC entry 4876 (class 2604 OID 16393)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5066 (class 0 OID 16408)
-- Dependencies: 222
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.brands VALUES (16, 'BMW', 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (10, 'Dacia', 'http://localhost:3000/uploads/brands/dacia.png', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (13, 'Nissan', 'http://localhost:3000/uploads/brands/nissan.png', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (1, 'Renault', 'http://localhost:3000/uploads/brands/renault.png', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (12, 'Skoda', 'http://localhost:3000/uploads/brands/skoda.png', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (2, 'Fiat', 'http://localhost:3000/uploads/brands/fiat.png', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (4, 'Ford', 'http://localhost:3000/uploads/brands/ford.png', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (3, 'Volkswagen', 'https://www.google.com/s2/favicons?sz=128&domain=volkswagen.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (5, 'Toyota', 'https://www.google.com/s2/favicons?sz=128&domain=toyota.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (6, 'Hyundai', 'https://www.google.com/s2/favicons?sz=128&domain=hyundai.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (7, 'Peugeot', 'https://www.google.com/s2/favicons?sz=128&domain=peugeot.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (8, 'Honda', 'https://www.google.com/s2/favicons?sz=128&domain=honda.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (9, 'Opel', 'https://www.google.com/s2/favicons?sz=128&domain=opel.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (11, 'Citroen', 'https://www.google.com/s2/favicons?sz=128&domain=citroen.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (14, 'Kia', 'https://www.google.com/s2/favicons?sz=128&domain=kia.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (15, 'Audi', 'https://www.google.com/s2/favicons?sz=128&domain=audi.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (17, 'Mercedes-Benz', 'https://www.google.com/s2/favicons?sz=128&domain=mercedes-benz.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (19, 'Volvo', 'https://www.google.com/s2/favicons?sz=128&domain=volvocars.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (20, 'Chevrolet', 'https://www.google.com/s2/favicons?sz=128&domain=chevrolet.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (21, 'Mazda', 'https://www.google.com/s2/favicons?sz=128&domain=mazda.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (22, 'Suzuki', 'https://www.google.com/s2/favicons?sz=128&domain=suzuki.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (24, 'Land Rover', 'https://www.google.com/s2/favicons?sz=128&domain=landrover.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (25, 'Porsche', 'https://www.google.com/s2/favicons?sz=128&domain=porsche.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (26, 'Mini', 'https://www.google.com/s2/favicons?sz=128&domain=mini.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (27, 'Subaru', 'https://www.google.com/s2/favicons?sz=128&domain=subaru.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (29, 'Alfa Romeo', 'https://www.google.com/s2/favicons?sz=128&domain=alfaromeo.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (31, 'Lexus', 'https://www.google.com/s2/favicons?sz=128&domain=lexus.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (35, 'Tesla', 'https://www.google.com/s2/favicons?sz=128&domain=tesla.com', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (33, 'Chery', 'http://localhost:3000/uploads/brands/chery.png', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (28, 'Mitsubishi', 'http://localhost:3000/uploads/brands/mitsubishi.png', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (32, 'SsangYong', 'http://localhost:3000/uploads/brands/ssangyong.png', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (34, 'Togg', 'http://localhost:3000/uploads/brands/togg.png', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (30, 'Jaguar', 'http://localhost:3000/uploads/brands/jaguar.png', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (23, 'Jeep', 'http://localhost:3000/uploads/brands/jeep.png', true, '2026-05-11 23:48:21.159024');
INSERT INTO public.brands VALUES (18, 'Seat', 'http://localhost:3000/uploads/brands/seat.png', true, '2026-05-11 23:48:21.159024');


--
-- TOC entry 5070 (class 0 OID 16441)
-- Dependencies: 226
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.category VALUES (1, 'Filtre Grubu', NULL, true, '2026-05-12 11:31:15.521283', NULL);
INSERT INTO public.category VALUES (2, 'Fren Sistemi', NULL, true, '2026-05-12 11:31:15.521283', NULL);
INSERT INTO public.category VALUES (3, 'Motor Parçaları', NULL, true, '2026-05-12 11:31:15.521283', NULL);
INSERT INTO public.category VALUES (4, 'Aydınlatma Grubu', NULL, true, '2026-05-12 11:31:15.521283', NULL);
INSERT INTO public.category VALUES (5, 'Süspansiyon ve Direksiyon', NULL, true, '2026-05-12 11:31:15.521283', NULL);
INSERT INTO public.category VALUES (6, 'Debriyaj ve Şanzıman', NULL, true, '2026-05-12 11:31:15.521283', NULL);
INSERT INTO public.category VALUES (7, 'Yağ Filtresi', NULL, true, '2026-05-12 11:31:15.521283', 1);
INSERT INTO public.category VALUES (8, 'Hava Filtresi', NULL, true, '2026-05-12 11:31:15.521283', 1);
INSERT INTO public.category VALUES (9, 'Polen Filtresi', NULL, true, '2026-05-12 11:31:15.521283', 1);
INSERT INTO public.category VALUES (10, 'Yakıt Filtresi', NULL, true, '2026-05-12 11:31:15.521283', 1);
INSERT INTO public.category VALUES (11, 'Ön Fren Balatası', NULL, true, '2026-05-12 11:31:15.521283', 2);
INSERT INTO public.category VALUES (12, 'Arka Fren Balatası', NULL, true, '2026-05-12 11:31:15.521283', 2);
INSERT INTO public.category VALUES (13, 'Fren Diski', NULL, true, '2026-05-12 11:31:15.521283', 2);
INSERT INTO public.category VALUES (14, 'Fren Hidroliği', NULL, true, '2026-05-12 11:31:15.521283', 2);
INSERT INTO public.category VALUES (15, 'Triger Seti', NULL, true, '2026-05-12 11:31:15.521283', 3);
INSERT INTO public.category VALUES (16, 'V Kayışı', NULL, true, '2026-05-12 11:31:15.521283', 3);
INSERT INTO public.category VALUES (17, 'Silindir Kapak Contası', NULL, true, '2026-05-12 11:31:15.521283', 3);
INSERT INTO public.category VALUES (18, 'Buji', NULL, true, '2026-05-12 11:31:15.521283', 3);
INSERT INTO public.category VALUES (19, 'Far Komple', NULL, true, '2026-05-12 11:31:15.521283', 4);
INSERT INTO public.category VALUES (20, 'Stop Lambası', NULL, true, '2026-05-12 11:31:15.521283', 4);
INSERT INTO public.category VALUES (21, 'Sinyal Lambası', NULL, true, '2026-05-12 11:31:15.521283', 4);
INSERT INTO public.category VALUES (22, 'Sis Farı', NULL, true, '2026-05-12 11:31:15.521283', 4);
INSERT INTO public.category VALUES (23, 'Amortisör', NULL, true, '2026-05-12 11:31:15.521283', 5);
INSERT INTO public.category VALUES (24, 'Rot Kolu', NULL, true, '2026-05-12 11:31:15.521283', 5);
INSERT INTO public.category VALUES (25, 'Salıncak', NULL, true, '2026-05-12 11:31:15.521283', 5);
INSERT INTO public.category VALUES (26, 'Z-Rot', NULL, true, '2026-05-12 11:31:15.521283', 5);
INSERT INTO public.category VALUES (27, 'Debriyaj Seti (Baskı Balata)', NULL, true, '2026-05-12 11:34:26.543937', 6);
INSERT INTO public.category VALUES (28, 'Volan', NULL, true, '2026-05-12 11:34:26.543937', 6);
INSERT INTO public.category VALUES (29, 'Debriyaj Rulmanı (Bilyası)', NULL, true, '2026-05-12 11:34:26.543937', 6);
INSERT INTO public.category VALUES (30, 'Şanzıman Takozu', NULL, true, '2026-05-12 11:34:26.543937', 6);
INSERT INTO public.category VALUES (31, 'Şanzıman Filtresi', NULL, true, '2026-05-12 11:34:26.543937', 6);
INSERT INTO public.category VALUES (32, 'Aks Mili ve Aks Körüğü', NULL, true, '2026-05-12 11:34:26.543937', 6);
INSERT INTO public.category VALUES (33, 'Vites Halatı', NULL, true, '2026-05-12 11:34:26.543937', 6);


--
-- TOC entry 5068 (class 0 OID 16421)
-- Dependencies: 224
-- Data for Name: models; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.models VALUES (1, 1, 'Megane 4', 2016, 2024, '1.3 TCe', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (2, 1, 'Megane 4', 2016, 2024, '1.5 dCi', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (3, 1, 'Clio 5', 2019, NULL, '1.0 TCe', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (4, 1, 'Taliant', 2021, NULL, '1.0 Turbo', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (5, 2, 'Egea Sedan', 2015, NULL, '1.4 Fire', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (6, 2, 'Egea Cross', 2020, NULL, '1.6 Multijet', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (7, 2, 'Fiorino', 2007, NULL, '1.3 Multijet', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (8, 2, 'Doblo', 2010, 2022, '1.6 Multijet', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (9, 3, 'Golf 8', 2020, NULL, '1.0 eTSI', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (10, 3, 'Passat B8', 2014, 2023, '1.5 TSI', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (11, 3, 'Polo', 2017, NULL, '1.0 TSI', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (12, 3, 'Tiguan', 2016, 2024, '1.5 TSI', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (13, 4, 'Focus', 2018, NULL, '1.5 Ti-VCT', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (14, 4, 'Focus', 2018, NULL, '1.5 EcoBlue', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (15, 4, 'Courier', 2014, NULL, '1.5 TDCi', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (16, 4, 'Puma', 2019, NULL, '1.0 EcoBoost', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (17, 5, 'Corolla', 2019, NULL, '1.5 Vision', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (18, 5, 'Corolla', 2019, NULL, '1.8 Hybrid', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (19, 5, 'Yaris', 2020, NULL, '1.5 Hybrid', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (20, 5, 'Hilux', 2015, NULL, '2.4 D-4D', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (21, 6, 'i20', 2020, NULL, '1.4 MPI', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (22, 6, 'Tucson', 2020, NULL, '1.6 T-GDI', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (23, 6, 'Bayon', 2021, NULL, '1.4 MPI', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (24, 6, 'Elantra', 2021, NULL, '1.6 MPI', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (25, 7, '208', 2019, NULL, '1.2 PureTech', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (26, 7, '3008', 2016, NULL, '1.5 BlueHDi', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (27, 7, '2008', 2019, NULL, '1.2 PureTech', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (28, 7, '408', 2023, NULL, '1.2 PureTech', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (29, 8, 'Civic FC5', 2016, 2021, '1.6 i-VTEC ECO', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (30, 8, 'Civic FE1', 2021, NULL, '1.5 VTEC Turbo', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (31, 8, 'CR-V', 2017, 2023, '1.5 VTEC Turbo', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (32, 8, 'City', 2021, NULL, '1.5 i-VTEC', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (33, 9, 'Corsa', 2019, NULL, '1.2 Turbo', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (34, 9, 'Astra L', 2022, NULL, '1.2 Turbo', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (35, 9, 'Mokka', 2020, NULL, '1.2 Turbo', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (36, 9, 'Crossland', 2017, NULL, '1.2 PureTech', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (37, 10, 'Duster', 2018, 2024, '1.3 TCe', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (38, 10, 'Duster', 2018, 2024, '1.5 Blue dCi', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (39, 10, 'Sandero Stepway', 2021, NULL, '1.0 TCe ECO-G', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (40, 10, 'Jogger', 2022, NULL, '1.0 TCe ECO-G', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (41, 12, 'Octavia', 2020, NULL, '1.0 eTEC', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (42, 12, 'Superb', 2015, 2024, '1.5 TSI', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (43, 12, 'Kamiq', 2019, NULL, '1.0 TSI', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (44, 12, 'Karoq', 2017, NULL, '1.5 TSI', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (45, 16, '3 Serisi (G20)', 2019, NULL, '320i 1.6', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (46, 16, '5 Serisi (G30)', 2017, 2023, '520i 1.6', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (47, 16, '1 Serisi (F40)', 2019, NULL, '118i 1.5', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (48, 17, 'C-Serisi (W206)', 2021, NULL, 'C 200 4MATIC', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (49, 17, 'E-Serisi (W213)', 2016, 2023, 'E 200 d', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (50, 17, 'A-Serisi (W177)', 2018, NULL, 'A 200', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (51, 34, 'T10X', 2023, NULL, 'V2 RWD Long Range', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (52, 34, 'T10X', 2023, NULL, 'V1 RWD Standard Range', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (53, 35, 'Model Y', 2020, NULL, 'Long Range AWD', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (54, 35, 'Model Y', 2020, NULL, 'Performance AWD', true, '2026-05-11 23:56:55.032773');
INSERT INTO public.models VALUES (55, 11, 'C3', 2016, NULL, '1.2 PureTech', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (56, 11, 'C4', 2020, NULL, '1.2 PureTech', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (57, 11, 'C-Elysee', 2012, 2022, '1.5 BlueHDi', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (58, 11, 'C5 Aircross', 2018, NULL, '1.5 BlueHDi', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (59, 13, 'Qashqai', 2014, 2021, '1.5 dCi', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (60, 13, 'Qashqai', 2021, NULL, '1.3 DIG-T MHEV', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (61, 13, 'Juke', 2019, NULL, '1.0 DIG-T', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (62, 13, 'Micra', 2017, 2022, '1.0 IG-T', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (63, 14, 'Sportage', 2015, 2021, '1.6 CRDi', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (64, 14, 'Sportage', 2021, NULL, '1.6 T-GDI MHEV', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (65, 14, 'Ceed', 2018, NULL, '1.4 MPI', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (66, 14, 'Stonic', 2017, NULL, '1.4 DPI', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (67, 15, 'A3', 2020, NULL, '35 TFSI (1.5)', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (68, 15, 'A4', 2015, 2024, '40 TDI (2.0)', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (69, 15, 'A6', 2018, NULL, '40 TDI (2.0)', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (70, 15, 'Q3', 2018, NULL, '35 TFSI (1.5)', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (71, 18, 'Leon', 2020, NULL, '1.5 eTSI', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (72, 18, 'Leon', 2012, 2020, '1.6 TDI', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (73, 18, 'Ibiza', 2017, NULL, '1.0 EcoTSI', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (74, 18, 'Arona', 2017, NULL, '1.0 EcoTSI', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (75, 19, 'XC40', 2017, NULL, '1.5 T3', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (76, 19, 'XC90', 2015, NULL, '2.0 B5 AWD', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (77, 19, 'S60', 2019, NULL, '2.0 B4', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (78, 20, 'Cruze', 2009, 2016, '1.6 16V', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (79, 20, 'Aveo', 2011, 2015, '1.4 16V', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (80, 20, 'Captiva', 2006, 2018, '2.0 VCDi', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (81, 21, 'Mazda3', 2013, 2019, '1.5 Skyactiv-G', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (82, 21, 'CX-5', 2017, NULL, '2.0 Skyactiv-G', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (83, 21, 'MX-5', 2015, NULL, '1.5 Skyactiv-G', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (84, 22, 'Swift', 2017, NULL, '1.2 Dualjet Hybrid', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (85, 22, 'Vitara', 2015, NULL, '1.4 Boosterjet', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (86, 22, 'Jimny', 2018, NULL, '1.5 AllGrip', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (87, 23, 'Renegade', 2014, NULL, '1.0 T3', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (88, 23, 'Compass', 2016, NULL, '1.3 T4', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (89, 23, 'Cherokee', 2014, 2023, '2.0 Multijet', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (90, 24, 'Range Rover Evoque', 2018, NULL, '1.5 P160 MHEV', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (91, 24, 'Discovery Sport', 2014, NULL, '2.0 D150', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (92, 24, 'Defender', 2019, NULL, '2.0 D240', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (93, 25, 'Macan', 2014, 2024, '2.0T', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (94, 25, 'Cayenne', 2017, NULL, '3.0 V6 E-Hybrid', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (95, 25, 'Panamera', 2016, 2023, '2.9 V6 4S', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (96, 26, 'Cooper', 2014, 2024, '1.5T 3-Silindir', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (97, 26, 'Countryman', 2017, 2024, '1.5T', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (98, 27, 'XV', 2017, 2023, '1.6i', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (99, 27, 'Forester', 2018, NULL, '2.0 e-Boxer', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (100, 28, 'L200', 2015, 2024, '2.4 DI-D', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (101, 28, 'Space Star', 2012, NULL, '1.2 MPI', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (102, 29, 'Giulietta', 2010, 2020, '1.6 JTDm', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (103, 29, 'Tonale', 2022, NULL, '1.5 e-Hybrid', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (104, 29, 'Giulia', 2015, NULL, '2.0 TB 280hp', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (105, 30, 'XE', 2015, 2024, '2.0d', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (106, 30, 'F-Pace', 2016, NULL, '2.0D AWD', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (107, 31, 'RX 350', 2022, NULL, '2.4T', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (108, 31, 'ES 300h', 2018, NULL, '2.5 Hybrid', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (109, 32, 'Korando', 2019, NULL, '1.5 e-XGDi', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (110, 32, 'Tivoli', 2015, NULL, '1.5 T-GDI', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (111, 32, 'Rexton', 2017, NULL, '2.2 e-XDi', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (112, 33, 'Tiggo 7 Pro', 2023, NULL, '1.6 TGDI', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (113, 33, 'Tiggo 8 Pro', 2023, NULL, '1.6 TGDI', true, '2026-05-12 11:14:46.480491');
INSERT INTO public.models VALUES (114, 33, 'Omoda 5', 2023, NULL, '1.6 TGDI', true, '2026-05-12 11:14:46.480491');


--
-- TOC entry 5072 (class 0 OID 16467)
-- Dependencies: 228
-- Data for Name: sparepart; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.sparepart VALUES (1, 1, 1, 'Bosch Ön Fren Balatası', 'BSCH-FRN-001', 'Ses yapmaz, uzun ömürlü seramik balata.', 1250.00, 12, '/uploads/parts/part-1778577107883-41571625.webp', true, '2026-05-12 12:11:47.926017');
INSERT INTO public.sparepart VALUES (5, 25, 36, 'Opel Salıncak Alt Komple Sag Crossland X 2017', 'OPL-SLCK-002017', 'Opel Salıncak Alt Komple Sag Crossland X 2017 Citroen C3 Aırcross Iı', 1780.00, 15, '/uploads/parts/part-1778586021986-517017922.webp', false, '2026-05-12 14:40:22.021974');
INSERT INTO public.sparepart VALUES (21, 12, 46, 'Opel Salıncak Alt Komple Sag Crossland X 2017', '6546456', '', 4564.00, 645, '/uploads/parts/part-1778939634356-520170734.webp', false, '2026-05-16 16:53:54.359715');
INSERT INTO public.sparepart VALUES (22, 33, 5, 'Egea 1.4 Fire Vites Halatı', 'F-EGA-1400-4245873', '', 1600.00, 78, '/uploads/parts/part-1778948124122-315299923.webp', true, '2026-05-16 19:15:24.212274');
INSERT INTO public.sparepart VALUES (3, 9, 68, 'Goodyear Audi A4 Polen Filtresi', '8k0819439a', 'Polen filtresi karbonlu', 245.00, 8, '/uploads/parts/part-1778585635303-733834102.webp', true, '2026-05-12 14:33:55.352863');
INSERT INTO public.sparepart VALUES (4, 24, 49, 'W213 Mercedes Rot Kolu', '1141644', 'Eşsiz mühendislik. Almanya üretimli', 2900.00, 5, '/uploads/parts/part-1778585805005-577683668.webp', true, '2026-05-12 14:36:45.047533');
INSERT INTO public.sparepart VALUES (7, 11, 106, 'F-PACE Ön Fren Balatası', 'F-PCE-02141579', 'Kaliteli ürün.', 4000.00, 48, '/uploads/parts/part-1778685359760-546152349.jpg', true, '2026-05-13 18:15:59.935366');
INSERT INTO public.sparepart VALUES (6, 15, 79, 'Chevrolet Aveo Triger Seti', 'KTB559', 'Chevrolet aveo triger seti', 2450.00, 7, '/uploads/parts/part-1778586200790-315129260.webp', true, '2026-05-12 14:43:20.958469');
INSERT INTO public.sparepart VALUES (8, 19, 38, 'Duster 2-II Ön Sol Far Lambası', '260602465R', 'Fransa merkezli üretim. Beyaz çizgili Dacia 1.5dCi sol ön far lambası', 30000.00, 50, '/uploads/parts/part-1778685619822-449345202.jpg', true, '2026-05-13 18:20:19.860709');
INSERT INTO public.sparepart VALUES (24, 23, 113, 'Chery Bilya Amortisör', 'ch-30--424904', '', 425.00, 875, '/uploads/parts/part-1778949309907-111048990.webp', true, '2026-05-16 19:35:09.981214');
INSERT INTO public.sparepart VALUES (10, 14, 3, 'Renault Clio 5 1.3 Fren Hidrolik ', 'CP-0412-005', '', 1800.00, 68, '/uploads/parts/part-1778686298911-424009274.webp', true, '2026-05-13 18:31:38.952393');
INSERT INTO public.sparepart VALUES (11, 18, 28, 'Peugeot 408 (2023-2025) 1.2 Benzinli Ateşleme Bujisi (Orijinal)', '408-030095', '', 790.00, 200, '/uploads/parts/part-1778687134284-931868352.png', true, '2026-05-13 18:45:34.32461');
INSERT INTO public.sparepart VALUES (12, 29, 104, 'Alfa Guila Debriyaj Rulmanı', 'ALF-DBR-21313', 'Alfa Romeo 2.0 TB motor (Giulia/Stelvio) uyumlu yüksek performanslı hidrolik debriyaj rulmanı. Vites geçişlerinde pürüzsüz kavrama sağlar, sürtünmeyi ve titreşimi minimuma indirerek debriyaj setinin ömrünü uzatır. Isıya dayanıklı malzemeden OEM standartlarında üretilmiştir.', 3000.00, 73, '/uploads/parts/part-1778691460472-992137559.jpeg', true, '2026-05-13 19:57:40.674105');
INSERT INTO public.sparepart VALUES (13, 12, 95, 'Panemera V6 Arka Fren Balatası', '97035294902', 'Arka Fren Balatası 97035294902 Porsche Panamera 2009-2014

Ürün Adı : Arka Fren Balatası
Ürün Kodu : 97035294902
Üretici Marka  : FERODO
Üretici Kodu : 97035294902
Orijinal Numarası :97035294902-97035294703-97035294904-99135294900-99135294901
Teslimat Süresi : Hemen
Porsche Panamera 2009-2014 modelleri için uyumludur.', 350.00, 679, '/uploads/parts/part-1778936344952-791841194.jpg', true, '2026-05-16 15:59:05.007987');
INSERT INTO public.sparepart VALUES (14, 24, 71, 'Leon 1.5eTSi Rot Kolu', 'ST-0042', '', 370.00, 345, '/uploads/parts/part-1778936452589-861531097.webp', true, '2026-05-16 16:00:52.636827');
INSERT INTO public.sparepart VALUES (9, 22, 10, 'Volkswagen Passat B8 Ön Tampon', 'B8-03213-323', 'Passat B8 2021 model. Highline ön tampon.', 17800.00, 3, '/uploads/parts/part-1778685719837-534063310.webp', true, '2026-05-13 18:21:59.875178');
INSERT INTO public.sparepart VALUES (15, 12, 68, 'A4 Arka Fren Balatası', '94382420', '', 600.00, 340, '/uploads/parts/part-1778936955680-471805195.jpg', false, '2026-05-16 16:09:15.724427');
INSERT INTO public.sparepart VALUES (2, 18, 48, 'NGK Ateşleme Buji Takımı', 'NGK-W206', 'Kristal kesim C200 ateşleme buji takımı, uzun ömürlü, dayanıklı ve kalitenin ta kendisi..', 1400.00, 45, '/uploads/parts/part-1778578235431-168085400.jpg', false, '2026-05-12 12:30:35.471909');
INSERT INTO public.sparepart VALUES (16, 23, 67, 'Opel Salıncak Alt Komple Sag Crossland X 2017', 'asda', '123', 123.00, 123123, '/uploads/parts/part-1778937713944-400322794.jpg', false, '2026-05-16 16:21:53.950061');
INSERT INTO public.sparepart VALUES (17, 23, 45, 'sdfds', 'sdfsd', '', 2312.00, 2312, '/uploads/parts/part-1778937790121-357675823.jpg', false, '2026-05-16 16:23:10.129243');
INSERT INTO public.sparepart VALUES (18, 32, 114, 'Chery Omoda 5 Sol Ön Aks Komple', '4325613', '', 5709.00, 490, '/uploads/parts/part-1778938442546-688475882.webp', true, '2026-05-16 16:34:02.589128');
INSERT INTO public.sparepart VALUES (19, 21, 18, 'Itaqi Totoya Corolla Sol Ayna Sinyali', '2156-79876', '', 150.00, 280, '/uploads/parts/part-1778938715271-855307832.jpg', true, '2026-05-16 16:38:35.31625');
INSERT INTO public.sparepart VALUES (20, 23, 79, 'Aveo Amartisör', 'r3424', '', 434.00, 34, '/uploads/parts/part-1778938793313-442669166.webp', true, '2026-05-16 16:39:53.367905');
INSERT INTO public.sparepart VALUES (25, 8, 50, 'A177 Hava Filtresi', 'C026-017', '', 940.00, 56, '/uploads/parts/part-1778950427233-564006295.webp', true, '2026-05-16 19:53:47.34566');
INSERT INTO public.sparepart VALUES (26, 12, 45, 'Opel Salıncak Alt Komple Sag Crossland X 2017', 'CLD-00167', '', 800.00, 48, '/uploads/parts/part-1778950836343-606132878.webp', false, '2026-05-16 20:00:36.403206');
INSERT INTO public.sparepart VALUES (27, 23, 46, 'Amortisor Ön Sol Bmw G30 F90 M', '31316866597', '', 8132.00, 660, '/uploads/parts/part-1778951173363-921100696.webp', true, '2026-05-16 20:06:13.426124');
INSERT INTO public.sparepart VALUES (23, 26, 113, 'Tiggo 8 Pro Z-Rot', 'tg-z-4120', '', 820.00, 55, '/uploads/parts/part-1778949166828-206290803.webp', true, '2026-05-16 19:32:46.952661');


--
-- TOC entry 5064 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'Ömer Arslan', 'arslantalha182@gmail.com', '$2b$10$OMbl55rgtVJaV8LKq7i/Pel8SVNCjPFhhiwJ7JJLikmSpFazTPxOa', 'admin', '2026-05-07 00:52:22.287402', '2026-05-07 00:52:22.287402', true);
INSERT INTO public.users VALUES (2, 'Ömer Arslan', 'arslantalha79@gmail.com', '$2b$10$52R/sbpbT.Ll2KjVDtta1..VLVA3JQtRAfFVpsq8w35peYBfggbbK', 'admin', '2026-05-11 18:41:15.327806', '2026-05-11 18:41:15.327806', true);
INSERT INTO public.users VALUES (3, 'Sude Arslan', 'arslansude54@gmail.com', '$2b$10$ELy1m8y/f3ws0/GZGhbR7ODb0ZB295QC3lxxYQeh2uoLy1WOy508K', 'admin', '2026-05-11 18:49:59.9169', '2026-05-11 18:49:59.9169', true);
INSERT INTO public.users VALUES (4, 'Ömer Arslan', 'arslantalha183@gmail.com', '$2b$10$.Gk1Kspjr/3R.wvaTES9.eJ4hnYkkEj3/Vt3tC/tcr5TCHzfB0W2C', 'admin', '2026-05-12 13:51:35.944173', '2026-05-12 13:51:35.944173', true);
INSERT INTO public.users VALUES (5, 'Arif Kayhan', 'arifkayhan44@gmail.com', '$2b$10$iAQQyb1ChVTTLBR0DXqNVu8CE92Ej32f5m.j1uKnJJnfj1.kMIw2u', 'admin', '2026-05-12 13:55:25.996906', '2026-05-12 13:55:25.996906', true);
INSERT INTO public.users VALUES (6, 'İbrahim Karakaya', 'ibrahimkarakaya@gmail.com', '$2b$10$nVUqd/h94a6Fz.6bAdyS.u9EwXcziz2v42jwpYMWFtI7YVlZdb7FG', 'admin', '2026-05-13 18:26:27.642929', '2026-05-13 18:26:27.642929', true);


--
-- TOC entry 5083 (class 0 OID 0)
-- Dependencies: 221
-- Name: brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.brands_id_seq', 35, true);


--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 225
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 33, true);


--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 223
-- Name: models_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.models_id_seq', 114, true);


--
-- TOC entry 5086 (class 0 OID 0)
-- Dependencies: 227
-- Name: sparepart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sparepart_id_seq', 27, true);


--
-- TOC entry 5087 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- TOC entry 4899 (class 2606 OID 16419)
-- Name: brands brands_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_name_key UNIQUE (name);


--
-- TOC entry 4901 (class 2606 OID 16417)
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);


--
-- TOC entry 4905 (class 2606 OID 16454)
-- Name: category category_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_name_key UNIQUE (name);


--
-- TOC entry 4907 (class 2606 OID 16452)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- TOC entry 4903 (class 2606 OID 16431)
-- Name: models models_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.models
    ADD CONSTRAINT models_pkey PRIMARY KEY (id);


--
-- TOC entry 4909 (class 2606 OID 16483)
-- Name: sparepart sparepart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sparepart
    ADD CONSTRAINT sparepart_pkey PRIMARY KEY (id);


--
-- TOC entry 4911 (class 2606 OID 16485)
-- Name: sparepart sparepart_sku_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sparepart
    ADD CONSTRAINT sparepart_sku_key UNIQUE (sku);


--
-- TOC entry 4895 (class 2606 OID 16406)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4897 (class 2606 OID 16404)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4913 (class 2606 OID 16455)
-- Name: category category_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.category(id) ON DELETE CASCADE;


--
-- TOC entry 4912 (class 2606 OID 16432)
-- Name: models models_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.models
    ADD CONSTRAINT models_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brands(id) ON DELETE CASCADE;


--
-- TOC entry 4914 (class 2606 OID 16486)
-- Name: sparepart sparepart_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sparepart
    ADD CONSTRAINT sparepart_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- TOC entry 4915 (class 2606 OID 16491)
-- Name: sparepart sparepart_model_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sparepart
    ADD CONSTRAINT sparepart_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.models(id);


-- Completed on 2026-05-17 12:51:49

--
-- PostgreSQL database dump complete
--

\unrestrict rkGEEtZCPCYhiUwkHJcauiCQ4rds4SbhOINVpdfzceKE5eVvWN6fuQsyUc2fwSD

