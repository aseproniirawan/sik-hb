CREATE PROCEDURE sp_getDpkDet(IN thmasuk VARCHAR(4), idjnskls INT, kdprodi VARCHAR(5), persen INT)
BEGIN
SELECT nim, nmmhs,kdprodi,
					biaya,jmlbayar,ifnull(jmlbayar*100/biaya,0) as persenbayar,
					(biaya-jmlbayar) as sisa, ifnull((1 - jmlbayar/biaya)*100,0) as persensisa,
					CASE WHEN (jmlbayar < biaya) THEN 'Belum Lunas'
						WHEN (jmlbayar=biaya) THEN 'Lunas'
					ELSE 'N/A' END AS stlunas
					FROM(
						SELECT A.nim, A.nmmhs, A.kdprodi, IFNULL(C.biaya,0) as biaya, 
						IFNULL(D.jmlbayar,0) as jmlbayar
						FROM mahasiswa A
						LEFT JOIN klsmhs B ON B.idklsmhs=A.idklsmhs
						LEFT JOIN
						(
							select a.idjnsbiaya, a.biaya,a.idjnskls,a.kdprodi,a.tahunmsk
							from setbiaya a
							left join jbiaya b on b.idjnsbiaya=a.idjnsbiaya
							where a.idstatus=1
							and b.kdjnsbiaya='DPK'
						)C on C.kdprodi=A.kdprodi and C.tahunmsk=A.thnmasuk and C.idjnskls=B.idjnskls
						LEFT JOIN
						(
							select nim,idjnsbiaya,sum(jmlbayar) as jmlbayar
							from kuitansi
							where idstkuitansi=1
							group by nim,idjnsbiaya
						)D on D.nim=A.nim and D.idjnsbiaya=C.idjnsbiaya
						WHERE A.thnmasuk=thmasuk
						AND A.kdprodi=kdprodi
						AND B.idjnskls=idjnskls
					)FINAL
					where ifnull(jmlbayar*100/biaya,0)>=persen
					ORDER BY nim;
END;