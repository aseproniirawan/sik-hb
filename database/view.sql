CREATE DATABASE  IF NOT EXISTS `sik_v1` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `sik_v1`;
-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: 192.168.1.8    Database: sik_v1
-- ------------------------------------------------------
-- Server version	5.1.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary table structure for view `v_history`
--

DROP TABLE IF EXISTS `v_history`;
/*!50001 DROP VIEW IF EXISTS `v_history`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_history` (
  `norm` tinyint NOT NULL,
  `nmpasien` tinyint NOT NULL,
  `nmjnskelamin` tinyint NOT NULL,
  `alamat` tinyint NOT NULL,
  `tglreg` tinyint NOT NULL,
  `idlokasi` tinyint NOT NULL,
  `kdlokasi` tinyint NOT NULL,
  `idjnsstkrm` tinyint NOT NULL,
  `nmjnsstkrm` tinyint NOT NULL,
  `idregdet` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_tarifall`
--

DROP TABLE IF EXISTS `v_tarifall`;
/*!50001 DROP VIEW IF EXISTS `v_tarifall`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_tarifall` (
  `kditem` tinyint NOT NULL,
  `nmitem` tinyint NOT NULL,
  `klstarif` tinyint NOT NULL,
  `satuankcl` tinyint NOT NULL,
  `satuanbsr` tinyint NOT NULL,
  `tarifjs` tinyint NOT NULL,
  `tarifjm` tinyint NOT NULL,
  `tarifjp` tinyint NOT NULL,
  `tarifbhp` tinyint NOT NULL,
  `ttltarif` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_reservasi`
--

DROP TABLE IF EXISTS `v_reservasi`;
/*!50001 DROP VIEW IF EXISTS `v_reservasi`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_reservasi` (
  `tglreservasi` tinyint NOT NULL,
  `jamreservasi` tinyint NOT NULL,
  `nmshift` tinyint NOT NULL,
  `nmbagian` tinyint NOT NULL,
  `nmdokter` tinyint NOT NULL,
  `noantrian` tinyint NOT NULL,
  `norm` tinyint NOT NULL,
  `nmpasien` tinyint NOT NULL,
  `nohp` tinyint NOT NULL,
  `notelp` tinyint NOT NULL,
  `email` tinyint NOT NULL,
  `tglinput` tinyint NOT NULL,
  `userinput` tinyint NOT NULL,
  `nmstposisipasien` tinyint NOT NULL,
  `nmstreservasi` tinyint NOT NULL,
  `idreservasi` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_infobed`
--

DROP TABLE IF EXISTS `v_infobed`;
/*!50001 DROP VIEW IF EXISTS `v_infobed`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_infobed` (
  `nmbagian` tinyint NOT NULL,
  `nmkamar` tinyint NOT NULL,
  `nmbed` tinyint NOT NULL,
  `nmstbed` tinyint NOT NULL,
  `noreg` tinyint NOT NULL,
  `tglmasuk` tinyint NOT NULL,
  `jammasuk` tinyint NOT NULL,
  `norm` tinyint NOT NULL,
  `nmpasien` tinyint NOT NULL,
  `kdjnskelamin` tinyint NOT NULL,
  `Umur` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_klsperawatan`
--

DROP TABLE IF EXISTS `v_klsperawatan`;
/*!50001 DROP VIEW IF EXISTS `v_klsperawatan`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_klsperawatan` (
  `idklsrawat` tinyint NOT NULL,
  `kdklsrawat` tinyint NOT NULL,
  `nmklsrawat` tinyint NOT NULL,
  `idbagian` tinyint NOT NULL,
  `kdbagian` tinyint NOT NULL,
  `nmbagian` tinyint NOT NULL,
  `kdklstarif` tinyint NOT NULL,
  `nmklstarif` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_cbdibed`
--

DROP TABLE IF EXISTS `v_cbdibed`;
/*!50001 DROP VIEW IF EXISTS `v_cbdibed`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_cbdibed` (
  `idkamar` tinyint NOT NULL,
  `idbagian` tinyint NOT NULL,
  `nmbagian` tinyint NOT NULL,
  `kdkamar` tinyint NOT NULL,
  `nmkamar` tinyint NOT NULL,
  `fasilitas` tinyint NOT NULL,
  `rperawatan_kamar` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_bukakasir`
--

DROP TABLE IF EXISTS `v_bukakasir`;
/*!50001 DROP VIEW IF EXISTS `v_bukakasir`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_bukakasir` (
  `nokasir` tinyint NOT NULL,
  `idstkasir` tinyint NOT NULL,
  `nmstkasir` tinyint NOT NULL,
  `idshiftbuka` tinyint NOT NULL,
  `nmshiftbuka` tinyint NOT NULL,
  `idbagian` tinyint NOT NULL,
  `nmbagian` tinyint NOT NULL,
  `tglbuka` tinyint NOT NULL,
  `jambuka` tinyint NOT NULL,
  `saldoawal` tinyint NOT NULL,
  `catatanbuka` tinyint NOT NULL,
  `userid` tinyint NOT NULL,
  `nmlengkap` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_tarifpelayanan`
--

DROP TABLE IF EXISTS `v_tarifpelayanan`;
/*!50001 DROP VIEW IF EXISTS `v_tarifpelayanan`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_tarifpelayanan` (
  `idpenjamin` tinyint NOT NULL,
  `kdpenjamin` tinyint NOT NULL,
  `nmpenjamin` tinyint NOT NULL,
  `kdpelayanan` tinyint NOT NULL,
  `nourut` tinyint NOT NULL,
  `nmpelayanan` tinyint NOT NULL,
  `idklstarif` tinyint NOT NULL,
  `kdklstarif` tinyint NOT NULL,
  `nmklstarif` tinyint NOT NULL,
  `tarifjs` tinyint NOT NULL,
  `tarifjm` tinyint NOT NULL,
  `tarifjp` tinyint NOT NULL,
  `tarifbhp` tinyint NOT NULL,
  `tottarif` tinyint NOT NULL,
  `idjnspelayanan` tinyint NOT NULL,
  `kdjnspelayanan` tinyint NOT NULL,
  `nmjnspelayanan` tinyint NOT NULL,
  `idjnshirarki` tinyint NOT NULL,
  `kdjnshirarki` tinyint NOT NULL,
  `nmjnshirarki` tinyint NOT NULL,
  `idstatus` tinyint NOT NULL,
  `kdstatus` tinyint NOT NULL,
  `nmstatus` tinyint NOT NULL,
  `kdparent` tinyint NOT NULL,
  `nmparent` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_otoritas`
--

DROP TABLE IF EXISTS `v_otoritas`;
/*!50001 DROP VIEW IF EXISTS `v_otoritas`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_otoritas` (
  `nmklppengguna` tinyint NOT NULL,
  `idmenu` tinyint NOT NULL,
  `kdmenu` tinyint NOT NULL,
  `nmmenu` tinyint NOT NULL,
  `idsubmenu` tinyint NOT NULL,
  `nmsubmenu` tinyint NOT NULL,
  `kdstatus` tinyint NOT NULL,
  `nmstatus` tinyint NOT NULL,
  `idstatusklppengguna` tinyint NOT NULL,
  `idklppengguna` tinyint NOT NULL,
  `nmlengkap` tinyint NOT NULL,
  `gambar` tinyint NOT NULL,
  `url` tinyint NOT NULL,
  `idstatus` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_kamar`
--

DROP TABLE IF EXISTS `v_kamar`;
/*!50001 DROP VIEW IF EXISTS `v_kamar`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_kamar` (
  `idkamar` tinyint NOT NULL,
  `idbagian` tinyint NOT NULL,
  `nmbagian` tinyint NOT NULL,
  `kdkamar` tinyint NOT NULL,
  `nmkamar` tinyint NOT NULL,
  `fasilitas` tinyint NOT NULL,
  `ruangan_perawatan` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_registrasi`
--

DROP TABLE IF EXISTS `v_registrasi`;
/*!50001 DROP VIEW IF EXISTS `v_registrasi`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_registrasi` (
  `noreg` tinyint NOT NULL,
  `keluhan` tinyint NOT NULL,
  `nmkerabat` tinyint NOT NULL,
  `notelpkerabat` tinyint NOT NULL,
  `catatanr` tinyint NOT NULL,
  `norm` tinyint NOT NULL,
  `nmpasien` tinyint NOT NULL,
  `alamatp` tinyint NOT NULL,
  `nmibu` tinyint NOT NULL,
  `tptlahirp` tinyint NOT NULL,
  `tgllahirp` tinyint NOT NULL,
  `notelpp` tinyint NOT NULL,
  `nohpp` tinyint NOT NULL,
  `tgldaftar` tinyint NOT NULL,
  `idregdet` tinyint NOT NULL,
  `tglreg` tinyint NOT NULL,
  `jamreg` tinyint NOT NULL,
  `tglmasuk` tinyint NOT NULL,
  `jammasuk` tinyint NOT NULL,
  `tglkeluar` tinyint NOT NULL,
  `catatankeluar` tinyint NOT NULL,
  `tglrencanakeluar` tinyint NOT NULL,
  `catatanrencanakeluar` tinyint NOT NULL,
  `umurtahun` tinyint NOT NULL,
  `umurbulan` tinyint NOT NULL,
  `umurhari` tinyint NOT NULL,
  `userbatal` tinyint NOT NULL,
  `nmdokterkirim` tinyint NOT NULL,
  `idpenjamin` tinyint NOT NULL,
  `idjnspelayanan` tinyint NOT NULL,
  `idstpasien` tinyint NOT NULL,
  `idhubkeluarga` tinyint NOT NULL,
  `idjnskelamin` tinyint NOT NULL,
  `idcaradatang` tinyint NOT NULL,
  `idbagian` tinyint NOT NULL,
  `idbagiankirim` tinyint NOT NULL,
  `idkamar` tinyint NOT NULL,
  `iddokter` tinyint NOT NULL,
  `iddokterkirim` tinyint NOT NULL,
  `idklsrawat` tinyint NOT NULL,
  `idklstarif` tinyint NOT NULL,
  `idshift` tinyint NOT NULL,
  `idstbed` tinyint NOT NULL,
  `nmbed` tinyint NOT NULL,
  `nmjnskelamin` tinyint NOT NULL,
  `nmjnspelayanan` tinyint NOT NULL,
  `nmdaerah` tinyint NOT NULL,
  `nmstpelayanan` tinyint NOT NULL,
  `nmpenjamin` tinyint NOT NULL,
  `nmklsrawat` tinyint NOT NULL,
  `nmbagian` tinyint NOT NULL,
  `nmbagiankirim` tinyint NOT NULL,
  `nmkamar` tinyint NOT NULL,
  `kdkamar` tinyint NOT NULL,
  `nonota` tinyint NOT NULL,
  `nmdokter` tinyint NOT NULL,
  `nmdoktergelar` tinyint NOT NULL,
  `nmdokterkirimdlm` tinyint NOT NULL,
  `noantrian` tinyint NOT NULL,
  `nmcaradatang` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_penyakit`
--

DROP TABLE IF EXISTS `v_penyakit`;
/*!50001 DROP VIEW IF EXISTS `v_penyakit`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_penyakit` (
  `idpenyakit` tinyint NOT NULL,
  `kdpenyakit` tinyint NOT NULL,
  `nmpenyakit` tinyint NOT NULL,
  `nmpenyakiteng` tinyint NOT NULL,
  `idjnshirarki` tinyint NOT NULL,
  `kdjnshirarki` tinyint NOT NULL,
  `nmjnshirarki` tinyint NOT NULL,
  `idparent` tinyint NOT NULL,
  `kdparent` tinyint NOT NULL,
  `nmparent` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_bagianklsperawatan`
--

DROP TABLE IF EXISTS `v_bagianklsperawatan`;
/*!50001 DROP VIEW IF EXISTS `v_bagianklsperawatan`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_bagianklsperawatan` (
  `idbagian` tinyint NOT NULL,
  `kdbagian` tinyint NOT NULL,
  `nmbagian` tinyint NOT NULL,
  `idlvlbagian` tinyint NOT NULL,
  `kdlvlbagian` tinyint NOT NULL,
  `nmlvlbagian` tinyint NOT NULL,
  `idjnshirarki` tinyint NOT NULL,
  `kdjnshirarki` tinyint NOT NULL,
  `nmjnshirarki` tinyint NOT NULL,
  `idjnspelayanan` tinyint NOT NULL,
  `kdjnspelayanan` tinyint NOT NULL,
  `nmjnspelayanan` tinyint NOT NULL,
  `idbdgrawat` tinyint NOT NULL,
  `kdbdgrawat` tinyint NOT NULL,
  `nmbdgrawat` tinyint NOT NULL,
  `bag_idbagian` tinyint NOT NULL,
  `kdparent` tinyint NOT NULL,
  `nmparent` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_barang`
--

DROP TABLE IF EXISTS `v_barang`;
/*!50001 DROP VIEW IF EXISTS `v_barang`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_barang` (
  `kdbrg` tinyint NOT NULL,
  `nmbrg` tinyint NOT NULL,
  `idklpbrg` tinyint NOT NULL,
  `idjnsbrg` tinyint NOT NULL,
  `idsatuankcl` tinyint NOT NULL,
  `idsatuanbsr` tinyint NOT NULL,
  `idpabrik` tinyint NOT NULL,
  `nmjnsbrg` tinyint NOT NULL,
  `hrgavg` tinyint NOT NULL,
  `hrgbeli` tinyint NOT NULL,
  `nmpabrik` tinyint NOT NULL,
  `stokmin` tinyint NOT NULL,
  `stokmax` tinyint NOT NULL,
  `keterangan` tinyint NOT NULL,
  `rasio` tinyint NOT NULL,
  `gambar` tinyint NOT NULL,
  `tglinput` tinyint NOT NULL,
  `userinput` tinyint NOT NULL,
  `kdsatuankcl` tinyint NOT NULL,
  `nmsatuankcl` tinyint NOT NULL,
  `kdsatuanbsr` tinyint NOT NULL,
  `nmsatuanbsr` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_carisupplierfrompensupplier`
--

DROP TABLE IF EXISTS `v_carisupplierfrompensupplier`;
/*!50001 DROP VIEW IF EXISTS `v_carisupplierfrompensupplier`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_carisupplierfrompensupplier` (
  `idhrgbrgsup` tinyint NOT NULL,
  `kdbrg` tinyint NOT NULL,
  `nmbrg` tinyint NOT NULL,
  `idsatuanbsr` tinyint NOT NULL,
  `nmsatuan` tinyint NOT NULL,
  `kdsupplier` tinyint NOT NULL,
  `nmsupplier` tinyint NOT NULL,
  `idmatauang` tinyint NOT NULL,
  `nmmatauang` tinyint NOT NULL,
  `harga` tinyint NOT NULL,
  `tglefektif` tinyint NOT NULL,
  `nopp` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_tarifpaketpelayanan`
--

DROP TABLE IF EXISTS `v_tarifpaketpelayanan`;
/*!50001 DROP VIEW IF EXISTS `v_tarifpaketpelayanan`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_tarifpaketpelayanan` (
  `idtarifpaket` tinyint NOT NULL,
  `idklstarif` tinyint NOT NULL,
  `kdklstarif` tinyint NOT NULL,
  `nmklstarif` tinyint NOT NULL,
  `nmpaket` tinyint NOT NULL,
  `kdtarif` tinyint NOT NULL,
  `idjnstarif` tinyint NOT NULL,
  `kdjnstarif` tinyint NOT NULL,
  `nmjnstarif` tinyint NOT NULL,
  `tottarifpaket` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_pelayanan`
--

DROP TABLE IF EXISTS `v_pelayanan`;
/*!50001 DROP VIEW IF EXISTS `v_pelayanan`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_pelayanan` (
  `kdpelayanan` tinyint NOT NULL,
  `nourut` tinyint NOT NULL,
  `nmpelayanan` tinyint NOT NULL,
  `idjnspelayanan` tinyint NOT NULL,
  `kdjnspelayanan` tinyint NOT NULL,
  `nmjnspelayanan` tinyint NOT NULL,
  `idjnshirarki` tinyint NOT NULL,
  `kdjnshirarki` tinyint NOT NULL,
  `nmjnshirarki` tinyint NOT NULL,
  `kdparent` tinyint NOT NULL,
  `nmparent` tinyint NOT NULL,
  `idstatus` tinyint NOT NULL,
  `kdstatus` tinyint NOT NULL,
  `nmstatus` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_pensupplierdetail`
--

DROP TABLE IF EXISTS `v_pensupplierdetail`;
/*!50001 DROP VIEW IF EXISTS `v_pensupplierdetail`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_pensupplierdetail` (
  `nopp` tinyint NOT NULL,
  `kdbrg` tinyint NOT NULL,
  `nmbrg` tinyint NOT NULL,
  `idsatuanbsr` tinyint NOT NULL,
  `nmsatuan` tinyint NOT NULL,
  `qty` tinyint NOT NULL,
  `catatan` tinyint NOT NULL,
  `idhrgbrgsup` tinyint NOT NULL,
  `kdsupplier` tinyint NOT NULL,
  `nmsupplier` tinyint NOT NULL,
  `idmatauang` tinyint NOT NULL,
  `nmmatauang` tinyint NOT NULL,
  `harga` tinyint NOT NULL,
  `tglefektif` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_ppdetail`
--

DROP TABLE IF EXISTS `v_ppdetail`;
/*!50001 DROP VIEW IF EXISTS `v_ppdetail`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_ppdetail` (
  `nopp` tinyint NOT NULL,
  `kdbrg` tinyint NOT NULL,
  `nmbrg` tinyint NOT NULL,
  `nmsatuan` tinyint NOT NULL,
  `qty` tinyint NOT NULL,
  `catatan` tinyint NOT NULL,
  `harga` tinyint NOT NULL,
  `nmstpp` tinyint NOT NULL,
  `nopo` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_mutasikrm`
--

DROP TABLE IF EXISTS `v_mutasikrm`;
/*!50001 DROP VIEW IF EXISTS `v_mutasikrm`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_mutasikrm` (
  `norm` tinyint NOT NULL,
  `noreg` tinyint NOT NULL,
  `nmpasien` tinyint NOT NULL,
  `jeniskelamin` tinyint NOT NULL,
  `alamat` tinyint NOT NULL,
  `tgldaftar` tinyint NOT NULL,
  `nmstpasien` tinyint NOT NULL,
  `tglminta` tinyint NOT NULL,
  `jamminta` tinyint NOT NULL,
  `nmbagian` tinyint NOT NULL,
  `nmdoktergelar` tinyint NOT NULL,
  `kdlokasi` tinyint NOT NULL,
  `nmjnsstkrm` tinyint NOT NULL,
  `tglkeluar` tinyint NOT NULL,
  `jamkeluar` tinyint NOT NULL,
  `useridkeluar` tinyint NOT NULL,
  `tglkembali` tinyint NOT NULL,
  `jamkembali` tinyint NOT NULL,
  `useridkembali` tinyint NOT NULL,
  `nmjnspelayanan` tinyint NOT NULL,
  `idjnsstkrm` tinyint NOT NULL,
  `idbagian` tinyint NOT NULL,
  `idstpasien` tinyint NOT NULL,
  `userinput` tinyint NOT NULL,
  `idstkrm` tinyint NOT NULL,
  `idregdet` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_jadwalpraktek`
--

DROP TABLE IF EXISTS `v_jadwalpraktek`;
/*!50001 DROP VIEW IF EXISTS `v_jadwalpraktek`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_jadwalpraktek` (
  `nmbagian` tinyint NOT NULL,
  `nmdoktergelar` tinyint NOT NULL,
  `idhari` tinyint NOT NULL,
  `nmshift` tinyint NOT NULL,
  `idshift` tinyint NOT NULL,
  `jampraktek` tinyint NOT NULL,
  `keterangan` tinyint NOT NULL,
  `catatan` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_tarifpaketpelayanandet`
--

DROP TABLE IF EXISTS `v_tarifpaketpelayanandet`;
/*!50001 DROP VIEW IF EXISTS `v_tarifpaketpelayanandet`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_tarifpaketpelayanandet` (
  `idtarifpaket` tinyint NOT NULL,
  `idklstarif` tinyint NOT NULL,
  `kdklstarif` tinyint NOT NULL,
  `nmklstarif` tinyint NOT NULL,
  `nmpaket` tinyint NOT NULL,
  `idtarifpaketdet` tinyint NOT NULL,
  `kdtarif` tinyint NOT NULL,
  `idjnstarif` tinyint NOT NULL,
  `kdjnstarif` tinyint NOT NULL,
  `nmjnstarif` tinyint NOT NULL,
  `qty` tinyint NOT NULL,
  `tarifjs` tinyint NOT NULL,
  `tarifjm` tinyint NOT NULL,
  `tarifjp` tinyint NOT NULL,
  `tarifbhp` tinyint NOT NULL,
  `tottarif` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_infojdokterpraktek`
--

DROP TABLE IF EXISTS `v_infojdokterpraktek`;
/*!50001 DROP VIEW IF EXISTS `v_infojdokterpraktek`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_infojdokterpraktek` (
  `nmbagian` tinyint NOT NULL,
  `nmdoktergelar` tinyint NOT NULL,
  `idshift` tinyint NOT NULL,
  `nmshift` tinyint NOT NULL,
  `senin` tinyint NOT NULL,
  `selasa` tinyint NOT NULL,
  `rabu` tinyint NOT NULL,
  `kamis` tinyint NOT NULL,
  `jumat` tinyint NOT NULL,
  `sabtu` tinyint NOT NULL,
  `minggu` tinyint NOT NULL,
  `catatan` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_bed`
--

DROP TABLE IF EXISTS `v_bed`;
/*!50001 DROP VIEW IF EXISTS `v_bed`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_bed` (
  `idkamar` tinyint NOT NULL,
  `nmkamar` tinyint NOT NULL,
  `idbed` tinyint NOT NULL,
  `kdbed` tinyint NOT NULL,
  `nmbed` tinyint NOT NULL,
  `idextrabed` tinyint NOT NULL,
  `nmextrabed` tinyint NOT NULL,
  `idstbed` tinyint NOT NULL,
  `nmstbed` tinyint NOT NULL,
  `idstatus` tinyint NOT NULL,
  `nmstatus` tinyint NOT NULL,
  `idbagian` tinyint NOT NULL,
  `nmbagian` tinyint NOT NULL,
  `rperawatan_kamar` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_brgbagian`
--

DROP TABLE IF EXISTS `v_brgbagian`;
/*!50001 DROP VIEW IF EXISTS `v_brgbagian`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_brgbagian` (
  `idbagian` tinyint NOT NULL,
  `kdbrg` tinyint NOT NULL,
  `nmbagian` tinyint NOT NULL,
  `nmbrg` tinyint NOT NULL,
  `stoknowbagian` tinyint NOT NULL,
  `stokminbagian` tinyint NOT NULL,
  `stokmaxbagian` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_menu`
--

DROP TABLE IF EXISTS `v_menu`;
/*!50001 DROP VIEW IF EXISTS `v_menu`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_menu` (
  `idmenu` tinyint NOT NULL,
  `kdmenu` tinyint NOT NULL,
  `nmmenu` tinyint NOT NULL,
  `deskripsi` tinyint NOT NULL,
  `idsubmenu` tinyint NOT NULL,
  `nmsubmenu` tinyint NOT NULL,
  `idstatus` tinyint NOT NULL,
  `idjnshirarki` tinyint NOT NULL,
  `url` tinyint NOT NULL,
  `gambar` tinyint NOT NULL,
  `kdstatus` tinyint NOT NULL,
  `nmstatus` tinyint NOT NULL,
  `kdjnshirarki` tinyint NOT NULL,
  `nmjnshirarki` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_kasir`
--

DROP TABLE IF EXISTS `v_kasir`;
/*!50001 DROP VIEW IF EXISTS `v_kasir`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_kasir` (
  `nokasir` tinyint NOT NULL,
  `idbagian` tinyint NOT NULL,
  `nmbagian` tinyint NOT NULL,
  `tglbuka` tinyint NOT NULL,
  `jambuka` tinyint NOT NULL,
  `nmshiftbuka` tinyint NOT NULL,
  `saldoawal` tinyint NOT NULL,
  `catatanbuka` tinyint NOT NULL,
  `tgltutup` tinyint NOT NULL,
  `jamtutup` tinyint NOT NULL,
  `nmshifttutup` tinyint NOT NULL,
  `saldoakhir` tinyint NOT NULL,
  `selisih` tinyint NOT NULL,
  `catatantutup` tinyint NOT NULL,
  `idstkasir` tinyint NOT NULL,
  `nmstkasir` tinyint NOT NULL,
  `userid` tinyint NOT NULL,
  `nmlengkap` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_history`
--

/*!50001 DROP TABLE IF EXISTS `v_history`*/;
/*!50001 DROP VIEW IF EXISTS `v_history`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`dbpolikujang`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_history` AS select `r`.`norm` AS `norm`,`p`.`nmpasien` AS `nmpasien`,`j`.`nmjnskelamin` AS `nmjnskelamin`,`p`.`alamat` AS `alamat`,`rd`.`tglreg` AS `tglreg`,`p`.`idlokasi` AS `idlokasi`,`l`.`kdlokasi` AS `kdlokasi`,`m`.`idjnsstkrm` AS `idjnsstkrm`,`st`.`nmjnsstkrm` AS `nmjnsstkrm`,`m`.`idregdet` AS `idregdet` from ((((((`mutasikrm` `m` join `registrasidet` `rd` on((`m`.`idregdet` = `rd`.`idregdet`))) join `registrasi` `r` on((`r`.`noreg` = `rd`.`noreg`))) join `pasien` `p` on((`r`.`norm` = `p`.`norm`))) join `jkelamin` `j` on((`p`.`idjnskelamin` = `j`.`idjnskelamin`))) join `lokasi` `l` on((`p`.`idlokasi` = `l`.`idlokasi`))) join `jstkrm` `st` on((`m`.`idjnsstkrm` = `st`.`idjnsstkrm`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_tarifall`
--

/*!50001 DROP TABLE IF EXISTS `v_tarifall`*/;
/*!50001 DROP VIEW IF EXISTS `v_tarifall`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_tarifall` AS select `b`.`kdbrg` AS `kditem`,`b`.`nmbrg` AS `nmitem`,'' AS `klstarif`,(select `satuan`.`nmsatuan` AS `nmsatuan` from `satuan` where (`satuan`.`idsatuan` = `b`.`idsatuankcl`)) AS `satuankcl`,(select `satuan`.`nmsatuan` AS `nmsatuan` from `satuan` where (`satuan`.`idsatuan` = `b`.`idsatuanbsr`)) AS `satuanbsr`,'' AS `tarifjs`,'' AS `tarifjm`,'' AS `tarifjp`,`b`.`hrgbeli` AS `tarifbhp`,(`b`.`hrgbeli` + (`b`.`hrgbeli` * (10 / 100))) AS `ttltarif` from `barang` `b` union select `p`.`kdpelayanan` AS `kditem`,`p`.`nmpelayanan` AS `nmitem`,`t`.`idklstarif` AS `klstarif`,'' AS `satuankcl`,'' AS `satuanbsr`,`t`.`tarifjs` AS `tarifjs`,`t`.`tarifjm` AS `tarifjm`,`t`.`tarifjp` AS `tarifjp`,`t`.`tarifbhp` AS `tarifbhp`,(((`t`.`tarifjs` + `t`.`tarifjm`) + `t`.`tarifjp`) + `t`.`tarifbhp`) AS `ttltarif` from (`pelayanan` `p` join `tarif` `t`) where ((`p`.`kdpelayanan` = `t`.`kdpelayanan`) and (`t`.`idklstarif` = 3)) union select `tp`.`idtarifpaket` AS `kditem`,`tp`.`nmpaket` AS `nmitem`,`tp`.`idklstarif` AS `klstarif`,'' AS `satuankcl`,'' AS `satuanbsr`,sum(`tpd`.`tarifjs`) AS `tarifjs`,sum(`tpd`.`tarifjm`) AS `tarifjm`,sum(`tpd`.`tarifjp`) AS `tarifjp`,sum(`tpd`.`tarifbhp`) AS `tarifbhp`,(((sum(`tpd`.`tarifjs`) + sum(`tpd`.`tarifjm`)) + sum(`tpd`.`tarifjp`)) + sum(`tpd`.`tarifbhp`)) AS `ttltarif` from (`tarifpaket` `tp` join `tarifpaketdet` `tpd`) where ((`tp`.`idtarifpaket` = `tpd`.`idtarifpaket`) and (`tp`.`idklstarif` = 3)) group by `tp`.`idtarifpaket` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_reservasi`
--

/*!50001 DROP TABLE IF EXISTS `v_reservasi`*/;
/*!50001 DROP VIEW IF EXISTS `v_reservasi`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`dbpolikujang`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_reservasi` AS select `r`.`tglreservasi` AS `tglreservasi`,`r`.`jamreservasi` AS `jamreservasi`,`s`.`nmshift` AS `nmshift`,`b`.`nmbagian` AS `nmbagian`,`d`.`nmdokter` AS `nmdokter`,`r`.`noantrian` AS `noantrian`,`r`.`norm` AS `norm`,`r`.`nmpasien` AS `nmpasien`,`r`.`nohp` AS `nohp`,`r`.`notelp` AS `notelp`,`r`.`email` AS `email`,`r`.`tglinput` AS `tglinput`,`r`.`userinput` AS `userinput`,`st`.`nmstposisipasien` AS `nmstposisipasien`,`str`.`nmstreservasi` AS `nmstreservasi`,`r`.`idreservasi` AS `idreservasi` from (((((`reservasi` `r` join `shift` `s` on((`r`.`idshift` = `s`.`idshift`))) join `bagian` `b` on((`r`.`idbagian` = `b`.`idbagian`))) join `dokter` `d` on((`r`.`iddokter` = `d`.`iddokter`))) join `stposisipasien` `st` on((`r`.`idstposisipasien` = `st`.`idstposisipasien`))) join `streservasi` `str` on((`r`.`idstreservasi` = `str`.`idstreservasi`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_infobed`
--

/*!50001 DROP TABLE IF EXISTS `v_infobed`*/;
/*!50001 DROP VIEW IF EXISTS `v_infobed`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`siak`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_infobed` AS select `bagian`.`nmbagian` AS `nmbagian`,`kamar`.`nmkamar` AS `nmkamar`,`bed`.`nmbed` AS `nmbed`,`stbed`.`nmstbed` AS `nmstbed`,`registrasidet`.`noreg` AS `noreg`,`registrasidet`.`tglmasuk` AS `tglmasuk`,`registrasidet`.`jammasuk` AS `jammasuk`,`registrasi`.`norm` AS `norm`,`pasien`.`nmpasien` AS `nmpasien`,`jkelamin`.`kdjnskelamin` AS `kdjnskelamin`,concat(`registrasidet`.`umurtahun`,' Thn.',`registrasidet`.`umurbulan`,'Bln.',`registrasidet`.`umurhari`,' Hr.') AS `Umur` from (((((((`bed` join `kamar` on((`bed`.`idkamar` = `kamar`.`idkamar`))) join `bagian` on((`kamar`.`idbagian` = `bagian`.`idbagian`))) join `stbed` on((`bed`.`idstbed` = `stbed`.`idstbed`))) left join `registrasidet` on((`registrasidet`.`idbed` = `bed`.`idbed`))) left join `registrasi` on((`registrasidet`.`noreg` = `registrasi`.`noreg`))) left join `pasien` on((`registrasi`.`norm` = `pasien`.`norm`))) left join `jkelamin` on((`pasien`.`idjnskelamin` = `jkelamin`.`idjnskelamin`))) order by `bagian`.`nmbagian`,`kamar`.`nmkamar`,`bed`.`nmbed` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_klsperawatan`
--

/*!50001 DROP TABLE IF EXISTS `v_klsperawatan`*/;
/*!50001 DROP VIEW IF EXISTS `v_klsperawatan`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`siak`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_klsperawatan` AS select `klsrawat`.`idklsrawat` AS `idklsrawat`,`klsrawat`.`kdklsrawat` AS `kdklsrawat`,`klsrawat`.`nmklsrawat` AS `nmklsrawat`,`klsrawat`.`idbagian` AS `idbagian`,`bagian`.`kdbagian` AS `kdbagian`,`bagian`.`nmbagian` AS `nmbagian`,`klstarif`.`kdklstarif` AS `kdklstarif`,`klstarif`.`nmklstarif` AS `nmklstarif` from ((`klsrawat` left join `bagian` on((`klsrawat`.`idbagian` = `bagian`.`idbagian`))) left join `klstarif` on((`klsrawat`.`idklstarif` = `klstarif`.`idklstarif`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_cbdibed`
--

/*!50001 DROP TABLE IF EXISTS `v_cbdibed`*/;
/*!50001 DROP VIEW IF EXISTS `v_cbdibed`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`siak`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_cbdibed` AS select `kamar`.`idkamar` AS `idkamar`,`kamar`.`idbagian` AS `idbagian`,`bagian`.`nmbagian` AS `nmbagian`,`kamar`.`kdkamar` AS `kdkamar`,`kamar`.`nmkamar` AS `nmkamar`,`kamar`.`fasilitas` AS `fasilitas`,concat(`bagian`.`nmbagian`,' - ',`kamar`.`nmkamar`) AS `rperawatan_kamar` from (`kamar` left join `bagian` on((`kamar`.`idbagian` = `bagian`.`idbagian`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_bukakasir`
--

/*!50001 DROP TABLE IF EXISTS `v_bukakasir`*/;
/*!50001 DROP VIEW IF EXISTS `v_bukakasir`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`siak`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_bukakasir` AS select `kasir`.`nokasir` AS `nokasir`,`kasir`.`idstkasir` AS `idstkasir`,`stkasir`.`nmstkasir` AS `nmstkasir`,`kasir`.`idshiftbuka` AS `idshiftbuka`,`shift`.`nmshift` AS `nmshiftbuka`,`kasir`.`idbagian` AS `idbagian`,`bagian`.`nmbagian` AS `nmbagian`,`kasir`.`tglbuka` AS `tglbuka`,`kasir`.`jambuka` AS `jambuka`,`kasir`.`saldoawal` AS `saldoawal`,`kasir`.`catatanbuka` AS `catatanbuka`,`kasir`.`userid` AS `userid`,`pengguna`.`nmlengkap` AS `nmlengkap` from ((((`kasir` left join `stkasir` on((`kasir`.`idstkasir` = `stkasir`.`idstkasir`))) left join `shift` on((`shift`.`idshift` = `kasir`.`idshiftbuka`))) left join `bagian` on((`kasir`.`idbagian` = `bagian`.`idbagian`))) left join `pengguna` on((`kasir`.`userid` = `pengguna`.`userid`))) group by `kasir`.`nokasir` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_tarifpelayanan`
--

/*!50001 DROP TABLE IF EXISTS `v_tarifpelayanan`*/;
/*!50001 DROP VIEW IF EXISTS `v_tarifpelayanan`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`siak`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_tarifpelayanan` AS select `tarif`.`idpenjamin` AS `idpenjamin`,`penjamin`.`kdpenjamin` AS `kdpenjamin`,`penjamin`.`nmpenjamin` AS `nmpenjamin`,`tarif`.`kdpelayanan` AS `kdpelayanan`,`pelayanan`.`nourut` AS `nourut`,`pelayanan`.`nmpelayanan` AS `nmpelayanan`,`tarif`.`idklstarif` AS `idklstarif`,`klstarif`.`kdklstarif` AS `kdklstarif`,`klstarif`.`nmklstarif` AS `nmklstarif`,`tarif`.`tarifjs` AS `tarifjs`,`tarif`.`tarifjm` AS `tarifjm`,`tarif`.`tarifjp` AS `tarifjp`,`tarif`.`tarifbhp` AS `tarifbhp`,(((`tarif`.`tarifjs` + `tarif`.`tarifjm`) + `tarif`.`tarifjp`) + `tarif`.`tarifbhp`) AS `tottarif`,`pelayanan`.`idjnspelayanan` AS `idjnspelayanan`,`jpelayanan`.`kdjnspelayanan` AS `kdjnspelayanan`,`jpelayanan`.`nmjnspelayanan` AS `nmjnspelayanan`,`pelayanan`.`idjnshirarki` AS `idjnshirarki`,`jhirarki`.`kdjnshirarki` AS `kdjnshirarki`,`jhirarki`.`nmjnshirarki` AS `nmjnshirarki`,`pelayanan`.`idstatus` AS `idstatus`,`status`.`kdstatus` AS `kdstatus`,`status`.`nmstatus` AS `nmstatus`,`pelayanan`.`pel_kdpelayanan` AS `kdparent`,`parent`.`nmpelayanan` AS `nmparent` from (((((((`tarif` join `penjamin` on((`tarif`.`idpenjamin` = `penjamin`.`idpenjamin`))) join `pelayanan` on((`tarif`.`kdpelayanan` = `pelayanan`.`kdpelayanan`))) join `klstarif` on((`tarif`.`idklstarif` = `klstarif`.`idklstarif`))) join `jpelayanan` on((`pelayanan`.`idjnspelayanan` = `jpelayanan`.`idjnspelayanan`))) join `jhirarki` on((`pelayanan`.`idjnshirarki` = `jhirarki`.`idjnshirarki`))) join `status` on((`pelayanan`.`idstatus` = `status`.`idstatus`))) left join `pelayanan` `parent` on((`pelayanan`.`pel_kdpelayanan` = `parent`.`kdpelayanan`))) order by `tarif`.`idpenjamin`,`tarif`.`kdpelayanan` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_otoritas`
--

/*!50001 DROP TABLE IF EXISTS `v_otoritas`*/;
/*!50001 DROP VIEW IF EXISTS `v_otoritas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_otoritas` AS select `klppengguna`.`nmklppengguna` AS `nmklppengguna`,`otoritas`.`idmenu` AS `idmenu`,`menu`.`kdmenu` AS `kdmenu`,`menu`.`nmmenu` AS `nmmenu`,`menu`.`men_idmenu` AS `idsubmenu`,`submenu`.`nmmenu` AS `nmsubmenu`,`status`.`kdstatus` AS `kdstatus`,`status`.`nmstatus` AS `nmstatus`,`klppengguna`.`idstatus` AS `idstatusklppengguna`,`otoritas`.`idklppengguna` AS `idklppengguna`,`pengguna`.`nmlengkap` AS `nmlengkap`,`menu`.`gambar` AS `gambar`,`menu`.`url` AS `url`,`menu`.`idstatus` AS `idstatus` from (((((`otoritas` join `klppengguna` on((`otoritas`.`idklppengguna` = `klppengguna`.`idklppengguna`))) join `menu` on((`otoritas`.`idmenu` = `menu`.`idmenu`))) join `menu` `submenu` on((`menu`.`men_idmenu` = `submenu`.`idmenu`))) join `status` on((`menu`.`idstatus` = `status`.`idstatus`))) join `pengguna` on((`pengguna`.`idklppengguna` = `otoritas`.`idklppengguna`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_kamar`
--

/*!50001 DROP TABLE IF EXISTS `v_kamar`*/;
/*!50001 DROP VIEW IF EXISTS `v_kamar`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`siak`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_kamar` AS select `kamar`.`idkamar` AS `idkamar`,`kamar`.`idbagian` AS `idbagian`,`bagian`.`nmbagian` AS `nmbagian`,`kamar`.`kdkamar` AS `kdkamar`,`kamar`.`nmkamar` AS `nmkamar`,`kamar`.`fasilitas` AS `fasilitas`,concat(`bagian`.`nmbagian`,' - ',`kamar`.`nmkamar`) AS `ruangan_perawatan` from (`kamar` left join `bagian` on((`kamar`.`idbagian` = `bagian`.`idbagian`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_registrasi`
--

/*!50001 DROP TABLE IF EXISTS `v_registrasi`*/;
/*!50001 DROP VIEW IF EXISTS `v_registrasi`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_registrasi` AS select `r`.`noreg` AS `noreg`,`r`.`keluhan` AS `keluhan`,`r`.`nmkerabat` AS `nmkerabat`,`r`.`notelpkerabat` AS `notelpkerabat`,`r`.`catatan` AS `catatanr`,`p`.`norm` AS `norm`,`p`.`nmpasien` AS `nmpasien`,`p`.`alamat` AS `alamatp`,`p`.`nmibu` AS `nmibu`,`p`.`tptlahir` AS `tptlahirp`,`p`.`tgllahir` AS `tgllahirp`,`p`.`notelp` AS `notelpp`,`p`.`nohp` AS `nohpp`,`p`.`tgldaftar` AS `tgldaftar`,`rd`.`idregdet` AS `idregdet`,`rd`.`tglreg` AS `tglreg`,`rd`.`jamreg` AS `jamreg`,`rd`.`tglmasuk` AS `tglmasuk`,`rd`.`jammasuk` AS `jammasuk`,`rd`.`tglkeluar` AS `tglkeluar`,`rd`.`catatankeluar` AS `catatankeluar`,`rd`.`tglrencanakeluar` AS `tglrencanakeluar`,`rd`.`catatanrencanakeluar` AS `catatanrencanakeluar`,`rd`.`umurtahun` AS `umurtahun`,`rd`.`umurbulan` AS `umurbulan`,`rd`.`umurhari` AS `umurhari`,`rd`.`userbatal` AS `userbatal`,`rd`.`nmdokterkirim` AS `nmdokterkirim`,`r`.`idpenjamin` AS `idpenjamin`,`r`.`idjnspelayanan` AS `idjnspelayanan`,`r`.`idstpasien` AS `idstpasien`,`r`.`idhubkeluarga` AS `idhubkeluarga`,`p`.`idjnskelamin` AS `idjnskelamin`,`rd`.`idcaradatang` AS `idcaradatang`,`rd`.`idbagian` AS `idbagian`,`rd`.`idbagiankirim` AS `idbagiankirim`,`rd`.`idkamar` AS `idkamar`,`rd`.`iddokter` AS `iddokter`,`rd`.`iddokterkirim` AS `iddokterkirim`,`rd`.`idklsrawat` AS `idklsrawat`,`rd`.`idklstarif` AS `idklstarif`,`rd`.`idshift` AS `idshift`,`bed`.`idstbed` AS `idstbed`,`bed`.`nmbed` AS `nmbed`,`jkel`.`nmjnskelamin` AS `nmjnskelamin`,`jpel`.`nmjnspelayanan` AS `nmjnspelayanan`,`dae`.`nmdaerah` AS `nmdaerah`,`sp`.`nmstpelayanan` AS `nmstpelayanan`,`pnj`.`nmpenjamin` AS `nmpenjamin`,`kr`.`nmklsrawat` AS `nmklsrawat`,`bag`.`nmbagian` AS `nmbagian`,`bagkrm`.`nmbagian` AS `nmbagiankirim`,`kmr`.`nmkamar` AS `nmkamar`,`kmr`.`kdkamar` AS `kdkamar`,`nt`.`nonota` AS `nonota`,`d`.`nmdokter` AS `nmdokter`,`d`.`nmdoktergelar` AS `nmdoktergelar`,`dkrm`.`nmdokter` AS `nmdokterkirimdlm`,`res`.`noantrian` AS `noantrian`,`cd`.`nmcaradatang` AS `nmcaradatang` from (((((((((((((((((((((((`registrasi` `r` left join `pasien` `p` on((`p`.`norm` = `r`.`norm`))) left join `jkelamin` `jkel` on((`jkel`.`idjnskelamin` = `p`.`idjnskelamin`))) left join `daerah` `dae` on((`dae`.`iddaerah` = `p`.`iddaerah`))) left join `stpelayanan` `sp` on((`sp`.`idstpelayanan` = `p`.`idstpelayanan`))) left join `registrasidet` `rd` on((`rd`.`noreg` = `r`.`noreg`))) left join `penjamin` `pnj` on((`pnj`.`idpenjamin` = `r`.`idpenjamin`))) left join `jpelayanan` `jpel` on((`jpel`.`idjnspelayanan` = `r`.`idjnspelayanan`))) left join `stpasien` `stp` on((`stp`.`idstpasien` = `r`.`idstpasien`))) left join `hubkeluarga` `hk` on((`hk`.`idhubkeluarga` = `r`.`idhubkeluarga`))) left join `shift` `sh` on((`sh`.`idshift` = `rd`.`idshift`))) left join `bagian` `bag` on((`bag`.`idbagian` = `rd`.`idbagian`))) left join `bagian` `bagkrm` on((`bagkrm`.`idbagian` = `rd`.`idbagiankirim`))) left join `dokter` `d` on((`d`.`iddokter` = `rd`.`iddokter`))) left join `dokter` `dkrm` on((`dkrm`.`iddokter` = `rd`.`iddokterkirim`))) left join `caradatang` `cd` on((`cd`.`idcaradatang` = `rd`.`idcaradatang`))) left join `bed` on((`bed`.`idbed` = `rd`.`idbed`))) left join `klstarif` `kt` on((`kt`.`idklstarif` = `rd`.`idklstarif`))) left join `klsrawat` `kr` on((`kr`.`idklsrawat` = `rd`.`idklsrawat`))) left join `kamar` `kmr` on((`kmr`.`idkamar` = `rd`.`idkamar`))) left join `stkeluar` `sk` on((`sk`.`idstkeluar` = `rd`.`idstkeluar`))) left join `stregistrasi` `sr` on((`sr`.`idstregistrasi` = `rd`.`idstregistrasi`))) left join `nota` `nt` on((`nt`.`idregdet` = `rd`.`idregdet`))) left join `reservasi` `res` on((`res`.`idregdet` = `rd`.`idregdet`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_penyakit`
--

/*!50001 DROP TABLE IF EXISTS `v_penyakit`*/;
/*!50001 DROP VIEW IF EXISTS `v_penyakit`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`siak`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_penyakit` AS select `penyakit`.`idpenyakit` AS `idpenyakit`,`penyakit`.`kdpenyakit` AS `kdpenyakit`,`penyakit`.`nmpenyakit` AS `nmpenyakit`,`penyakit`.`nmpenyakiteng` AS `nmpenyakiteng`,`penyakit`.`idjnshirarki` AS `idjnshirarki`,`jhirarki`.`kdjnshirarki` AS `kdjnshirarki`,`jhirarki`.`nmjnshirarki` AS `nmjnshirarki`,`penyakit`.`pen_idpenyakit` AS `idparent`,`parent`.`kdpenyakit` AS `kdparent`,`parent`.`nmpenyakit` AS `nmparent` from ((`penyakit` left join `jhirarki` on((`penyakit`.`idjnshirarki` = `jhirarki`.`idjnshirarki`))) left join `penyakit` `parent` on((`penyakit`.`pen_idpenyakit` = `parent`.`idpenyakit`))) order by `penyakit`.`kdpenyakit` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_bagianklsperawatan`
--

/*!50001 DROP TABLE IF EXISTS `v_bagianklsperawatan`*/;
/*!50001 DROP VIEW IF EXISTS `v_bagianklsperawatan`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`siak`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_bagianklsperawatan` AS select `bagian`.`idbagian` AS `idbagian`,`bagian`.`kdbagian` AS `kdbagian`,`bagian`.`nmbagian` AS `nmbagian`,`bagian`.`idlvlbagian` AS `idlvlbagian`,`lvlbagian`.`kdlvlbagian` AS `kdlvlbagian`,`lvlbagian`.`nmlvlbagian` AS `nmlvlbagian`,`bagian`.`idjnshirarki` AS `idjnshirarki`,`jhirarki`.`kdjnshirarki` AS `kdjnshirarki`,`jhirarki`.`nmjnshirarki` AS `nmjnshirarki`,`bagian`.`idjnspelayanan` AS `idjnspelayanan`,`jpelayanan`.`kdjnspelayanan` AS `kdjnspelayanan`,`jpelayanan`.`nmjnspelayanan` AS `nmjnspelayanan`,`bagian`.`idbdgrawat` AS `idbdgrawat`,`bdgrawat`.`kdbdgrawat` AS `kdbdgrawat`,`bdgrawat`.`nmbdgrawat` AS `nmbdgrawat`,`bagian`.`bag_idbagian` AS `bag_idbagian`,`parent`.`kdbagian` AS `kdparent`,`parent`.`nmbagian` AS `nmparent` from (((((`bagian` left join `lvlbagian` on((`bagian`.`idlvlbagian` = `lvlbagian`.`idlvlbagian`))) left join `jhirarki` on((`bagian`.`idjnshirarki` = `jhirarki`.`idjnshirarki`))) left join `jpelayanan` on((`bagian`.`idjnspelayanan` = `jpelayanan`.`idjnspelayanan`))) left join `bdgrawat` on((`bagian`.`idbdgrawat` = `bdgrawat`.`idbdgrawat`))) left join `bagian` `parent` on((`bagian`.`bag_idbagian` = `parent`.`idbagian`))) where ((`bagian`.`idjnshirarki` = '1') and (`bagian`.`idjnspelayanan` in (1,2,3))) order by `bagian`.`kdbagian` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_barang`
--

/*!50001 DROP TABLE IF EXISTS `v_barang`*/;
/*!50001 DROP VIEW IF EXISTS `v_barang`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_barang` AS select `barang`.`kdbrg` AS `kdbrg`,`barang`.`nmbrg` AS `nmbrg`,`barang`.`idklpbrg` AS `idklpbrg`,`barang`.`idjnsbrg` AS `idjnsbrg`,`barang`.`idsatuankcl` AS `idsatuankcl`,`barang`.`idsatuanbsr` AS `idsatuanbsr`,`barang`.`idpabrik` AS `idpabrik`,`jbarang`.`nmjnsbrg` AS `nmjnsbrg`,`barang`.`hrgavg` AS `hrgavg`,`barang`.`hrgbeli` AS `hrgbeli`,`pabrik`.`nmpabrik` AS `nmpabrik`,`barang`.`stokmin` AS `stokmin`,`barang`.`stokmax` AS `stokmax`,`barang`.`keterangan` AS `keterangan`,`barang`.`rasio` AS `rasio`,`barang`.`gambar` AS `gambar`,`barang`.`tglinput` AS `tglinput`,`barang`.`userinput` AS `userinput`,`jsatuankcl`.`kdsatuan` AS `kdsatuankcl`,`jsatuankcl`.`nmsatuan` AS `nmsatuankcl`,`jsatuanbsr`.`kdsatuan` AS `kdsatuanbsr`,`jsatuanbsr`.`nmsatuan` AS `nmsatuanbsr` from ((((((`barang` left join `klpbarang` on((`barang`.`idklpbrg` = `klpbarang`.`idklpbrg`))) left join `jbarang` on((`barang`.`idjnsbrg` = `jbarang`.`idjnsbrg`))) left join `jsatuan` on((`barang`.`idsatuankcl` = `jsatuan`.`idsatuan`))) left join `pabrik` on((`barang`.`idpabrik` = `pabrik`.`idpabrik`))) left join `jsatuan` `jsatuankcl` on((`barang`.`idsatuankcl` = `jsatuankcl`.`idsatuan`))) left join `jsatuan` `jsatuanbsr` on((`barang`.`idsatuanbsr` = `jsatuanbsr`.`idsatuan`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_carisupplierfrompensupplier`
--

/*!50001 DROP TABLE IF EXISTS `v_carisupplierfrompensupplier`*/;
/*!50001 DROP VIEW IF EXISTS `v_carisupplierfrompensupplier`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`siak`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_carisupplierfrompensupplier` AS select `hrgbrgsup`.`idhrgbrgsup` AS `idhrgbrgsup`,`hrgbrgsup`.`kdbrg` AS `kdbrg`,`barang`.`nmbrg` AS `nmbrg`,`barang`.`idsatuanbsr` AS `idsatuanbsr`,`jsatuan`.`nmsatuan` AS `nmsatuan`,`hrgbrgsup`.`kdsupplier` AS `kdsupplier`,`supplier`.`nmsupplier` AS `nmsupplier`,`hrgbrgsup`.`idmatauang` AS `idmatauang`,`matauang`.`nmmatauang` AS `nmmatauang`,`hrgbrgsup`.`harga` AS `harga`,`hrgbrgsup`.`tglefektif` AS `tglefektif`,`ppdet`.`nopp` AS `nopp` from (((((`hrgbrgsup` left join `barang` on((`hrgbrgsup`.`kdbrg` = `barang`.`kdbrg`))) left join `supplier` on((`hrgbrgsup`.`kdsupplier` = `supplier`.`kdsupplier`))) left join `matauang` on((`hrgbrgsup`.`idmatauang` = `matauang`.`idmatauang`))) left join `jsatuan` on(((`hrgbrgsup`.`idsatuan` = `jsatuan`.`idsatuan`) and (`barang`.`idsatuanbsr` = `jsatuan`.`idsatuan`)))) left join `ppdet` on((`ppdet`.`kdbrg` = `hrgbrgsup`.`kdbrg`))) group by `hrgbrgsup`.`idhrgbrgsup` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_tarifpaketpelayanan`
--

/*!50001 DROP TABLE IF EXISTS `v_tarifpaketpelayanan`*/;
/*!50001 DROP VIEW IF EXISTS `v_tarifpaketpelayanan`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`siak`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_tarifpaketpelayanan` AS select `v_tarifpaketpelayanandet`.`idtarifpaket` AS `idtarifpaket`,`v_tarifpaketpelayanandet`.`idklstarif` AS `idklstarif`,`v_tarifpaketpelayanandet`.`kdklstarif` AS `kdklstarif`,`v_tarifpaketpelayanandet`.`nmklstarif` AS `nmklstarif`,`v_tarifpaketpelayanandet`.`nmpaket` AS `nmpaket`,`v_tarifpaketpelayanandet`.`kdtarif` AS `kdtarif`,`v_tarifpaketpelayanandet`.`idjnstarif` AS `idjnstarif`,`v_tarifpaketpelayanandet`.`kdjnstarif` AS `kdjnstarif`,`v_tarifpaketpelayanandet`.`nmjnstarif` AS `nmjnstarif`,sum(`v_tarifpaketpelayanandet`.`tottarif`) AS `tottarifpaket` from `v_tarifpaketpelayanandet` group by `v_tarifpaketpelayanandet`.`idtarifpaket`,`v_tarifpaketpelayanandet`.`idklstarif`,`v_tarifpaketpelayanandet`.`kdklstarif`,`v_tarifpaketpelayanandet`.`nmklstarif`,`v_tarifpaketpelayanandet`.`nmpaket`,`v_tarifpaketpelayanandet`.`kdtarif`,`v_tarifpaketpelayanandet`.`idjnstarif`,`v_tarifpaketpelayanandet`.`kdjnstarif`,`v_tarifpaketpelayanandet`.`nmjnstarif` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_pelayanan`
--

/*!50001 DROP TABLE IF EXISTS `v_pelayanan`*/;
/*!50001 DROP VIEW IF EXISTS `v_pelayanan`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`siak`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_pelayanan` AS select `pelayanan`.`kdpelayanan` AS `kdpelayanan`,`pelayanan`.`nourut` AS `nourut`,`pelayanan`.`nmpelayanan` AS `nmpelayanan`,`pelayanan`.`idjnspelayanan` AS `idjnspelayanan`,`jpelayanan`.`kdjnspelayanan` AS `kdjnspelayanan`,`jpelayanan`.`nmjnspelayanan` AS `nmjnspelayanan`,`pelayanan`.`idjnshirarki` AS `idjnshirarki`,`jhirarki`.`kdjnshirarki` AS `kdjnshirarki`,`jhirarki`.`nmjnshirarki` AS `nmjnshirarki`,`pelayanan`.`pel_kdpelayanan` AS `kdparent`,`parent`.`nmpelayanan` AS `nmparent`,`pelayanan`.`idstatus` AS `idstatus`,`status`.`kdstatus` AS `kdstatus`,`status`.`nmstatus` AS `nmstatus` from ((((`pelayanan` left join `jpelayanan` on((`pelayanan`.`idjnspelayanan` = `jpelayanan`.`idjnspelayanan`))) left join `jhirarki` on((`pelayanan`.`idjnshirarki` = `jhirarki`.`idjnshirarki`))) left join `pelayanan` `parent` on((`pelayanan`.`pel_kdpelayanan` = `parent`.`kdpelayanan`))) left join `status` on((`pelayanan`.`idstatus` = `status`.`idstatus`))) order by `pelayanan`.`nourut` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_pensupplierdetail`
--

/*!50001 DROP TABLE IF EXISTS `v_pensupplierdetail`*/;
/*!50001 DROP VIEW IF EXISTS `v_pensupplierdetail`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`siak`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_pensupplierdetail` AS select `ppdet`.`nopp` AS `nopp`,`ppdet`.`kdbrg` AS `kdbrg`,`barang`.`nmbrg` AS `nmbrg`,`barang`.`idsatuanbsr` AS `idsatuanbsr`,`jsatuan`.`nmsatuan` AS `nmsatuan`,`ppdet`.`qty` AS `qty`,`ppdet`.`catatan` AS `catatan`,`ppdet`.`idhrgbrgsup` AS `idhrgbrgsup`,`supplier`.`kdsupplier` AS `kdsupplier`,`supplier`.`nmsupplier` AS `nmsupplier`,`hrgbrgsup`.`idmatauang` AS `idmatauang`,`matauang`.`nmmatauang` AS `nmmatauang`,`hrgbrgsup`.`harga` AS `harga`,`hrgbrgsup`.`tglefektif` AS `tglefektif` from (((((`ppdet` left join `barang` on((`ppdet`.`kdbrg` = `barang`.`kdbrg`))) left join `hrgbrgsup` on(((`ppdet`.`idhrgbrgsup` = `hrgbrgsup`.`idhrgbrgsup`) and (`hrgbrgsup`.`kdbrg` = `barang`.`kdbrg`)))) left join `supplier` on((`hrgbrgsup`.`kdsupplier` = `supplier`.`kdsupplier`))) left join `matauang` on((`hrgbrgsup`.`idmatauang` = `matauang`.`idmatauang`))) left join `jsatuan` on((`jsatuan`.`idsatuan` = `barang`.`idsatuanbsr`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_ppdetail`
--

/*!50001 DROP TABLE IF EXISTS `v_ppdetail`*/;
/*!50001 DROP VIEW IF EXISTS `v_ppdetail`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_ppdetail` AS select `ppdet`.`nopp` AS `nopp`,`barang`.`kdbrg` AS `kdbrg`,`barang`.`nmbrg` AS `nmbrg`,`jsatuan`.`nmsatuan` AS `nmsatuan`,`ppdet`.`qty` AS `qty`,`ppdet`.`catatan` AS `catatan`,`hrgbrgsup`.`harga` AS `harga`,`stpp`.`nmstpp` AS `nmstpp`,`ppdet`.`nopo` AS `nopo` from ((((`ppdet` left join `barang` on((`barang`.`kdbrg` = `ppdet`.`kdbrg`))) left join `jsatuan` on((`jsatuan`.`idsatuan` = `ppdet`.`idsatuan`))) left join `hrgbrgsup` on((`hrgbrgsup`.`idhrgbrgsup` = `ppdet`.`idhrgbrgsup`))) left join `stpp` on((`stpp`.`idstpp` = `ppdet`.`idstpp`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_mutasikrm`
--

/*!50001 DROP TABLE IF EXISTS `v_mutasikrm`*/;
/*!50001 DROP VIEW IF EXISTS `v_mutasikrm`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`siak`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_mutasikrm` AS select `registrasi`.`norm` AS `norm`,`registrasi`.`noreg` AS `noreg`,`pasien`.`nmpasien` AS `nmpasien`,`jkelamin`.`nmjnskelamin` AS `jeniskelamin`,`pasien`.`alamat` AS `alamat`,`pasien`.`tgldaftar` AS `tgldaftar`,`stpasien`.`nmstpasien` AS `nmstpasien`,`mutasikrm`.`tglminta` AS `tglminta`,`mutasikrm`.`jamminta` AS `jamminta`,`bagian`.`nmbagian` AS `nmbagian`,`dokter`.`nmdoktergelar` AS `nmdoktergelar`,`lokasi`.`kdlokasi` AS `kdlokasi`,`jstkrm`.`nmjnsstkrm` AS `nmjnsstkrm`,`mutasikrm`.`tglkeluar` AS `tglkeluar`,`mutasikrm`.`jamkeluar` AS `jamkeluar`,`mutasikrm`.`useridkeluar` AS `useridkeluar`,`mutasikrm`.`tglkembali` AS `tglkembali`,`mutasikrm`.`jamkembali` AS `jamkembali`,`mutasikrm`.`useridkembali` AS `useridkembali`,`jpelayanan`.`nmjnspelayanan` AS `nmjnspelayanan`,`mutasikrm`.`idjnsstkrm` AS `idjnsstkrm`,`registrasidet`.`idbagian` AS `idbagian`,`registrasi`.`idstpasien` AS `idstpasien`,`registrasidet`.`userinput` AS `userinput`,`pasien`.`idstkrm` AS `idstkrm`,`registrasidet`.`idregdet` AS `idregdet` from ((((((((((`mutasikrm` join `registrasidet` on((`mutasikrm`.`idregdet` = `registrasidet`.`idregdet`))) join `registrasi` on((`registrasidet`.`noreg` = `registrasi`.`noreg`))) join `bagian` on((`registrasidet`.`idbagian` = `bagian`.`idbagian`))) join `pasien` on((`registrasi`.`norm` = `pasien`.`norm`))) join `stpasien` on((`registrasi`.`idstpasien` = `stpasien`.`idstpasien`))) join `dokter` on((`registrasidet`.`iddokter` = `dokter`.`iddokter`))) left join `lokasi` on((`pasien`.`idlokasi` = `lokasi`.`idlokasi`))) join `jstkrm` on((`mutasikrm`.`idjnsstkrm` = `jstkrm`.`idjnsstkrm`))) join `jpelayanan` on((`registrasi`.`idjnspelayanan` = `jpelayanan`.`idjnspelayanan`))) join `jkelamin` on((`jkelamin`.`idjnskelamin` = `pasien`.`idjnskelamin`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_jadwalpraktek`
--

/*!50001 DROP TABLE IF EXISTS `v_jadwalpraktek`*/;
/*!50001 DROP VIEW IF EXISTS `v_jadwalpraktek`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_jadwalpraktek` AS select `bagian`.`nmbagian` AS `nmbagian`,`dokter`.`nmdoktergelar` AS `nmdoktergelar`,`hari`.`idhari` AS `idhari`,`shift`.`nmshift` AS `nmshift`,`shift`.`idshift` AS `idshift`,`jadwalpraktek`.`jampraktek` AS `jampraktek`,`jadwalpraktek`.`keterangan` AS `keterangan`,`dokter`.`catatan` AS `catatan` from ((((`jadwalpraktek` join `bagian` on((`bagian`.`idbagian` = `jadwalpraktek`.`idbagian`))) join `dokter` on((`dokter`.`iddokter` = `jadwalpraktek`.`iddokter`))) join `hari` on((`hari`.`idhari` = `jadwalpraktek`.`idhari`))) left join `shift` on((`shift`.`idshift` = `jadwalpraktek`.`idshift`))) group by `bagian`.`nmbagian`,`dokter`.`nmdoktergelar`,`hari`.`idhari`,`shift`.`nmshift` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_tarifpaketpelayanandet`
--

/*!50001 DROP TABLE IF EXISTS `v_tarifpaketpelayanandet`*/;
/*!50001 DROP VIEW IF EXISTS `v_tarifpaketpelayanandet`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`siak`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_tarifpaketpelayanandet` AS select `tarifpaket`.`idtarifpaket` AS `idtarifpaket`,`tarifpaket`.`idklstarif` AS `idklstarif`,`klstarif`.`kdklstarif` AS `kdklstarif`,`klstarif`.`nmklstarif` AS `nmklstarif`,`tarifpaket`.`nmpaket` AS `nmpaket`,`tarifpaketdet`.`idtarifpaketdet` AS `idtarifpaketdet`,`tarifpaketdet`.`kdtarif` AS `kdtarif`,`tarifpaketdet`.`idjnstarif` AS `idjnstarif`,`jtarif`.`kdjnstarif` AS `kdjnstarif`,`jtarif`.`nmjnstarif` AS `nmjnstarif`,`tarifpaketdet`.`qty` AS `qty`,`tarifpaketdet`.`tarifjs` AS `tarifjs`,`tarifpaketdet`.`tarifjm` AS `tarifjm`,`tarifpaketdet`.`tarifjp` AS `tarifjp`,`tarifpaketdet`.`tarifbhp` AS `tarifbhp`,(((`tarifpaketdet`.`tarifjs` + `tarifpaketdet`.`tarifjm`) + `tarifpaketdet`.`tarifjp`) + `tarifpaketdet`.`tarifbhp`) AS `tottarif` from (((`tarifpaket` join `klstarif` on((`tarifpaket`.`idklstarif` = `klstarif`.`idklstarif`))) join `tarifpaketdet` on((`tarifpaketdet`.`idtarifpaket` = `tarifpaket`.`idtarifpaket`))) join `jtarif` on((`tarifpaketdet`.`idjnstarif` = `jtarif`.`idjnstarif`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_infojdokterpraktek`
--

/*!50001 DROP TABLE IF EXISTS `v_infojdokterpraktek`*/;
/*!50001 DROP VIEW IF EXISTS `v_infojdokterpraktek`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_infojdokterpraktek` AS select `v_jadwalpraktek`.`nmbagian` AS `nmbagian`,`v_jadwalpraktek`.`nmdoktergelar` AS `nmdoktergelar`,`v_jadwalpraktek`.`idshift` AS `idshift`,`v_jadwalpraktek`.`nmshift` AS `nmshift`,max(if((`v_jadwalpraktek`.`idhari` = 1),`v_jadwalpraktek`.`jampraktek`,NULL)) AS `senin`,max(if((`v_jadwalpraktek`.`idhari` = 11),`v_jadwalpraktek`.`jampraktek`,NULL)) AS `selasa`,max(if((`v_jadwalpraktek`.`idhari` = 12),`v_jadwalpraktek`.`jampraktek`,NULL)) AS `rabu`,max(if((`v_jadwalpraktek`.`idhari` = 13),`v_jadwalpraktek`.`jampraktek`,NULL)) AS `kamis`,max(if((`v_jadwalpraktek`.`idhari` = 14),`v_jadwalpraktek`.`jampraktek`,NULL)) AS `jumat`,max(if((`v_jadwalpraktek`.`idhari` = 15),`v_jadwalpraktek`.`jampraktek`,NULL)) AS `sabtu`,max(if((`v_jadwalpraktek`.`idhari` = 16),`v_jadwalpraktek`.`jampraktek`,NULL)) AS `minggu`,`v_jadwalpraktek`.`catatan` AS `catatan` from `v_jadwalpraktek` group by `v_jadwalpraktek`.`nmbagian`,`v_jadwalpraktek`.`nmdoktergelar`,`v_jadwalpraktek`.`nmshift` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_bed`
--

/*!50001 DROP TABLE IF EXISTS `v_bed`*/;
/*!50001 DROP VIEW IF EXISTS `v_bed`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`siak`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_bed` AS select `bed`.`idkamar` AS `idkamar`,`kamar`.`nmkamar` AS `nmkamar`,`bed`.`idbed` AS `idbed`,`bed`.`kdbed` AS `kdbed`,`bed`.`nmbed` AS `nmbed`,`bed`.`idextrabed` AS `idextrabed`,`extrabed`.`nmextrabed` AS `nmextrabed`,`bed`.`idstbed` AS `idstbed`,`stbed`.`nmstbed` AS `nmstbed`,`bed`.`idstatus` AS `idstatus`,`status`.`nmstatus` AS `nmstatus`,`kamar`.`idbagian` AS `idbagian`,`bagian`.`nmbagian` AS `nmbagian`,concat(`bagian`.`nmbagian`,' - ',`kamar`.`nmkamar`) AS `rperawatan_kamar` from (`stbed` join ((((`bed` left join `kamar` on((`bed`.`idkamar` = `kamar`.`idkamar`))) left join `extrabed` on((`bed`.`idextrabed` = `extrabed`.`idextrabed`))) left join `status` on((`bed`.`idstatus` = `status`.`idstatus`))) left join `bagian` on((`kamar`.`idbagian` = `bagian`.`idbagian`)))) group by `bed`.`idbed` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_brgbagian`
--

/*!50001 DROP TABLE IF EXISTS `v_brgbagian`*/;
/*!50001 DROP VIEW IF EXISTS `v_brgbagian`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_brgbagian` AS select `barangbagian`.`idbagian` AS `idbagian`,`barangbagian`.`kdbrg` AS `kdbrg`,`bagian`.`nmbagian` AS `nmbagian`,`barang`.`nmbrg` AS `nmbrg`,`barangbagian`.`stoknowbagian` AS `stoknowbagian`,`barangbagian`.`stokminbagian` AS `stokminbagian`,`barangbagian`.`stokmaxbagian` AS `stokmaxbagian` from ((`barangbagian` join `bagian` on((`barangbagian`.`idbagian` = `bagian`.`idbagian`))) join `barang` on((`barangbagian`.`kdbrg` = `barang`.`kdbrg`))) order by `bagian`.`nmbagian` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_menu`
--

/*!50001 DROP TABLE IF EXISTS `v_menu`*/;
/*!50001 DROP VIEW IF EXISTS `v_menu`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_menu` AS select `menu`.`idmenu` AS `idmenu`,`menu`.`kdmenu` AS `kdmenu`,`menu`.`nmmenu` AS `nmmenu`,`menu`.`deskripsi` AS `deskripsi`,`menu`.`men_idmenu` AS `idsubmenu`,`submenu`.`nmmenu` AS `nmsubmenu`,`menu`.`idstatus` AS `idstatus`,`menu`.`idjnshirarki` AS `idjnshirarki`,`menu`.`url` AS `url`,`menu`.`gambar` AS `gambar`,`status`.`kdstatus` AS `kdstatus`,`status`.`nmstatus` AS `nmstatus`,`jhirarki`.`kdjnshirarki` AS `kdjnshirarki`,`jhirarki`.`nmjnshirarki` AS `nmjnshirarki` from (((`menu` left join `menu` `submenu` on((`menu`.`men_idmenu` = `submenu`.`idmenu`))) join `status` on((`menu`.`idstatus` = `status`.`idstatus`))) join `jhirarki` on((`menu`.`idjnshirarki` = `jhirarki`.`idjnshirarki`))) where (`menu`.`idmenu` <> 0) order by `menu`.`kdmenu` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_kasir`
--

/*!50001 DROP TABLE IF EXISTS `v_kasir`*/;
/*!50001 DROP VIEW IF EXISTS `v_kasir`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`siak`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_kasir` AS select `kasir`.`nokasir` AS `nokasir`,`kasir`.`idbagian` AS `idbagian`,`bagian`.`nmbagian` AS `nmbagian`,`kasir`.`tglbuka` AS `tglbuka`,`kasir`.`jambuka` AS `jambuka`,`idshiftbuka`.`nmshift` AS `nmshiftbuka`,`kasir`.`saldoawal` AS `saldoawal`,`kasir`.`catatanbuka` AS `catatanbuka`,`kasir`.`tgltutup` AS `tgltutup`,`kasir`.`jamtutup` AS `jamtutup`,`idshifttutup`.`nmshift` AS `nmshifttutup`,`kasir`.`saldoakhir` AS `saldoakhir`,`kasir`.`selisih` AS `selisih`,`kasir`.`catatantutup` AS `catatantutup`,`kasir`.`idstkasir` AS `idstkasir`,`stkasir`.`nmstkasir` AS `nmstkasir`,`kasir`.`userid` AS `userid`,`pengguna`.`nmlengkap` AS `nmlengkap` from ((((((`kasir` left join `stkasir` on((`kasir`.`idstkasir` = `stkasir`.`idstkasir`))) left join `bagian` on((`kasir`.`idbagian` = `bagian`.`idbagian`))) left join `pengguna` on((`kasir`.`userid` = `pengguna`.`userid`))) join `shift` on((`kasir`.`idshiftbuka` = `shift`.`idshift`))) left join `shift` `idshiftbuka` on((`kasir`.`idshiftbuka` = `idshiftbuka`.`idshift`))) left join `shift` `idshifttutup` on((`kasir`.`idshifttutup` = `idshifttutup`.`idshift`))) group by `kasir`.`nokasir` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-05-21 15:00:21
