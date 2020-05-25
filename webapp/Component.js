sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ovly/odata/fornecedores/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("ovly.odata.fornecedores.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			//OData Model Creation - Precisa criar uma destination sempre
			var sUrl = "/api/V2/(S(1hlr1p1ssyqw5m4jkvxgv5ri))/OData/OData.svc/";
			var oDataModel = new sap.ui.model.odata.v2.ODataModel(sUrl);
			this.setModel(oDataModel);//quando não passa o segundo parametro ele se torna o OData Principal "default"
			
		}
	});
});