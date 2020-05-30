sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function (Controller, JSONModel, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("ovly.odata.fornecedores.controller.View2", {

		onInit: function () {
			
			this._oViewModel = new JSONModel({
				// id: ""
				name: "Novo Fornecedor",
				concurrency: 50 
			});
			
			this.getView().setModel(this._oViewModel, "view");
			
			this._oCountryModel = new JSONModel([
				{ id: "USA", name: "Estados Unidos"},
				{ id: "US", name: "Estados Unidos" },
				{ id: "BR", name: "Brasil" }
			]);
			
			this.getView().setModel(this._oCountryModel, "country");
			
			//usado no Nav To 
			this._oRouter = this.getOwnerComponent().getRouter();

		},
		
		onBack: function (oEvt){
			this._oRouter.navTo("inicial", {}, true); //Nome do Partner do manifest
		},
		
		onSave: function (oEvt) {
			
			// var oViewModel = this.getView().getModel("view");
			
			// var sId = this.getView().byId("id_fornecedor").getValue();
			var sId          = this._oViewModel.getProperty("/id");
			var sName        = this._oViewModel.getProperty("/name");
			var iConcurrency = this._oViewModel.getProperty("/concurrency");
			
			var sStreet  = this._oViewModel.getProperty("/street") + " " + this._oViewModel.getProperty("/street_number");
			var sZip     = this._oViewModel.getProperty("/zip");
			var sCity    = this._oViewModel.getProperty("/city");
			var sCountry = this._oViewModel.getProperty("/country");
			
			var oSupplier = {
				ID: sId,
				Name: sName,
				Concurrency: iConcurrency,
				Address: {
					Street: sStreet,
					City: sCity,
					ZipCode: sZip,

					// State: ,
					Country: sCountry
				}
			};
			
			console.log(oSupplier);
			
			var oDataModel = this.getView().getModel();
			var sPath = "/Suppliers";
			
			function onSuccess(oNewSupplier){
				var sMessage = "Fornecedor: " + oNewSupplier.Name + " ID: " + oNewSupplier.ID + "Salvo com sucesso";
				MessageToast.show(sMessage);
				console.log("sucesso");
			}
			
			var mParameters = {
				success: onSuccess,
				error: this._onError
			}
			
			oDataModel.create(sPath, oSupplier, mParameters);
		},
		
		_onError: function(oError){
			MessageBox.show(Error());
			console.log("erro");
		}

	});

});