CREATE PROCEDURE sp_getDppAllProdi(IN idjnskls INT, kdstsemester VARCHAR(5))
BEGIN
SELECT kdfakultas,nmfakultas,IFNULL(fakultas,nmfakultas) as fakultas,
					kdprodi,nourutprodi,nmprodi, IFNULL(lnmprodi,nmprodi) as lnmprodi,
					biaya,jmlbayar,ifnull(jmlbayar*100/biaya,0) as persenbayar,
					(biaya-jmlbayar) as sisa, ifnull((1 - jmlbayar/biaya)*100,0) as persensisa
				FROM(
					SELECT AA.kdfakultas,BB.nmfakultas,
					CONCAT(BB.kdfakultas,'. FAKULTAS ',BB.nmfakultas) as fakultas,
					AA.kdprodi,AA.nourutprodi,AA.nmprodi,
					CONCAT(AA.nourutprodi,'. ',AA.nmprodi, ' (',CC.nmjenjangstudi,')') as lnmprodi,
					ifnull(MBYR.biaya,0) as biaya,ifnull(MBYR.jmlbayar,0) as jmlbayar
					FROM prodi AA
					LEFT JOIN fakultas BB on BB.kdfakultas=AA.kdfakultas
					LEFT JOIN 
						(select kdkodtbkod as kdjenjangstudi,nmkodtbkod as nmjenjangstudi from tbkod where kdapltbkod=4)CC
						ON CC.kdjenjangstudi=AA.kdjenjangstudi
					LEFT JOIN
					(
						select a.kdprodi, sum(a.biaya) as biaya, sum(a.jmlbayar) as jmlbayar
						from
						(
							SELECT A.nim, A.kdprodi, IFNULL(C.biaya,0) as biaya, 
							IFNULL(D.jmlbayar,0) as jmlbayar
							FROM mahasiswa A
							LEFT JOIN klsmhs B ON B.idklsmhs=A.idklsmhs
							LEFT JOIN
							(
								select a.idjnsbiaya, a.biaya,a.idjnskls,a.kdprodi,a.tahunmsk
								from setbiaya a
								left join jbiaya b on b.idjnsbiaya=a.idjnsbiaya
								where a.idstatus=1
								and b.kdjnsbiaya='DPP'
							)C on C.kdprodi=A.kdprodi and C.tahunmsk=A.thnmasuk and C.idjnskls=B.idjnskls
							LEFT JOIN
							(
								select nim,idjnsbiaya,sum(jmlbayar) as jmlbayar
								from kuitansi k
								where idstkuitansi=1
								and k.kdstsemester=kdstsemester
								group by nim,idjnsbiaya
							)D on D.nim=A.nim and D.idjnsbiaya=C.idjnsbiaya
							WHERE B.idjnskls=idjnskls
						)a GROUP BY a.kdprodi
					)MBYR ON MBYR.kdprodi=AA.kdprodi
					WHERE BB.kdfakultas<>'0'
				)FINAL
				ORDER BY kdfakultas,nourutprodi;
END;