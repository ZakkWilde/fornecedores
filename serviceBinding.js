function initModel() {
	var sUrl = "/ODATA_ORG/V2/(S(1hlr1p1ssyfw5m4jkvxgv5ri))/OData/OData.svc/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}