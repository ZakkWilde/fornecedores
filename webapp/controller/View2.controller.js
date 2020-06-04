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
				isAdd: false,
				isDisplay: false,
				// id: ""
				name: "Novo Fornecedor",
				concurrency: 50
			});

			this.getView().setModel(this._oViewModel, "view");

			this._oCountryModel = new JSONModel([{
				id: "USA",
				name: "Estados Unidos"
			}, {
				id: "US",
				name: "Estados Unidos"
			}, {
				id: "BR",
				name: "Brasil"
			}]);

			this.getView().setModel(this._oCountryModel, "country");

			//usado no Nav To 
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.attachRouteMatched(this.onRouteMatched);

			this._oRouter.getRoute("add").attachPatternMatched(this.onRouteAdd, this);
			this._oRouter.getRoute("display").attachPatternMatched(this.onRouteDisplay, this);

		},

		onRouteAdd: function () {

			this._oViewModel.setProperty("/isAdd", true);
			this._oViewModel.setProperty("isDisplay", false);

			this._oViewModel.setProperty("/id", null);
			this._oViewModel.setProperty("/name", null);
			this._oViewModel.setProperty("/concurrency", null);
			this._oViewModel.setProperty("/city", null);
			this._oViewModel.setProperty("/country", null);

		},

		onRouteDisplay: function (oEvt) {

			this._oViewModel.setProperty("/isAdd", false);
			this._oViewModel.setProperty("isDisplay", true);

			var oParameters = oEvt.getParameters();
			var oArguments = oParameters.arguments; // ver evento 'patternMatched' da 'sap.ui.core.routing.Route'
			var sSupplierId = oArguments.id_do_fornecedor;
			// var oDataModel = this.getView().getModel();
			var oDataModel = this.getView().getModel("odata"); // Mocado
			//var sPath = "/Suppliers(" + sSupplierId + ")";

			var that = this;

			oDataModel.metadataLoaded().then(function () {

				var sPath = oDataModel.createKey("/Suppliers", {
					ID: sSupplierId
				});

				function onSuccess(oSupplier) {

					this._oViewModel.setProperty("/id", oSupplier.ID);
					this._oViewModel.setProperty("/name", oSupplier.Name);
					this._oViewModel.setProperty("/concurrency", oSupplier.Concurrency);
					this._oViewModel.setProperty("/city", oSupplier.Address.City);
					this._oViewModel.setProperty("/country", oSupplier.Address.Country);

				}

				function onError(oError) {

				}

				var mReadParameters = {
					success: onSuccess.bind(that), //JS nativo
					error: $.proxy(onError, that) //JQuery
				};
				oDataModel.read(sPath, mReadParameters);

			});

		},

		onRouteMatched: function (oEvt) {
			var oParameters = oEvt.getParameters();
			var sRouteName = oParameters.name; // ver evento 'routeMatched' da 'sap.ui.core.routing.Router'
			switch (sRouteName) {
			case "add":
				console.log("rota ADD acionada");
				break;
			case "display":
				console.log("rota DISPLAY acionada");
				break;
			default:
			}
		},

		onBack: function (oEvt) {
			this._oRouter.navTo("inicial", {}, true); //Nome do Partner do manifest
		},

		onSave: function (oEvt) {

			// var oViewModel = this.getView().getModel("view");

			// var sId = this.getView().byId("id_fornecedor").getValue();
			var sId = this._oViewModel.getProperty("/id");
			var sName = this._oViewModel.getProperty("/name");
			var iConcurrency = this._oViewModel.getProperty("/concurrency");

			var sStreet = this._oViewModel.getProperty("/street") + " " + this._oViewModel.getProperty("/street_number");
			var sZip = this._oViewModel.getProperty("/zip");
			var sCity = this._oViewModel.getProperty("/city");
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

			// var oDataModel = this.getView().getModel();
			var oDataModel = this.getView().getModel("odata"); //Mocado
			var sPath = "/Suppliers";

			function onSuccess(oNewSupplier) {
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

		_onError: function (oError) {
			MessageBox.show(Error());
			console.log("erro");
		}

	});

});