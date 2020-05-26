sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/ui/model/odata/v2/ODataModel"
], function (JSONModel, Device, ODataModel) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		
		createODataModel: function () {
			
			var sUrl = "/api/V2/(S(1hlr1p1ssyqw5m4jkvxgv5ri))/OData/OData.svc/";

			var mParameters = {
				serviceUrl: sUrl,
				disableHeadRequestForToken: true,
				useBatch: false
			};

			// var oDataModel = new sap.ui.model.odata.v2.ODataModel(sUrl, mParameters);
			//var oDataModel = new sap.ui.model.odata.v2.ODataModel(mParameters);
			var oDataModel = new ODataModel(mParameters);
			return oDataModel;
			
		}

	};
});