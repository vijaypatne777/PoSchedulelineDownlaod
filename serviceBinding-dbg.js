function initModel() {
	var sUrl = "/S4HC/sap/opu/odata/sap/YY1_BULK_UPDATE_214_CDS/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}