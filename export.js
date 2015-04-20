// ==UserScript==
// @name Watsch
// @author Jiazhou Li
// @version 0.0
// @description Exports your Quest class schedule
// @match https://quest.pecs.uwaterloo.ca/*
// ==/UserScript==

var ele = document.getElementById('SSSBUTTON_CONFIRMLINK');

if (ele != null) {
	document.getElementById('DERIVED_REGFRM1_SSR_SCHED_FORMAT$258$_LBL').innerHTML = 'SUCCESS!';
}