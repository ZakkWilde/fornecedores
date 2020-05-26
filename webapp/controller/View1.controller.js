sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ovly.odata.fornecedores.controller.View1", {
		onInit: function () {

		},
		
		onItemPress: function (oEvt) {
			
			var oList = oEvt.getSource();
			var oParameters = oEvt.getParameters();
			var oListItem = oParameters.listItem; //NÃO É UMA FUNÇÃO
			var oContext  = oListItem.getBindingContext();
			var oSupplier = oContext.getObject();
			alert(oSupplier.Name);
			//debugger;
			
		}
	});
});