sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,ODataModel,JSONModel) {
		"use strict";

		return Controller.extend("ux.zdashboard.controller.Main", {
			onInit: function () {

 this.LiveModel();

 this.ChartModel();


 this.donutModel();


            },
            

donutModel:function(){


	var aData = {
						Items : [  
							{
								Flavor:"Blue Moon",
								Sales : 700
							},
							{
								Flavor:"Matcha Green Tea",
								Sales : 1100
							},
							{
								Flavor:"ButterScotch",
								Sales : 1400
							},
							{
								Flavor:"Black Current",
								Sales : 560
							}
							]
				};
				var oIceCreamModel = new sap.ui.model.json.JSONModel();
				oIceCreamModel.setData(aData);
				this.getView().byId("chartContainer2").setModel(oIceCreamModel, "IceCreamModel");




},

            ChartModel:function(){

// bar /column chart



//  Bar Chart -start

	 /*Total -Summary*/
	 var oVizFrame = this.getView().byId("idVizFrameColumn");
	 var oModel = new JSONModel();
   
   
     var data = {
		   'Count' : [
			   {"Status": "Total","Value": "1234","Value2":"456"},
			   {"Status": "Inbound","Value": "9127","Value2":"569"},
			  
				{"Status": "Outbound","Value": "15957","Value2":"700"},
				{"Status": "Profit","Value": "20000","Value2":"23000"},
				
			  ]};
   oModel.setData(data);
   
   var oDataset = new sap.viz.ui5.data.FlattenedDataset({
	   dimensions : [{
		   name : 'Status',
		   value : "{Status}"}],
					  
	   measures : [
           {
		   name : 'Count',
           value : '{Value}'
           },
           {
		   name : 'Count2',
           value : '{Value2}'
           }
                  ],
        
					
	   data : {
		   path : "/Count"
	   }
   });		
   oVizFrame.setDataset(oDataset);
   oVizFrame.setModel(oModel);	
   oVizFrame.setVizType('bar');

// below all charts are supported
// Chart customizations property, aim to customize existing (build-in) charts to meet specific LoB requirements. Currently, supported chart type : column, dual_column, bar, dual_bar, stacked_column, stacked_bar, 100_stacked_bar, 100_stacked_column, 100_dual_stacked_bar, 100_dual_stacked_column, dual_stacked_bar, dual_stacked_column, line, horizontal_line, dual_line, dual_horizontal_line, combination, horizontal_combination, stacked_combination, horizontal_stacked_combination, dual_stacked_combination, dual_horizontal_stacked_combination, scatter, bubble.   
// 
   
   
   oVizFrame.setVizProperties({
   
	   plotArea: {
	  // 	colorPalette : d3.scale.category20().range
	   dataLabel: {
					   visible: "true"
				   }
				
		   }});
   
   var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		 'uid': "valueAxis",
		 'type': "Measure",
		 'values': ["Count"],
		 'label':"true"
	   }), 
	   feedDataAxis =   new sap.viz.ui5.controls.common.feeds.FeedItem({
		'uid': "DataAxis",
		'type': "Measure",
		'values': ["Count"],
		'label':"true"
	  }), 
	   feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		 'uid': "categoryAxis",
		 'type': "Dimension",
		 'values': ["Status"]
	   });
   oVizFrame.addFeed(feedValueAxis);
   oVizFrame.addFeed(feedCategoryAxis);
   oVizFrame.addFeed(feedDataAxis);
   



// end of bar Chart 




            },

            LiveModel:function(){

                	var that=this;
                var sServiceUrl = "/sap/opu/odata/sap/EPM_REF_APPS_PROD_MAN_SRV/";
                
                var oManfestService ="/sap/opu/odata/sap/EPM_REF_APPS_PROD_MAN_SRV";
	
				   var oModel = new ODataModel(sServiceUrl);
				   oModel.setUseBatch(false); // its working
				  // @ts-ignore
				  this.getView().setModel(oModel);
				  
				  
			//	  this.getView().byId("lineItemsList").setModel(oModel,"Table");
			// crm model
				  var oCRMModel =  new JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PROD_MAN_SRV/Products('HT-1000')?$format=json");
				  // @ts-ignore
				  this.getView().byId("crmContainer").setModel(oCRMModel,"CRM");
            },
 
 
            onAfterRendering:function(){

// ECC model
  var oECCModel =  new JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PROD_MAN_SRV/Products('HT-1001')?$format=json");
				  // @ts-ignore
                  this.getView().byId("eccContainer").setModel(oECCModel,"ECC");
                  
                  // SRM model
  var oSRMModel =  new JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PROD_MAN_SRV/Products('HT-1002')?$format=json");
				  // @ts-ignore
				  this.getView().byId("srmContainer").setModel(oSRMModel,"SRM");
  var oBWModel =  new JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PROD_MAN_SRV/Products('HT-1003')?$format=json");
				  // @ts-ignore
				  this.getView().byId("BWContainer").setModel(oBWModel,"BW");
//   var oECCModel =  new JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PROD_MAN_SRV/Products('AR-FB-1005')?$format=json");
// 				  // @ts-ignore
// 				  this.getView().byId("eccContainer").setModel(oECCModel,"ECC");// ECC model
//   var oECCModel =  new JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PROD_MAN_SRV/Products('AR-FB-1006')?$format=json");
// 				  // @ts-ignore
// 				  this.getView().byId("eccContainer").setModel(oECCModel,"ECC");// ECC model
//   var oECCModel =  new JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PROD_MAN_SRV/Products('AR-FB-1007')?$format=json");
// 				  // @ts-ignore
// 				  this.getView().byId("eccContainer").setModel(oECCModel,"ECC");// ECC model
//   var oECCModel =  new JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PROD_MAN_SRV/Products('AR-FB-1008')?$format=json");
// 				  // @ts-ignore
// 				  this.getView().byId("eccContainer").setModel(oECCModel,"ECC");// ECC model
//   var oECCModel =  new JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PROD_MAN_SRV/Products('AR-FB-1009')?$format=json");
// 				  // @ts-ignore
// 				  this.getView().byId("eccContainer").setModel(oECCModel,"ECC");// ECC model
//   var oECCModel =  new JSONModel("/sap/opu/odata/sap/EPM_REF_APPS_PROD_MAN_SRV/Products('AR-FB-1010')?$format=json");
// 				  // @ts-ignore
// 				  this.getView().byId("eccContainer").setModel(oECCModel,"ECC");

         },

         onBeforeRendering:function(){


         },


		});
	});
