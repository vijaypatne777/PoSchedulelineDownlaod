sap.ui.define(["sap/m/MessageToast", "sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/FilterType", "sap/ui/model/Sorter",
	"sap/ui/core/util/Export", "sap/ui/core/util/ExportTypeCSV", "sap/m/MessageBox", "sap/ui/core/util/MockServer",
	"sap/ui/export/Spreadsheet", "sap/ui/model/odata/v2/ODataModel", "sap/ui/model/json/JSONModel",	"sap/ui/export/Spreadsheet",
	"sap/m/MessageToast"
], function (a, t, e, l, r, i, o, n, s, v, P, M, JS, Spreadsheet, MessageToast) {
	"use strict";
	var global_tab1;
	var global_tab2;
	var global_len = 0;
	return t.extend("YY1_PO_DATE_214.YY1_PO_DATE_214.controller.View1", {
		onClear: function (a) {
				var clr = "";
				this.getView().byId("idPurOrg").setValue(clr);
				this.getView().byId("idPlant").setValue(clr);
				this.getView().byId("idSuppl").setValue(clr);
			},
			
	  		onReset: function (a) {
				var clr = "";
				this.getView().byId("idPurOrg").setValue(clr);
				this.getView().byId("idPlant").setValue(clr);
				this.getView().byId("idSuppl").setValue(clr);
			},

			onSearch: function () {
				
				var t = this.getView().byId("infocond");
				var r = {
					infopage: []
				}
				var porg_srch = this.getView().byId("idPurOrg").getValue();
				var porg_srch1 = "'" + porg_srch + "'";
				
				var plant_srch = this.getView().byId("idPlant").getValue();
				var plant_srch1 = "'" + plant_srch + "'";
				
				var supp_srch = this.getView().byId("idSuppl").getValue();
				var supp_srch1 = "'" + supp_srch + "'";				
				
				if (porg_srch === "" || plant_srch === "" || supp_srch === "")
				{
					if (porg_srch === "")
					{
					 var msg = "Please enter value for Puchasing Org. ";
					 a.show(msg)
					}
					if (plant_srch === "")
					{
					 var msg = "Please enter value for Plant ";
					 a.show(msg)
					}
					if (supp_srch === "")
					{
					 var msg = "Please enter value for Supplier ";
					 a.show(msg)
					}
				}
				else
				{
				   var msg1 = "Fetching Records.......";
					a.show(msg1)
				}
		// },
		if (porg_srch !== ""  &&  plant_srch !== "" &&  supp_srch !== "" ){
		       var u3 = new sap.ui.model.json.JSONModel;
				u3.setData(r);
				t.setModel(u3, "inforeport");

				// This API call is based on a Custom CDS vIew created in S4 Hana Box Start 
				var R4 = "/S4HC/sap/opu/odata/sap/YY1_PURCHASE_DATE_CPI_214_CDS";
				var p4 = new sap.ui.model.odata.ODataModel(R4, true);
		var y4 = "/YY1_purchase_date_cpi_214" + "?$filter=(PurchasingOrganization eq " + porg_srch1 + " and Plant eq " + plant_srch1 +
								" and Supplier eq " + supp_srch1 + ")";
		
						 
						p4.read(y4, {
							
							success: function (oData, response) {
								var data_in = oData.results;
								var data_len_in = data_in.length;
								
								
								for (var u1 = 0; u1 < data_len_in; u1++) {
									
									if (data_in[u1].ScheduleLineDeliveryDate !== null) {
										var date134 = JSON.stringify(data_in[u1].ScheduleLineDeliveryDate);
										date134 = date134.slice(6, 8) + "/" +  date134.slice(9, 11) + "/" + date134.slice(1, 5);
										var date13 = date134;
										
										
									}
									r.infopage.push({
										Supplier: data_in[u1].Supplier,
										PurchaseOrder: data_in[u1].PurchaseOrder,
										Plant: data_in[u1].Plant,
										PurchaseOrderItem: data_in[u1].PurchaseOrderItem,
									    Material: data_in[u1].Material,
									    ProductDescription: data_in[u1].PurchaseOrderItemText,
										ScheduleLineDeliveryDate: date13,
										OrderQuantity: data_in[u1].OrderQuantity_01,
										PurchaseOrderQuantityUnit: data_in[u1].PurchaseOrderQuantityUnit,
										PendingQuantity: data_in[u1].PendingQuantity,
										RoughGoodsReceiptQty: data_in[u1].RoughGoodsReceiptQty, 
										PurchaseOrderScheduleLine : data_in[u1].PurchaseOrderScheduleLine,
									});

								}
									global_tab2 = r.infopage;
							u3.setData(r);
							$.sap.xampp = r;
							this.getView().setModel(u3, "inforeport");
							var localJSON = new JS();
							localJSON.setData(r);
							localJSON.setSizeLimit(1000000);
							this.getView().setModel(localJSON, "inforeport");
							}

						})
			}
		},
		
		
		onStat: function () {
			
			var t = this.getView().byId("infocond");
					var statsel = global_tab2;
					var r = {
						infopage: []
					}
					
					
					
					var i31 = statsel.length ;
		if (i31 === 0 ){
			var msg2 = "No data available for the input provided ";
					 a.show(msg2)
		}			
		  if (i31 > 0){
					var u31 = new sap.ui.model.json.JSONModel;
					var R31 = "/S4HC/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";
					var p31 = new sap.ui.model.odata.ODataModel(R31, true);
					u31.setData(r);
					t.setModel(u31, "inforeport");
			
			//If we have huge number of records the we will send 40 records in each call 
			       var cc41 = 0;
			       var arr_i1 = new Array();
			       var arr_i2 = new Array();
			       for (var b = 0; b < i31; b++) {
			       	arr_i1[cc41] = statsel[b].PurchaseOrder;
			       	arr_i2[cc41] = statsel[b].PurchaseOrderItem;
			       	
			       	cc41 = cc41 + 1 ; 
			       	
			       	// PurchasingDocument
			       	  if (cc41 === 40) {
			       		var arrfilter_i1 = arr_i1.filter(function (item, index, inputArray) {
							return inputArray.indexOf(item) === index;
						});

						
						var acondrec_i1 = [];
						for (var q = 0; q < arrfilter_i1.length; q++) {

							acondrec_i1.push(new sap.ui.model.Filter("PurchasingDocument", sap.ui.model.FilterOperator.EQ, arrfilter_i1[q]));

						}
						var oFilter_i1 = new sap.ui.model.Filter({
							filters: acondrec_i1,
							and: false
						});
						
				
						
						var oDataFilter_i1 = new Array(new sap.ui.model.Filter({
							filters: [oFilter_i1 ] , 
							and: true
						}));
						
			       	  var y2 = "A_PurchaseOrderScheduleLine" ; 
			       	  p31.read(y2, {
			       	  	async: false,
							filters: [oDataFilter_i1],
							success: function (oData, response){
									var data2 = oData.results;
									var data3 = data2;
									var i4 = data3.length;
									var i5 = global_tab2.length;
									for (var o3 = 0; o3 < i5; o3++) {
									for (var o5 = 0; o5 < i4; o5++) {
								
									 var pitm = "000" + data2[o5].PurchasingDocumentItem; 
									 var sline = "000" + data2[o5].ScheduleLine; 
									if (global_tab2[o3].PurchaseOrder === data2[o5].PurchasingDocument && global_tab2[o3].PurchaseOrderItem === pitm
									 && global_tab2[o3].PurchaseOrderScheduleLine === sline){
										if (data2[o5].SchedLineStscDeliveryDate !== null) {
										var date136 = JSON.stringify(data2[o5].SchedLineStscDeliveryDate);
										date136 = date136.slice(6, 8) + "/" +  date136.slice(9, 11) + "/" + date136.slice(1, 5);
										var date15 = []; 
										date15 = date136; 
										}
								
									
									
										r.infopage.push({
										Supplier: global_tab2[o3].Supplier,
										PurchaseOrder: global_tab2[o3].PurchaseOrder,
										Plant: global_tab2[o3].Plant,
										PurchaseOrderItem: global_tab2[o3].PurchaseOrderItem,
									    Material: global_tab2[o3].Material,
									    ProductDescription: global_tab2[o3].ProductDescription,
										ScheduleLineDeliveryDate: global_tab2[o3].ScheduleLineDeliveryDate,
										StatisticalDeliveryDate: date15,
										OrderQuantity: global_tab2[o3].OrderQuantity,
										PurchaseOrderQuantityUnit: global_tab2[o3].PurchaseOrderQuantityUnit,
										PendingQuantity: global_tab2[o3].PendingQuantity,
										RoughGoodsReceiptQty: global_tab2[o3].RoughGoodsReceiptQty, 
										PurchaseOrderScheduleLine : global_tab2[o3].PurchaseOrderScheduleLine,
									});
								} 	}
									
									}
									}
													}
			       	  )
			       	  cc41 = 0;
			       	  arr_i1 = [] ;
			       	  arr_i2 = []; 
			       	  }
			       	  	
			       	
			       	
			       }
			// when only less than 40 data is left then again call the odata with remaining PO and PO Item 
			// PurchasingDocument
				var arrfilter_i3 = arr_i1.filter(function (item, index, inputArray) {
					return inputArray.indexOf(item) === index;
				}); 
			   var acondrec_i3 = [];
				for (var q = 0; q < arrfilter_i3.length; q++) {

					acondrec_i3.push(new sap.ui.model.Filter("PurchasingDocument", sap.ui.model.FilterOperator.EQ, arrfilter_i3[q]));

				}
					var oFilter_i3 = new sap.ui.model.Filter({
					filters: acondrec_i3,
					and: false
				});

				
					var oDataFilter_i2 = new Array(new sap.ui.model.Filter({
							filters: [oFilter_i3 ] , 
							and: true
						}));
						
						var y2 = "A_PurchaseOrderScheduleLine" ;
				p31.read(y2, {
			       	  	async: false,
							filters: [oDataFilter_i2],
							success: function (oData, response){
									var data2 = oData.results;
									var data3 = data2;
									var i4 = data3.length;
									var i5 = global_tab2.length;
									for (var o3 = 0; o3 < i5; o3++) {
									for (var o5 = 0; o5 < i4; o5++) {
								
									  var pitm = "000" + data2[o5].PurchasingDocumentItem; 
									 var sline = "000" + data2[o5].ScheduleLine;
									if (global_tab2[o3].PurchaseOrder === data2[o5].PurchasingDocument && global_tab2[o3].PurchaseOrderItem === pitm
										&& global_tab2[o3].PurchaseOrderScheduleLine === sline){
									   if (data2[o5].SchedLineStscDeliveryDate !== null) {
										var date136 = JSON.stringify(data2[o5].SchedLineStscDeliveryDate);
										date136 = date136.slice(6, 8) + "/" +  date136.slice(9, 11) + "/" + date136.slice(1, 5);
									  var date15 = []; 
										date15 = date136; 
										}
									
										r.infopage.push({
										Supplier: global_tab2[o3].Supplier,
										Plant: global_tab2[o3].Plant,
										PurchaseOrder: global_tab2[o3].PurchaseOrder,
										PurchaseOrderItem: global_tab2[o3].PurchaseOrderItem,
									    Material: global_tab2[o3].Material,
									    ProductDescription: global_tab2[o3].ProductDescription,
										ScheduleLineDeliveryDate: global_tab2[o3].ScheduleLineDeliveryDate,
										StatisticalDeliveryDate: date15,
										OrderQuantity: global_tab2[o3].OrderQuantity,
										PurchaseOrderQuantityUnit: global_tab2[o3].PurchaseOrderQuantityUnit,
										PendingQuantity: global_tab2[o3].PendingQuantity,
										RoughGoodsReceiptQty: global_tab2[o3].RoughGoodsReceiptQty, 
										PurchaseOrderScheduleLine : global_tab2[o3].PurchaseOrderScheduleLine,
									});
									}
									
									}
									}
									// }
									// }
							}
			       	  	
						}
			       	  )
				           u31.setData(r);
				           $.sap.xampp = r;
							this.getView().setModel(u31, "inforeport");
							var localJSON = new JS();
							localJSON.setData(r);
							localJSON.setSizeLimit(1000000);
							this.getView().setModel(localJSON, "inforeport");
				
				
				
				
				
		  }	
		}, 
		
		
		// onExportExcel: function (a) {
		// 	jQuery.sap.require("sap.ui.core.util.Export");
		// 	jQuery.sap.require("sap.ui.core.util.ExportTypeCSV");
		// 	var a = this.byId("infocond");
		// 	// debugger; 
		// 	a.exportData({
		// 		exportType: new sap.ui.core.util.ExportTypeCSV
		// 	}).saveFile().always(function () {
		// 		this.destroy()
		// 	})
		// },
		onExcel: sap.m.Table.prototype.exportData || function (a) {
			a.saveFile().catch(function (a) {}).then(function () {
				a.destroy()
			})
		},

		onBeforeExport: function (a) {
			var t = a.getParameter("exportSettings");
			t.worker = false
		},
		onExportExcel:function(){
				var aCols, aProducts, oSettings, oSheet;

			aCols = this.createColumnConfig();
			aProducts = $.sap.xampp.infopage;
			var a = new Date();
			oSettings = {
				workbook: {
					columns: aCols

				},
				dataSource: aProducts,
				showProgress: false,
				fileName: "PO Schedule Line Details_" + a.getUTCDate() + "-" + (a.getUTCMonth() + 1) + "-" + a.getUTCFullYear()
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build()
				.then(function () {
					MessageToast.show("Excel export has finished");
				})
				.finally(function () {
					oSheet.destroy();
				});
		},
			createColumnConfig: function () {
			return [{
				label: "Fornitore",
				property: "Supplier"
			}, {
				label: "Plant",
				property: "Plant"
			}, {
				label: "OrdineDAcquisto",
				property: "PurchaseOrder"
			}, {
				label: "Pos",
				property: "PurchaseOrderItem"
			}, {
				label: "Codice",
				property: "Material"
			}, {
				label: "Descrizione della parte",
				property: "ProductDescription"
			}, {
				label: "DataDiConsegna",
				property: "ScheduleLineDeliveryDate"
			}, {
				label: "Data di consegna statistica",
				property: "StatisticalDeliveryDate"
			}, {
				label: "QuantitàOrdine",
				property: "OrderQuantity"
			}, {
				label: "Udm",
				property: "PurchaseOrderQuantityUnit"
			}, {
				label: "Quantita in sospeso",
				property: "PendingQuantity"
			}, {
				label: "Quantita GR",
				property: "RoughGoodsReceiptQty"
			},{
				label: "Purchase Order Schedule Line",
				property: "PurchaseOrderScheduleLine"
			}];
		}
		
});
});