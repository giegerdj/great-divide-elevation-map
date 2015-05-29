(function() {

var map, td_metadata, official_polyline;

jQuery(document).ready(function($) {

    resizeMap();
    $(window).on("resize", resizeMapDebounce);

    var options = {
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
        },
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        center: new google.maps.LatLng(42.0, -110.0)
    };

    map = new google.maps.Map(document.getElementById('map'), options);
    var sw = new google.maps.LatLng(34.0, -116.0);
    var ne = new google.maps.LatLng(54.0, -105.0);

    var bounds = new google.maps.LatLngBounds(sw, ne);

    var map_bounds = new google.maps.LatLngBounds(new google.maps.LatLng(bounds.max_lat, bounds.max_lon));
    map_bounds.extend(new google.maps.LatLng(bounds.min_lat, bounds.min_lon));

    map.fitBounds(bounds);

    var divide_polyline = new google.maps.Polyline({
        strokeColor: "#000000",
        strokeWeight: 1,
        strokeOpacity: 0.8,
        path: google.maps.geometry.encoding.decodePath('qkajHregwTtw@bOl_A}f@~mAoj@|aAuUvU{uBnKii@bPlHpt@raArXhQja@nMdS\\jSkBlT}y@nE}`@bKeX`Vb@vX~L~Sod@tSoSlPmBpa@zDxObUtTpdAn^hMv[xHdVeBjSsFtp@sZfNyd@~]a`BbQsd@tSkStMeKlPiBhjAmH``AdbAbPhHvBge@vBsi@~Pc\\~Pg`@dHaTgGsTyIwa@_Gk]aAqe@r@{kAlSekCs}@ul@ibBauAzRmqBld@eyBwaBqjB}C_fD``As`EtnBgoElb@k_@jX|Y`fBtj@~oAmCtwBo_BtwAetAnlA{eBlzAwoAjcCxVjkA|bApq@h}@|uAsK`kBthA|i@zMjfClNf^zUplAyiBxr@wsBzP}nCl[_hB|q@kmA_Uuj@iz@qy@{DgrBlt@c|@`fA_hA_TmuAaSurFvQwlDxcAoaBroAiiBlMeqB`iChSjdBsJzpAgi@vu@~A`cDnPb{@hSneB_lDbqAqdDzgAkkC_Ri}CiPmnBxx@gDdeBgl@xqB}uAvkBzb@|u@~gB`a@ndClL|e@doBybBhuAedB|RwcBjZqt@pfA~SrFufAd|@ecC`xAs_BlkA_`Dnk@cyCf{A}gBvxBhrA~iBuIzfCiLxkAobAck@isDjs@{zBruAyqEzh@uw@hQsiCe_@suAwr@{kBzR}zAzoBgM|[oAoJgeBzVgfFdp@}iBbcA`e@bPhDrnAw}@tfA|Kvf@_mA`w@ooCtiBs@b|@uuBfx@gtAnz@{~@bNgW|vAqqChxBgHfw@~mCrlBn~AvXzDvJlxAkH`~Ejq@zzFp_Ab_DnJdjEnwA|bCpdBsZnuAkgBvwBw|Aj~ClcAlw@lh@j_Cuz@dw@xp@zsC~\\dpB~dApbAnu@`MlqBmDd`Ep{@hcBfmBxhAp`CYdqC{rAtfAi{AdkBy{@tv@jaAn_Btn@lqBlVbaA{cBd_Bwk@|rBu]lXbQrfArG~`B}EljBmb@f_Bwo@fn@}nCnC}}CcH{wD~Ps{Bff@s_AdY_JlpBgj@bdCq\\|cAe_BflAovDxtAsqAxqBfFhwBxN~{@iTfV}EtlAubBtp@m}Bdp@shBdrA{yA{p@{|CfSyaBj~@kcBhh@a~Efu@_oDtiAizAb}BhKbtA_x@|OemDxp@}xBxIeeAmAmcE~[a}DrnAk|@~lB_Yva@w`B|mAsg@fKcW~a@q`EyDunDPw~DnPguDfnAigCtkBzNjjAsRr}A}oAdX{_AhfA}dAnjAinBlc@enCl`AeaAhdA}}A`nBsu@|nAdMxKpm@zOrHze@dg@j{@hrA|RrDdSuA`fArTjI~`@|Npe@lj@thA|Ur@vIrT~XvoAfUlUxWx]hg@xpAnFx`@`Cbq@kKh[eK|RmHhW}Bz_@c@d`@tQ|i@fUfUvOrL`PjDdSsA`PbDxFnXng@oHbIfi@jFxd@|i@hyAjq@tg@lSaJvmAbr@|v@{h@`PjD~MyRbKyRzVoZ`YmEfK_WlHmWjKa[hKcWrRzLxIjTdm@~lAv{@tiAtx@rmAfUdUzOlH~`@xMtl@fFrPgJra@{DnLxXxTpa@hl@vRnPcFzeApX`jAqJj]wr@fK_WzPoR~p@ce@jO`YxFjXxc@|M~UoAlHiWvIq`AfN{qBd\\qdBfTyb@iI}`@ga@o|A{@a\\|Eyc@lHgWjO_|@s@kd@aE_jAfN{ZfCeh@iIy`@bC_d@fMypAjHeWrWao@hy@ynBfr@{eAhS}EhYuM`PjDjz@|W|^eIxyAqv@pjAwZzmA{f@zk@wu@bw@sl@hSyEdg@e@vRpHnLxXbL~`@nP_F~Rn@zRlDlm@ndApLrTp}@xOn\\qUjyAgj@zjAyb@zXkA|nAxHrUzHrRzLbnAla@~Rn@zXkAtfAZ|iA_JfmAiVdPd@lUxLhO`YzKbi@dXjQrXzDhP}A~MqRbgAgJ`|@vx@f|@zt@x{@daAhXbMnh@bk@yBp[kPlxA`UhY}YrtBv@``@hIv`@x|@fd@jXdMvFdXdZdj@rRtLzUn@lS{IhClh@nLdoBvRrHrj@sPn\\yYdPd@lU|L|WjYb_@bcA]v[yHhc@kN|^}Ydb@cu@piAnFl`@~e@rb@sCht@g\\rQgOlw@jLz\\j`@~]l|@lp@zaA~x@xgAhu@r]vYxPkRbNuVnh@oi@v[eAf}@vWrIjXnc@~UfkA|`@bi@nZdLt`@xIhTvLlPdq@lk@fYuM~d@soBpV}QlX|H|LfLzOfHhl@nNlPeFr_@ua@dPd@bSyAbYsIjKyZtG{xAoIo\\jH_WxPiRtBkWsOoPge@cw@\\u[rKac@xSgVha@hArUvHrhAnXpPeJzSeVfP{Az]nQ`PbDzi@~AfP_BpS}MxPiRvhAy_AzrAaVtPgNz`AwtAtPcNnV_RfyA}i@vUrDhkAx\\tPcNrZsv@lg@q~AliA^r]tY`]aj@tcATjuC}i@d_Bbb@nt@qx@tzA_Azq@_aAtnBQru@iyA|rA{YlnBlxA`dB`{@~QxrBvKzl@rf@|M`lB{Grv@vo@dQdkCdOprBz_Az[tqBfpA{CvqCosBr|@mgB~h@{o@x}A}~ArcC}yAkQesDdqAm_Axk@gKvpBdhAr~Bvt@tlBo^duDkx@lwDssAxlCse@nm@uv@lh@m^bwAuVfrEag@tzAnQjoCvi@xcBy_@bhCrtAnfBws@|fCsbBkQ{hBoAewAlkAyfA~FoRqP_~Bc|@eT~dC}tAd`B~LjjB|HdsCmjAraCkt@x_Dyi@daE_s@xrBkP`oEnHtgDhv@vpGh]bpCmKtiCgdAbzBwWjcA~V|}@riBtnAbdC`~Clp@lkAnRb_CvDxiBev@dgCdnA`d@d`ApeC`|@zgAuB`jCfSlfBhfCu\\ts@f_AdbAvw@_|@bsCpTfq@jRpXzkAhOjlBnvAjgBry@jdB{n@|d@uYte@pdDtLpjCpY`nArgAdhAr`@dYxIbX~fAp`BgVp`CbVjjBoG`qBvi@p{BnbAteDpcAvxB`|@roA~y@rj@~F|WhP`rBdeBl`@bfArNtAvaC~^jbBsbBjdB_cAv}AzYxmArhBjbCl{AztAviA{OnuBwv@jpA~cAziBpkE}@yg@aAwc@rEmg@tNk{@zJ{R`g@cAz[_Jr^sEhNak@bhAeiAfVcNn^sAzR`DrXdDhr@nEdSgFvKkw@dFw_AzBuk@{Nst@zBqk@vKmw@|Yur@zNmcA~Ko_Ax_@mz@`b@}]xd@uYfj@iQ~]zT~Wr\\nn@`n@pt@b^fr@nI|_Ap^jw@db@fx@k@lMmFd@ws@sC_l@_Lot@eIit@{Cyc@xCapAvVmb@pd@oQla@oEfx@i@lr@o@fg@kIp}@fNzaAfgA`fArN|iBur@xl@y@zcA_Ldw@mmApk@{eA|gAi|@tcAyClUhPjrAiSra@oMla@mElo@lEni@fMzl@{Dxg@oa@~Psb@bWor@zd@q]nYa^~|BqbChSeJti@`E|`@xLrPiRj_@{e@pj@i]j\\y]|pCm}Bvl@u@d_@w]bQsf@dTmn@jNyj@r_@}m@xVaf@bq@i}@xd@kYbV{Ila@mExl@yDl[lDtXj@dV{Mfk@mu@bQof@lH}^xUd@lc@dYvR`HdY}Qr\\{i@~Vej@zHcs@hAwwAmF{k@aOih@y@mg@fTkn@dV_Nb^tH`XrXjt@`b@h[nHbQmf@vH{j@pKyj@fKu^`No^nMiF`aAuOvSgZt@q_AdfAgdBba@zDf`AnNrPeR|MmV|[qMda@t@~^mUtd@gUnPcJj[nD|]xPxw@`JjqAnOha@iAjfAGvRdHxThd@`L`l@lCro@bB|cBlWpl@d^vHt^mI|[sMza@kYn\\wa@h_@oa@ng@aUzi@y@to@oD`b@k]zg@ca@xdAuo@h|@gt@dh@am@nk@_}@|Vaj@~No~@tNor@jIybAnQir@hQij@fTen@lWcz@xe@g}@hm@sXpa@gI|z@Utd@cUpHsb@yEw_AkIyc@m]y`@sCmg@oL}[iTot@eRc\\}^iqAeZyp@aRe`@{Tm`@kIwc@z@gcA~Hwr@ju@whB}Ck[x\\si@hHqZjQgj@dTaj@l\\q]vj@s`@lNkf@hQgj@hWwq@rQkr@~Yqm@nd@_Mtr@aHdYuQ~a@aYn_@ke@te@}t@n_@oe@bb@_]vi@lArlAsRd\\mUxYse@xNir@vSyYza@cUlj@sTb~@iKb{B}o@bYoMj~@mSpa@aIr]|Xhx@pvA~_@bi@zn@vUp`@~TbVuIbKkVjZqy@`k@qh@tVw]lWuu@lNgf@xP}U~UuEfi@nQvXmAxu@{Sr_@ei@n`@eeAfn@it@hYmUxRbDzO`HtR`HhUlP|v@jb@pl@rAv[gE`v@{[pg@qT~XoI|^aQ`[tLbl@rQ|Rb@fHkVnEsZkCkk@{@a_@`Cyf@bKmVvGkF~JkRnYkY~Sua@`Qa^dNa^pNaj@dNc^x_@am@nTuq@xQ{u@hZku@pQ{m@K_oAxBw^~JiR`HkNnSwQng@oPz{@i_@rb@yl@bf@s`AjZgu@wHqs@^}u@{Vka@m`@_YsRgH}Ri@wf@mE_g@p@ePzAoa@|HiSvIs\\da@u^~Hoa@zHma@zD{`@aIg|@{n@mc@eUk`@cYqh@se@uQeh@of@mMaO_`@m]{\\aXsP{ZwT{Pe`A_HwkAkPcpAwSk`Ao\\}x@m]}\\}Qg`@i@go@dFsj@zs@ygCzKgj@zQwu@jImv@|@_{@uEow@p@_o@|Cw~@SacAr@ao@xHkf@f\\giBcTqhCn@ak@q@ag@pLe~@x_@}h@hQya@zQwu@`Fsf@x@}r@gIwc@}FoOeIyc@{CiW_DmgB`Cwb@jEqRbTsa@vSuUhTse@lWim@bWme@xB{ZaDkcB~Hij@`GqbAjByN_L{c@gAcO{CmWaUqT}L{Ga^gIaXuPif@qQaX{Pic@oUaXwPeXuL{`@mIoUoH{^vLam@zKw[~DmJWqf@uIyOgH}Hyg@wbAehGaY_eAkWwd@{\\gi@}z@moA_Cio@Ui{@tFov@fQy]|DsFva@sLbj@}Gd\\aQjQwa@pKe^`Lcn@dJmfAp@_k@gHw{@aFsg@~@_w@dFqf@lImr@Oa_AlCyj@~Kej@`i@cx@pBwR~Bw^wKah@i`@weBaFog@kFs_@kCoc@o@cc@nCwj@bO}q@vKeb@dCwb@wFsScJyGqPtI{XdE}LaHnFsn@zHgb@pGsjA|Ik~@iBk_AqNih@sVyt@mTwd@aRoX}\\ge@uNgd@d@__@xC{r@|B_gBoKal@eFqc@iCmc@yKad@wHyk@iCmc@|Hkb@dQwYth@al@bTo]~SkYzY_]`e@eXb_@sPne@ed@fb@kXdWea@`O{m@vBwVwK_d@yOmHaPg@sRoHwLeLmIwWaAeSf@__@tCwn@u@g[mCo_@{Qm\\mQsd@uNed@gI}[kNil@gCkc@f@}^wJa`A_W_i@{\\qe@oZeYyKad@_Kax@sBos@zGonAlGobAvIiv@xCwn@pGsfAvDsfA|C{r@a@ak@kAkKuFqSmFw[aIy_@aJ_H}Jcx@aIy_@\\_WnB{NtQse@~Eo^nFmj@hA_w@jRsu@bZ{`@tUiaAnQsa@fOwm@dFqb@qFwWaJyGaMeD{LgHgFs_@~BwZi@gc@h@}^{FuOc[iIgMc@oJ|A{GhFkBxJ_HhJaCtZiFnf@`Cpg@_A|n@p@d_@sSlMmYzPcY|Hig@vG}^jL}Y|\\ie@~[}r@zJ_r@cGi]qY_|@el@ql@uBwb@fd@s^lDyUy@{FuO_@ik@k@ic@hCyb@i@cc@aF{c@qCk[kI_XaRwT_XaQqRsH_d@_BmSjIi^qAmSjIwSjQqPrIwMvIei@xs@qY~T{J`JcPi@kDmGmRuLgXeIqLgPwIyOcXqqAkNmh@aCsg@_@gk@Uks@jLcn@zImv@zEqZYmo@u@g[{I_LaMcDmXeEsXcAi[mEmXaEcXcMgXeI}T_U}No\\iI_VtEqXzT_OzYa^fTq]pZcR|N{ThJqt@wGmv@}PqaAxCqOt`@yJhj@lF`^mFr`@qJhj@_l@zYc^d]mVve@iW~Jqh@xJql@xE{_@dF}WfReMd[_Fpa@jCfe@|Rrd@`G~Up@pO}HfRcM|KqXrHe`@jJot@vBsc@pE}c@|Gcl@rVye@zQcUbf@gOrOwHdTxTxH|UxQh]vSzLxX`@rXsAp]iNdy@ka@`c@}Rf`@qRvRmy@pEcxAnAm{@dVwm@f`@qRl|@qYf[eFrQ_YxJml@bNsd@|Y_^rJmp@zVsa@nq@mP|l@dBl^RvUiA`RaQrVse@rX{u@dUsaA~Rgu@lXyy@f[cz@tQemArFahAtwAioHprE|iFzIibBtHa`@nEwg@jCqWoCq^eOmyAcXu`BjF_lA`r@g|@no@cx@xq@i`A`q@gpAxn@_dAde@{b@|WsMvaAya@jcAaz@x\\a^lQ{\\`ScmBwGgz@wy@_]gbB`Mim@mJef@ag@kYkdAsJ}y@qn@sjEia@yoBuq@_bBqc@qk@ilAmsBm\\ePu^yCmv@p`@{pAfkAy|Ap`AwYmTca@{kBkAcgBHmcDnEyg@fq@apAvUgArbB}DpfBzLbq@b^de@hSjcAyAl~@ieBhPwt@jm@ycBpa@ir@py@{tAvbAyiArzB}zCd`@knAp\\y}AjVoiBeJ{mBoPkaAsT}`@_V{|@nIclAhy@o`@vQ{XpCkWqxAonArVkeBd]}mCvx@odDny@qxAnZqUtRyDpXmAz{Af^h~@`Ihl@tr@jyAlf@zsA}N`|@dUhlAvCnUaEv_@}yAeXqlB_Ym`Aha@cz@rb@i^hyAioAsKyuAjJ}{@nh@uvAxq@mcCpZiqAwMqeAm]}cB_EkbAzi@wz@jXiEhSbE~Zfp@vdAjxAbe@nSdXiIzt@wcAaDin@zsAwNhvB}I~EhZnl@eCfbBaLv{@lQpn@lf@bg@jC`{@mx@pW{tAnRedC~\\kyAdoB_i@dcAeEjh@izAjTq|AhCyzAcS}`Ay]uoB}BsVd_@iiBn_@we@~sAejAhkAmmAnyAqnAz}@g|@oFaf@qUwx@keAehBkH}Rnv@o~AxNy{Ar[s|DyD_bAyLou@{Oey@vkAsE`QdUvSfQb^yEnQk`@zM}o@bCcc@tW_UvXx@xVvTxbAzp@pk@wVvHuc@jZaYtKyc@lc@ymAl\\hT|MtMb]dd@jU_Id]kYpRsHj[mArPlIhSthAv[~cA`NtQ~VtXzZiMfz@aLxY|wA|g@zvAbT|XhR|p@hQtxAbNnpCfYblAxy@re@bLle@mSnt@ok@puC{M~o@sBljBbSv`Afi@zr@`tA|r@|aAx\\~]xs@j_@hsAdj@pfAxw@cDrQk\\na@auBlL_P`XeMzRu@|WgM`RkTxdAo|A~TyPnRqHdp@hNvPjMbNlQlKvUr|ApqBhlAfcAjf@iJns@kc@rNc`@hSet@vi@g~@tRqDj[qAxPfMhTx\\pHzU`p@viArYlTdXgIxQiX~TwPfu@g{@|Ky[pHig@~i@suB`g@gyBfj@oqB|Y_a@ngAi`B`UuPtdAu`@nu@bF`cB`FxcBvUhqAcF~TuPxQiXlQe`@zR}_AZoj@{Hw]mH}QcWm\\w^eH{lB}`@}PeQbt@yuC`p@yqB~f@}|B`s@}mBlCa[pCczAcIya@tC_WxZkMtL{KnL}OhQ_d@z|@gsAtU_AtgBsOfSfE|d@lSzPfQ]lj@|@fj@vd@rOvEcg@nIsSjOePdsAy|AxN}[dRmPzq@gjA|Buf@aLke@eUosB~Hk_@zN}[hRmLbt@cWd^sApd@vK~l@|Fjc@wMz_@k]jkAglApRmHzf@NpqBdMjwARbwAkBjeBoCh_B{JhgBmWdNok@tOgHzk@oNzU`Ah_B{JpOcL|w@Y{Oq|@bF__@dLuWtYmh@dUuLjUsHzRs@rxA{a@f`@iUdOaT~Ys`@hReoAbjAgkBje@ma@``@iYvk@iRd[gEbsAi]~sAwIn_ByFnRmH~uAm]poAyl@`O{WtH}f@t@qZsC}i@`CeiBjH{n@jNmg@jh@u]`OwWzwAywBfIi[lf@qlAjUqH`t@k}Adv@emB~u@aqB|H_c@vH_g@aDku@_QgTbj@az@b]w\\jUqHhlB{f@pcB_n@l|Bo_AlxAci@ve@kYnXogAbn@kdBfT}c@vWiTjRiLh_BspAb`AgnAvH{f@|X}eCfFy^zNq[zUdAvq@uJtMtI`KpQ|Qnl@rE|UvKda@|MlQtS`Q|[hLvRkDzZ{LvQw[xRqKsLom@gQ{\\kt@qu@t@oZxHyf@vXkcA|Ycd@zs@udBxBcn@vC{Vn\\cl@rZqTjc@mM~y@}RpaAak@lZoXvn@gNzw@Kp[x@v]}Lr_@sd@jXuDnvAgQpLsOt\\ch@Jo}@t}@dBp}@S|d@lW``@jk@tQnh@fx@ppAlYjTt{@zUbaAnQnj@bSx`@v~@~Zd{@lo@jiAvx@b|Ahb@l[nl@PnmBgKzy@}RdjAsg@lbAuSd\\us@|Eof@dPklCtPwv@rWcXdRaP~Skk@vZqPdPrAhZi\\vDieA{Eu]g@_^tVmo@zx@}wBns@uoB|DqaA~Hsb@nf@yoAdg@_`Avx@u{B~c@sgAvHmj@dJomAb_@{s@rWaXtRiDfi@yIv\\{g@`g@}cAbkAwyAxa@{w@lKon@pq@y{AzWkPvv@a^tX`AfSfIt_@pc@no@hCfc@_QdsAe\\`}@eKrZiThLcW`XkLie@wpBHonCz\\sqBdEo}@qQmh@{W_eCjYwdChAe|A}Hce@kVyPkpAt[_j@uGc{AemBqGq}CjLwdBxh@ufBnk@wjBlZqiBzXofAdl@mwAzjAyhB{Rq`DfN{cCrWcmB|f@gkAsG{sAaK}fBrv@sa@b`@e\\tgB{~ApBi}@wZweFqHurBtEuu@``@oqBzJmeAh@sm@}Kul@cTod@uYouBdC_cCr@c{BuEu]igAge@uxAwo@igAke@kc@mfAh`@smBjXq}A_J}kAgd@iHsk@k~@sU{rAuy@{rCezAeEmlAuUu_@qk@mJs{Avg@wtCrs@cfCd_@exCOskBeO_`Aml@oyAsu@eSqbAjRecClm@wqAyIkoAmYey@kj@|FapBj`@muBdSuqApk@w\\rnBzW`{Ald@zn@iMbcBnTfiAhJpc@yiBhK{zCh@oq@nv@yl@~m@el@neCu}Cb{@{oAt[{uAkAeqDa\\uuBc_@aaCu@_y@eAimDoEq~BsYeiCqQkt@mqALu}@kG{[}L{Pc]e^ebBoSazBwYaqCxPsiAbeAw]nk@cd@pj@ecAxgAse@~e@c\\ba@qeBj]ehCjy@yaGre@ctCvRkpBn`@_mFnQcv@hc@odCxD{gBn[_iBjCsq@cCkaDmKei@elB_p@{uBg~AcSazBdo@ouBdIan@eA}wA~FwRbvBkHd\\uqAtg@inAz^oyA~Ei}@uPgYcQwl@_Iq|@pEqpAlQ}y@vg@gnAvlAihAbmAm|@nc@aPzl@jPpaAfr@ns@nz@tm@fs@ry@viAfp@jg@fm@v_@|UrIrl@pDln@a`@f_Ail@zt@oA|tA`^v}Abi@n{@|b@j~@xb@llAd^vqAtNft@k\\f]_g@rIk^nO}VnRiKv^pTx`Btp@jo@rDnbBjBzo@vW`~@dWz~@}w@zaA}s@x~@w_Al|@ah@~X|P|o@v[fc@u[|Md]l`@bzAvg@pg@px@b_@rdAj}@wKhy@sWrf@gIvi@h@~t@oI`b@ig@h}As@lm@n\\zk@ld@jTxcAtZbaAr^hPxIfYp\\vc@`iBtXbuBiOvZaUfWyk@bXwOhKeFjq@kOvZks@h{@sn@hXugAzl@cr@m@wZjWih@`s@aDjVbHtU|o@rW|t@h@x]{On[pAhcAfGrf@wDxTub@rQan@xTwb@tUa@xUxAlVr\\mIdb@uW~^cv@d_AmFti@eR|Z_Ohf@~GvQp\\zk@bSnIzw@d@hhA}QxeCow@~jAwYteAaJlqAvBz}@dOldAnq@zb@pbAl]fnAtY~g@xv@leAr{ApcA~u@rf@hgAfq@juAtl@xLaOjXaDnz@yAfo@qAxIqRYw]oEk]nHsdAoBuYeDcwAdAeVx`@gHta@jTp\\rk@n|@~dAdyAzrAjd@nPlPnMnVn\\~Vto@ds@tf@f_@gmDzAwfB~_@_g@zh@}[~GqwAx@qe@mKoh@sZgnAz\\ir@vl@caBlb@iv@t]uStz@^fu@xKpx@x^jm@dc@bP~Ah`@k[rV_iAx[i|Alc@aPpa@nPtYxk@bTvo@tHrl@|e@rmAb_@vc@vd@r_@da@fAtZiWl`@qWt[dIha@vHnl@mhBnVulAdV}{AxIuRdUcS``@yf@rIiZ{e@smAoj@gc@eb@gk@iW__AWq]pNcy@`m@muAhx@qyAxiAggA`DaZh@g|@hFgm@r_A{Xbx@tKzw@dDtVyhAdAyYz@ke@zTkb@x`@cHzUrEt^rP|u@lj@lp@pn@hg@~Wfb@qaAd`@{b@jdAi_ArjAoh@~dAod@tt@aInXa@xXhIvRuCjW{m@nk@kc@v|@k\\~Qeb@aIm_Ac@yl@tKu|@`j@g`Bll@iwBn^ikBvY{`App@i~@xe@wf@lUkKbz@yPvXpEnSv\\zj@hv@vo@vSrl@rH`a@fAdTs`AkQmw@]_i@`@ikAdh@{y@ts@wr@xh@e_@jBibBfHwzAle@wy@~x@ebA|OqChj@n_@d\\~c@dQts@`Kx\\`@xl@nBf]`g@nLfo@x@dVzTp~@tq@dt@q_@hZwm@vHadA}@urApHgoApKadAhb@_eAbXcSvR}U~RjA~RbArP~LxxAxi@lu@`JrXx@`tAuAzvAifAzQiWdIoZv@yYyBkUz@aVgQc\\}E{\\~_@iX`uAio@rLqK`oAov@oU{}@aQiXiK}TxGq|@zWeP~d@wg@kTqc@qEiU`Fwa@t]wLl[t@ht@iNlWm[fN_j@nIgwAg~@uhBpGslCltAmoBfZq[~Oi@nc@gIl^hD`g@nGfu@lFrC}Yz@}UlFcZ~QoSrtAkz@n`@wLnUoDnz@iCl[t@~RnApMhIlVfPtNzc@fHhQ~\\rf@`\\zOzxBh~@|`Bna@l{Axe@|Oe@txAg\\nOsKnR}GdPnAj\\jWrkAheAx[fHpr@lJnUmDxOcDlf@sEbSdEnP`I~vAjdAzVp[hUeHdU}Kx]{HtUs@|{AcQneBpFtyAyAjUgH`dAum@nLaOj}Aks@pe@i\\`LkZlIoVba@yaAtRgD~WcLrt@wFfnBtMvx@hUpPzL~ZsHzWyOb}Bmf@rf@yAqCih@`Su`AvFmRnOqKx]yHvsAyHt]qLjRwK~zAsg@laAoi@~Mgq@kCid@uHq\\eCw`@dE{_CpFeVnh@k`BvFmRx@mYuNwc@aYiLyRl@{i@iGcKaQyVo[{}@oqAcy@qhB\\cp@xZmLbd@bDlw@wFhW{^`OwVvZePl`Bgo@tfAcu@uBc}Al]w{AxQwZrXsdAcQ}[aNqTw}@sqAkH_U}OqeAt@g]t\\wf@ny@eeBjk@edBzR_hAoCal@kY{ScwAmDgHcQyBiYuWs}B{LcbArLaO`R_SdwAceAlhAcsAbRcSgCmd@sFis@xEyl@pC_iB_QeXgPmE}a@cWkPeIeKyTmHwXnCq]|Hke@hO}RvYgj@|Kya@dI}]wPkTa~@c}AcNmXwOueAiPutAlCea@pCq]fHgx@mQig@gQy_@mv@axBo\\mnBbRkbBrL{NpRawAuHm`@hTaf@du@kfAzEul@{B}\\mY{WopA_z@oj@qZsi@c@_o@vEqg@wVuYo_@sBkUn@{d@`R{VfIy]qEaYkKm\\yM}P_P`@}cCzJkhBiKqMmIcv@ka@}MwTwSiXqg@}VaSkEud@aWcNsXcHiQqNsg@]kYoKosBvQk^rTq^dfAekApNoi@b]c_@zOuCn^hHztAhTzbBrOlRmKt@aa@ptB{k@l[|@vR{C~TeS|sAgwAfcAonAjaBsnBpt@w|A`q@esB~t@mqA|WoOx]cLr{Ac[~wAeu@bwAqoAzvAcwAfsAfz@dPnE`V~HpzAvW~jB|C`|AwOtyAq@jf@uHvOsGzWcSfOsVv^qdAlIaZtt@g|A`X{Kxk@oPlz@oBvX~DjxAtj@|}@fNtR_DpRqGl`@_PjPjItMbM``AtqA~JbQve@q[hdAcp@lXk@xUjAp[zDjVfTtqAlcBpEzXbHngBtMfMlr@`Kt|A~@jeB`HvbB~Kbm@pV`~@vQrLuNbWyi@fUoKrUk@hd@zKzcBrm@zeB`WzyAbAf|AgH|jAkRxx@rsB`KrT|J`QjPfInxAfn@vX~DnMlIhVhPnRxhAzBr\\sClsBuDbdDnK~_@tS|Wj\\d[vPjT|J`QrKvc@v@hs@{Hvh@w@`]ciAhyCv@ro@bCbd@lE`UnP|LtM`MnP~LfPlE|gAgVjxAcf@tOmGpMhItM`Mrt@_Fpl@vCza@~V|]~gApEvXbfAntAtM`MhfBxa@xl@`Kzn@iIvv@{XnOaOhTse@pb@cuB]cYmE_UwHyc@wAkmA`Ls]zFgRnLoRrsAw}ArLwNxNua@x@{\\rHgp@tIiR`I_e@rCkoBbLs]jOuRpOgKrf@gA|MnTtM`MfVhPl[~@~O_@x\\`j@h{@rgB``@`u@nb@ti@|x@|`@xc@gA``A_uA|WoOxRe@nj@hZ|MnT~Ybj@vB~jBo@nd@~Bf`@hKb\\b_BqHtR{CvUjAb|@vk@hZnq@nmA`v@txAlq@pVpWnPzLwGlxC]ds@psAv`AtVh[pXloAdH~PrR{Cby@{g@rLuNjRmK~O_@t[hHfKlXhm@`hBjNp_@xHtc@rI|y@lHrXpb@li@x`Bre@h^t@p[vDt[hHpVtWhHpTbDb~@w@x\\oRzuAoh@xiBwj@`yBoI|UmLnRaB~eAXdUzHrc@|Eb`@w@z\\oFpYaEjbApKv_@{ErvBw`@t}CrErX}FzxAnE|T`Tb_@|V~^~MhTrs@trBpj@jdBbNbX|Hnc@|Eb`@iHts@sa@rcCuClY|KnqBdLrn@n@`d@uBjs@mFrY_Wve@}eAzfAeWbb@_Hf{@y@dYfn@tvBru@nxAhQd_@`PrAzyAb@vRi@jcBvY|d@`ZfKlT|EzfBy@`YbSlrCfYrOfg@bOt}@xEzO{C|Oc@th@qTxQiZ|`A{s@r`@uHfStHvPhPnNj_@dH`QpPtLpa@lK|Oc@pdBoMt}@|E|XhHtd@tRxoAjb@xRo@rqAdHlP`Ib^fcAlFdk@bRfxBzLb}@pMbIbPpApoAxZpPrLbS|DfdB}Tjz@aC~Nhj@zl@dqAfSxHb^iAv{AiTbmAk^|RjAbSzDpM`IffArkApVtSxO_Dfi@sEnbAru@bPnAb^aAxO_DtyAsAzQqVa@yXeFuc@qEsTkHsTgKkTwWcq@bIi]pW}VzWqOhd@gy@tK_e@rd@uq@|UxDrX~@zmA{KfZwZvWiSpIeR~iA}kBny@q_Br_A{tAlIyUtK_e@[cU^mk@qN_c@_gAwaB]cUzKea@tL}Jtt@wlAlC{\\cYavAbZo^|Pep@r@w\\n@o`@iG_kCxCqUpX_gAtOoG`UgOvq@aFv[fH~zAxgBvPhPx^lOtpAjx@~MfTh\\|V|cAd~AfW~e@xHr_@bFlc@xCtxBxIjy@p^~Gfa@`DxOyCnc@{Hj|@gYhr@pF~oBiJt|Ab@jyAyHpXz@bSbEfStHpsAbx@~M~Sd]~l@bS~DvXtDbQh[`|AuLtZuOjcAq~@~ZkHxRk@|RjApkAm@xEah@gCqc@~Ekd@lWmZx@}XjMibApf@sA~]yDtL}J~Hy`@t@u\\vm@gc@jU{GnlAip@t}Aej@n{Ae[xRk@`S`E~^~RpS~OnpAnt@vZoOfg@}x@x]mHr|Ad@t`@sHdQuh@nE{r@pH{k@jTma@z{AyyA`iAu~@fiB_g@_KuPoHcXiQy^bRuRxOyC~v@iQsF}q@rFsUnTy]de@gf@ri@ZzU|D|yAbDrsA{KfmAu]hRgKxRk@l[x@lj@|UbxA~]~Oe@tPfP|Cd_CpQroB~b@lyBpNtb@pqAbnAtMtLjPzHnYxVh[y@l_B^vXrDlXs@}TnxAsFnUoW~_B}@hUtNdf@fStHzXhHfHtP`EfoAuBhxBgJxnC}@fUqFpUcObVeR|NybBby@an@|[aRrRcI`]xChn@tEfXps@niBdKfT`N`Tr_B`iAbsAtl@rpA|s@nS`Ply@rlBrM`IftA`Dvl@xFv}Ab_BzPvSnr@dJbPhAv|ApeAvMtLbe@j]dtAf@`l@uEzYb^nQjb@~t@nBlXu@bSzDlPxHrZhp@np@~aBlbAxvBzVrZrMzHlcAvjAfKbTnNx^rDl`Ab@pXmu@~wBmIrUuChUq@j\\d@f\\fF`c@rUh_A|qAzpAxtAtpAlNd[rb@rd@rPhLzVpZbzA|hA|MdPtM~H~w@_z@z|@qlAnLqNjOyNbSxDbPlAvMnLpd@lpA~g@|\\z|BxV|RdArNz^pLzrBdA|q@|BnX|z@fgAvYhZa\\tp@sW|RyZ|Kc~@no@eOlReIjYyXnyBrSxOvCjj@~_@nfB`Rfm@r@hc@eYpp@cR|NoN~`@lJ~_AvHn[xdAvcB`QdW_@jg@iHnk@_I~\\_LnYeJraAtEjThK`TxBpT{@`Uwg@xdBeFv\\h@d\\zBnTvVxVrStOsMjqBiCp\\rs@v}Ap~@nuA|MbPtMxHfP`EdQbWxE~Wj@f\\_N|k@aQ|d@tFfj@yD|y@kS~o@cQ|d@j@b\\pVnmArTpe@xNfb@sYb`BiIrUaNlh@`@zTc@rc@^vTzWrl@nN|ZdW~]h\\tRbPfAppAtk@z\\p]hWta@vjAzbB~fAzpAhK~S~m@t_@rj@bUnHbTvHzWwb@brAmI`RkEhk@Qpn@hV`fAtEjTwFrhAgFbYwBlg@rFpf@zHj[jK|SxMlL|T|h@`Ft[kTttAiQr]mLtNfIvb@jHnP~SvVzSdS|Wll@x@jc@aIjY`Lpb@vh@jg@~UlDxRs@`XkHnVhOngA|wAlTb^|Kr^~MdPtYjVpVfO~~Azm@pfBzZxRs@hiBq]vuAgXfXyDlIaRpL}JlIcRtWsO{BqTfy@_tAr|@ciAvXbDri@D~\\iWxp@yXfZaWb`Bik@dwAku@nNk]lFoUdHkk@j@e\\_Bs|@gC{[a`AcnBiV}eAcD}m@wImm@kTc^kZyd@sl@sBywAkQ{P{OaLkb@cPq{@lC{XfF_YriAqcBoN}Z}p@k}Ar@qXfFcYtGev@uL_q@u`@gmBoC_c@jZkSfgBzi@jr@zEnFoUlyBvGvb@uWaCcXlCyXbIiYrFwQbXgHvc@yAnbAqKuL{p@fLeRhIqUlR}Gfk@eX`OkRuA}x@_Lob@ebAgcBsMyHcSuD}~@q^_WeZsQ}a@uEiToHcTiIgf@}OyuB|Voa@|]_EvUx@hXqDxaBcJx`@gE|QsRhImUx@aU_CcX_Lmb@oHcTySaqAhCk\\d|@kYnX_Ar~AcQdLyUrFwQdC_`@}`@cxBvb@kWrToVrNe]dIiYjLwmCuEgT}PoSol@w`A|Ee`@t`@mfAkM_cAnSsmBsEiTuQkcBt@sXnI_RdIcYmC_c@sEiTy@{f@yA}}BtCcUjNod@~QqRr]cLh[cAbbBoBr^rGxyANr`@qHln@aQ~Y}]jIqU`Fe`@j@w_@fDkiCkLim@b@_g@zOqaAtL{JnRsG|q@uBlq@mMdWy]nI{Qxm@s`B`I{\\kFif@wKw^se@eiB|Hk`@nLmNzQaVrOmGdXaHbR{Np\\ke@[uTcUguB`Wga@zQcVnn@crAbIw\\jNkd@hs@ehB~Oe@p[fDwCbUrM|HlnA~aAxkAteAjhArw@vMjLdQvZ~ZgHdc@}OfP~D~\\td@`QfW~nAjKzQ{JjS|@hg@ot@b@}f@kKsxAlF}XrUq@za@hRnb@v`@z^zN~`A~OvP~OpK~Z|e@|n@r]}K`XsKhm@aj@no@g|@sDu_AoH}xAh\\ml@de@eb@hXiDnZeSdX{GxUbApo@nFj_@oe@rK}c@bYgxBbYos@v_@_^xh@iPxf@XxnA`Hzw@fBrkB~PpPdLlPrHd~@`uAngAjfBfYhOz[hKxZuKvTcVjL}QrlAnVzrApd@fSjHrbBrFf|A}H`YpKzPhSjRlxB\\tTwCxTm@v_@nAjx@hj@trAdT`^rMvHhP~Dj_@ke@xZuK~Oe@xOwC|aAre@vzAl[brAxbBbz@hVvqAy\\~dD{sAvyBsm@t\\`oA`Arf@d\\dhBlg@voB`u@zlCbwAdjCh|BhyBz_CluA~EzqAbSfoCvc@heDnPldCpMdoCzq@nGhtAqNjzAsg@`hBmJt`BzwAhpAns@`pB`TreDxc@hiBhtAvm@trAU`j@vzB~w@d`Av@dzAy\\pp@apAz~@ozAjmBbIzzBnt@v^_b@rlAg}@znAc]bmBnWtmAnh@d~AleAnsApa@|dAnv@hjAlhAf`@jn@pa@g^llAev@tlAw`AxfAyy@~|AcY~eBiu@buAa}@drAky@dbBrArnCjx@zlBhi@nwCbc@|c@aEva@{h@hy@czAtbEmD|Fzb@`FdqA}BrbApK|{Av}@xrCr@xiAdq@dr@|eAu@phA`HzmD|x@zfBb~@fQdcBeI~eB`k@|qArmCn{Bzy@dk@lAp[r_@txAjFjfA{C~eC|O`|D`B~pD{FtwCdPxtDg[n~DfcAp`EdpAzgAn_Aru@vjAty@|bA~J`bBfHz|A_VxcCle@t_Alg@frBjhAzZrf@`wArgEv{@n|BtZzt@`M~I|lBxr@jnC`~A`vA~cAfmAz|Ak|@vrCgQneB|e@p_Afh@tmBbInbBplAlcDviAh|C~{@t_Cjk@ztA`W~eCjLriAhGzPty@nqAp]t{@hLhtA`Xzi@p~BdHt}CrHzsA`Y|pClrC`eA`uA`MhMz}BvgA`kAdu@h_A~{Ale@liClAze@ph@riBrpAjcA|jAvfAbhAdcAte@btBgVh~@kiAvdAgu@to@lLpwAoVpzAam@fsA{PflByVbeCnn@b_B|y@|pAz]ri@hUht@ih@hvEgd@~o@v}Br_CjgBzmA`^~Wx`@d_@ddBviCpRri@`kA|pAfl@rThsBd@hbBsO~q@bQz]ri@~y@z~Apc@vp@bt@|aClf@df@h[zIddCj\\jz@v[~]ri@xWb~B|h@`iBdlC`_C|k@jpAhPwz@zz@{o@bwAma@lnA{AjkAlf@ddCt_@jhA|eAvkAqa@dj@goBlnA{AfgCkH~yA}k@t`AihApu@aoBrg@i`Dtd@s`C`s@u|C|a@ikCzr@}uB`dA}jCdBcw@d[n[jqAuHzo@m}AnfAkrA~w@}]~oDmpCh~@erBrd@kdBzr@q`Bjr@oh@d`AvMlWdhCcKbhBhn@v}BxmA`tAxuB|m@niCpmArZ~kB~n@`f@rhAx[x]zs@jDnl@rvAnt@xhAjCv{BbNl|A~b@deB{DhsBrJhi@x^pq@nsApOroAtCj|C|ItaAzy@~`C~pAti@l}@pFjfA}gAjg@{jB`m@cdBdx@u`Arl@ua@~c@oLtvAfm@eEfoAc@t{DreAnw@hnAd_@|bAze@xn@xhAjUtz@lt@dzAhhAz}AlhAhlAtgBfbA|sAnp@r|ApFhwAsy@dm@aqC`KocCkOuuB}b@ijDbEahAhbBhJf_Bvi@thAp[rMaoAbg@}y@|dBhm@n`A}]bbCixAzqAiuA`oAuqAt^mkAiIgxCuFk|B`Kk`Bzo@ayAb}Auu@j}@`Jv|A_ExqD~Nxw@}Ap^io@kc@_eAqt@gw@o_AahBFk^|Uqa@l{@w_Bt{@gbCvp@u}D|Xmh@bX|v@bhAvvArgAzqCbf@~kAtq@tz@d`AtMlyAp~@te@zmCzt@~IrkAzFx_ArhAhUhs@`_BleAdpBbbAxzCv{@tn@bvAlUzh@rXuLnpBnXrw@jTdyAjkBv`@ls@lnA~Prw@hb@tZfgBvn@|uAbnA~dAtn@jgBl`@xqBzk@vcBtn@fnBsBlpCd^xBdhBeEdo@fM|bAns@thAdb@lpBli@j`A_B~c@sLzw@}Hrz@Lbr@lFj}@pWfo@tPzOvZdXxgAzk@v{Bxt@pe@du@wd@bV{jAjcAmd@bnBkcAxt@~a@z`@|r@bGrnAMh|A``Ap}@bu@{Ol}@tPjzDj_@bu@{VeDajBnBaiCfqAr^|`@f^d}@lkAnz@j^vyA~o@ryA`aAxz@eSna@}{AplA}cDxi@ok@`wA|I|`@xa@|]bdA`z@rlCrAzk@Qb{BpUzk@j[~Ld^|Efa@yVtl@ir@~R}]t^{{AzJsiBsLc{Bb@_xEqc@{qAqf@cl@_nAkjBkUi}@N}{AyFgtBqL{iBef@icB_`As}@w{Bws@kXoWaMgWTupBy]gdAkn@}eC_A_bC{CmmBeX}y@sgAieDnKsvCtBgmB`@qeCwNmzCeRyxAuq@{v@gcA`Ei[qPiUso@ai@sdAqUaMy}@xYuUGi]gqBqCi{BnKc{BjY{tAfSyd@nu@{x@fP}Ohm@q{AyIiv@me@qiCe]iqBfe@uaCbVca@hu@g]fg@gk@`Hav@qLe}@oWmcBuLso@fa@sOl[xB~Zn^dUtv@lc@zo@du@_SdiA_Vb[tWdt@nrAfbAryAlkAt[t`A}\\tr@on@rcBwkBpc@ne@zpAhw@`^rPp`AcOzSc_Bdg@{`@ti@eEvsA|s@hUde@~s@bgBlDvSht@baA|sAtb@vyAjX~jAjhAz~AnoAjtAsD|f@cLzo@{q@bj@}q@rz@tFzc@zIp[wO``C_kBr^o]hfAqRlhAtl@di@xo@fnAlb@ll@dCrr@mg@`iByoAhhBcKhqAjQ~cCt~@bnAbp@z_Azv@xn@bs@neAr}@tl@yR|a@ypApu@cn@fvBhUbGfh@dl@~Z~kAmRrc@va@n~@pfEdc@fnAr_AnuAxw@`JrR~]hR||@deAfcBnbAnuAvmArfBxbAbs@zeAzWrw@~a@rt@no@|jA`cBxk@lxA|v@dmBdt@|lBjUrr@zOtSnw@|r@zmBzM`tAdb@fUpcAzVv`F_H`y@tw@f^jkAzy@xsAvqAxOja@hRrtAlXbWj`ApPlc@hqA`Jpk@iErwAiSf|@yGtn@dJtSlXxd@fz@zmArc@~u@}U`Zia@bZgP~Yxt@lo@nf@vu@nRxfAtOxfAd`Anh@fg@siA~}@ubAt}@gLp`AoOxw@|S|kAcVro@w`@bbBngAfgCfdAfeBxh@xnAiVtqAqYba@rIda@eBp`AoOzuBbwBhi@by@xLlmAd}@bqA~vAzk@dl@pmAj[bFxq@xwA`r@z]xnAqHlwAcg@dyCooAnwA}m@zU{OdPcShoA{xBlx@qlAfoAugB|tAesAdrA}jBtfAksAj{@wvAlg@u}Az[y{@jcBsjBfoAglA|hBurAzcAmlAnr@o`@hkBaHz|AzP~|AyDzgCoUntAoAxgC{Qj|BqDzoCl}@`u@zBdd@qOro@gVvz@~BnjC|M`kFlw@no@wH|i@eVzl@eg@hd@ag@~}@cq@lcAaEfwBmkAdYciAzRtLb^v]tt@j|@pw@l|@~f@oOt`AsR~kAmH`PrBbDlsAgPbSofAt\\_g@xR_m@h{@lc@vsAbz@dhBjDdu@|CvqByPrqBKd_AdGxq@~Fz`BgKlsCmVpgB}Drq@bl@zlApkAfmA|dB~_CpDtVrApg@q^hq@w}@vH}Uf]ul@nOkiAd{@_iBxmBgu@|RarAvcB{tAvyAga@`Sul@jVir@G_d@sBia@|RCjd@fDhdBu[pq@yo@~yAgg@~jBzLndBh[~{@KvgBlAvxBkSrsCaYfpCpDbu@pl@fIneB~VrjCwAxqAcx@tyBm{@`eCaq@|z@e]bfAnd@ll@bu@zw@nn@p}@jd@xz@~OzpBf|@dkBvg@r}@zVxi@cSxl@e}A~f@u`@vqAoOpeB`FlwAeVxvB_]teBcVlpCcOhfAyc@~kAeBveBsm@|vBit@fa@_Ifr@vLhwA~`@`u@~YpsBzqB||A|eAffAtLdu@sE~z@}\\r[iq@~Asj@uUoq@eMs`@tGyj@z}@{f@vw@|yAdr@xt@tnA|eAti@|Yh^nBbiAlSiPpeAbMv~@|OhlAgPpt@ka@l{@so@vrAwD`S`P|OfzA`Phr@sEhnBy\\ztENrhBeVfvCyp@`g@{m@pcA_q@~RkBj_CqRdnBbn@zz@fIdPiVxi@aSzz@~O~w@r`@huCh{C')
    });
    divide_polyline.setMap(map)

    var basin_polyline = new google.maps.Polyline({
        strokeColor: "#000000",
        strokeWeight: 1,
        strokeOpacity: 0.8,
        path: google.maps.geometry.encoding.decodePath('y{}`GzalwSrOyKdKjUfHxQ~y@|x@`h@~^fSfI|XvHvw@}BtRgDdWqc@z\\_d@xUfAzRk@xi@vCfYpPxX|DtnAbAhcA~Avc@mErk@mUjh@{`@pr@q`Ap_@}g@v`@eIr}@lBxUhAx^dLjmA|k@j_@t[`n@dj@zn@j}@jHpUjcAjoA~Sl\\ne@xf@pPfMlPlIzUfAzbAuGn}@QtUq@ppAfs@zv@bq@`f@fv@zk@ty@jQn`@`KlQvi@tC`^aE|U`EfHtQyC|_B_Cti@zBzY`Cp]hU~~@~Krh@|TwSthAkDbSfEnPjIlaA~\\vs@te@dN|XpK|\\rTzk@`KlQlU~~@_Ilb@oFpZqWhaBnh@fj@x^bL|U`EtO}Gxo@k|@zw@wdArl@ycAbg@u_A|f@mcAvLsKbShEdd@`D`VzHlVpPh_Arl@jOuOhy@_b@b|@gb@z\\yc@`m@gx@ro@a`AlFoZaQwXqMmI_YwHkYgTiT_d@ol@{hAoOo{@x@_ZiCke@uKy`@uJ_sAkHs~AcTmiBcIyuBcTunAgTurAa_@c~DpKacAvNscAln@miAdt@ap@~q@iz@xb@oiBdQs{BgF{h@eAo|@`Zmc@~QkWnr@}cAjf@kvAl@se@vFucBxJgaA|Kqb@`a@gnAbWag@`RkWbRoSfRuOnOoObw@aRnXu@hc@uPlvAiPfhAkO`gC{GxUfAnPjMvMjM`KlQdQj`@rY~[pUkDxWwShQoj@zCkVZ_u@_BisA}Ji~A{Nap@a^wiAuUknAyG{vApNij@n`@oPtCeZm@ii@pK}m@lYov@`w@qfByJg~AwUerAqJwvAbCkm@pOa`BsB}UcEu~ArC_^lIqZ`RiWt]gP~`@aA`RiWvrAsj@br@VfoA|Tbp@zVh`@iTrZwW~QgWjh@ad@~r@ax@pTyb@pFkZ~Ns^rSw}@nLaSy[_aBqJmzAkMezA{LakAuOwjAw[aaBaVu}A{XiaBcJ{nAyVoxB}R}yAkHkYwY}c@uMoMqMsIic@nPuWh[oWh_@_XvO_SsAqfA{QqRsnAx@y]yGkbBgGgoAcCkaC`Nk}@tXauA|Nmb@zuA}~Bt}@gsAfx@ekA`f@oTjlAsdAnv@oh@f_Aka@hh@wg@b]cc@rj@a{@rg@s~@~t@izAxl@gnA`Lcf@rFgZlJs{AIufBuDk~AaMmzAaR}bAk\\_`@}JoQ_\\mT_q@uy@eHoU{`AorBuKkl@u]}mAm[eaBkEyU|Hkq@baBqj@bWkn@}Bce@mMuiB]oa@rh@{_@`z@mQh]g_@vFeZwBq]qBqY{i@clB`Iom@pOgOhReSaNy\\ye@cbAgK}`@[s]pIkZjUuKnO}Rbe@uv@sBo]oPauBuHuh@eKc]wr@eWorAyh@aQmd@fAcVlIg^h\\ueA`U_Wz}@ovAdWar@w_@}v@my@k}@{p@}y@_HuQkTow@')
    });
    basin_polyline.setMap(map);
    /*
    var td_metadata_cache_key = 'td-2015-metadata-3e65ed4e91a9290acbbba9e0a1b238fa',
        td_metadata_cache_expiry = 60 * 60 * 24 * 31 * 1000;//31 days in milliseconds

    td_metadata = $.jStorage.get(td_metadata_cache_key);

    if (typeof td_metadata != 'undefined' && td_metadata != null) {
        loadRoute(td_metadata);

    } else {

        //the cache key might have change (causing the cache miss) because
        //the file was updated.  In this case, flush storage to remove all
        //old data.
        $.jStorage.flush()
     */
        var ajax = $.ajax({
            beforeSend: function () {
                $('#download-modal').modal('show');
            },
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                var progress_bar = $('#download-modal').find('.progress-bar');
                xhr.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percent_complete = Math.round(evt.loaded / evt.total * 100);
                        progress_bar
                            .attr('aria-valuenow', percent_complete)
                            .width(percent_complete + '%')
                            .text(percent_complete + '%');

                    }
                }, false);
                return xhr;
            },
            type: 'GET',
            url: "/resources/data/TD-2015-detailed.min.js",
            data: {},
            success: function (data) {
                //$.jStorage.set(td_metadata_cache_key, data, {TTL: td_metadata_cache_expiry})
                loadRoute(data);

                $('#download-modal').modal('hide');
            }
        });
    //}

    $('#options-tab input[name="show-official-gpx"]').change(function(){
        if( $(this).is(':checked') ) {
            showOfficialRoute();
        } else {
            hideOfficialRoute();
        }

    });

});

function showOfficialRoute() {
    if( typeof official_polyline == 'object' ) {
        official_polyline.setMap(map);
    } else {
        $.ajax({
            type: "GET",
            url: "/resources/data/TourDivide2015_v2-4867822901e60f48c393ac2b3ef8644e.gpx",
            dataType: "xml",
            success: function (xml) {
                var points = [];
                var bounds = new google.maps.LatLngBounds();
                $(xml).find("trkpt").each(function () {
                    var lat = $(this).attr("lat");
                    var lon = $(this).attr("lon");
                    var p = new google.maps.LatLng(lat, lon);
                    points.push(p);
                    bounds.extend(p);
                });

                official_polyline = new google.maps.Polyline({
                    // use your own style here
                    path: points,
                    strokeColor: "#FF00AA",
                    strokeOpacity: .7,
                    strokeWeight: 2
                });
                official_polyline.setMap(map);
            }
        });
    }
}

function hideOfficialRoute() {
    //edge case: checkbox toggled back prior to the load ajax completing
    if(typeof official_polyline != 'undefined') {
        official_polyline.setMap(null);
    }
}

function loadRoute(data) {
    var direction_radio = jQuery('#options-tab input[name="direction"]');
    var normal_radio = jQuery('#options-tab input[name="direction"][value="standard"]');
    var reverse_radio = jQuery('#options-tab input[name="direction"][value="reverse"]');

    var rm = new RouteMap({
        metadata: data,
        map: map,
        elevation_profile_container_id: '#elevation-profile',
        updateCallback: function(me){

            if( me.assertIsReverse() ) {
                reverse_radio.attr('checked','checked');
            } else {
                normal_radio.attr('checked','checked');
            }
        }
    });
    direction_radio.change(function(e){
        if( jQuery(this).val() == 'standard' ) {
            rm.setDirection(rm.STANDARD_DIRECTION);
        } else {
            rm.setDirection(rm.REVERSE_DIRECTION);
        }

    });
}

var resizeMap = function(){
    jQuery('#map').height(
        jQuery(window).height()-jQuery('#app').outerHeight()
    );
}
var resizeMapDebounce = debounce(resizeMap,200);

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

})();