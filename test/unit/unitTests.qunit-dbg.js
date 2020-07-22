/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"YY1_PO_DATE_214/YY1_PO_DATE_214/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});