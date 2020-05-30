sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("ovly.odata.fornecedores.controller.View1", {
		onInit: function () {

		},

		onSearch: function (oEvt) {

			// @type sap.m.List
			var oList = this.byId("list");
			// @type sap.ui.model.odata.v2.ODataListBinding
			var oBinding = oList.getBinding("items");

			var sSearchTerm = oEvt.getParameter("newValue");

			var aFilters = [];

			if (sSearchTerm) {

				var oFilter = new Filter({
					path: "Name",
					operator: FilterOperator.Contains,
					value1: sSearchTerm
				});
				aFilters.push(oFilter);

				var oFilterUpper = new Filter({
					path: "Name",
					operator: FilterOperator.Contains,
					value1: sSearchTerm.toUpperCase()
				});
				aFilters.push(oFilterUpper);

				var oFilterLower = new Filter({
					path: "Name",
					operator: FilterOperator.Contains,
					value1: sSearchTerm.toLowerCase()
				});
				aFilters.push(oFilterLower);
			}

			oBinding.filter(aFilters);

		},

		onItemPress: function (oEvt) {

			var oList = oEvt.getSource();
			var oParameters = oEvt.getParameters();
			var oListItem = oParameters.listItem; //NÃO É UMA FUNÇÃO
			var oContext = oListItem.getBindingContext();
			var oSupplier = oContext.getObject();
			alert(oSupplier.Name);
			//debugger;

		},
		
		onAdd: function (oEvt) {
			
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("add", {}, true);//View2 
			
		}
	});
});